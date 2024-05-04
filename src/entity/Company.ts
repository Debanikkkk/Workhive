import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Employee } from "./Employee"
import { Branch } from "./Branch"

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    name?: string

    @Column({
        length: 1024,
    })
    logo_url?: string

    @OneToMany(() => Employee, (Employee) => { Employee.company }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    employees?: Employee[]

    @OneToMany(() => (Branch), (Branch) => { Branch.company }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    branches?: Promise<Branch[]>
    // @OneToMany((type) => SubOEM, (suboem) => suboem.oem)
    // suboems: SubOEM[]

}
