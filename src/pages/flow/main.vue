<template>
	<q-page class="row">
		<!-- //* ------------------------ DIV SLIDES DAS ALTURAS ------------------------ *// -->
		<div
			class="
				col-3 col-md-3 col-lg-3 col-xl-3
				q-py-md q-px-xs
				items-center
				text-center
			"
			style="min-width: 150px; max-width: 240px"
		>
			<q-card elevated class="bg-cs-l4 q-pa-sm cs-border q-mb-md column">
				<q-card-section style="height: 160px"> </q-card-section>
				<q-card-section
					v-for="i in nGavs"
					:key="i"
					style="height: 64px"
					class="q-pa-xs"
				>
					<q-separator />
					<SlideH :sID="'G' + ('0' + i).slice(-2)" class="q-my-sm" />
				</q-card-section>
				<q-card-section style="height: 94px" class="q-pa-xs">
					<q-separator />
				</q-card-section>
			</q-card>
		</div>

		<!-- //* ------------------------ DIV DESENHO DAS GAVETAS ----------------------- *// -->
		<div class="col-auto divGPF q-pa-md items-center text-center">
			<q-card elevated class="bg-cs-l4 q-pa-sm cs-border q-mb-md">
				<GPF class="_bg-cs-l3" />
			</q-card>
		</div>

		<!-- //* ---------------------------- DIV CÓDIGOS GPF --------------------------- *// -->
		<div
			class="col-1 col-md-2 col-lg-2 col-xl-2 q-pa-md items-center text-center"
		></div>
	</q-page>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import GPF from "components/FlowGPF.vue";
import SlideH from "components/FlowSlideH.vue";

export default {
	name: "FlowMain",
	components: {
		GPF,
		SlideH,
	},
	setup() {
		const $store = useStore();
		const nGavs = computed({
			get: () => $store.state.flow.varMain.nGavs,
			set: () => {},
		});

		onMounted(() => {
			$store.commit("flow/mutSetGPFprod", {
				id: "G01",
				ab: "A",
			});
		});
		return { nGavs };
	},
};
</script>

<style lang="scss" scoped>
.divGPF {
	min-width: 420px !important;
}
</style>
