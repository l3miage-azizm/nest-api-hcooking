/* eslint-disable prettier/prettier */
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateIngredientsDto {
  @IsNumber()
  id: number
  @IsString()
  nameLegume: string;
  @IsString()
  imageUrl: string
  @IsBoolean()
  isSelected: boolean;
  @IsString()
  vitamines: string;
  @IsString()
  categorie: string;
}
