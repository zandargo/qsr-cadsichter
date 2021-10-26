<template>
	<q-page class="row">
		<!-- //* ---------------------------- DIV CÓDIGOS GPF --------------------------- *// -->
		<div
			class="col-3 col-md-3 col-lg-3 col-xl-3 q-pa-md items-center text-center"
		></div>

		<!-- //* ------------------------ DIV DESENHO DAS GAVETAS ----------------------- *// -->
		<div class="col-auto divGPF q-pa-md items-center text-center">
			<q-card elevated class="bg-cs-l4 q-pa-sm cs-border q-mb-md">
				<GPF class="_bg-cs-l3" />
			</q-card>
		</div>

		<!-- //* ------------------------ DIV SLIDES DAS ALTURAS ------------------------ *// -->
		<div
			class="col-1 col-md-2 col-lg-2 col-xl-2 q-pa-md items-center text-center"
		></div>
	</q-page>
</template>

<script>
import { computed } from "vue";
import { useStore, mapState, mapMutations, mapActions } from "vuex";
import GPF from "components/FlowGPF.vue";

export default {
	name: "FlowMain",
	components: {
		GPF,
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.divGPF {
	min-width: 420px !important;
}
</style>
