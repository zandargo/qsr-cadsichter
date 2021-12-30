<template>
	<q-page>
		Chart main
		<div v-for="n in 100" :key="n">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua.
		</div>
	</q-page>
</template>

<script>
// import knex from "knex";
// import sqlite3 from "sqlite3";

export default {
	name: "ChartMain",

	setup() {
		// const knex = require("knex")({
		// 	client: "sqlite3",
		// 	connection: {
		// 		filename: "./data/SB_FTP_PLANSICHTER.db",
		// 	},
		// });

		return {};
	},
};
</script>

<style lang="scss" scoped></style>
