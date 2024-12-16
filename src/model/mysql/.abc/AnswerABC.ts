import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

export default class AnswerABC extends ModelABC {
	@AllowNull(true)
	@Column({
		type: DataType.STRING(1000),
		comment: '답변사항',
	})
	ANSWER_CONTENT!: string;

	@AllowNull(true)
	@Column({
		type: DataType.TEXT(),
		comment: '파일 리스트',
		defaultValue: '[]',
	})
	FILE_LIST!: string;
}
