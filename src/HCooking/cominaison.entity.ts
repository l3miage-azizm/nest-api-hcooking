/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Combinaison {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idLegume: string;

  @Column()
  nameLegume: string;

}