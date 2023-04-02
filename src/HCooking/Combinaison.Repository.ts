/* eslint-disable prettier/prettier */
import { Combinaison } from './cominaison.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CombinaisonRepository extends Repository<Combinaison> {
  constructor(private dataSource: DataSource) {
    super(Combinaison, dataSource.createEntityManager());
  }
}
