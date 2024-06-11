import { ApiConsumes, ApiProperty } from '@nestjs/swagger'
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    IsBoolean,
} from 'class-validator'

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    account_id: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    brand: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    in_stock: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    engine?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    transmission?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    max_weight?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    cabin_type?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    suspension_type?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    suspension_cabin?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    suspension_chassis?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    brake_type?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    wheel_formula?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    axles_number?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    fifth_wheel_height?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    trailer_length?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    euro?: string
}
