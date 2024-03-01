import { ApiProperty } from "@nestjs/swagger";
import { UserBanks } from "../../../database/entities/user-bank.entity";
import { Banks } from "../../../database/entities/bank.entity";
import { ResponsePaginate } from "../../../config/response/response.paginate";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";

export class UserBankBankResponseSchema{
    @ApiProperty({format:'uuid'})
    id:string;
    
    @ApiProperty()
    name:string;
    
    @ApiProperty()
    code:string;
    
    @ApiProperty({format:'url'})
    logo:string;
    
    constructor(data:Banks){
        this.id = data?.id || '';
        this.name = data?.name || '';
        this.code = data?.code || '';
        this.logo = data?.logo || '';
    }
}
export class UserBankItemResponseSchema{
    @ApiProperty({format:'uuid'})
    id:string;

    @ApiProperty({type:UserBankBankResponseSchema})
    bank:UserBankBankResponseSchema|{};

    @ApiProperty()
    bank_holder:string;
    
    @ApiProperty()
    bank_account_number:string;
    
    @ApiProperty()
    verified_at:Date;
    
    @ApiProperty()
    is_primary:number;
    
    @ApiProperty()
    created_at:Date;
    
    @ApiProperty()
    updated_at:Date;
    
    constructor(data:UserBanks){
        this.id = data?.id || '';
        this.bank = (data?.bank)? new UserBankBankResponseSchema(data?.bank):{};
        this.bank_holder = data?.bank_holder || '';
        this.bank_account_number = data?.bank_account_number || '';
        this.verified_at = data?.verified_at;
        this.is_primary = data?.is_primary||0;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
    }
}

export class UserBankPaginateResponseSchema extends ResponsePaginate{
    @ApiProperty({type:[UserBankItemResponseSchema]})
    data:UserBankItemResponseSchema[];
    constructor(data:any){
        super();
        this.per_page = data?.meta?.itemsPerPage || 0;
		this.total = data?.meta?.totalItems || 0;
		this.current_page = data?.meta?.currentPage || 0;
		this.total_page = data?.meta?.totalPages || 0;
		this.last_page_url = data?.links?.last || "";
		this.next_page_url = data?.links?.next || "";
		this.previous_page_url = data?.links?.previous || "";
		this.first_page_url = data?.links?.first || "";
		this.data = (data.data || []).map(
			(item: UserBanks) => new UserBankItemResponseSchema(item)
		);
    }
}

export class UserBankPaginateResponseSchemaSwagger{
    @ApiProperty({type:ResponseMetaSwagger})
    meta:ResponseMetaSwagger;
    
    @ApiProperty({type:UserBankPaginateResponseSchema})
    data:UserBankPaginateResponseSchema;
}
