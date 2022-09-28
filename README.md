# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


# Comands to run Migrations

1. Run `yarn run typeorm migration:create ./src/database/migrations/CreateUser` comand to create your migrationSchema
2. Run `yarn run typeorm migration:run -d ./src/database/data-source.ts` to run you first migration