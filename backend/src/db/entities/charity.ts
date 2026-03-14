import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, AfterLoad } from "typeorm"
import { Category } from "./category"
import { Service } from "./service"
import { Region } from "./region"

@Entity()
export class Charity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, type: "integer" })
    org_id: number

    @Column({
        length: 100,
        type: 'varchar',
        unique: true
    })
    name: string

    @ManyToOne(() => Category, (category) => category.charities)
    category: Category

    @Column({
        length: 20,
        type: 'varchar',
        nullable: true
    })
    phone: string
    
    @Column({
        length: 20,
        type: 'varchar',
        nullable: true
    })
    fax: string

    @Column({type: 'text', nullable: true })
    email: string
    
    @Column({
        length: 20,
        type: 'varchar' 
    })
    contact: string

    @Column({
        length: 20,
        type: 'varchar' 
    })
    ceo: string

    @Column({ length: 255, type: 'varchar', nullable: true })
    address: string

    @ManyToMany(() => Region)
    @JoinTable()
    regions: Region[]

    @ManyToMany(() => Service)
    @JoinTable()
    services: Service[]

    @Column({ type: 'text', nullable: true })
    logo: string

    description: string;
    
    @AfterLoad()
    setDescription() {
        if (this.regions) {
        this.description = this.services.map(r => r.name).join("、");
    }
  }
}