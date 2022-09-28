import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {

    constructor() {
        this.id = uuidv4();
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    firstName: string

    @Column('text')
    lastName: string

    @Column('text')
    email: string

    @Column('int')
    age: number

}
