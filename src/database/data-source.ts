/** @format */

import { DataSource, DataSourceOptions } from "typeorm";
require("dotenv").config();

export const dataSourceOptions: DataSourceOptions = {
	type: process.env.DATABASE_TYPE as any,
	host: process.env.DATABASE_HOST,
	port: parseInt(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	logging: process.env.DATABASE_LOGGING === "true" || false,
	ssl: process.env.DATABASE_SSL === "true" || false,
	synchronize: process.env.DATABASE_SYNCHRONIZE === "true" || false,
	entities: ["node_modules/enkei/dist/**/*.entity.js", "dist/**/*.entity.js"],
	migrations: ["dist/database/migrations/*.js"],
	migrationsTableName: "migrations",
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
