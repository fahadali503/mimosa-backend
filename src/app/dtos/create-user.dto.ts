import { IsString, IsEmail } from 'class-validator'

export class CreateUserDTO {

    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsString()
    country: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    companyName: string;
    @IsString()
    address: string;
    @IsString()
    state: string;
    @IsString()
    postCode: string;



}