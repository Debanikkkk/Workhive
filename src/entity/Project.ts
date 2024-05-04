import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Skill } from "./Skill"
import { Task } from "./Task"
import { Department } from "./Department"

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    name?: string

    @ManyToMany(() => (Skill), (Skill) => { Skill.projects }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    // @JoinTable({
    //     name: 'project_skill',
    //     joinColumn:{name: 'project_id'},
    //     inverseJoinColumn:{name: 'skill_id'}
    // })
    skills?: Promise<Skill[]>

    @OneToMany(() => (Task), (Task) => { Task.project }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    tasks?: Promise<Task[]>

    @ManyToOne(() => (Department), (Department) => { Department.projects }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'department_id' })
    department?: Promise<Department>
}
