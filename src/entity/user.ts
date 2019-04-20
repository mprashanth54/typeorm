import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {

  @PrimaryColumn()
  public username: string;

  @Column({ nullable: false })
  public password: string;

  @Column()
  public name: string;

}

export default Auth;