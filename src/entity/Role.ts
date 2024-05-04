import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { Permission } from "./Permission";
// import { SubOEM } from "./SubOEM";

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    roleName?: string

    @Column({
        length: 64,
    })
    roleDescription?: string

    @OneToMany(()=> Employee, Employee=>{Employee.role})
    employee?: Employee[]

    @ManyToMany(()=>Permission, (Permission)=>{Permission.roles})
    @JoinTable({
        name: 'rolePermission',
        joinColumn: {name: 'roleId'},
        inverseJoinColumn:{name: 'permissionId'}
    })
    permissions?: Permission[]

    // @OneToOne(()=> )

    // @ManyToOne((type) => SubOEM, (suboem) => {suboem.regions}, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false})
    // @JoinColumn({ name: "suboem_id" })
    // suboem: SubOEM
}