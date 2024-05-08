import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Skill } from "./Skill"
import { Task } from "./Task"
import { Department } from "./Department"
import { Employee } from "./Employee"

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    name?: string

    @Column({
        type: 'date'
    })
    start_date?: Date

    @Column({
        type: 'date'
    })
    end_date?: Date

    @ManyToMany(() => (Skill), (Skill) => { Skill.projects }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: true })
    @JoinTable({
        name: 'project_skill',
        joinColumn: { name: 'project_id' },
        inverseJoinColumn: { name: 'skill_id' }
    })
    skills?:Promise<Skill[]>

    @OneToMany(() => (Task), (Task) => { Task.project }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: true })
    tasks?:Task[]

    @ManyToMany(() => (Employee), (Employee) => { Employee.project }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: true })
    @JoinTable({
        name: 'project_employee',
        joinColumn: { name: 'project_id' },
        inverseJoinColumn: { name: 'employee_id' }
    })
    employees?: Promise<Employee[]>

    @ManyToOne(() => (Department), (Department) => { Department.projects }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'department_id' })
    department?: Department
}
