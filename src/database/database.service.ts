import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypedKnex } from '@wwwouter/typed-knex';

@Injectable()
export class DatabaseService {
  knex: TypedKnex;
  rawKnex: any;
  test = 'test';
  constructor(private _configService: ConfigService) {
    if (!this.knex || !this.rawKnex) {
      this.init();
    }
  }

  async init() {
    try {
      const configOptions = {
        client: 'postgresql',
        connection: {
          timezone: 'PST',
          database: await this._configService.get<string>('DB_NAME'),
          user: await this._configService.get<string>('DB_USERNAME'),
          password: await this._configService.get<string>('DB_PASSWORD'),
          host: await this._configService.get<string>('DB_HOST'),
          port: await this._configService.get<number>('DB_PORT'),
        },
      };

      this.rawKnex = await require('knex')(configOptions);

      const typedKnex = await new TypedKnex(this.rawKnex);
      this.knex = typedKnex;
      console.log('knex');
    } catch (error) {
      console.error(error);
    }
  }
}
