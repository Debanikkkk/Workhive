import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { BuddyTask } from "./BuddyTask";
@Entity()
export class Buddies {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        length: 16,
    })
    buddy_group_name?: string

    // @ManyToMany(() => (Employee), (Employee) => { Employee.buddies }, { cascade: true })
    // @JoinTable({
    //     name: 'employee_n_buddies',
    //     joinColumn: { name: 'buddiesId' },
    //     inverseJoinColumn: { name: 'employeeId' }
    // })
    // employees?: Employee[]

    // @ManyToMany(() => Employee, employee => employee.buddies, { cascade: true })
    // @JoinTable({
    //     name: 'employee_n_buddies',
    //     joinColumn: { name: 'buddies_id' },
    //     inverseJoinColumn: { name: 'employee_id' }
    // })
    // employees?: Employee[];


    @ManyToMany(() => (BuddyTask), (BuddyTask) => { BuddyTask.buddies })
    @JoinTable({
        name: 'buddies_n_buddy_tasks',
        joinColumn: { name: 'buddiesId' },
        inverseJoinColumn: { name: 'buddyTaskId' }
    })
    buddy_tasks?: BuddyTask[]
}