import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";

@Entity()
export class LeaveRequest {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 1024
    })
    reason?: string

    @Column({
        // type: 'date'
        length: 24
    })
    from_date?: string


    @Column({
        // type: 'date'
        length: 24
    })
    to_date?: string

    @Column({
        // default: false
    })
    status?: boolean

    @ManyToOne(() => (Employee), (Employee) => { Employee.leaverequests }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'employee_id' })
    employee?: Employee
}