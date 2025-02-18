import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToMany(() => Employee, employee => employee.buddies, { cascade: true })
    @JoinTable({
        name: 'employee_n_buddies',
        joinColumn: { name: 'buddies_id' },
        inverseJoinColumn: { name: 'employee_id' }
    })
    employees?: Promise<Employee[]>;

    @OneToMany(() => (BuddyTask), (BuddyTask) => { BuddyTask.buddies }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: true })
    // @JoinTable({
    //     name: 'buddies_n_buddy_tasks',
    //     joinColumn: { name: 'buddiesId' },
    //     inverseJoinColumn: { name: 'buddyTaskId' }
    // })
    buddy_tasks?: Promise<BuddyTask[]>
}