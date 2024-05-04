import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Buddies } from "./Buddies";
@Entity()
export class BuddyTask {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 128
    })
    buddyTask?: string

    @Column()
    status?: boolean

    @Column()
    startDate?: Date

    @Column()
    endDate?: Date

    @ManyToMany(() => (Buddies), (Buddies) => { Buddies.buddy_tasks })
    buddies?: Buddies[]
}