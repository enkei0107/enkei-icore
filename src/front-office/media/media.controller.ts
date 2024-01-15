/** @format */

import {
	Controller,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { MediaService } from "./media.service";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import {
	MediaResponseDto,
	MediaResponseSwaggerSchema,
} from "./response/media.response";
import { MediaCreateDtoSchema } from "./dto/media-create.dto";
import { AuthGuard } from "@nestjs/passport";
import { zodToOpenAPI } from "nestjs-zod";

@Controller("media")
@ApiTags("Media")
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}
	@Post()
	@UseInterceptors(FileInterceptor("file"))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiBody({schema:zodToOpenAPI(MediaCreateDtoSchema)})
	@ApiResponse({ type: MediaResponseSwaggerSchema })
	async upload(@UploadedFile() file: Express.Multer.File) {
		// const payload = MediaCreateDtoSchema.parse(file);
		try {
			const response = await this.mediaService.uploadFile(file);
			return new MediaResponseDto(response);
		} catch (error) {
			throw new Error(`Failed to upload media: ${error}`);
		}
	}
}
