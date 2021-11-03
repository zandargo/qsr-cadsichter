<template>
	//* Selection circle
	<g v-if="cpSelID == (sID + sType).slice(-5)">
		<circle :cx="x" :cy="y" :r="R" class="SelC SelC1" />
		<circle :cx="x" :cy="y" :r="R" class="SelC SelC2" />
		<circle :cx="x" :cy="y" :r="R" class="SelC SelC3" />
		<circle :cx="x" :cy="y" :r="R" class="SelC SelC4" />
	</g>

	//* Main circle
	<circle
		:id="sID"
		:cx="x"
		:cy="y"
		:r="R"
		:class="classCP"
		@mousedown="handleMouseDown"
		@mouseup="handleMouseUp"
	/>
	//* P1 aux
	<circle
		:id="sID + 'P1'"
		:cx="x - R * 0.85"
		:cy="y - R * 0.85"
		r="3"
		v-if="bCPinfo && cpType == 'P1' && bCPinfo"
		:class="classCP"
		@mousedown="handleMouseDown"
		@mouseup="handleMouseUp"
	/>
	//* P2 aux
	<circle
		:id="sID + 'P2'"
		:cx="x + R * 0.85"
		:cy="y - R * 0.85"
		r="3"
		v-if="bCPinfo && cpType == 'P2' && bCPinfo"
		:class="classCP"
		@mousedown="handleMouseDown"
		@mouseup="handleMouseUp"
	/>
	//* Text
	<text
		:x="x"
		:y="y"
		v-if="bCPinfo"
		text-anchor="middle"
		dominant-baseline="middle"
		class="txtCPin"
		@mousedown="handleMouseDown"
		@mouseup="handleMouseUp"
	>
		{{ cpID.slice(-2) }}
	</text>
</template>

