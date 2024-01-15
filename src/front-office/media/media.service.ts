/** @format */

import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
require("dotenv").config();
@Injectable()
export class MediaService {
	private s3: AWS.S3;

	constructor() {
		this.s3 = new AWS.S3({
			endpoint: process.env.S3_END_POINT,
			accessKeyId: process.env.S3_KEY_ID,
			secretAccessKey: process.env.S3_SECRET_KEY,
		});
	}

	async uploadFile(file: Express.Multer.File) {
		try {
			const mimeType = file.mimetype;

			const params: AWS.S3.Types.PutObjectRequest = {
				Bucket: process.env.S3_BUCKET_NAME,
				Key: file.originalname,
				Body: file.buffer,
				ContentType: mimeType,
			};

			const response = await this.s3.upload(params).promise();
			return {
				size: file.size,
				mimeType: mimeType,
				url: response.Location,
				path: response.Key,
			};
		} catch (error) {
			throw new Error(`Failed to upload file: ${error}`);
		}
	}
}
