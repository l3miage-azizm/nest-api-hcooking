import { Combinaison } from './cominaison.entity';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Ingredients } from './ingredients.entity';
import { IngredientRepository } from './palt.repository';
import { Recette } from './recette.entity';
import { RecetteRepository } from './recette.repositoty';
import { CombinaisonRepository } from './Combinaison.Repository';


@Injectable()
export class PlatService {
  constructor(private readonly IngredientRepository: IngredientRepository, private readonly recetteRepository: RecetteRepository, private readonly combinaisonRepository: CombinaisonRepository) { }

  constructRequette(e: string[]) {
    let s = 'Select distinct idLegume From Combinaison where idLegume IN'
    for (let i = 0; i < e.length; i++) {
      if (i == e.length - 1) {
        s = s + ' (select idLegume from Combinaison where nameLegume="' + e[i] + '") '
      } else {
        s = s + ' (select idLegume from Combinaison where nameLegume="' + e[i] + '") and idLegume IN'
      }
    }
    return s
  }

  executeRequette(req: string) {
    return this.combinaisonRepository.query(req);
  }
  getAllPlats(): Promise<Ingredients[]> {
    return this.IngredientRepository.find();
  }

  getAllRecette(): Promise<Recette[]> {
    return this.recetteRepository.find();
  }

  async getCombinaisonById(id: Recette): Promise<Ingredients[]> {
    let tab: Combinaison[] = []
    let tabIng: Ingredients[] = []
    tab = await this.combinaisonRepository.query('Select * from Combinaison where idLegume="' + id.idLegume + '"')
    tabIng = await this.IngredientRepository.find()
    for (let e of tab) {
      tabIng = tabIng.filter(i => i.namelegume !== e.nameLegume)
      await this.IngredientRepository.query('UPDATE ingredients SET isSelected=1 WHERE nameLegume="' + e.nameLegume + '"')
    }
    for (let e of tabIng) {
      await this.IngredientRepository.query('UPDATE ingredients SET isSelected=0 WHERE nameLegume="' + e.namelegume + '"')
    }
    return this.IngredientRepository.find();
  }
  setNoteAndComment(notation: any) {
    return this.recetteRepository.query('UPDATE recette SET note=' + notation.note + ',commentaire="' + notation.commentaire + '" WHERE id =' + notation.id + '')
  }

  async getAllPlatsByLegumes(listLegumes: Ingredients[]): Promise<Recette[]> {
    let listRequette = []
    let listL = [...new Set(listLegumes)]
    let L = listL.map(l => l.namelegume)
    let G = [L]
    for (let i = 0; i < 2; i++) {
      let N = (L.length - 1) - i
      G = G.concat(this.combinaisons(L, N, L.length - N));
    }
    console.log(G)
    for (let e of G) {
      listRequette.push(this.constructRequette(e));
    }
    console.log(listRequette)
    let tabid: string[] = []
    for (let e of listRequette) {
      await this.executeRequette(e).then(req => req.map(idfromreq => tabid.push(idfromreq.idLegume)));
    }
    tabid = this.supprimeDoublons(tabid);
    console.log(tabid)
    let x: Recette[] = []
    let rec: any;
    for (let e of tabid) {
      rec = await this.recetteRepository.query('Select * From recette where idLegume="' + e + '"')
      if (rec[0] !== undefined) {
        x.push(rec[0])
      }
    }
    return x
  }


  async insertRecetteAndCombinaison(data: any) {
    await this.recetteRepository.query('INSERT INTO Recette (id,name,imgUrl,ingredients,details,idLegume,note,commentaire) VALUES (NULL,"' + data.name + '","' + data.imgUrl + '","' + data.ingredients + '","' + data.details + '","' + data.idLegume + '",0,"")')
    for (let e of data.data) {
      await this.combinaisonRepository.query('INSERT INTO combinaison VALUES (NULL,"' + data.idLegume + '","' + e.namelegume + '")')
    }
    return this.recetteRepository.find()
  }

  async deletRecetteAndCombinaisonbyId(data: any) {
    await this.recetteRepository.query('DELETE FROM recette WHERE id="' + data.id + '"')
    await this.combinaisonRepository.query('DELETE FROM combinaison WHERE idLegume="' + data.idLegume + '"')
    return this.recetteRepository.find()
  }

