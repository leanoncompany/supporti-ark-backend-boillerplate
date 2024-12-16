import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

import AppMember from '../default/AppMember';

export default class PaymentHistory extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	PAYMENT_HISTORY_IDENTIFICATION_CODE!: number;

	@ForeignKey(() => AppMember)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: 'belongsTo',
	})
	APP_MEMBER_IDENTIFICATION_CODE!: number;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(100),
		comment: '주문번호',
	})
	ORDER_ID!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(100),
		comment: '결제방식',
	})
	PAY_METHOD!: string;

	@AllowNull(false)
	@Column({
		type: DataType.STRING(1000),
		comment: '결제내용',
	})
	DESCRIPTION!: string;

	@AllowNull(true)
	@Column({
		type: DataType.DATE,
		comment: '결제시각',
	})
	APPROVED_DATE!: Date;

	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: '결제금액',
	})
	AMOUNT!: number;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('COMPLETED', 'WAITING', 'CANCELED'),
		comment: '결제상태',
	})
	STATUS!: string;
}
