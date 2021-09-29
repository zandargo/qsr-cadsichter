<template>
	<q-page class="row">
		<!-- //* ---------------------------- DIV CÓDIGOS GPF --------------------------- *// -->
		<div
			class="
				col-5 col-md-4 col-lg-3 col-xl-2
				q-pa-md
				items-center
				text-center
			"
		></div>

		<!-- //* ------------------------ DIV DESENHO DAS GAVETAS ----------------------- *// -->
		<div
			class="
				col-6 col-md-5 col-lg-4 col-xl-3
				q-pa-md
				items-center
				text-center
			"
		></div>

		<!-- //* ------------------------ DIV SLIDES DAS ALTURAS ------------------------ *// -->
		<div
			class="
				col-1 col-md-3 col-lg-3 col-xl-2
				q-pa-md
				items-center
				text-center
			"
		></div>
	</q-page>
</template>

<script>
import { computed } from "vue";
import { useStore, mapState, mapMutations, mapActions } from "vuex";

export default {
	name: "FlowMain",
	setup() {
		return {};
	},
};
</script>
