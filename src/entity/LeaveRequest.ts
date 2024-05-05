import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
        type: 'date'
    })
    from_date?: Date


    @Column({
        type: 'date'
    })
    to_date?: Date

    @Column({
        // default: false
    })
    status?: boolean

    @ManyToOne(() => (Employee), (Employee) => { Employee.leaverequests }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    employee?: Employee
}