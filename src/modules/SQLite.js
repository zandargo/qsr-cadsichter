// import sqlite3 from "sqlite3";
// import knex from "knex";

// export const db = require("knex")({
// 	client: "sqlite3",
// 	connection: {
// 		filename: "public/data/SB_FTP_PLANSICHTER.db",
// 	},
// });

// export async function testSQLite(id) {
// 	return await db("Reg_SQMA").where({ Key: id });
// }

export const sqlite3 = require('sqlite3').verbose()
export const db = new sqlite3.Database('public/data/SB_FTP_PLANSICHTER.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) { console.error(err.message) }
  console.log('Connected to the Plansichter database.')
})
