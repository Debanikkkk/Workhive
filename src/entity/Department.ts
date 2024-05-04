import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { Project } from "./Project";
import { Branch } from "./Branch";
// import { SubOEM } from "./SubOEM";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    name?: string

    @Column()
    status?: boolean

    @OneToMany(() => Employee, (Employee) => { Employee.department }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    employees?: Employee[]

    @ManyToOne(() => (Branch), (Branch) => { Branch.departments }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'branch_id' })
    branch?: Branch


    @OneToMany(() => Project, (Project) => { Project.department }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    projects?: Project[]
    // @ManyToOne((type) => SubOEM, (suboem) => {suboem.regions}, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false})
    // @JoinColumn({ name: "suboem_id" })
    // suboem: SubOEM
}