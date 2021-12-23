import sqlite3 from "sqlite3";
import knex from "knex";

const db = require("knex")({
	client: "sqlite3",
	connection: {
		filename: "public/data/SB_FTP_PLANSICHTER.db",
	},
});

export function testSQLite(id) {
	return db("Reg_SQMA").where({ Key: id });
}
