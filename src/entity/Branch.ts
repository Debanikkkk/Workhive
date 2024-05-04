import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { Company } from "./Company";
import { Department } from "./Department";

@Entity()
export class Branch {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    name?: string

    @Column()
    status?: boolean


    @OneToMany(() => Employee, (Employee) => { Employee.branch }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    employees?: Employee[]

    @OneToMany(() => Department, (Department) => { Department.branch }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    departments?: Department[]
    // @ManyToOne((type) => OEM, (oem) => {oem.suboems}, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false})
    // @JoinColumn({ name: "oem_id" })
    // oem: OEM

    @ManyToOne(() => (Company), (Company) => { Company.branches }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'company_id' })
    company?: Company
    // @OneToMany((type) => Regions, (region) => region.suboem)
    // regions: Regions[]
}