import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypedKnex } from '@wwwouter/typed-knex';

const { attachPaginate } = require('knex-paginate');

@Injectable()
export class DatabaseService {
  knex: TypedKnex;
  rawKnex: any;
  constructor(private _configService: ConfigService) {
    this.init();
  }

  async init() {
    try {
      
      let configOptions = {
        client: 'postgres',
        connection: {
          database: this._configService.get<string>('DB_NAME'),
          user: this._configService.get<string>('DB_USERNAME'),
          password: this._configService.get<string>('DB_PASSWORD'),
          host: this._configService.get<string>('DB_HOST'),
          port: this._configService.get<number>('DB_PORT'),
        },
      };

	  console.log('config options: ', configOptions)

      this.rawKnex = require('knex')(configOptions);

      const typedKnex = new TypedKnex(this.rawKnex);

      this.knex = typedKnex;
      attachPaginate();
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  }
}
