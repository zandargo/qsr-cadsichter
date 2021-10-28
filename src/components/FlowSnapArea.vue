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
		const Rx = sPos.slice(-1) == "e" ? 14 : 8;
		const Ry = sPos.slice(-1) == "e" ? 14 : 12;

		//* SNAP AREAS
		const hoverIn = () => {
			let obj = {
				nGav: sGPF,
				pos: sPos,
			};
			$store.commit("flow/mutSetHoverArea", obj);
		};
		const hoverOut = () => {
			let obj = {
				nGav: null,
				pos: null,
			};
			$store.commit("flow/mutSetHoverArea", obj);
		};

		//* RETURN
		return { ...toRefs(props), sGPF, sPos, x, y, Rx, Ry, hoverIn, hoverOut };
	},
};
</script>

<style lang="scss" scoped>
.snapArea {
	fill: rgba(255, 255, 255, 0.1);
	stroke: rgba(0, 0, 0, 0.2);
	opacity: 0%;
}
</style>
