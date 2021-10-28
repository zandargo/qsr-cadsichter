<template>
	<circle
		:id="sID"
		:cx="x"
		:cy="y"
		:r="R"
		:class="classCP"
		@mousedown="handleMouseDown"
		@mouseup="handleMouseUp"
	/>

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
import { ref, toRefs, toRef, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
	name: "svgFlowCP",
	props: {
		sID: String,
		sType: String,
	},
	setup(props) {
		//* INITIAL DEFINITIONS
		const $store = useStore();
		const bCPinfo = computed({
			get: () => $store.state.flow.varMain.bCPinfo,
			set: () => $store.commit("module/mutName"),
		});

		const cpID = props.sID.slice(-3);
		const cpType = props.sType.slice(0);

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

		//* MOVE CP
		const x = ref(10);
		const y = ref(10);
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
			document.addEventListener("mousemove", handleMouseMove);
			$store.commit("flow/mutSetCPdrag", true);
		};
		const handleMouseMove = (e) => {
			const xDiff = tmpPos.x - e.pageX;
			const yDiff = tmpPos.y - e.pageY;

			tmpPos.x = e.pageX;
			tmpPos.y = e.pageY;

			x.value -= xDiff; //!  <--
			y.value -= yDiff; //!  <--
		};
		const handleMouseUp = () => {
			let tmpX = x.value;
			let tmpY = y.value;
			$store.dispatch("flow/actSnapCP", {
				gpf: cpID,
				type: cpType,
			});
			$store.commit("flow/mutSetCPdrag", false);
			//! Criar action no Vuex
			document.removeEventListener("mousemove", handleMouseMove);
		};

		//* ON MOUNTED
		onMounted(() => {
			x.value = $store.state.flow.GPF[cpID][cpType]["pos"]["X"];
			y.value = $store.state.flow.GPF[cpID][cpType]["pos"]["Y"];
			// $store.dispatch("flow/actSetNGavs", valnGavs.value);
		});
		//* RETURN
		return {
			cpID,
			cpType,
			x,
			y,
			R,
			classCP,
			bCPinfo,
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
	cursor: move !important;
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
</style>
