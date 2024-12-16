//* Import core
import { memory } from '../../index';
import { Service } from '@leanoncompany/back-end-core';
import ExamplePrimaryCategory from '../../model/mysql/.abc/ExamplePrimaryCategory';
import ExampleSubCategory from '../../model/mysql/.abc/ExampleSubCategory';

export default class ExamplePrimaryCategoryService extends Service {
	constructor() {
		super(memory, {
			crud: { model: ExamplePrimaryCategory },
		});
	}

	//* Get category tree
	public async getCategoryTree(parsedRequest: { [key: string]: any }) {
		const primaryCategories = await ExamplePrimaryCategory.findAll({
			where: {
				USE_YN: 'Y',
			},
		});

		const categoryTree: {
			category: ExamplePrimaryCategory;
			children: ExampleSubCategory[];
		}[] = [];

		for (const primaryCategory of primaryCategories) {
			const subCategories = await ExampleSubCategory.findAll({
				where: {
					PRODUCT_PRIMARY_CATEGORY_IDENTIFICATION_CODE:
						primaryCategory.getDataValue(
							'PRODUCT_PRIMARY_CATEGORY_IDENTIFICATION_CODE'
						),
					USE_YN: 'Y',
				},
			});

			categoryTree.push({
				category: primaryCategory,
				children: subCategories,
			});
		}

		return categoryTree;
	}
}
