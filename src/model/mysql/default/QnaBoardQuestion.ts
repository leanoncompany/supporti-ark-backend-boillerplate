import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { BoardABC } from '@leanoncompany/back-end-core';

import AppMember from './AppMember';
import QnaBoardCategory from './QnaBoardCategory';

export default class QnaBoardQuestion extends BoardABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	QNA_BOARD_QUESTION_IDENTIFICATION_CODE!: number;

	@ForeignKey(() => AppMember)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: 'belongsTo',
	})
	APP_MEMBER_IDENTIFICATION_CODE!: number;

	@ForeignKey(() => QnaBoardCategory)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		defaultValue: 0,
	})
	QNA_BOARD_CATEGORY_IDENTIFICATION_CODE!: number;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('Y', 'N'),
		comment: '비공개 여부',
		defaultValue: 'N',
	})
	PRIVATE_YN!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(50),
		comment: '비밀번호',
	})
	PASSWORD!: string;
}
