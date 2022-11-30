import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: "mssql",
    host: "Smthmg",
    port: 1433,
    username: "sa",
    password: "Teste123",
    database: "Waze",
    entities: [User],
    migrations: ["./src/database/migrations/**.ts"]
})