import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { UserClass } from "./User.schema";

export class ProductClass {
    @prop({ type: String })
    title: string
    @prop({ type: String })
    description: string
    @prop({ type: String, default: [] })
    images: Types.Array<string>
    @prop({ type: String })
    thumbnail: string
    @prop({ type: String, enum: ['physical', 'digital'] })
    type: string
    @prop({ type: Number })
    price: number

    @prop({ type: Boolean, })
    isOnSale: boolean
    @prop({ type: Number, })
    salePrice: number;
    @prop({ type: Number, })
    quantity: number;
    @prop({ type: Boolean, })
    isFeatured: boolean;


    @prop({ ref: 'User' })
    user: Ref<UserClass>

    @prop({ type: Date, default: Date.now() })
    createdAt: Date
}

export const ProductSchema = getModelForClass(ProductClass, { schemaOptions: { timestamps: true }, options: { customName: "Product" } });