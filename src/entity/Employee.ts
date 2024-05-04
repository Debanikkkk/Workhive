import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Department } from "./Department";
import { Branch } from "./Branch";
import { Company } from "./Company";
// import { Region } from "./Region";
import { Skill } from "./Skill";
import { Buddies } from "./Buddies";
import { LeaveRequest } from "./LeaveRequest";
// import { SubOEM } from "./SubOEM";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    firstName?: string

    @Column({
        length: 64,
    })
    lastName?: string

    @PrimaryColumn({
        length: 64,
        unique: true
    })
    username?: string
    @Column({
        length: 16
    })
    password?: string

    @Column()
    status?: boolean

    @ManyToOne(() => (Role), (Role) => { Role.employee }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'roleId' })
    role?: Role

    @ManyToOne(() => (Department), (Department) => { Department.employees }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'departmentId' })
    department?: Department

    @ManyToOne(() => (Branch), (Branch) => { Branch.employees }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'branchId' })
    branch?: Branch

    @ManyToOne(() => (Company), (Company) => { Company.employees }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'companyId' })
    company?: Company

    // @ManyToMany(() => Buddies, (Buddies) => { Buddies.employees }, { cascade: true })
    // buddies?: Buddies[]

    // @ManyToMany(() => Buddies, buddies => buddies.employees)
    // @JoinTable({
    //     name: 'employee_n_buddies',
    //     joinColumn: { name: 'employee_id' },
    //     inverseJoinColumn: { name: 'buddies_id' }
    // })
    // buddies?: Buddies[];

    @OneToMany(() => (LeaveRequest), (LeaveRequest) => { LeaveRequest.employee }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    leaverequests?: LeaveRequest[]
}