import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import manufacturer from './manufacturer'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string = '';

  @ManyToOne(type => manufacturer, manufacturer => manufacturer.id)
  @Column()
  public manufacturerID: number;

  @Column("integer")
  public qty: number = 0;

  @Column("numeric")
  public price: number = 0;

}

export default Product;