import { Exclude } from 'class-transformer'
export class UserSerialization {
    @Exclude()
    password: string
}