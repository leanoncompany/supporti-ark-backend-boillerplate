import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { AppMemberABC } from '@leanoncompany/back-end-core';

export default class AppMember extends AppMemberABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	APP_MEMBER_IDENTIFICATION_CODE!: number;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('GENERAL', 'BUSINESS', 'NOT_GENERATED', 'INVESTOR'),
		comment: '유저 등급',
	})
	USER_GRADE!: string;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('Y', 'N'),
		comment: '알림톡 수신 여부',
	})
	ALIMTALK_YN!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(1000),
		comment: '구글 유저 아이디',
	})
	GOOGLE_USER_ID!: string;

	@AllowNull(true)
	@Column({
		type: DataType.ENUM('KAKAO', 'NAVER', 'GOOGLE'),
		comment: 'SNS 타입',
	})
	SNS_TYPE!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(30),
		comment: '직책',
	})
	ROLE!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(50),
		comment: '사업자번호',
	})
	BUSINESS_NUMBER!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(50),
		comment: '기업명',
	})
	COMPANY_NAME!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(50),
		comment: '대표자명',
	})
	OWNER_NAME!: string;

	@AllowNull(true)
	@Column({
		type: DataType.DATE,
		comment: '설립일자',
	})
	ESTABLISHMENT_DATE!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(50),
		comment: '업종/업태',
	})
	BUSINESS_SECTOR!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(50),
		comment: '매출',
	})
	REVENUE!: string;

	@AllowNull(true)
	@Column({
		type: DataType.TEXT(),
		comment: '필요 서비스',
	})
	NEEDED_SERVICE!: string;

	@AllowNull(true)
	@Column({
		type: DataType.TEXT(),
		comment: '파일',
	})
	IR_FILE!: string;

	@AllowNull(true)
	@Column({
		type: DataType.TEXT(),
		comment: '주요상품',
	})
	MAIN_PRODUCT!: string;

	@AllowNull(true)
	@Column({
		type: DataType.TEXT(),
		comment: '사업자 유형',
	})
	CORPORATE_TYPE!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(100),
		comment: '투자사',
	})
	INVESTMENT_COMPANY!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(50),
		comment: '투자Round',
	})
	INVESTMENT_ROUND!: string;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('Y', 'N'),
		comment: '첫 로그인 여부',
	})
	IS_FIRST_LOGIN!: string;
}
