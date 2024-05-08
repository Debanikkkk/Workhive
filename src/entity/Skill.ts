import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Employee } from "./Employee"
import { Project } from "./Project"
import { Task } from "./Task"

@Entity()
export class Skill {
    @PrimaryGeneratedColumn
        ()
    id?: number

    @Column({
        length: 64,
    })
    name?: string

    // @ManyToOne(()=>(Employee), (Employee)=>{Employee.skills}, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false})

    // employees: Promise<Employee[]>

    @ManyToMany(() => (Project), (Project) => { Project.skills }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: true })
    // @JoinTable({
    //     name: 'project_skill',
    //     joinColumn: { name: 'skill_id' },
    //     inverseJoinColumn: { name: 'project_id' }
    // })
    projects?: Project[]

    // @OneToMany(() => (Task), (Task) => { Task.skill }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    // tasks?: Promise<Task[]>

    @ManyToMany(() => (Employee), (Employee) => { Employee.skills })
    employees?: Employee[]
}