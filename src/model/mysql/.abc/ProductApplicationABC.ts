import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

export default class ProductApplicationABC extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.ENUM('Y', 'N'),
		comment: '취소 여부',
		defaultValue: 'N',
	})
	CANCELED_YN!: string;

	@AllowNull(true)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: '티켓 아이디',
	})
	TICKET_ID!: number;
}
