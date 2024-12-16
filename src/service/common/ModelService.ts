//* Import libraries
import { Request } from 'express';
import { memory } from '../../index';

//* Import core
import { ModelServiceABC } from '@leanoncompany/back-end-core';

export default class ModelService extends ModelServiceABC {
	constructor() {
		super(memory);
	}
}
