/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class CreateRecetteDTO {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  imgUrl: string;
  @IsString()
  ingredients: string;
  @IsString()
  details: string;
  @IsString()
  idLegume:string;
  @IsNumber()
  note:number;
  @IsString()
  commentaire:string;
}
