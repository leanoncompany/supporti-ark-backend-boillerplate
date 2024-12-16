import { AllowNull, Column, DataType } from 'sequelize-typescript';
import { CrontabABC } from '@leanoncompany/back-end-core';

export default class Crontab extends CrontabABC {
	@AllowNull(false)
	@Column({
		type: DataType.INTEGER({ length: 10, unsigned: true }),
		autoIncrement: true,
		primaryKey: true,
		comment: '고유 아이디',
	})
	CRONTAB_IDENTIFICATION_CODE!: number;
}
