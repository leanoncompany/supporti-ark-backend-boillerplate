import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

import AdminMember from './AdminMember';

export default class FaqBoardCategory extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE!: number;

	@ForeignKey(() => AdminMember)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: 'belongsTo',
		defaultValue: 1,
	})
	ADMIN_MEMBER_IDENTIFICATION_CODE!: number;

	@AllowNull(false)
	@Column({
		type: DataType.STRING(100),
		comment: '카테고리명',
	})
	CATEGORY!: string;
}
