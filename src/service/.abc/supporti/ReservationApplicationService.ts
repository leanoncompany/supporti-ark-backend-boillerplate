//* Import library
import moment from 'moment';
import { Op } from 'sequelize';

//* Import core
import {
	IHookCallbacks,
	IServiceProps,
} from '@leanoncompany/back-end-core/src/@types/service/service';
import { Memory } from '@leanoncompany/back-end-core';
import ProductApplicationService from './ProductApplicationService';

export default class ReservationApplicationService extends ProductApplicationService {
	private reservationSystemService: any;
	private reservationSystemName: any;
	private reservationSystemKey: string;

	constructor(
		memory: Memory,
		props?: IServiceProps,
		hookCallbacks?: IHookCallbacks,
		disableAssociation?: boolean,
		reservationSystemService?: any,
		reservationSystemName?: string
	) {
		super(
			memory,
			props,
			hookCallbacks,
			disableAssociation,
			reservationSystemService,
			reservationSystemName
		);

		this.reservationSystemService = reservationSystemService;
		this.reservationSystemName = reservationSystemName;
		this.reservationSystemKey = `${this.dataConverter.convertToUpperCasedUnderbarSeparated(
			this.reservationSystemName
		)}_PRODUCT_IDENTIFICATION_CODE`;
	}

	public async findAvailableTimeByConsultingIdAndMonth(customizedOption: {
		[key: string]: any;
	}) {
		const reservationSystem =
			await this.reservationSystemService.crud?.findOne({
				where: {
					USE_YN: 'Y',
					[this.reservationSystemKey]:
						customizedOption[this.reservationSystemKey],
				},
			});

		const availableTimeList = await this.getMonthlyAvailableTimeList(
			reservationSystem,
			customizedOption.MONTH
		);

		// 이미 예약된 시간 제외 한 후 반환
		return await this.exceptReservedTime(
			customizedOption[this.reservationSystemKey],
			customizedOption.MONTH,
			availableTimeList
		);
	}

	private async getMonthlyAvailableTimeList(
		reservationSystem: any,
		requestMonth: string
	) {
		const availableTimeList = JSON.parse(
			reservationSystem.AVAILABLE_TIME_LIST
		);
		const unavailableTimeList = JSON.parse(
			reservationSystem.UNAVAILABLE_TIME_LIST
		);
		const interval = reservationSystem.DURATION_PER_RESERVE_IN_MINUTE;

		let monthlyAvailableTimeList: { [key: string]: any[] } = {};

		// 요청 월의 첫 날부터 마지막 날까지 가능한 날짜 셋팅
		let firstDate = moment(`${requestMonth}-1`).startOf('month');
		let lastDate = moment(`${requestMonth}-1`).endOf('month');

		// 예약 시스템의 시작 날짜와 끝 날짜를 벗어나는 경우 해당 날짜로 셋팅
		if (firstDate.isBefore(moment(reservationSystem.START_DATE))) {
			firstDate = moment(reservationSystem.START_DATE);
		}
		if (lastDate.isAfter(moment(reservationSystem.END_DATE))) {
			lastDate = moment(reservationSystem.END_DATE);
		}

		while (firstDate.isSameOrBefore(lastDate)) {
			const date = firstDate.clone().format('YYYY-MM-DD');
			const availableTimeByDay = availableTimeList[firstDate.get('day')];
			const unavailableTimeByDay = unavailableTimeList[date];

			// 해당 날짜가 하루 통째로 안되는 경우 빈 배열 셋팅 (ex "2023-12-01": [])
			if (
				unavailableTimeByDay !== undefined &&
				unavailableTimeByDay.length === 0
			) {
				monthlyAvailableTimeList[date] = [];
				firstDate.add(1, 'day');
				continue;
			}

			monthlyAvailableTimeList[date] = [];

			// 날짜별로 가능한 시간을 Interval로 나눠서 셋팅
			availableTimeByDay.map((availableTime: any) => {
				let startTime = moment(
					`${date} ${availableTime.START}`
				).startOf('minute');
				const endTime = moment(`${date} ${availableTime.END}`).startOf(
					'minute'
				);

				while (startTime.isBefore(endTime)) {
					monthlyAvailableTimeList[date].push({
						START: startTime.clone().format('HH:mm'),
						END: startTime.add(interval, 'minutes').format('HH:mm'),
					});
				}
			});

			// 안되는 시간이 존재하는 경우 해당 시간 제외
			if (unavailableTimeByDay !== undefined) {
				let exceptIndexList: number[] = [];

				unavailableTimeByDay.map((unavailableTime: any) => {
					const unavailableStartTime = moment(
						`${date} ${unavailableTime.START}`
					).startOf('minute');
					const unavailableEndTime = moment(
						`${date} ${unavailableTime.END}`
					).startOf('minute');

					monthlyAvailableTimeList[date].map(
						(intervalTime: any, index: number) => {
							if (
								moment(
									moment(
										`${date} ${intervalTime.START}`
									).startOf('minute')
								).isBetween(
									unavailableStartTime,
									unavailableEndTime
								) ||
								moment(
									moment(
										`${date} ${intervalTime.END}`
									).startOf('minute')
								).isBetween(
									unavailableStartTime,
									unavailableEndTime
								)
							) {
								exceptIndexList.push(index);
							}
						}
					);
				});

				exceptIndexList.map((exceptIndex: number) => {
					delete monthlyAvailableTimeList[date][exceptIndex];
				});
				monthlyAvailableTimeList[date] = monthlyAvailableTimeList[
					date
				].filter((data) => data !== undefined && data !== null);
			}

			firstDate.add(1, 'day');
		}

		return monthlyAvailableTimeList;
	}

