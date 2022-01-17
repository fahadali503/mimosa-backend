import { Context, dependency, Get, HttpResponseOK, Post } from '@foal/core';
import { JWTRequired } from '@foal/jwt';
import { ValidateBody } from '@foal/typestack';
import { ProductSchema } from '../../../schema/Product.schema';
import { CreateProductDTO } from '../../dtos/create-product.dto';
import { IsValidUser } from '../../hooks/is-valid-user.hook';
import { ValidateMultipartFormDataBody, Disk } from '@foal/storage'



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
    files: {
      "images": { required: true, multiple: true, saveTo: "images" },
      thumbnail: { required: true, "saveTo": "thumbnail" }
    },
    // fields: {
    //   title: { type: 'string', required: true },
    //   description: { type: 'string', required: true },
    //   isFeatured: { type: 'boolean', required: true },
    //   isOnSale: { type: 'boolean', required: true },
    //   price: { type: 'number', required: true },
    //   salePrice: { type: 'number', required: true },
    //   quantity: { type: 'number', required: true },
    // }
  })
  @IsValidUser()
  async createNewListing(ctx: Context) {
    const { id } = ctx.user;
    const { images } = ctx.request.body.files;
    const thumbnail = ctx.request.body.files.thumbnail as TypeImage;
    const { fields } = ctx.request.body.fields;
    const productImages: string[] = [];
    images.forEach((element: TypeImage) => {
      productImages.push(element.path)
    });
    const body = JSON.parse(fields)
    const product = new ProductSchema({ ...body, user: id, images: productImages, thumbnail: thumbnail.path })
    await product.save()
    return new HttpResponseOK({
      msg: "OK",
      product
    });
  }

  @Get('/')
  async readFile(ctx: Context) {
    return this.disk.createHttpResponse('images\\is7uO3GJ2DfCLAA3ov8WMAjPN1bRHpK6gorQVeMg308.jpg')
  }

}
