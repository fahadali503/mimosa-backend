import { Context, controller, Get, HttpResponseOK } from '@foal/core';
import { AuthController, ProductController } from './api';

export class ApiController {
  subControllers = [
    controller('/auth', AuthController),
    controller('/product', ProductController)
  ];

}
