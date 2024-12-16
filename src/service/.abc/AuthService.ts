//* Import core
import { memory } from '../../index';
import { Service } from '@leanoncompany/back-end-core';
import ExampleMember from '../../model/mysql/.abc/ExampleMember';

export default class ExampleMemberService extends Service {
	private idKey: string = `${this.dataConverter.convertToUpperCasedUnderbarSeparated(
		'ExampleMember'
	)}_IDENTIFICATION_CODE`;

	constructor() {
		super(memory, {
			crud: { model: ExampleMember },
		});
	}

	private setJwtTargetInformation(user: ExampleMember) {
		const jwtTargetInformation: { [key: string]: any } = {};

		jwtTargetInformation['USER_NAME'] = user.USER_NAME;
		jwtTargetInformation[this.idKey] = user.getDataValue(this.idKey);

		//* Set access token
		const accessToken = this.jwt.generateJwt(
			jwtTargetInformation,
			'access'
		);

		//* Set refresh token
		const refreshToken = this.jwt.generateJwt({}, 'refresh');

		return { accessToken: accessToken, refreshToken: refreshToken };
	}

	/* *************
	 *** Find one ***
	 ************* */
	public async findOne(customizedOption: { [key: string]: any }) {
		if (this.crud !== null) {
			//* Execute process
			const serviceMethodKey = 'FIND_ONE';

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

			//* Find one
			let data = await this.crud.findOne(findOption);

			if (data !== null) {
				let convertedData = data.toJSON();
				delete convertedData['PASSWORD'];

				data = convertedData;
			}

			return await data;
		} else {
			throw new Error('CRUD module is not initiated');
		}
	}

	/* ***********
	 *** Update ***
	 *********** */
	public async update(customizedOption: { [key: string]: any }) {
		if (this.crud !== null) {
			// Set find option
			const serviceMethodKey = 'UPDATE';

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

			// Set update option
			let updateOption: any = {};

			updateOption = await this.sequelizeParser.setOption(
				serviceMethodKey,
				'UPDATE_OPTION_KEY_LIST',
				this.crud.targetModelCrudConfig,
				updateOption,
				customizedOption,
				false,
				false
			);

			if (updateOption['PASSWORD'] !== undefined) {
				updateOption['PASSWORD'] =
					this.security.bidirectionalEncryption(
						updateOption.PASSWORD
					);
			}

			Object.keys(updateOption).map((key) => {
				if (
					this.dataConverter.isStringOrNumberOrNullOrUndefined(
						updateOption[key]
					) == false
				) {
					updateOption[key] = JSON.stringify(updateOption[key]);
				}
			});

			//* Update
			return await this.crud.update(updateOption, findOption);
		} else {
			throw new Error('CRUD module is not initiated');
		}
	}

	/* ************
	 *** Create ***
	 ************* */
	public async create(customizedOption: { [key: string]: any }) {
		if (this.crud !== null) {
			//* Execute process
			const serviceMethodKey = 'CREATE';

			let createOption: any = {};

			createOption = await this.sequelizeParser.setOption(
				serviceMethodKey,
				'CREATE_OPTION_KEY_LIST',
				this.crud.targetModelCrudConfig,
				createOption,
				customizedOption,
				false,
				false
			);

			if (createOption['PASSWORD'] !== undefined) {
				createOption['PASSWORD'] =
					this.security.bidirectionalEncryption(
						createOption.PASSWORD
					);
			}

			Object.keys(createOption).map((key) => {
				if (
					this.dataConverter.isStringOrNumberOrNullOrUndefined(
						createOption[key]
					) == false
				) {
					createOption[key] = JSON.stringify(createOption[key]);
				}
			});

			//* Create
			return await this.crud.create(createOption);
		} else {
			throw new Error('CRUD module is not initiated');
		}
	}

	public async signIn(customizedOption: { [key: string]: any }) {
		//* Create user
		const user = await ExampleMember.findOne({
			where: {
				USER_NAME: customizedOption.USER_NAME,
			},
		});

		if (user !== null) {
			//* Set JSON token
			if (
				this.security.bidirectionalEncryption(
					customizedOption.PASSWORD
				) == user.getDataValue('PASSWORD')
			) {
				//* Set sign in result
				return this.setJwtTargetInformation(user);
			}
		}

		return null;
	}

