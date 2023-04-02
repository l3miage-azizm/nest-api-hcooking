/* eslint-disable prettier/prettier */
import { Combinaison } from './cominaison.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ingredients } from './ingredients.entity';

@Injectable()
export class IngredientRepository extends Repository<Ingredients> {
  constructor(private dataSource: DataSource) {
    super(Ingredients, dataSource.createEntityManager());
  }
}
