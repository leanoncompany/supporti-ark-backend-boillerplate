import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

export default class ReservationSystem2ABC extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.TEXT(),
		comment:
			'요일별 가능한 시간대 {"MONDAY": ["09:00-18:00"], "TUESDAY": [], "WEDNESDAY": ["9:00-18:00"]}',
	})
	AVAILABLE_TIME_LIST!: string;

	@AllowNull(false)
	@Column({
		type: DataType.TEXT(),
		comment: '일자별 불가능한 시간대 {"2023-11-28": ["12:00-13:00"]}',
	})
	UNAVAILABLE_TIME_LIST!: string;

	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: '예약 당 시간 길이',
	})
	DURATION_PER_RESERVE_IN_MINUTE!: number;

	@AllowNull(false)
	@Column({
		type: DataType.DATE,
		comment: '시작일',
	})
	START_DATE!: Date;

	@AllowNull(false)
	@Column({
		type: DataType.DATE,
		comment: '종료일',
	})
	END_DATE!: Date;

	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: '동일 고객 예약 금지 횟수',
	})
	LOCK_DOWN_LIMIT!: number;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('DAY', 'WEEK', 'MONTH', 'YEAR'),
		comment: '동일 고객 예약 금지 일 단위',
	})
	LOCK_DOWN_TIME_UNIT!: string;

	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: '취소 불가능 기간',
	})
	CANCEL_LOCK_DOWN_PERIOD!: number;
}
