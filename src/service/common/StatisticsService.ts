//* Import libraries
import { Request } from 'express';
import { memory } from '../../index';
import moment from 'moment';

//* Import core
import { StatisticsServiceABC } from '@leanoncompany/back-end-core';
import sequelize from 'sequelize';
const Op = sequelize.Op;

export default class StatisticsService extends StatisticsServiceABC {
	constructor() {
		super(memory);
	}
}
