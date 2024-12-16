//* Import core
import { memory } from '../../index';
import { Service } from '@leanoncompany/back-end-core';
import Example from '../../model/mysql/.abc/Example';

export default class ExampleService extends Service {
	constructor() {
		super(memory, {
			crud: { model: Example },
		});
	}
}
