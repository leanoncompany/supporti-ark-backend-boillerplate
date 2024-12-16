//* Import libraries
import { Request } from 'express';
import { memory } from '../../index';

//* Import core
import { KlaytenServiceABC } from '@leanoncompany/back-end-core';

export default class KlaytenService extends KlaytenServiceABC {
	constructor() {
		super(memory);
	}
}
