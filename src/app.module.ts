import { CombinaisonRepository } from './HCooking/Combinaison.Repository';
import { RecetteRepository } from './HCooking/recette.repositoty';
/* eslint-disable prettier/prettier */
import { Combinaison } from './HCooking/cominaison.entity';
import { IngredientRepository } from './HCooking/palt.repository';
import { PlatService } from './HCooking/plat.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatsController } from './HCooking/ingredients.controller';
import { PlatsModule } from './HCooking/plat.module';
import { Ingredients } from './HCooking/ingredients.entity';
import { Recette } from './HCooking/recette.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'restaurant',
      entities: [Ingredients, Combinaison, Recette],
      synchronize: true,
    }),
  ],
  controllers: [PlatsController],
  providers: [PlatService, IngredientRepository, RecetteRepository, CombinaisonRepository],
})
export class AppModule { }
