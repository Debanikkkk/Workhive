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
    toJSON() {
        return {
            ...this,
            from_date: this.from_date?.toISOString().split('T')[0] // Format the date as YYYY-MM-DD
        };
    }
    @Column({
        type: 'date'
    })
    to_date?: Date

    @ManyToOne(() => (Employee), (Employee) => { Employee.leaverequests }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    employee?: Employee
}