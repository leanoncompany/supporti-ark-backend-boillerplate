import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

import AppMember from '../default/AppMember';

export default class SubscriptionPaymentInfo extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	SUBSCRIPTION_PAYMENT_INFO_IDENTIFICATION_CODE!: number;

	@ForeignKey(() => AppMember)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: 'belongsTo',
	})
	APP_MEMBER_IDENTIFICATION_CODE!: number;

	@AllowNull(false)
	@Column({
		type: DataType.STRING(100),
		comment: 'customer key',
	})
	CUSTOMER_KEY!: string;

	@AllowNull(false)
	@Column({
		type: DataType.STRING(100),
		comment: 'billing key',
	})
	BILLING_KEY!: string;
}
