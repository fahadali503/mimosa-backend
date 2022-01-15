import { Context, dependency, Get, hashPassword, HttpResponseBadRequest, HttpResponseOK, HttpResponseUnauthorized, Post, verifyPassword } from '@foal/core';
import { PrismaClient, } from '@prisma/client';
import { ValidateBody } from '@foal/typestack';
import { CreateUserDTO } from '../../dtos/create-user.dto';
import { getSecretOrPrivateKey } from '@foal/jwt';
import { sign } from 'jsonwebtoken';
import { plainToClass } from 'class-transformer';
import { UserSerialization } from '../../serialization';


export class AuthController {

  @dependency
  prisma: PrismaClient

  @Post('/register')
  @ValidateBody(CreateUserDTO)
  async registerUser(ctx: Context) {
    const body = ctx.request.body;
    const isUserExist = await this.prisma.user.findFirst({ where: { email: body.email } });
    if (isUserExist) {
      return new HttpResponseBadRequest({
        error: "User already exists."
      })
    }
    await this.prisma.user.create({ data: { ...body, password: await hashPassword(body.password) } });
    return new HttpResponseOK({ message: "Account created successfully." });
  }

  @Post("/login")
  async login(ctx: Context) {
    const body = ctx.request.body as { email: string; password: string };
    const user = await this.prisma.user.findFirst({ where: { email: body.email } });
    if (!user) {
      return new HttpResponseBadRequest({
        error: "User not found!"
      })
    }
    if (!await verifyPassword(body.password, user.password)) {
      return new HttpResponseUnauthorized({
        error: "Invalid email/password."
      })
    }
    const token = sign({ sub: user.id, id: user.id }, getSecretOrPrivateKey(), { expiresIn: "7d" });
    return new HttpResponseOK({ token, user: plainToClass(UserSerialization, user) })
  }
}
