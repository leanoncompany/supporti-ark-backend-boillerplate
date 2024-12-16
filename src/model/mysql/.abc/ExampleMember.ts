import { ModelABC } from '@leanoncompany/back-end-core';

import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { AppMemberABC } from '@leanoncompany/back-end-core';

export default class ExampleMember extends AppMemberABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	EXAMPLE_MEMBER_IDENTIFICATION_CODE!: number;
}
