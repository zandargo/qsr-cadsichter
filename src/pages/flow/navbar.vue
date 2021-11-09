<template>
	<q-page class="column">
		<!-- //* ------------------------------ CARD NGAVS ------------------------------ *// -->
		<q-card elevated class="bg-cs-hl-1 cs-border q-py-sm q-px-sm q-mb-md">
			<q-card-section class="q-pt-none q-px-md row">
				<div class="col-grow text-h3 txt-cs-d2">Número de Gavetas:</div>
				<div class="col-shrink text-h3 txt-cs-d3">{{ valnGavs }}</div>
				<q-slider
					v-model="valnGavs"
					:min="6"
					:max="32"
					:step="1"
					snap
					dense
					color="primary"
					:disable="!bEditMode"
				/>
			</q-card-section>

			<q-separator color="primary " />

			<q-card-section class="q-mt-md q-mb-sm q-px-md q-py-none row">
				<div class="col-grow text-h3 txt-cs-d2">Altura Total:</div>
				<div class="col-shrink text-h3 txt-cs-d3">{{ hTotal }} mm</div>
			</q-card-section>
			<q-separator />
			<q-card-section
				class="q-my-none q-pa-sm row justify-between text-h4 txt-cs-d3"
			>
				<div class="col-5 column txt-jbtw">
					<div class="col-auto q-pb-xs">GPF_85: {{ nGPF85 || "" }}</div>
					<div class="col-auto q-pb-xs">GPF_75: {{ nGPF75 || "" }}</div>
					<div class="col-auto q-pb-xs">GPF_65: {{ nGPF65 || "" }}</div>
					<div class="col-auto q-pb-xs">GPF_32: 1</div>
				</div>
				<q-separator vertical />

				<div class="col-5 column justify-start txt-jbtw">
					<div class="col-auto q-pb-xs">ESP_30: {{ nSPC30 || "" }}</div>
					<div class="col-auto q-pb-xs">ESP_60: {{ nSPC60 || "" }}</div>
				</div>
			</q-card-section>
		</q-card>

		<!-- //* ------------------------------ CARD BOTTOM ----------------------------- *// -->
		<q-card
			elevated
			class="bg-cs-hl-1 q-pa-sm q-mb-md cs-border flex flex-center"
		>
			<Bottom />
		</q-card>
		<!-- //* ----------------------------- CARD SETTINGS ---------------------------- *// -->
		<q-card elevated class="bg-cs-hl-1 q-pa-sm cs-border q-mb-md">
			<q-card-section class="cs-dense row">
				<div class="col-grow text-h3 txt-cs-d3">Controles</div>
			</q-card-section>

			<q-separator color="primary" />

			<q-card-section class="q-px-md q-py-xs row">
				<div class="col-grow text-h3 txt-cs-d2">Modo Edição</div>
				<q-toggle
					class="col-srhink"
					dense
					size="45px"
					v-model="bEditMode"
					icon="edit"
					unchecked-icon="close"
					keep-color
				/>
			</q-card-section>
			<q-card-section class="q-px-md q-py-xs row">
				<div class="col-grow text-h3 txt-cs-d2">Entrada</div>
				<q-btn-toggle
					:disable="!bEditMode"
					size="1rem"
					padding="0 12px"
					v-model="posEnt"
					toggle-color="primary"
					:options="[
						{ label: 'Std', value: 'F' },
						{ label: 'Inv', value: 'T' },
					]"
				/>
			</q-card-section>
			<q-card-section class="q-px-md q-py-xs row">
				<div class="col-grow text-h3 txt-cs-d2">Ordem</div>
				<q-btn-toggle
					:disable="!bEditMode"
					size="1rem"
					padding="0 15px"
					v-model="posAB"
					toggle-color="primary"
					:options="[
						{ label: 'AB', value: 'AB' },
						{ label: 'BA', value: 'BA' },
					]"
				/>
			</q-card-section>
		</q-card>
		<!-- //* ----------------------------- CARD DETAILS ----------------------------- *// -->
		<div class="col-grow"></div>
		<q-card elevated class="bg-cs-hl-1 q-pa-sm cs-border q-mt-md q-mb-lg">
			<q-card-section class="cs-dense row">
				<div class="col-grow text-h3">Legenda:</div>
			</q-card-section>

			<q-separator color="primary" />

			<q-card-section class="q-px-sm q-py-xs"> </q-card-section>
			<div class="row text-h4">
				<div class="col row">
					<div class="col-grow q-my-none q-pt-xs text-right">Prod/Rech A</div>
					<div class="col-2 q-mx-xs q-my-xs bg-prA rounded-borders"></div>

					<div class="col-grow q-my-none q-pt-xs text-right">Peneirado A</div>
					<div class="col-2 q-mx-xs q-my-xs bg-pnA rounded-borders"></div>

					<div class="col-grow q-my-none q-pt-xs text-right">Prod/Rech ?</div>
					<div class="col-2 q-mx-xs q-my-xs bg-pr0 rounded-borders"></div>
				</div>
				<div class="col row">
					<div class="col-grow q-my-none q-pt-xs text-right">Prod/Rech B</div>
					<div class="col-2 q-mx-xs q-my-xs bg-prB rounded-borders"></div>

					<div class="col-grow q-my-none q-pt-xs text-right">Peneirado B</div>
					<div class="col-2 q-mx-xs q-my-xs bg-pnB rounded-borders"></div>

					<div class="col-grow q-my-none q-pt-xs text-right">Peneirado ?</div>
					<div class="col-2 q-mx-xs q-my-xs bg-pn0 rounded-borders"></div>
				</div>
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

		// const bEditMode = ref(true);
		const bEditMode = computed({
			get: () => $store.state.flow.varMain.bEditMode,
			set: () => $store.commit("flow/mutTglEditMode"),
		});

		const valnGavs = ref(6);
		watch(valnGavs, (currentValue, oldValue) => {
			$store.dispatch("flow/actSetNGavs", currentValue);
		});

		// const posEnt = ref("F");
		const posEnt = computed({
			get: () => $store.state.flow.varMain.posEnt,
			set: (value) => $store.commit("flow/mutSetPosEnt", value),
		});
		// const posAB = ref("AB");
		const posAB = computed({
			get: () => $store.state.flow.varMain.posAB,
			set: (value) => $store.commit("flow/mutSetPosAB", value),
		});

		const hTotal = computed(() => $store.getters["flow/getHtotal"]);
		const nGPF85 = computed(() => $store.getters["flow/getNumGpfH"](85));
		const nGPF75 = computed(() => $store.getters["flow/getNumGpfH"](75));
		const nGPF65 = computed(() => $store.getters["flow/getNumGpfH"](65));
		const nSPC30 = computed(() => $store.getters["flow/getNumGpfS"](30));
		const nSPC60 = computed(() => $store.getters["flow/getNumGpfS"](60));

		onMounted(() => {
			valnGavs.value = $store.state.flow.varMain.nGavs;
			$store.dispatch("flow/actSetNGavs", valnGavs.value);
		});

		return {
			valnGavs,
			bEditMode,
			posEnt,
			posAB,
			hTotal,
			nGPF85,
			nGPF75,
			nGPF65,
			nSPC30,
			nSPC60,
		};
	},
};
</script>

<style lang="scss" scoped>
// .material-icons {
// 	font-size: 24px !important;
// }
// .txt-jbtw {
// 	padding: 0;
// 	text-align: justify-all;
// 	// text-align: justify;
// 	text-justify: inter-word;
// }

.txt-jbtw {
	div {
		text-align: justify;
		margin-bottom: -1em !important;

		&:after {
			content: "";
			display: inline-block;
			width: 100%;
		}
	}
}
</style>
