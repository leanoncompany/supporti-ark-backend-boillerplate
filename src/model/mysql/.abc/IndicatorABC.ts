import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

export default class IndicatorABC extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.STRING(100),
		comment: '타이틀',
	})
	TITLE!: string;

	@AllowNull(false)
	@Column({
		type: DataType.DATE(),
		comment: '시작일',
	})
	START_DATE!: Date;

	@AllowNull(false)
	@Column({
		type: DataType.DATE(),
		comment: '마감일',
	})
	END_DATE!: Date;

	@AllowNull(true)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: false }),
		comment: '목표양',
	})
	TARGET_AMOUNT!: number;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(30),
		comment: '목표 타입',
	})
	TARGET_UNIT!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(1000),
		comment: '노트',
	})
	NOTE!: string;
}
