import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

export default class QuestionABC extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: '순서',
	})
	ORDER!: number;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('FILE', 'TEXT'),
		comment: '질문타입',
	})
	QUESTION_TYPE!: string;

	@AllowNull(false)
	@Column({
		type: DataType.STRING(500),
		comment: '질문사항',
	})
	QUESTION_CONTENT!: string;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('Y', 'N'),
		comment: '필수여부',
	})
	REQUIRED_YN!: string;
}
