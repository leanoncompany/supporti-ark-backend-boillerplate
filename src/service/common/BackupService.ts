//* Import libraries
import { Request } from 'express';
import { memory } from '../../index';

//* Import core
import { BackupServiceABC } from '@leanoncompany/back-end-core';

export default class BackupService extends BackupServiceABC {
	constructor() {
		super(memory);
	}
}