<script>
import { ref, toRefs, toRef, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { gpfMain, xyGPF } from "src/modules/xyGPFmain";
import { convNIE, convNLADO } from "src/modules/helperFunction";

export default {
	name: "svgFlowCP",
	props: {
		sID: String,
		sType: String,
	},
	emits: ["changed"],
	setup(props, { emit }) {
		//* INITIAL DEFINITIONS
		const $store = useStore();
		const bCPinfo = computed({
			get: () => $store.state.flow.varMain.bCPinfo,
			set: () => $store.commit("module/mutName"),
		});
		const isDrag = computed({
			get: () => $store.state.flow.varMain.bCPdrag,
			set: () => {},
		});

		const cpID = props.sID.slice(-3);
		const cpType = props.sType.slice(0);
		const nGav = parseInt(cpID.slice(-2), 10);

		const R = cpType == "RX" ? 13 : 11;
		const sAB = computed({
			get: () => $store.state.flow.GPF[cpID]["sProd"],
			set: () => $store.commit("module/mutName"),
		});
		const classCP = computed(() => {
			let tmpStr = cpType == "RX" ? "Rx" : "Pn";
			sAB.value ? (tmpStr += sAB.value) : (tmpStr += "0");
			return tmpStr;
		});

		const nGavs = computed({
			get: () => $store.state.flow.varMain.nGavs,
			set: () => {},
		});
		const svgW = gpfMain.width;
		const svgH = gpfMain.y0 + gpfMain.yOff * (nGavs.value + 2);

		//* Selected CP
		const cpSelID = computed({
			get: () => $store.state.flow.varMain.cpSelID,
			set: () => $store.commit("flow/mutName"),
		});

		//* MOVE CP
		const x = ref(10);
		const y = ref(10);
		const xSto = computed({
			get: () => $store.state.flow.GPF[cpID][cpType]["pos"]["X"],
			set: () => {},
		});
		const ySto = computed({
			get: () => $store.state.flow.GPF[cpID][cpType]["pos"]["Y"],
			set: () => {},
		});
		watch(xSto, (curValue, oldValue) => {
			x.value = curValue;
			emit("changed");
		});
		watch(ySto, (curValue, oldValue) => {
			y.value = curValue;
			emit("changed");
		});

		const tmpPos = {
			id: "",
			x: 0,
			y: 0,
		};
		//* MOUSE EVENT FUNCTIONS
		const handleMouseDown = (e) => {
			tmpPos.id = (e.target || e.srcElement).id;
			tmpPos.x = e.pageX;
			tmpPos.y = e.pageY;
			$store.commit("flow/mutSetCPdrag", {
				isDrag: true,
				gpf: cpID,
				type: cpType,
			});
			document.addEventListener("mousemove", handleMouseMove);
		};

		const handleMouseMove = (e) => {
			const xDiff = tmpPos.x - e.pageX;
			const yDiff = tmpPos.y - e.pageY;
			tmpPos.x = e.pageX;
			tmpPos.y = e.pageY;
			x.value -= xDiff;
			y.value -= yDiff;
			if (
				x.value - 10 <= 0 ||
				x.value + 10 >= svgW ||
				y.value - 10 <= 0 ||
				y.value + 10 >= svgH
			) {
				handleMouseUp();
			}
		};

		const handleMouseUp = async () => {
			$store.commit("flow/mutSetCPstamp");
			try {
				document.removeEventListener("mousemove", handleMouseMove);
			} catch (error) {
				console.log(error);
			}
			await $store.dispatch("flow/actSnapCP");
			x.value = $store.state.flow.GPF[cpID][cpType]["pos"]["X"];
			y.value = $store.state.flow.GPF[cpID][cpType]["pos"]["Y"];
		};

		//* Watch status
		const nLado = computed({
			get: () => $store.state.flow.GPF[cpID][cpType]["nLado"],
			set: () => {},
		});
		const nIE = computed({
			get: () => $store.state.flow.GPF[cpID][cpType]["nIE"],
			set: () => {},
		});
		const nPara = computed({
			get: () => $store.state.flow.GPF[cpID][cpType]["nPara"],
			set: () => {},
		});
		//* Function position
		const calPos = () => {
			//* Default: GPF center
			let gpf = parseInt(cpID.slice(-2), 10);
			let pos = "C";
			let isOk = nPara.value && nLado.value ? true : false;
			//* Other cases
			//> External: any
			if (isOk && nIE.value == 1) {
				gpf = nPara.value;
				pos = convNLADO(nLado.value) + "e";
			}
			//> Internal: same GPF (RX only)
			if (isOk && cpType == "RX" && nIE.value == 0 && nPara.value == nGav) {
				gpf = nGav;
				pos = convNLADO(nLado.value) + "i";
			}
			//> Internal: any below
			if (isOk && nIE.value == 0 && nPara.value > nGav) {
				gpf = nPara.value;
				pos = convNLADO(nLado.value) + "i";
			}

			let sGav = "G" + ("0" + gpf).slice(-2);
			x.value = xyGPF[sGav]["CPts"][pos]["X"];
			y.value = xyGPF[sGav]["CPts"][pos]["Y"];
			pos == "C" && cpType == "P1" ? (x.value -= 25) : false;
			pos == "C" && cpType == "P2" ? (x.value += 25) : false;
		};

		watch(nLado, calPos);
		watch(nIE, calPos);
		watch(nPara, calPos);
		watch(isDrag, (currentValue, oldValue) => {
			if (!currentValue) {
				try {
					document.removeEventListener("mousemove", handleMouseMove);
				} catch (error) {}
			}
			calPos;
		});
		const dropStamp = computed({
			get: () => $store.state.flow.varMain.drag.lastDrop,
			set: () => {},
		});
		watch(dropStamp, calPos);

		//* ON MOUNTED
		onMounted(() => {
			x.value = $store.state.flow.GPF[cpID][cpType]["pos"]["X"];
			y.value = $store.state.flow.GPF[cpID][cpType]["pos"]["Y"];
		});
		//* RETURN
		return {
			cpID,
			cpType,
			nGav,
			x,
			y,
			R,
			classCP,
			bCPinfo,
			cpSelID,
			handleMouseDown,
			handleMouseMove,
			handleMouseUp,
		};
	},
};
</script>

<style lang="scss" scoped>
circle {
	// cursor: move !important;
}

.txtCPin {
	font-size: 10pt;
	fill: rgba(255, 255, 255, 0.85);
	// cursor: move !important;
}

.txtCPout {
	font-size: 10pt;
	font-weight: bold;
	fill: $secondary;
}

.Rx0 {
	fill: rgba($color_Pr_0, 0.75);
	stroke: none;
}
.Pn0 {
	fill: rgba($color_Pn_0, 0.75);
	stroke: none;
}
.RxA {
	fill: rgba($color_Pr_A, 0.75);
	stroke: none;
}
.PnA {
	fill: rgba($color_Pn_A, 0.75);
	stroke: none;
}
.RxB {
	fill: rgba($color_Pr_B, 0.75);
	stroke: none;
}
.PnB {
	fill: rgba($color_Pn_B, 0.75);
	stroke: none;
}
//* Mixed class
.RxAB {
	fill: rgba($color_Pr_A, 0.75);
	stroke: rgba($color_Pr_B, 0.75);
	stroke-width: 3px;
}
.PnAB {
	fill: rgba($color_Pn_A, 0.75);
	stroke: rgba($color_Pn_B, 0.75);
	stroke-width: 3px;
}

// #sel01 {
// 	transform-origin: center;
// }
//* Selection Circle
.SelC {
	transform-box: fill-box;
	transform-origin: center;
	stroke: rgba($positive, 0.75);
	fill: none;
}
.SelC1 {
	animation: sel01 4s ease-in-out -3s infinite forwards;
}
.SelC2 {
	animation: sel01 4s ease-in-out -2s infinite forwards;
}
.SelC3 {
	animation: sel01 4s ease-in-out -1s infinite forwards;
}
.SelC4 {
	animation: sel01 4s ease-in-out 0s infinite forwards;
}

@keyframes sel01 {
	0% {
		transform: scale(0.5);
		stroke-width: 0px;
		opacity: 0%;
	}
	10% {
		transform: scale(0.5);
		stroke-width: 5px;
		opacity: 100%;
	}
	90% {
		transform: scale(2);
		stroke-width: 0.1px;
		opacity: 100%;
	}
	100% {
		transform: scale(2.5);
		stroke-width: 0.1px;
		opacity: 0%;
	}
}
</style>
