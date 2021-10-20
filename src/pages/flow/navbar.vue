<template>
	<q-page class="column">
		<!-- //* ------------------------------ CARD NGAVS ------------------------------ *// -->
		<q-card elevated class="bg-cs-hl-1 q-pa-sm cs-border q-mb-md">
			<q-card-section class="cs-dense row">
				<div class="col-grow text-h3">Número de Gavetas:</div>
				<div class="col-shrink text-h3">{{ valnGavs }}</div>
			</q-card-section>

			<q-separator color="primary" />

			<q-card-section class="q-px-sm q-pb-xs">
				<q-slider
					v-model="valnGavs"
					:min="12"
					:max="32"
					:step="1"
					snap
					dense
					color="primary"
				/>
			</q-card-section>
		</q-card>

		<!-- //* ------------------------------ CARD BOTTOM ----------------------------- *// -->
		<q-card elevated class="bg-cs-hl-1 q-pa-sm cs-border flex flex-center">
			<Bottom />
		</q-card>

		<!-- //* ----------------------------- CARD LEGENDA ----------------------------- *// -->
		<div class="col-grow"></div>
		<q-card elevated class="bg-cs-hl-1 q-pa-sm cs-border q-mt-md q-mb-lg">
			<q-card-section class="cs-dense row">
				<div class="col-grow text-h3">Legenda:</div>
			</q-card-section>

			<q-separator color="primary" />

			<q-card-section class="q-px-sm q-pb-xs"> </q-card-section>
			<div class="row">
				<div class="col-4 q-my-xs text-right">Produto A</div>
				<div class="col-1 q-ma-xs bg-prA rounded-borders"></div>
				<div class="col-4 q-my-xs text-right">Produto B</div>
				<div class="col-1 q-ma-xs bg-prB rounded-borders"></div>
				<div class="col-4 q-my-xs text-right">Peneirado A</div>
				<div class="col-1 q-ma-xs bg-pnA rounded-borders"></div>
				<div class="col-4 q-my-xs text-right">Peneirado B</div>
				<div class="col-1 q-ma-xs bg-pnB rounded-borders"></div>
				<div class="col-4 q-my-xs text-right">Produto ?</div>
				<div class="col-1 q-ma-xs bg-pr0 rounded-borders"></div>
				<!-- <div class="col-4 q-my-xs text-right"></div>
				<div class="col-1 q-ma-xs rounded-borders"></div> -->
				<div class="col-4 q-my-xs text-right">Peneirado ?</div>
				<div class="col-1 q-ma-xs bg-pn0 rounded-borders"></div>
			</div>
		</q-card>
	</q-page>
</template>

<script>
import { computed, watch, ref, onMounted } from "vue";
import { useStore } from "vuex";
import Bottom from "components/FlowBottom.vue";

export default {
	name: "FlowNavbar",
	components: {
		Bottom,
	},
	setup() {
		const $store = useStore();

		const valnGavs = ref(28);
		watch(valnGavs, (currentValue, oldValue) => {
			$store.dispatch("flow/actSetNGavs", currentValue);
		});

		onMounted(() => {
			$store.dispatch("flow/actSetNGavs", valnGavs.value);
		});

		return {
			valnGavs,
		};
	},
};
</script>
