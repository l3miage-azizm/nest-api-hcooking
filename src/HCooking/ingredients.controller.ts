/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Header, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Combinaison } from './cominaison.entity';
import { Ingredients } from './ingredients.entity';
import { PlatService } from './plat.service';
import { Recette } from './recette.entity';

export interface Notation {
  note: number,
  commentaire: string
  idRecette: string
}
@Controller()
export class PlatsController {
  constructor(private readonly platService: PlatService) { }

  Combinaisons(L: string[], N: number, k: number) {
    let i = 0
    let G = []
    let s = ""

    if (L.length < N) { return G }
    else if (N == 1) {
      return L
    }
    else if (L.length == N) {
      while (i < L.length) {
        s = s + L[i]
        i = i + 1
        G.push(s)
      }
    }
    return G
  }

  getComb() {
    let tab = ["A", "B", "C", "D"];
    let res: string[][] = [];
    res.push(tab);
    for (let i = 0; i < tab.length; i++) {
      for (let j = i + 1; j < tab.length; j++) {
        res.push([tab[i], tab[j]])
      }

    }
    return res
  }

  @Get()
  getAllPlts(): Promise<Ingredients[]> {
    return this.platService.getAllPlats();
  }
  @Get('/Recette')
  getAllRecette(): Promise<Recette[]> {
    return this.platService.getAllRecette();
  }
  @Post("/Combinaison")
  getCombinaisonById(@Body() ing: Recette): Promise<Ingredients[]> {
    return this.platService.getCombinaisonById(ing)
  }
  @Post("/Recette/Add")
  insertRecetteAndCombinaison(@Body() data: any) {
    return this.platService.insertRecetteAndCombinaison(data)
  }
  @Put("/Recette/update")
  async UpdatRecetteAndCombinaison(@Body() data: any): Promise<Recette[]> {
    return await this.platService.UpdatRecetteAndCombinaison(data)
  }
  @Post("/ingredients/Add")
  insertIngredient(@Body() data: any): Promise<Ingredients[]> {
    return this.platService.insertIngredient(data)
  }

  @Put("/ingredient/update")
  UpdateIngredientById(@Body() data: any): Promise<Ingredients[]> {
    console.log("update ingredients")
    return this.platService.UpdateIngredientById(data)
  }

  @Delete('/ingredient/delete')
  deletIngredientbyId(@Body() data: any): Promise<Ingredients[]> {
    return this.platService.deletIngrediengtById(data)
  }

  @Post("/recettes")
  getAllPlatsByType(@Body() listLegumes: Ingredients[]): Promise<Recette[]> {
    return this.platService.getAllPlatsByLegumes(listLegumes);
  }
  @Post('/SetNoteAndComment')
  setNoteAndComment(@Body() notation: any) {
    console.log(notation)
    return this.platService.setNoteAndComment(notation);
  }
  @Put('/ingredients')
  updateIngredientsByid(@Body() ingredients: Ingredients): Promise<Ingredients[]> {
    return this.platService.updateIngredientsByid(ingredients)
  }
  @Delete('/Recette/delete')
  deletRecetteAndCombinaisonbyId(@Body() data: any) {
    console.log('delet')
    return this.platService.deletRecetteAndCombinaisonbyId(data)
  }

}
