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

    // @Column({
    //     length: 64,
    // })
    // lastName?: string

    @Column({
        type: 'date'
    })
    start_date?: Date

    @Column({
        type: 'date'
    })
    end_date?: Date

    @ManyToOne(() => (Project), (Project) => { Project.tasks }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'project_id' })
    project?: Project

    // @ManyToOne(() => (Skill), (Skill) => { Skill.tasks }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    // @JoinColumn({ name: 'skill_id' })
    // skill?: Promise<Skill>
}