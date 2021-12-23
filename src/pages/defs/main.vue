<template>
	<q-page> Defs main {{ teste }} </q-page>
</template>

<script>
// import { reactive, toRefs } from "vue";
// import { testSQLite } from "src/modules/SQLite";
import { onMounted } from "vue";

export default {
	name: "DefsMain",

	setup() {
		onMounted(() => {
			// const teste = testSQLite(20111);
		});
		return {
			// teste
		};
	},
};
</script>
