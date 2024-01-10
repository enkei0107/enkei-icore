import { ApiProperty } from "@nestjs/swagger";

export class ResponseMetaSwagger{
    @ApiProperty({ type: 'number', example: 200 })
  code: number;

  @ApiProperty({ type: 'string', example: 'success' })
  status: string;

  @ApiProperty({ type: 'string', example: 'Operation successfully' })
  message: string;
}
export class ResponseDataSwagger<T> {
    @ApiProperty({ type: 'object', example: {} })
    data: T;
  }