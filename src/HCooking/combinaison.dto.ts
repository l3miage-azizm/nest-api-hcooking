/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class CreateCombinaison {
  @IsNumber()
  id: number

  @IsString()
  idLegume: string

  @IsString()
  nameLegume: string;

}
