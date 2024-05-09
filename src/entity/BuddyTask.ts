import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Buddies } from "./Buddies";
@Entity()
export class BuddyTask {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 128
    })
    buddy_task?: string

    @Column()
    status?: boolean

    @Column()
    start_date?: Date

    @Column()
    end_date?: Date

    @ManyToOne(() => (Buddies), (Buddies) => { Buddies.buddy_tasks })
    @JoinColumn({name: 'buddy_id'})
    buddies?: Buddies
}