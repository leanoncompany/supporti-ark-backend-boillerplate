import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { MemberABC } from '@leanoncompany/back-end-core';

export default class PartnerMember extends MemberABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	PARTNER_MEMBER_IDENTIFICATION_CODE!: number;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('CONSULTANT', 'EXPERT', 'INVESTOR'),
		comment: '파트너 타입',
	})
	PARTNER_TYPE!: string;
}