	public async signUp(customizedOption: { [key: string]: any }) {
		//* Create user
		const createOption: { [key: string]: any } = Object.assign(
			customizedOption,
			{
				PASSWORD: this.security.bidirectionalEncryption(
					customizedOption.PASSWORD
				),
			}
		);

		const user = await ExampleMember.create(createOption);

		//* Set sign in result
		const signUpResult: { accessToken: string; refreshToken: string } =
			this.setJwtTargetInformation(user);

		return { user: user, signUpResult };
	}

	public async findUserNameSuccessAction(customizedOption: {
		[key: string]: any;
	}) {
		//* Find user
		const user = await ExampleMember.findOne({
			where: {
				PHONE_NUMBER: customizedOption.PHONE_NUMBER,
			},
		});

		return {
			USER_NAME: user?.getDataValue('USER_NAME'),
			CREATED_AT: user?.getDataValue('CREATED_AT'),
		};
	}

	public async validateFindPasswordAction(customizedOption: {
		[key: string]: any;
	}) {
		//* Find user
		const user = await ExampleMember.findOne({
			where: {
				USER_NAME: customizedOption.USER_NAME,
				PHONE_NUMBER: customizedOption.PHONE_NUMBER,
			},
		});

		return user !== null;
	}

	public async findPasswordSuccessAction(customizedOption: {
		[key: string]: any;
	}) {
		//* Find user
		const user = await ExampleMember.findOne({
			where: {
				USER_NAME: customizedOption.USER_NAME,
				PHONE_NUMBER: customizedOption.PHONE_NUMBER,
			},
		});

		//* Update user
		await ExampleMember.update(
			{
				PASSWORD: this.security.bidirectionalEncryption(
					customizedOption.PASSWORD
				),
			},
			{
				where: {
					USER_NAME: customizedOption.USER_NAME,
					PHONE_NUMBER: customizedOption.PHONE_NUMBER,
				},
			}
		);

		return {
			USER_NAME: user?.getDataValue('USER_NAME'),
			CREATED_AT: user?.getDataValue('CREATED_AT'),
		};
	}

	public async getUserNameByPhoneNumber(customizedOption: {
		[key: string]: any;
	}) {
		//* Create user
		const user = await ExampleMember.findOne({
			where: {
				PHONE_NUMBER: customizedOption.PHONE_NUMBER,
				USE_YN: 'Y',
			},
		});

		return user;
	}

	public async doubleCheckUserName(customizedOption: { [key: string]: any }) {
		//* Encrypt auth code
		const user = await ExampleMember.findOne({
			where: {
				USER_NAME: customizedOption.USER_NAME,
			},
		});

		return user === null;
	}

	public async isPhoneNumberUsed(customizedOption: { [key: string]: any }) {
		//* Encrypt auth code
		const user = await ExampleMember.findOne({
			where: {
				PHONE_NUMBER: customizedOption.PHONE_NUMBER,
			},
		});

		return user === null;
	}

	public async sendPhoneAuth(customizedOption: { [key: string]: any }) {
		const rawGeneratedAuthCode = String(
			this.security.generateRandomNumber(4)
		);

		//* Encrypt auth code
		const encryptedAuthCode =
			this.security.unidirectionalEncryption(rawGeneratedAuthCode);

		//* Send auth code via sms
		this.sms.sendSms(
			customizedOption.TARGET_PHONE_NUMBER,
			`인증번호는 ${rawGeneratedAuthCode}`
		);

		console.log(rawGeneratedAuthCode);

		return encryptedAuthCode;
	}

	public async validatePhoneAuth(customizedOption: { [key: string]: any }) {
		//* Encrypt auth code
		const encryptedUserInputAuthCode =
			this.security.unidirectionalEncryption(
				String(customizedOption.AUTH_CODE)
			);

		//* Validate user input auth code
		return (
			encryptedUserInputAuthCode == customizedOption.ENCRYPTED_AUTH_CODE
		);
	}

	public async getProfile(customizedOption: { [key: string]: any }) {
		const userId = customizedOption.JWT_PARSED_DATA?.[this.idKey];

		if (userId !== undefined) {
			const user = await ExampleMember.findOne({
				where: {
					[this.idKey]: userId,
				},
			});

			if (user !== null) {
				const userInfo = user.toJSON();
				delete userInfo.PASSWORD;

				return userInfo;
			} else {
				throw new Error('Invalid USER');
			}
		} else {
			throw new Error('Invalid JWT');
		}
	}
}
