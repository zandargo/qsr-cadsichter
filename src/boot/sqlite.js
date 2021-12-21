import { boot } from "quasar/wrappers";

// // "async" is optional;
// // more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// })

import sqlite3 from "sqlite3";
// console.log(sqlite3);

const db = new sqlite3.Database("persons.db", (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("db opened");
	}
});

db.on("error", function (error) {
	console.log(error);
});

db.serialize(() => {
	db.run(
		"CREATE TABLE if not exists persons (id int primary key, name varchar(64))"
	)
		.run("delete from persons")
		.run(`insert into persons(id, name) values(1, 'a')`)
		.run(`insert into persons(id, name) values(2, 'b')`)
		.run(`insert into persons(id, name) values(3, 'c')`)
		.all("select * from persons order by id", [], (err, rows) => {
			rows.forEach((row) => {
				console.log(`${row.id} / ${row.name}`);
			});
		});
});

db.close();

export default boot(({ app }) => {
	app.use(db);
});
export { db };

// export default async (/* { app, router, Vue ... } */) => {};

// import sqlite3 from "sqlite3";
// // import knex from "knex";

// const knex = require("knex")({
// 	client: "sqlite3",
// 	connection: {
// 		filename: "public/data/SB_FTP_PLANSICHTER.db",
// 	},
// });

// export default db;
