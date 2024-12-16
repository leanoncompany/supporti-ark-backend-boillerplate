import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { BoardABC } from '@leanoncompany/back-end-core';

import QnaBoardQuestion from './QnaBoardQuestion';
import AdminMember from './AdminMember';

export default class QnaBoardAnswer extends BoardABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	QNA_BOARD_ANSWER_IDENTIFICATION_CODE!: number;

	@ForeignKey(() => QnaBoardQuestion)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: 'belongsTo',
	})
	QNA_BOARD_QUESTION_IDENTIFICATION_CODE!: number;

	@ForeignKey(() => AdminMember)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: 'belongsTo',
		defaultValue: 1,
	})
	ADMIN_MEMBER_IDENTIFICATION_CODE!: number;
}
