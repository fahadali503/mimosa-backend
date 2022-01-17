import { Context, Hook, HookDecorator, HttpResponseNotFound } from '@foal/core';
import { UserModel } from '../../schema/User.schema';

export function IsValidUser(): HookDecorator {
  return Hook(async (ctx: Context, services) => {
    const { id } = ctx.user;
    const user = await UserModel.findById(id);
    if (!user) {
      return new HttpResponseNotFound({ error: "User not found" })
    }
  });
}
