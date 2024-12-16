import { CategoryABC } from '@leanoncompany/back-end-core';
import { AllowNull, Column, DataType } from 'sequelize-typescript';

export default class ExamplePrimaryCategory extends CategoryABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	PRODUCT_PRIMARY_CATEGORY_IDENTIFICATION_CODE!: number;
}
