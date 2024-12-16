import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

import AppMember from '../default/AppMember';

export default class PointHistory extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	POINT_HISTORY_IDENTIFICATION_CODE!: number;

	@ForeignKey(() => AppMember)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: 'belongsTo',
	})
	APP_MEMBER_IDENTIFICATION_CODE!: number;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('CHARGED', 'USED', 'REFUNDED'),
		comment: '포인트 타입',
	})
	TYPE!: string;

	@AllowNull(false)
	@Column({
		type: DataType.STRING(1000),
		comment: '포인트 내용',
	})
	DESCRIPTION!: string;

	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: false }),	
		comment: '포인트 금액',
	})
	AMOUNT!: number;
}
