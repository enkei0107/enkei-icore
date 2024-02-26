import { ApiProperty } from "@nestjs/swagger";

export class ResponseQuerySwagger{
    @ApiProperty({ required: false })
    limit: number;

    @ApiProperty({ required: false })
    page: number;
}