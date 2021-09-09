<template>
	<q-page class="q-pa-md">
		<!-- content -->
	</q-page>
</template>

<script>
// import { defineComponent } from "vue";

export default {
	name: "MainPage",
	setup() {
		// const sqlite3 = require("sqlite3").verbose();
		// const db = new sqlite3.Database(
		// 	"../public/data/SB_FTP_PLANSICHTER.db",
		// 	sqlite3.OPEN_READWRITE,
		// 	(err) => {
		// 		if (err) {
		// 			console.error(err.message);
		// 		}
		// 		console.log("Connected to the Plansichter database.");
		// 	}
		// );
		// let sql = `SELECT NoSQMN, Rev FROM Reg_SQMN`;
		// db.each(sql, [], (err, row) => {
		// 	if (err) {
		// 		throw err;
		// 	}
		// 	console.log(`Esquemino Nº ${row.NoSQMN}-${row.Rev}`);
		// });

		return {
			contentStyle: {
				backgroundColor: "rgba(0,0,0,0)",
				color: "#555",
			},

			contentActiveStyle: {
				backgroundColor: "#eee",
				color: "black",
			},

			thumbStyle: {
				right: "6px",
				borderRadius: "3px",
				backgroundColor: "#027be3",
				width: "12px",
				opacity: 0.75,
			},
		};
		// const $store = useStore();
		// const winState = computed({
		// 	get: () => $store.state.main.winState,
		// 	set: (val) => {
		// 		$store.commit("main/updateWinState", val);
		// 	},
		// });
	},
};
</script>

<style lang="scss" scoped>
// div {
// 	::-webkit-scrollbar {
// 		display: auto;
// 	}
// 	-ms-overflow-style: none; /* IE and Edge */
// 	scrollbar-width: none; /* Firefox */
// }
#c1 {
	background-color: $color-l3;
	height: 100%;
}
#c2 {
	background-color: $color-l4;
	height: 100%;
}
</style>
