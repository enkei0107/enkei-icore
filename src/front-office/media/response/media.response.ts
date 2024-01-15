import { ApiProperty } from '@nestjs/swagger';
import { ResponseMetaSwagger } from '../../../config/swagger/response-meta.swagger';

export class MediaResponseDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  path: string;
  constructor(data: any) {
    this.url = data?.url || '';
    this.mimetype = data?.mimeType || '';
    this.size = data?.size || 0;
    this.path = data?.path || '';
  }
}
export class MediaResponseSwaggerSchema {
  @ApiProperty({ type: ResponseMetaSwagger })
  meta: ResponseMetaSwagger;

  @ApiProperty({ type: MediaResponseDto })
  data: MediaResponseDto;
}
