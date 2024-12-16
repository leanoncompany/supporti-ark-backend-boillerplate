//* Import library
import axios from 'axios';

//* Import core
import { memory } from '../../index';
import { Service } from '@leanoncompany/back-end-core';

export default class AlimtalkService extends Service {
	constructor() {
		super(memory);
	}

	public async sendAlimtalk(
		phoneNumber: string,
		templateCode: string,
		variable: string
	) {
		const params = new URLSearchParams();

		params.append('api_key', process.env.ALIMTALK_API_KEY || '');
		params.append('template_code', templateCode);
		params.append('variable', variable);
		params.append('callback', process.env.ALIMTALK_PHONE_NUMBER || '');
		params.append('dstaddr', phoneNumber);
		params.append('next_type', '0');

		return await axios
			.post('http://alimtalkme.com/API/alimtalk_api', params)
			.then((response: any) => {
				console.log('response', response);
				const { result } = response.data;
				if (result === '155') {
					throw new Error('알림톡 전송 실패: api_key 오류');
				} else if (result === '185') {
					throw new Error('알림톡 전송 실패: 보유 캐시 부족');
				} else if (result === '215') {
					throw new Error('알림톡 전송 실패: 알림톡 template 오류');
				} else if (result === '225') {
					throw new Error('알림톡 전송 실패: 전송 메시지 길이 오류');
				} else if (result === '315') {
					throw new Error('알림톡 전송 실패: 발신번호 오류');
				} else if (result === '325') {
					throw new Error('알림톡 전송 실패: 수신번호 오류');
				}
			})
			.catch((error) => {
				throw error;
			});
	}

	public async sendGroupAlimtalk(
		phoneNumberList: string[],
		templateCode: string,
		variableList: string[]
	) {
		phoneNumberList.map((phoneNumber: string, index: number) => {
			this.sendAlimtalk(phoneNumber, templateCode, variableList[index]);
		});
	}
}
