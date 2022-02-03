import {IsString, IsInt, IsNotEmpty} from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    price: number;
}
