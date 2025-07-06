import { Expose } from "class-transformer";

export class UserResponseDto {

    @Expose()
    email: string;

    @Expose()
    name: string;

    @Expose()
    phone: string;

}