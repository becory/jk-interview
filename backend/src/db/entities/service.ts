import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 30, type: 'varchar', unique: true })
    name: string
}