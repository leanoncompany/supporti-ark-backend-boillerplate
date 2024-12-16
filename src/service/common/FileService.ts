//* Import libraries
import { Request } from 'express';
import { memory } from '../../index';

//* Import core
import { FileServiceABC } from '@leanoncompany/back-end-core';

export default class FileService extends FileServiceABC {
	constructor() {
		super(memory);
	}
}
