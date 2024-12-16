//* Import libraries
import { memory } from '../../index';

//* Import core
import { Service } from '@leanoncompany/back-end-core';

export default class ActionService extends Service {
	constructor() {
		super(memory);
	}

	public async getActionList() {
		const modelList = [
			{
				modelName: 'ir_application',
				description: 'IR 신청',
				endPointList: [{ endPoint: 'create', description: '생성' }],
			},
			{
				modelName: 'user_ir_information',
				description: '유저 IR 정보',
				endPointList: [{ endPoint: 'create', description: '생성' }],
			},
			{
				modelName: 'payment_history',
				description: '유저 티켓 구매',
				endPointList: [{ endPoint: 'update', description: '생성' }],
			},
		];

		return { modelList };
	}
}
