import { Context, dependency, Get, HttpResponseOK, Post } from '@foal/core';
import { JWTRequired } from '@foal/jwt';
import { ProductSchema } from '../../../schema/Product.schema';
import { IsValidUser } from '../../hooks/is-valid-user.hook';
import { ValidateMultipartFormDataBody, Disk } from '@foal/storage'
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();


type TypeImage = {
  encoding: string;
  filename: string | undefined;
  mimeType: string;
  path: string;
  buffer: Buffer
}

@JWTRequired()
export class ProductController {

  @dependency
  disk: Disk

  @Post('/create')
  @ValidateMultipartFormDataBody({
    files: {}
  })
  @IsValidUser()
  async createPhysicalListing(ctx: Context) {
    const { id } = ctx.user;
    // const { images } = ctx.request.body.files;
    // const thumbnail = ctx.request.body.files.thumbnail as TypeImage;
    const { fields } = ctx.request.body.fields;
    const productImages: string[] = [];
    // images.forEach((element: TypeImage) => {
    //   productImages.push(element.path)
    // });
    const body = JSON.parse(fields)
    // console.log(body)
    const product = new ProductSchema({ ...body, user: id })
    await product.save()
    return new HttpResponseOK({
      message: "Listing has been created Successfully!",
    });
  }


  @Get('/seller/featured')
  async getSellerFeaturedProducts(ctx: Context) {
    const { id } = ctx.user;
    const products = await ProductSchema.find({ isFeatured: true, user: id });
    return new HttpResponseOK({
      products
    })
  }
  @Get('/seller/products')
  async getSellerProducts(ctx: Context) {
    const { id } = ctx.user;
    const products = await ProductSchema.find({ user: id });
    return new HttpResponseOK(
      products)
  }

  @Get('/seller/product')
  async getSellerProduct(ctx: Context) {
    const { id } = ctx.user;
    const productId = ctx.request.query.id;
    console.log(productId)
    const product = await ProductSchema.findById(productId);
    return new HttpResponseOK(product)
  }

}

// const path = join(process.env.INIT_CWD as string + "/uploads", image);