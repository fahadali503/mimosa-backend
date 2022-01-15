import { Context, controller, Get, HttpResponseOK } from '@foal/core';
import { AuthController } from './api';

export class ApiController {
  subControllers = [
    controller('/auth', AuthController)
  ];

}
