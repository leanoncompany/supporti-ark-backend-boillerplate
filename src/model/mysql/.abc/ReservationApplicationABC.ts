import { AllowNull, Column, DataType } from 'sequelize-typescript';
import ProductApplicationABC from '../.abc/ProductApplicationABC';

export default class ReservationApplicationABC extends ProductApplicationABC {
	@AllowNull(false)
	@Column({
		type: DataType.DATE,
		comment: '예약 날짜',
	})
	RESERVATION_DATE!: Date;

	@AllowNull(false)
	@Column({
		type: DataType.TIME,
		comment: '예약 시작 시간',
	})
	RESERVATION_START_TIME!: Date;

	@AllowNull(false)
	@Column({
		type: DataType.TIME,
		comment: '예약 종료 시간',
	})
	RESERVATION_END_TIME!: Date;
}
