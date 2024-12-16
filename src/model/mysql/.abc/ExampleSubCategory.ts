import { CategoryABC } from '@leanoncompany/back-end-core';
import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';

import ProductPrimaryCategory from './ExamplePrimaryCategory';

export default class ExampleSubCategory extends CategoryABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	PRODUCT_SUB_CATEGORY_IDENTIFICATION_CODE!: number;

	@ForeignKey(() => ProductPrimaryCategory)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: '고유 아이디',
	})
	PRODUCT_PRIMARY_CATEGORY_IDENTIFICATION_CODE!: number;
}
