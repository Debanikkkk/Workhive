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

    @Column()
    from_date?: Date

    @Column()
    to_date?: Date

    @ManyToOne(() => (Employee), (Employee) => { Employee.leaverequests }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    employee?: Employee
}