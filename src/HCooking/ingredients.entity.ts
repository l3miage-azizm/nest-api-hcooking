/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ingredients {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  namelegume: string;
  @Column()
  imageUrl: string
  @Column()
  isSelected: boolean;
  @Column()
  vitamines: string;
  @Column()
  categorie: string
}