  async UpdatRecetteAndCombinaison(data: any): Promise<Recette[]> {
    await this.recetteRepository.query('UPDATE recette SET name="' + data.name + '",imgUrl="' + data.imgUrl + '",ingredients="' + data.ingredients + '",details="' + data.details + '",idLegume="' + data.idLegume + '" Where id=' + data.id + '')
    let x = await this.combinaisonRepository.find()
    let bool = false;
    await this.combinaisonRepository.query('DELETE FROM combinaison WHERE idLegume="' + data.idLegume + '"')
    for (let e of data.data) {
      await this.combinaisonRepository.query('INSERT INTO combinaison VALUES (NULL,"' + data.idLegume + '","' + e.namelegume + '")')
    }

    let X = await this.recetteRepository.find()
    return X
  }


  async insertIngredient(data: any): Promise<Ingredients[]> {
    await this.IngredientRepository.query('INSERT INTO ingredients VALUES (NULL,"' + data.namelegume + '","' + data.imageUrl + '",0,"' + data.vitamines + '","' + data.categorie + '")')
    return this.IngredientRepository.find()
  }

  async deletIngrediengtById(data: any): Promise<Ingredients[]> {
    await this.IngredientRepository.query('DELETE FROM ingredients WHERE id="' + data.id + '"')
    return this.IngredientRepository.find()
  }

  async UpdateIngredientById(data: any): Promise<Ingredients[]> {
    console.log(data)
    await this.IngredientRepository.query('UPDATE ingredients SET nameLegume="' + data.namelegume + '",imageUrl="' + data.imageUrl + '",isSelected=0,vitamines="' + data.vitamines + '",categorie="' + data.categorie + '" Where id=' + data.id + '')
    return this.IngredientRepository.find()
  }

  factorielle(x: number) {
    if (x < 2) { return 1 }
    else {
      return x * this.factorielle(x - 1)
    }
  }
  anagramma_round(Arr: string[], i: number) {
    let temp = Arr[i];
    for (let j = i; j < Arr.length - 1; j++) {
      Arr[j] = Arr[j + 1];
    }
    Arr[Arr.length - 1] = temp;
    return Arr;
  }

  combinaisons(L, N, k) {
    let h = 0
    let i = 0
    let j = 0
    let G: string[][] = []
    let s: string[] = []
    let n = [...Array(N - 1).keys()]
    if (L.length < N) {
      return G
    }
    else if (N == 1) {
      G.push(L)
    }
    else if (L.length == N) {
      while (i < L.length) {
        s.push(L[i])
        i = i + 1
      }
      G.push(s)
      s = [];
    }
    else if (L.length > N) {
      let l = this.factorielle(L.length - 1) / (this.factorielle(N - 1)
        * this.factorielle((L.length - 1) - (N - 1)));
      while (i < l) {
        s.push(L[L.length - 1])
        while (h < n.length) {
          if (j > 0 && j < n.length) {
            n[j] = n[j - 1] + 1
          }
          s.push(L[n[h]])
          h = h + 1
          j = j + 1
        }
        G.push(s)
        h = 0
        j = 0
        s = []
        while (j < n.length && n[j] != (j + k)) {
          j = j + 1
        }
        if (j > 0) {
          n[j - 1] = n[j - 1] + 1
        }
        i = i + 1
      }
    }
    return G

  }
  supprimeDoublons(list: string[]) {
    let i, j, len = list.length, out = [], obj = {};
    for (i = 0; i < len; i++) {
      obj[list[i]] = 0;
    }
    for (j in obj) {
      out.push(j);
    }
    out.filter(i => i !== '')
    return out;
  }

  async updateIngredientsByid(ingredients: Ingredients): Promise<Ingredients[]> {
    console.log(ingredients.isSelected)
    let state = ingredients.isSelected ? 1 : 0
    await this.IngredientRepository.query('UPDATE ingredients SET isSelected=' + state + ' WHERE id=' + ingredients.id + '')
    return this.IngredientRepository.find();
  }
  getidByname(namelegume: string): Promise<Combinaison[]> {
    return this.combinaisonRepository.query('select idLegume from Combinaison where nameLegume="' + namelegume + '"');
  }


}
