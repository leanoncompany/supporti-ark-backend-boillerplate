//* Import libraries
import { Request } from 'express';
import { memory } from '../../index';

//* Import core
import AppMember from '../../model/mysql/default/AppMember';
import Notification from '../../model/mysql/notification/Notification';
import { NotificationServiceABC } from '@leanoncompany/back-end-core';

export default class NotificationService extends NotificationServiceABC {
	constructor() {
		super(memory, Notification);
	}

	public async sendNotification(
		title: string,
		message: string,
		category: string,
		modelName: string,
		modelId: number,
		appMemberId: number
	) {
		const appMember = await AppMember.findOne({
			where: {
				APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
			}
		})
	}

	public async getNotificationList(parsedRequest: { [key: string]: any }) {
		const limit = parsedRequest.LIMIT;
		const page = parsedRequest.PAGE;
		const sortKey = parsedRequest.SORT_KEY;
		const sortDirection = parsedRequest.SORT_DIRECTION;
		const connectedUserModelName = parsedRequest.CONNECTED_USER_MODEL_NAME;
		const connectedUserModelIdentificationCode =
			parsedRequest.JWT_PARSED_DATA?.[
				`${this.dataConverter.convertToUpperCasedUnderbarSeparated(
					connectedUserModelName
				)}_IDENTIFICATION_CODE`
			];

		//* Get notification list
		const notificationList = await Notification.findAll({
			where: {
				CONNECTED_USER_MODEL_NAME:
					this.dataConverter.convertToUpperCasedUnderbarSeparated(
						connectedUserModelName
					),
				CONNECTED_USER_MODEL_IDENTIFICATION_CODE:
					connectedUserModelIdentificationCode,
				USE_YN: 'Y',
				IS_READ: 'N',
			},
			order: [[sortKey, sortDirection]],
			limit: limit,
			offset: (page - 1) * limit,
		});

		return notificationList;
	}
}
