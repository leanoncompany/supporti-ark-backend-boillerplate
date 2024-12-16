//* Import libraries
import { Request } from 'express';
import { memory } from '../../index';

//* Import core
import { Web3ServiceABC } from '@leanoncompany/back-end-core';

export default class Web3Service extends Web3ServiceABC {
	constructor() {
		super(memory);
	}
}
