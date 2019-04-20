import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import product from './product'

@Entity()
export class Manufacturer {
  @OneToMany(type => product, product => product.manufacturer_id)
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string = '';

  @Column()
  public company: string = '';

  @Column()
  public city: string = '';
}

export default Manufacturer;