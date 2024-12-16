//* Import core
import {
	IHookCallbacks,
	IServiceProps,
} from '@leanoncompany/back-end-core/src/@types/service/service';
import { Memory, Service } from '@leanoncompany/back-end-core';

//* Import service
import PointHistoryService from '../../user/PointHistoryService';
import UserTicketService from '../../user/UserTicketService';
export default class ProductApplicationService extends Service {
	private pointHistoryService = new PointHistoryService();
	private userTicketService = new UserTicketService();

	protected productService: any;
	private productName: any;
	private productKey: string;

	constructor(
		memory: Memory,
		props?: IServiceProps,
		hookCallbacks?: IHookCallbacks,
		disableAssociation?: boolean,
		productService?: any,
		productName?: String
	) {
		super(memory, props, hookCallbacks, disableAssociation);

		this.productService = productService;
		this.productName = productName;
		this.productKey = `${this.dataConverter.convertToUpperCasedUnderbarSeparated(
			this.productName
		)}_PRODUCT_IDENTIFICATION_CODE`;
	}

	public async checkAndPay(customizedOption: { [key: string]: any }) {
		const product = await this.checkPointAndReturnProduct(
			customizedOption.CREATE_OPTION_KEY_LIST[this.productKey],
			customizedOption.CREATE_OPTION_KEY_LIST
				.APP_MEMBER_IDENTIFICATION_CODE
		);

		if (product.PRICE > 0) {
			await this.pointHistoryService.create({
				CREATE_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE:
						customizedOption.CREATE_OPTION_KEY_LIST
							.APP_MEMBER_IDENTIFICATION_CODE,
					TYPE: 'USED',
					DESCRIPTION: product.PRODUCT_NAME,
					AMOUNT: -product.PRICE,
				},
			});
		}
	}

	public async checkPointAndReturnProduct(
		productId: number,
		appMemberId: number
	) {
		const product = await this.productService.crud?.findOne({
			where: {
				USE_YN: 'Y',
				PURCHASE_AVAILABLE_YN: 'Y',
				[this.productKey]: productId,
			},
		});

		if (!product) {
			throw new Error('존재하지 않는 상품입니다.');
		}

		const myPoint = await this.pointHistoryService.getTotalPointByUserId({
			APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
		});

		if (myPoint < product.PRICE) {
			throw new Error('포인트가 부족합니다.');
		}

		return product;
	}

	public async refundTicket(ticketId: number, appMemberId: number) {
		// user ticket 모델에서 appmemberid와 ticketId로 조회해서 used_yn을 N으로 처리
		const userTicket = await this.userTicketService.crud?.findOne({
			where: {
				USE_YN: 'Y',
				APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
				USER_TICKET_IDENTIFICATION_CODE: ticketId,
			},
		});

		if (userTicket) {
			await this.userTicketService.update({
				UPDATE_OPTION_KEY_LIST: {
					USED_YN: 'N',
				},
				FIND_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
					USER_TICKET_IDENTIFICATION_CODE: ticketId,
				},
			});
		}
	}

	public async useTicket(ticketId: number, appMemberId: number) {
		const userTicket = await this.userTicketService.crud?.findOne({
			where: {
				USE_YN: 'Y',
				APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
				USER_TICKET_IDENTIFICATION_CODE: ticketId,
			},
		});

		if (userTicket) {
			await this.userTicketService.update({
				UPDATE_OPTION_KEY_LIST: {
					USED_YN: 'Y',
				},
				FIND_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
					USER_TICKET_IDENTIFICATION_CODE: ticketId,
				},
			});
		}
	}

	public async refundPoint(productId: number, appMemberId: number) {
		const product = await this.productService.crud?.findOne({
			where: {
				USE_YN: 'Y',
				PURCHASE_AVAILABLE_YN: 'Y',
				[this.productKey]: productId,
			},
		});

		if (product.PRICE > 0) {
			await this.pointHistoryService.create({
				CREATE_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
					TYPE: 'REFUNDED',
					DESCRIPTION: product.PRODUCT_NAME,
					AMOUNT: product.PRICE,
				},
			});
		}
	}

	public async checkSubscription(appMemberId: number) {
		// const userSubscription =
		// 	await this.userSubscriptionService.crud?.findOne({
		// 		where: {
		// 			USE_YN: 'Y',
		// 			APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
		// 			EXPIRED_YN: 'N',
		// 		},
		// 	});
		// if (!userSubscription) {
		// 	throw new Error('구독자만 신청이 가능합니다.');
		// }
	}
}
