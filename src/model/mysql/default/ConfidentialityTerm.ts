import { TermABC } from '@leanoncompany/back-end-core';
import { AllowNull, Column, DataType } from 'sequelize-typescript';

export default class ConfidentialityTerm extends TermABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	CONFIDENTIALITY_TERM_IDENTIFICATION_CODE!: number;
}
