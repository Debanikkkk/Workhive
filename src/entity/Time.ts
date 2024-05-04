import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Employee } from "./Employee"

@Entity()
export class Time{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'timestamp' })
    startTime?: Date;

    @Column({ type: 'interval', nullable: true })
    elapsedTime?: string; 

    

    // @ManyToOne((type) => OEM, (oem) => {oem.suboems}, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false})
    // @JoinColumn({ name: "oem_id" })
    // oem: OEM

}