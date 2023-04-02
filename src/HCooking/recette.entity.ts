/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recette {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  imgUrl: string;
  @Column()
  ingredients: string;
  @Column()
  details: string;
  @Column()
  idLegume: string;
  @Column()
  note: number;
  @Column()
  commentaire: string;
}