	private async exceptReservedTime(
		reservationSystemId: number,
		requestMonth: string,
		availableTimeList: { [key: string]: any[] }
	) {
		const reservedApplicationList = await this.crud?.findAll({
			where: {
				USE_YN: 'Y',
				[this.reservationSystemKey]: reservationSystemId,
				CANCELED_YN: 'N',
				RESERVATION_DATE: {
					[Op.between]: [
						moment(requestMonth).startOf('month').format(),
						moment(requestMonth).endOf('month').format(),
					],
				},
			},
		});

		Promise.all(
			reservedApplicationList.map((reservedApplication: any) => {
				const date = moment(
					reservedApplication.RESERVATION_DATE
				).format('YYYY-MM-DD');

				const unavailableStartTime = moment(
					`${date} ${reservedApplication.RESERVATION_START_TIME}`
				).startOf('minute');
				const unavailableEndTime = moment(
					`${date} ${reservedApplication.RESERVATION_END_TIME}`
				).startOf('minute');

				let exceptIndexList: number[] = [];

				availableTimeList[date].map(
					(intervalTime: any, index: number) => {
						if (
							moment(
								moment(`${date} ${intervalTime.START}`).startOf(
									'minute'
								)
							).isBetween(
								unavailableStartTime,
								unavailableEndTime,
								'minute',
								'[)'
							) ||
							moment(
								moment(`${date} ${intervalTime.END}`).startOf(
									'minute'
								)
							).isBetween(
								unavailableStartTime,
								unavailableEndTime,
								'minute',
								'(]'
							)
						) {
							exceptIndexList.push(index);
						}
					}
				);

				exceptIndexList.map((exceptIndex: number) => {
					delete availableTimeList[date][exceptIndex];
				});
				availableTimeList[date] = availableTimeList[date].filter(
					(data) => data !== undefined && data !== null
				);
			})
		);

		return availableTimeList;
	}

	public async findApplicationAndCheckCancelCondition(customizedOption: {
		[key: string]: any;
	}) {
		const reservationApplication = await this.findOne({
			FIND_OPTION_KEY_LIST: customizedOption.FIND_OPTION_KEY_LIST,
		});

		return await this.checkCancelAvailability(reservationApplication);
	}

	public async checkCancelAvailability(reservationApplication: any) {
		let reservationDate = `${moment(
			reservationApplication.getDataValue('RESERVATION_DATE')
		)
			.startOf('day')
			.format('YYYY-MM-DD')}`;
		reservationDate += ` ${reservationApplication.getDataValue(
			'RESERVATION_START_TIME'
		)}`;

		const cancelLockDownPeriod = reservationApplication.getDataValue(
			`${this.reservationSystemName}Product`
		).CANCEL_LOCK_DOWN_PERIOD;

		if (
			moment(reservationDate)
				.subtract(cancelLockDownPeriod, 'days')
				.isBefore(moment().startOf('minute'))
		) {
			throw new Error('취소 불가 기간입니다.');
		}

		return true;
	}

