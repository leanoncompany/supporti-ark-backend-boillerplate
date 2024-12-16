import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { BoardABC } from '@leanoncompany/back-end-core';

import AdminMember from './AdminMember';

export default class NoticeBoardContent extends BoardABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	NOTICE_BOARD_CONTENT_IDENTIFICATION_CODE!: number;
	
	@ForeignKey(() => AdminMember)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: 'belongsTo',
		defaultValue: 1,
	})
	ADMIN_MEMBER_IDENTIFICATION_CODE!: number;
}
