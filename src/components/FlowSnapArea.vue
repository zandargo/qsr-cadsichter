<template>
	<ellipse
		:id="sGPF"
		:cx="x"
		:cy="y"
		:rx="Rx"
		:ry="Ry"
		class="snapArea"
		:onmouseover="hoverIn"
		:onmouseout="hoverOut"
		@mouseup="handleMouseUp"
	/>

	<!-- <text :x="x" :y="y" text-anchor="middle" dominant-baseline="text-top">
		{{ sGPF }}
	</text>
	<text :x="x" :y="y" text-anchor="middle" dominant-baseline="hanging">
		{{ sPos }}
	</text> -->
</template>

<script>
import { ref, toRefs, toRef, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { xyGPF } from "src/modules/xyGPFmain";

export default {
	name: "svgFlowSnapArea",
	props: {
		gpf: Number,
		pos: String,
	},
	setup(props) {
		//* INITIAL DEFINITIONS
		const $store = useStore();
		const bCPinfo = computed({
			get: () => $store.state.flow.varMain.bCPinfo,
			set: () => $store.commit("module/mutName"),
		});
		const sGPF = "G" + ("0" + props.gpf).slice(-3);
		const sPos = props.pos.slice(0);

		const x = xyGPF[sGPF]["CPts"][sPos]["X"];
		const y = xyGPF[sGPF]["CPts"][sPos]["Y"];
		const Rx = sPos.slice(-1) == "e" ? 18 : 14;
		const Ry = sPos.slice(-1) == "e" ? 18 : 14;

		//* SNAP AREAS
		const hoverIn = () => {
			$store.commit("flow/mutSetHoverArea", {
				nGav: sGPF,
				pos: sPos,
			});
		};
		const hoverOut = () => {
			$store.commit("flow/mutSetHoverArea", {
				nGav: null,
				pos: null,
			});
		};
		const handleMouseUp = async () => {
			$store.commit("flow/mutSetCPstamp");
			await $store.dispatch("flow/actSnapCP");
			$store.commit("flow/mutSetCPdrag", {
				isDrag: false,
				gpf: null,
				type: null,
			});
			$store.commit("flow/mutSetHoverArea", {
				nGav: null,
				pos: null,
			});
		};

		//* RETURN
		return {
			...toRefs(props),
			sGPF,
			sPos,
			x,
			y,
			Rx,
			Ry,
			hoverIn,
			hoverOut,
			handleMouseUp,
		};
	},
};
</script>

<style lang="scss" scoped>
.snapArea {
	stroke: $color-l2;
	stroke-width: 1px;
	fill: $color-l4;
	opacity: 0%;
	// pointer-events: none;
}
</style>
