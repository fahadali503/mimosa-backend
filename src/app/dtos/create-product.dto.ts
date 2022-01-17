import { IsString, IsNumber, Min, Max, IsBoolean, ArrayMinSize, ArrayMaxSize, IsEnum, } from 'class-validator'

export class CreateProductDTO {
    @IsString({ message: "Product Name is required" })
    title: string

    @IsString({ message: "Product Description is required" })
    description: string

    @IsEnum(['physical', 'digital'], { message: "Product can either be Physical or Digital" })
    type: string

    @IsNumber()
    @Max(999, { message: "Product price cannot be exceed more than $999" })
    price: number

    @IsBoolean({ message: "Product on sale should be a boolean value" })
    isOnSale: boolean

    @Min(10, { message: "Product Quantity cannot be a nagative" })
    quantity: number;

    @IsBoolean({ message: "Featured value should be a boolean" })
    isFeatured: number;
}