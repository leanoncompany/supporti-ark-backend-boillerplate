import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { AdminMemberABC } from '@leanoncompany/back-end-core/';

export default class AdminMember extends AdminMemberABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	ADMIN_MEMBER_IDENTIFICATION_CODE!: number;
}
