import "reflect-metadata"
import { DataSource } from "typeorm"

import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username:  process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: [__dirname+"/entities/*.ts"],
    migrations: [__dirname+'/migrations/**/*{.js,.ts}'],
    subscribers: [],
    migrationsRun: false,
    migrationsTableName: 'migrations',
    migrationsTransactionMode: 'all'
})
