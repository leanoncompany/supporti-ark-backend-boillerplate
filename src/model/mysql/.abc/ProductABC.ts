import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

export default class ProductABC extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.STRING(100),
		comment: '상품명',
	})
	PRODUCT_NAME!: string;

	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: '사용 포인트',
	})
	PRICE!: number;

	@AllowNull(false)
	@Column({
		type: DataType.TEXT(),
		comment: '이미지',
		defaultValue: '[]',
	})
	PRODUCT_DETAIL_IMAGE_LIST!: string;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('Y', 'N'),
		comment: '판매 가능 여부',
		defaultValue: 'Y',
	})
	PURCHASE_AVAILABLE_YN!: string;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('Y', 'N'),
		comment: '티켓 사용 가능 여부',
		defaultValue: 'N',
	})
	ALLOW_TICKET!: string;
}
