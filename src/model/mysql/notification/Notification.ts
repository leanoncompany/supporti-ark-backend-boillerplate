import { AllowNull, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';
import AppMember from '../default/AppMember';

export default class Notification extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	NOTIFICATION_IDENTIFICATION_CODE!: number;

	@ForeignKey(() => AppMember)
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: 'belongsTo',
	})
	APP_MEMBER_IDENTIFICATION_CODE!: number;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(1000),
		comment: '알림 제목',
	})
	TITLE!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(1000),
		comment: '알림 내용',
	})
	CONTENT!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(1000),
		comment: '알림 카테고리',
	})
	CATEGORY!: string;

	@AllowNull(true)
	@Column({
		type: DataType.STRING(1000),
		comment: '연결 모델',
	})
	CONNECTED_MODEL!: string;

	@AllowNull(true)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: '연결 모델 아이디',
	})
	CONNECTED_MODEL_ID!: number;

	@AllowNull(true)
	@Column({
		type: DataType.ENUM('Y', 'N'),
		comment: '읽음 여부',
		defaultValue: 'N',
	})
	READ_YN!: string;
}
