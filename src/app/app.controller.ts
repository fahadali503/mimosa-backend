import { controller, IAppController } from '@foal/core';
import { connect } from 'mongoose';
import { ApiController } from './controllers';



export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
  ];

  async init() {
    connect('mongodb://localhost:27017/mimosa').then(() => console.log('DB Connected')).catch(err => {
      console.log(err)
    })
  }
}
