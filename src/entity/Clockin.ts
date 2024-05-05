import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";

@Entity()
export class Clockin {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    clock_in?: Date

    @Column({
        type: 'timestamp',
        default: null,
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    clock_out?: Date

    @ManyToOne(() => (Employee), (Employee) => { Employee.clockins })
    @JoinColumn({ name: 'employee_id' })
    employee?: Employee


}