//* Import index
import { Entry, Memory } from '@leanoncompany/back-end-core';
import path from 'path';
import dotenv from 'dotenv';

//* .env 지정
dotenv.config({ path: '.env' });

if (process.env.NODE_ENV === 'development') {
	dotenv.config({ path: '.env.dev' });
} else if (process.env.NODE_ENV === 'production') {
	dotenv.config({ path: '.env.prod' });
}

if (process.env.NODE_ENV === undefined) {
	throw new Error(
		'NODE_ENV is not defined (May be .env file does not exist)'
	);
}

//* Set data
const memory = new Memory();
const rootDirectory =
	process.env.NODE_ENV === 'production'
		? __dirname
		: path.resolve(__dirname, '../src');

//* Set entry
const entry = new Entry(
	process.env.API_ROOT_DOMAIN || 'api2',
	{
		service: path.resolve(rootDirectory, './service'),
		route: path.resolve(rootDirectory, './route'),
	},
	{
		admin: {
			path: './admin',
			plugin: {
				auth: ['AdminMember', 'AppMember'],
				board: ['NoticeBoardContent'],
				category: ['ProductPrimaryCategory'],
				ai: [
					'GptTextBot',
					'GptTextBotUseHistory',
					'GptTextTrainDataElement',
					'GptTextTrainDataHeader',
				],
				scraper: ['ScraperBot', 'ScrapedData'],
			},
		},
		user: {
			path: './user',
			plugin: {
				auth: ['AdminMember', 'AppMember'],
				board: ['NoticeBoardContent'],
				category: ['ProductPrimaryCategory'],
				ai: [
					'GptTextBot',
					'GptTextBotUseHistory',
					'GptTextTrainDataElement',
					'GptTextTrainDataHeader',
				],
				scraper: ['ScraperBot', 'ScrapedData'],
			},
		},
	},
	memory,
	{
		mysql: {
			rootDir: path.resolve(rootDirectory, './model/mysql'),
			port: Number(process.env.DB_PORT) || 3306,
			database: process.env.DB_NAME || 'db_name',
			password: process.env.DB_PASS || '1111',
			username: process.env.DB_USER || 'root',
			host: process.env.DB_HOST || 'localhost',
			plugins: ['ecommerce', 'notification', 'ai', 'scraper'],
			showLog: process.env.DB_SHOW_LOG === 'Y',
		},
	},
	{
		multer: [{ path: '/common/file/upload_image', method: 'post' }],
		parser: ['body', 'cookie', 'json', 'urlEncode'],
	},
	process.env.NODE_ENV === 'development'
);

entry.start();
export { memory };
export default entry.getApp();
