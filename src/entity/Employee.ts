import { Collection, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Department } from "./Department";
import { Branch } from "./Branch";
import { Company } from "./Company";
// import { Region } from "./Region";
import { Skill } from "./Skill";
import { Buddies } from "./Buddies";
import { LeaveRequest } from "./LeaveRequest";
import { Clockin } from "./Clockin";
import { HRLetters } from "./HRLetters";
import { Project } from "./Project";
// import { SubOEM } from "./SubOEM";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    first_name?: string

    @Column({
        length: 64,
    })
    last_name?: string

    @Column()
    salary?: number

    @Column({
        type: 'date',
        default: () => 'CURRENT_TIMESTAMP'
    })
    date_of_joining?: Date

    @Column({
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
    @JoinColumn({ name: 'role_id' })
    role?: Role

    @ManyToOne(() => (Department), (Department) => { Department.employees }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'department_id' })
    department?: Department

    @ManyToOne(() => (Branch), (Branch) => { Branch.employees }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'branch_id' })
    branch?: Branch

    @ManyToOne(() => (Company), (Company) => { Company.employees }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: 'company_id' })
    company?: Company

    // @ManyToMany(() => Buddies, (Buddies) => { Buddies.employees }, { cascade: true })
    // buddies?: Buddies[]

    @ManyToMany(() => (Buddies), (buddies) => { buddies.employees })
    @JoinTable({
        name: 'employee_n_buddies',
        joinColumn: { name: 'employee_id' },
        inverseJoinColumn: { name: 'buddies_id' }
    })
    buddies?: Buddies[];

    @ManyToMany(() => (Skill), (Skill) => { Skill.employees })
    @JoinTable({
        name: 'employee_n_skill',
        joinColumn: { name: 'employee_id' },
        inverseJoinColumn: { name: 'skill_id' }
    })
    skills?: Promise<Skill[]>;

    @OneToMany(() => (LeaveRequest), (LeaveRequest) => { LeaveRequest.employee }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    leaverequests?: LeaveRequest[]

    @OneToMany(() => (HRLetters), (HRLetters) => { HRLetters.employee }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false })
    hrletters?: HRLetters[]

    @OneToMany(() => (Clockin), (Clockin) => { Clockin.employee })
    clockins?: Clockin[]

    @ManyToOne(() => (Project), (Project) => { Project.employees }, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: 'project_id' })
    project?: Project
    
}