<template>
	<div class="row">
		<div class="col-4 text-left text-h3 q-pr-md text-primary">
			{{ sID }}
		</div>
		<q-slider
			v-model="valSlide"
			:min="1"
			:max="9"
			:step="1"
			snap
			dense
			v-if="nGav != nGavs"
			:disable="(nGav == nGavs ? true : false) || !bEditMode"
			color="primary"
			class="col-8 q-my-xs q-mb-md"
		/>
		<div v-if="nGav == nGavs" class="col-8" style="height: 24px"></div>
		<div class="text-h4 q-my-xs text-right col-9 txt-cs-d1">Altura:</div>
		<div class="text-h3 q-my-xs text-right col-3 txt-cs-d3">
			{{ hGPF }}
		</div>
		<div v-if="hEsp" class="text-h5 q-my-xs text-right col-9 txt-cs-d1">
			Esp.:
		</div>
		<div v-if="hEsp" class="text-h4 q-my-xs text-right col-3 txt-cs-d3">
			{{ hEsp }}
		</div>
	</div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";

export default {
	name: "flowSlideH",
	props: {
		sID: String,
	},
	setup(props) {
		const hVals = [32, 65, 75, 85, 95, 105, 115, 125, 135, 145];
		const valsR = [
			[32, 0],
			[65, 0],
			[75, 0],
			[85, 0],
			[65, 30],
			[75, 30],
			[85, 30],
			[65, 60],
			[75, 60],
			[85, 60],
		];

		const $store = useStore();
		const bEditMode = computed({
			get: () => $store.state.flow.varMain.bEditMode,
			set: () => {},
		});
		const sID = props.sID.slice(-3);
		const nGav = parseInt(sID.slice(-2), 10);
		const nGavs = computed({
			get: () => $store.state.flow.varMain.nGavs,
			set: () => {},
		});

		// const valSlide = ref(1);
		const valSlide = computed({
			get: () => $store.state.flow.GPF[sID]["alt"]["vSl"],
			set: (value) =>
				$store.commit("flow/mutSetGpfSlider", {
					id: props.sID,
					val: value,
				}),
		});

		const valH = computed({
			get: () => {
				if (parseInt(props.sID.slice(-2), 10) != nGavs.value) {
					return $store.state.flow.GPF[sID]["alt"];
				} else {
					return 32;
				}
			},
			set: () =>
				$store.commit("flow/mutSetGpfH", {
					id: props.sID,
					hGPF: valsR[valSlide.value][0],
					hSPC: valsR[valSlide.value][1],
				}),
		});

		const hGPF = ref(nGav != nGavs.value ? 65 : 32);
		const hEsp = ref(0);

		const calcH = () => {
			hGPF.value = nGav != nGavs.value ? valsR[valSlide.value][0] : 32;
			hEsp.value = nGav != nGavs.value ? valsR[valSlide.value][1] : 0;

			$store.commit("flow/mutSetGpfH", {
				id: props.sID,
				hGPF: valsR[valSlide.value][0],
				hSPC: valsR[valSlide.value][1],
			});
		};

		watch(valSlide, calcH);
		watch(nGavs, calcH);

		onMounted(() => {
			hGPF.value =
				nGav != nGavs.value ? $store.state.flow.GPF[sID]["alt"]["gpf"] : 32;
			hEsp.value =
				nGav != nGavs.value ? $store.state.flow.GPF[sID]["alt"]["spc"] : 0;
			for (let i = 1; i < valsR.length; i++) {
				valsR[i][0] == hGPF.value && valsR[i][1] == hEsp.value
					? (valSlide.value = i)
					: false;
			}

			calcH;
		});

		return { bEditMode, nGav, nGavs, valSlide, valH, valsR, hGPF, hEsp };
	},
};
</script>

<style lang="scss" scoped></style>
