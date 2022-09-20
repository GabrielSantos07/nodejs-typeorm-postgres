import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "teste123",
    database: "test",
    synchronize: false,
    logging: false,
    name: 'default',
    entities: ["./src/entity/**.ts"],
    migrations: ["./src/database/migrations/**.ts"],
    subscribers: [],
})