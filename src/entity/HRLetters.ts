import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";

@Entity()
export class HRLetters {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 1024
    })
    letter_subject?: string

    @Column({
        length: 1024
    })
    letter_content?: string

    @Column({
        // type: 'timestamp',
        // default: () => 'CURRENT_TIMESTAMP'
        length: 16
    })
    letter_time?: string

    @ManyToOne(() => (Employee), (Employee) => { Employee.hrletters }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'employee_id' })
    employee?: Employee
}