	public async checkApplyAvailability(customizedOption: {
		[key: string]: any;
	}) {
		const reservationSystem =
			await this.reservationSystemService.crud?.findOne({
				where: {
					USE_YN: 'Y',
					[this.reservationSystemKey]:
						customizedOption.CREATE_OPTION_KEY_LIST[
							this.reservationSystemKey
						],
				},
			});

		// 날짜 체크
		const reservationDate = moment(
			customizedOption.CREATE_OPTION_KEY_LIST.RESERVATION_DATE
		);
		const startDate = moment(reservationSystem.START_DATE);
		const endDate = moment(reservationSystem.END_DATE);
		if (
			reservationDate.isBefore(startDate) ||
			reservationDate.isAfter(endDate)
		) {
			throw new Error('예약 가능 날짜가 아닙니다.');
		}

		// 예약 가능 시간 실시간 체크
		await this.applyTimeCheck(customizedOption);

		// 개인 제약 사항 체크
		await this.lockDownCheck(
			reservationSystem,
			customizedOption.CREATE_OPTION_KEY_LIST
				.APP_MEMBER_IDENTIFICATION_CODE,
			customizedOption.CREATE_OPTION_KEY_LIST.RESERVATION_DATE
		);
	}

	private async lockDownCheck(
		reservationSystem: any,
		appMemberId: number,
		reservationDate: Date
	) {
		const lockDownLimit = reservationSystem.getDataValue('LOCK_DOWN_LIMIT');
		let lockDownTimeUnit = reservationSystem.getDataValue(
			'LOCK_DOWN_TIME_UNIT'
		);

		switch (lockDownTimeUnit) {
			case 'DAY':
				lockDownTimeUnit = 'day';
				break;
			case 'WEEK':
				lockDownTimeUnit = 'week';
				break;
			case 'MONTH':
				lockDownTimeUnit = 'month';
				break;
			case 'YEAR':
				lockDownTimeUnit = 'year';
				break;
			default:
				throw new Error('잘못된 LOCK_DOWN_TIME_UNIT입니다.');
		}

		const lockDownStart = moment(reservationDate)
			.startOf(lockDownTimeUnit)
			.format();
		const lockDownEnd = moment(reservationDate)
			.endOf(lockDownTimeUnit)
			.format();

		const reservationApplicationList = await this.crud?.findAll({
			where: {
				USE_YN: 'Y',
				[this.reservationSystemKey]:
					reservationSystem[this.reservationSystemKey],
				APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
				CANCELED_YN: 'N',
				RESERVATION_DATE: {
					[Op.between]: [lockDownStart, lockDownEnd],
				},
			},
		});

		if (reservationApplicationList.length >= lockDownLimit) {
			throw new Error('동일 고객 예약 금지 횟수를 초과하였습니다.');
		}
	}

	private async applyTimeCheck(customizedOption: { [key: string]: any }) {
		const month = moment(
			customizedOption.CREATE_OPTION_KEY_LIST.RESERVATION_DATE
		).format('YYYY-MM');

		const availableDateAndTimeList =
			await this.findAvailableTimeByConsultingIdAndMonth({
				[this.reservationSystemKey]:
					customizedOption.CREATE_OPTION_KEY_LIST[
						this.reservationSystemKey
					],
				MONTH: month,
			});

		const availableTimeList =
			availableDateAndTimeList[
				customizedOption.CREATE_OPTION_KEY_LIST.RESERVATION_DATE
			];
		for (let i = 0; i < availableTimeList?.length; i++) {
			if (
				availableTimeList[i]?.START ===
					customizedOption.CREATE_OPTION_KEY_LIST
						.RESERVATION_START_TIME &&
				availableTimeList[i]?.END ===
					customizedOption.CREATE_OPTION_KEY_LIST.RESERVATION_END_TIME
			) {
				return;
			}
		}
		throw new Error('예약 가능 시간이 아닙니다.');
	}
}
