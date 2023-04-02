/* eslint-disable prettier/prettier */
import { Combinaison } from './cominaison.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Recette } from './recette.entity';


@Injectable()
export class RecetteRepository extends Repository<Recette> {
  constructor(private dataSource: DataSource) {
    super(Recette, dataSource.createEntityManager());
  }
}