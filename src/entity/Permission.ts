import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
// import { SubOEM } from "./SubOEM";

@Entity()
export class Permission{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    permissionName?: string

    @Column({
        length: 64,
    })
    permissionDescription?: string

 
@ManyToMany(()=>Role, (Role)=>{Role.permissions}, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false} )
roles?: Role[]
    // @ManyToOne((type) => SubOEM, (suboem) => {suboem.regions}, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: false})
    // @JoinColumn({ name: "suboem_id" })
    // suboem: SubOEM
}