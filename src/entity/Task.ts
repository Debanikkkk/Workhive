import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project";
import { Skill } from "./Skill";

@Entity()

export class Task {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 16
    })
    name?: string

    @Column()
    status?: boolean

    @ManyToOne(() => (Project), (Project) => { Project.tasks }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'project_id' })
    project?: Promise<Project>

    @ManyToOne(() => (Skill), (Skill) => { Skill.tasks }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'skill_id' })
    skill?: Promise<Skill>
}