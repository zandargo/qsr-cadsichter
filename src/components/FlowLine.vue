<template>
	<!-- <div></div> -->
	<polyline :points="aPoly()" :stroke-dasharray="daLin()" :class="clsLin()">
		<animate
			attributeName="stroke-dashoffset"
			from="36"
			to="0"
			dur="3.6s"
			repeatCount="indefinite"
		/>
	</polyline>
</template>

<script>
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
	props: {
		sID: String,
	},
	setup(props) {
		const $store = useStore();
		const flat = (obj) => objectFlattener(obj);
		const cLado = (nLado) => convNLADO(nLado);
		const cIE = (nIE) => convNIE(nIE);

		const cpSelID = computed({
			get: () => $store.state.flow.varMain.cpSelID,
			set: () => $store.commit("flow/mutName"),
		});
		const sGPF = props.sID.length > 2 ? props.sID.slice(-5, -2) : props.sID;
		const nGav =
			props.sID.length > 2 ? parseInt(props.sID.slice(-4, -2), 10) : 0;
		const sType = props.sID.length > 2 ? props.sID.slice(-2) : "RX";
		const sProd = computed({
			get: () => {
				let str = "";
				switch (sGPF) {
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
						str = $store.state.flow.GPF[sGPF]["sProd"] || "0";
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
				switch (sGPF) {
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
						tmpObj = $store.state.flow.GPF[sGPF][sType];
						break;
				}
				return tmpObj;
			},
			set: () => {},
		});

		//* Define main polyline points
		const aPoly = () => {
			let sPts = "";
			let sLado;
			let iPara;
			// if (sGPF == "Ai" || objCP.value == {}) {
			// 	sPts = "0 0 0 0";
			// 	return sPts;
			// }
			switch (sGPF) {
				case "Ai":
					sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["X"] + ",";
					sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["Y"] - 150 + " ";
					sPts += flat(xyGPF["G01"]["CPts"][posEnt.value + "i"]) + " ";
					sPts += flat(xyGPF["G01"]["CPts"]["C"]);
					break;

				case "Ae":
					sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["X"] + ",";
					sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["Y"] - 75 + " ";
					sPts += flat(xyGPF["G01"]["CPts"][posEnt.value + "i"]) + " ";
					break;

				case "Be":
					sPts = "180 20 180 180 200 180"; //! <-- TODO: Calc pts Be
					break;

				default:
					if (objCP.value.nLado || objCP.value.nIE) {
						let yOff = sType == "RX" ? 0 : gpfMain.gpfH;
						sPts += xyGPF[sGPF]["CPts"]["C"]["X"] + " ";
						sPts += xyGPF[sGPF]["CPts"]["C"]["Y"] + yOff + " ";

						sLado = cLado(objCP.value.nLado) + cIE(objCP.value.nIE);
						sPts += xyGPF[sGPF]["CPts"][sLado]["X"] + " ";
						sPts += xyGPF[sGPF]["CPts"][sLado]["Y"] + yOff + " ";
					} else {
						sPts = "0 0 0 0";
					}
					break;
			}

			return sPts;
		};

		//* Get Main Line class
		const clsLin = () => {
			let sClass = "";
			switch (sGPF) {
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
					sType.slice(-2, -1) == "P" ? (sClass = "Pn") : (sClass = "Rx");
					sProd.value == "A" ? (sClass += "A") : false;
					sProd.value == "B" ? (sClass += "B") : false;
					sProd.value == "AB" ? (sClass += "AB") : false;
					!sProd.value ? (sClass += "0") : false;
					console.log(sClass);
					break;
			}
			return sClass;
		};
		//* Get Main Line Dasharray
		const daLin = () => {
			let sDA = "";
			if (props.sID.slice(-2, -1) == "P") {
				sDA = "6 12";
			} else {
				sDA = "12 6";
			}
			return sDA;
		};

		//* RETURN
		return { cLado, cIE, aPoly, clsLin, daLin };
	},
};
</script>

<style lang="scss" scoped>
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
</style>
