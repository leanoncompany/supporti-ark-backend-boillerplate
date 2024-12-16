import { ModelABC } from '@leanoncompany/back-end-core';
import { AllowNull, Column, DataType } from 'sequelize-typescript';

export default class ExampleModel extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	EXAMPLE_IDENTIFICATION_CODE!: number;
}
