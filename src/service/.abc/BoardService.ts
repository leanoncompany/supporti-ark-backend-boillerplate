//* Import core
import { memory } from '../../index';
import { Service } from '@leanoncompany/back-end-core';
import ExampleBoard from '../../model/mysql/.abc/ExampleBoard';

export default class ExampleBoardService extends Service {
	constructor() {
		super(memory, {
			crud: { model: ExampleBoard },
		});
	}

	//* Find all
	public async findAll(customizedOption: { [key: string]: any }) {
		if (this.crud !== null) {
			//* Execute process
			const serviceMethodKey = 'FIND_ALL';

			let findOption: any = {};

			findOption = await this.sequelizeParser.setOption(
				serviceMethodKey,
				'FIND_OPTION_KEY_LIST',
				this.crud.targetModelCrudConfig,
				findOption,
				customizedOption,
				true,
				false
			);

			findOption['where']['IS_TOP_FIXED'] = 'N';

			//* Find all
			return await this.crud.findAndCountAll(findOption);
		} else {
			throw new Error('CRUD module is not initiated');
		}
	}

	/* *************
	 *** Find all ***
	 ************* */
	public async findAllTopfixed(customizedOption: { [key: string]: any }) {
		if (this.crud !== null) {
			//* Find all
			return await this.crud.findAndCountAll({
				where: {
					IS_TOP_FIXED: 'Y',
					USE_YN: 'Y',
				},
			});
		} else {
			throw new Error('CRUD module is not initiated');
		}
	}
}
