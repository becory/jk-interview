import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { Charity } from "./charity"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 30, type: 'varchar', unique: true  })
    name: string

    @OneToMany(() => Charity, (charity) => charity.category)
    charities: Charity[]
}