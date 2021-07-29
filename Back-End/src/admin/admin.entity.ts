
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({default: ''})
  adress: string;

  @Column({default: ''})
  phone: string;

  
  @Column({default: 'admin'})
  role : string

}
