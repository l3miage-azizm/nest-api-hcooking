import { CombinaisonRepository } from './Combinaison.Repository';
import { RecetteRepository } from './recette.repositoty';
import { Module } from '@nestjs/common';
import { IngredientRepository } from './palt.repository';
import { PlatsController } from './ingredients.controller';
import { PlatService } from './Plat.service';

@Module({
  controllers: [PlatsController],
  providers: [
    IngredientRepository,
    PlatService,
    RecetteRepository,
    CombinaisonRepository,
  ],
})
export class PlatsModule {}
