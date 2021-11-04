<template>
	//* SELECTION LINE
	<defs>
		<mask id="maskSL1" maskunits="userSpaceOnUse" v-if="goBtm">
			<polyline :points="aPoly" stroke="white" stroke-width="60" />
			<polyline :points="aPoly" stroke="black" class="mSelLin1" />
		</mask>
		<mask id="maskSL2" maskunits="userSpaceOnUse" v-if="goBtm">
			<polyline :points="aPoly" stroke="white" stroke-width="60" />
			<polyline :points="aPoly" stroke="black" class="mSelLin2" />
		</mask>
	</defs>

	//* SELECTION LINE
	<g id="gSelLin" v-if="goBtm">
		<polyline :points="aPoly" class="SelLin SelLin1" mask="url(#maskSL1)" />
		<polyline :points="aPoly" class="SelLin SelLin2" mask="url(#maskSL2)" />
	</g>
</template>

<script>
//* -------------------------------- SCRIPT -------------------------------- *//
import { computed } from "vue";
import { useStore } from "vuex";
import {
	objectFlattener,
	convNLADO,
	convNIE,
} from "src/modules/helperFunction";
import { gpfMain, xyGPF } from "src/modules/xyGPFmain";

export default {
	name: "svgFlowLine",
	setup() {
		const $store = useStore();
		const flat = (obj) => objectFlattener(obj);
		const cLado = (nLado) => convNLADO(nLado);
		const cIE = (nIE) => convNIE(nIE);

		const cpSelID = computed({
			get: () => $store.state.flow.varMain.cpSel.id,
			set: () => $store.commit("flow/mutName"),
		});
		// const sGPF =
		// 	cpSelID.value.length > 2 ? cpSelID.value.slice(-5, -2) : cpSelID.value;
		const sGPF = computed(() => {
			return cpSelID.value.length > 2
				? cpSelID.value.slice(-5, -2)
				: cpSelID.value;
		});
		// const nGav =
		// 	cpSelID.value.length > 2 ? parseInt(cpSelID.value.slice(-4, -2), 10) : 0;
		const nGav = computed(() => {
			return cpSelID.value.length > 2
				? parseInt(cpSelID.value.slice(-4, -2), 10)
				: 0;
		});
		// const sType = cpSelID.value.length > 2 ? cpSelID.value.slice(-2) : "RX";
		const sType = computed(() => {
			return cpSelID.value.length > 2 ? cpSelID.value.slice(-2) : "RX";
		});
		const sProd = computed({
			get: () => {
				let str = "";
				switch (sGPF.value) {
					case "Ai":
						str = "A";
						break;
					case "Ae":
						str = "A";
						break;
					case "Be":
						str = "B";
						break;
					default:
						str = $store.state.flow.GPF[sGPF.value]["sProd"] || "0";
						break;
				}
				return str;
			},
			set: () => $store.commit("module/mutName"),
		});
		const posEnt = computed({
			get: () => $store.state.flow.varMain.posEnt,
			set: () => {},
		});
		const objCP = computed({
			get: () => {
				let tmpObj;
				switch (sGPF.value) {
					case "Ai":
						tmpObj = {
							act: true,
							nPara: 0,
						};
						break;
					case "Ae":
						tmpObj = $store.state.flow.GPF["G00"]["A"];
						break;
					case "Be":
						tmpObj = $store.state.flow.GPF["G00"]["B"];
						break;
					default:
						tmpObj = $store.state.flow.GPF[sGPF.value][sType.value];
						break;
				}
				return tmpObj;
			},
			set: () => {},
		});

		const goBtm = computed({
			get: () => $store.state.flow.varMain.cpSel.bGoBtm,
			set: () => {},
		});

		//* Define main polyline points
		const aPoly = computed({
			get: () => $store.state.flow.varMain.cpSel.sLine,
			set: () => {},
		});

		//* Get Main Line class
		const clsLin = () => {
			let sClass = "";
			switch (sGPF.value) {
				case "Ai":
					sClass = "RxA";
					break;
				case "Ae":
					sClass = "RxA";
					break;
				case "Be":
					sClass = "RxB";
					break;
				default:
					sType.value.slice(-2, -1) == "P" ? (sClass = "Pn") : (sClass = "Rx");
					sProd.value == "A" ? (sClass += "A") : false;
					sProd.value == "B" ? (sClass += "B") : false;
					sProd.value == "AB" ? (sClass += "AB") : false;
					!sProd.value ? (sClass += "0") : false;
					break;
			}
			return sClass;
		};
		//* Get Main Line Dasharray
		const daLin = () => {
			let sDA = "";
			if (cpSelID.value.slice(-2, -1) == "P") {
				sDA = "6 12";
			} else {
				sDA = "12 6";
			}
			return sDA;
		};

		//* RETURN
		return { cpSelID, sGPF, sType, cLado, cIE, aPoly, clsLin, daLin, goBtm };
	},
};
</script>

<style lang="scss" scoped>
//* --------------------------------- STYLE -------------------------------- *//
.isON {
	visibility: visible;
}
.isOFF {
	visibility: hidden;
}

polyline {
	fill: none;
	stroke-linejoin: round;
	stroke-linecap: round;
}

$RxW: 4px;
$PnW: 4px;

.Rx0 {
	stroke: $color_Pr_0;
	stroke-width: $RxW;
}
.Pn0 {
	stroke: $color_Pn_0;
	stroke-width: $PnW;
}
.RxA {
	stroke: $color_Pr_A;
	stroke-width: $RxW;
}
.PnA {
	stroke: $color_Pn_A;
	stroke-width: $PnW;
}
.RxB {
	stroke: $color_Pr_B;
	stroke-width: $RxW;
}
.PnB {
	stroke: $color_Pn_B;
	stroke-width: $PnW;
}
//* Mixed class
.RxAB {
	// stroke: mix($color_Pr_A, $color_Pr_B, 1);
	animation: mixRxAB 1s linear infinite alternate;
	stroke-width: $RxW;
}
.PnAB {
	// stroke: mix($color_Pn_A, $color_Pn_B, 0.5);
	animation: mixPnAB 1s linear infinite alternate;
	stroke-width: $PnW;
}

@keyframes mixRxAB {
	0% {
		stroke: $color_Pr_A;
	}
	20% {
		stroke: $color_Pr_A;
	}
	100% {
		stroke: $color_Pr_B;
	}
}
@keyframes mixPnAB {
	0% {
		stroke: $color_Pn_A;
	}
	20% {
		stroke: $color_Pn_A;
	}
	100% {
		stroke: $color_Pn_B;
	}
}

//* Selection line
.SelLin {
	// stroke: rgba($positive, 0.5);
	stroke: rgba($selBTM, 0.5);
	stroke-width: 0px;
}

.mSelLin {
	stroke: $color-l4;
	stroke-width: 0px;
}

.SelLin1 {
	animation: selLin1 2s ease-out -1s infinite forwards;
}
.mSelLin1 {
	animation: mselLin1 2s ease-out -1s infinite forwards;
}

@keyframes selLin1 {
	0% {
		stroke-width: 0px;
	}
	100% {
		stroke-width: 24px;
	}
}
@keyframes mselLin1 {
	0% {
		stroke-width: 4px;
	}
	25% {
		stroke-width: 4px;
	}
	100% {
		stroke-width: 24px;
	}
}
.SelLin2 {
	animation: selLin1 2s ease-out 0s infinite forwards;
}
.mSelLin2 {
	animation: mselLin1 2s ease-out 0s infinite forwards;
}
</style>
