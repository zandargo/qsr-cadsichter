<template>
	<q-page> Defs main
		<AlertIcon/>
	</q-page>
</template>

<script>
// import { reactive, toRefs } from "vue";
// import { testSQLite } from "src/modules/SQLite";

// import { db } from "src/modules/SQLite";
import { onMounted } from "vue";
import AlertIcon from 'components/AlertIcon.vue'


export default {
	name: "DefsMain",
	components: {AlertIcon},
	setup() {


		onMounted(() => {
			// let sql = `SELECT NoSQMN, Rev FROM Reg_SQMN`
			// db.each(sql, [], (err, row) => {
			// 	if (err) {throw err}
			// 	console.log(`Esquemino Nº ${row.NoSQMN}-${row.Rev}`);
			// })
			// const teste = async () => await testSQLite(20111);
		});
		return {
			// teste
		};
	},
};
</script>
