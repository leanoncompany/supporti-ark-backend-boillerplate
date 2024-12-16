import { ModelABC } from '@leanoncompany/back-end-core';

import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { BoardABC } from '@leanoncompany/back-end-core';

export default class ExampleBoard extends BoardABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	EXAMPLE_BOARD_IDENTIFICATION_CODE!: number;
}
