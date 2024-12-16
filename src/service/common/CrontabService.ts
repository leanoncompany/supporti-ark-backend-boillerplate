//* Import libraries
import { Request } from 'express';
import { memory } from '../../index';
import Crontab from '../../model/mysql/common/Crontab';

//* Import core
import { CrontabServiceABC } from '@leanoncompany/back-end-core';

export default class CrontabService extends CrontabServiceABC {
	constructor() {
		super(memory, Crontab);
	}
}
