import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { ModelABC } from '@leanoncompany/back-end-core';

export default class CrontabLog extends ModelABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	CRONTAB_LOG_IDENTIFICATION_CODE!: number;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('SUCCEED', 'ERROR'),
		comment: '상태',
	})
	STATUS!: string;

	@AllowNull(false)
	@Column({
		type: DataType.STRING(1000),
		comment: '메세지',
	})
	MESSAGE!: string;

	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		comment: 'belongsTo',
	})
	CRONTAB_IDENTIFICATION_CODE!: number;
}
