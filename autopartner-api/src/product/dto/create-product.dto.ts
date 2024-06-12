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
    @IsString()
    @IsNotEmpty()
    category: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    brand: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number

    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string

    @ApiProperty()
    @IsBoolean()
    in_stock?: boolean

    @ApiProperty()
    @IsOptional()
    @IsString()
    engine?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    vehicles_year?: string

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
    trailer_volume?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    color?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    options?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    euro?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    image_url?: string
}
