import { getModelForClass, prop } from "@typegoose/typegoose";
import { Exclude } from "class-transformer";

export class UserClass {
    @prop({ type: String })
    firstName: string
    @prop({ type: String })
    lastName: string

    @prop()
    companyName: string
    @prop()
    email: string

    @prop()
    @Exclude()
    password: string

    @prop()
    address: string
    @prop()
    state: string

    @prop()
    postCode: string

    @prop({ type: Date, default: Date.now() })
    createdAt: Date
}

export const UserModel = getModelForClass(UserClass, { schemaOptions: { timestamps: true }, options: { customName: "User" } });