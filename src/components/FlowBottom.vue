<template>
	<svg :width="gpfBottom.width" :height="gpfBottom.height">
		<defs>
			<marker
				id="arrowhead"
				markerWidth="4"
				markerHeight="2"
				refX="0.8"
				refY="1"
				orient="auto"
			>
				<polygon points="0 0, 4 1, 0 2, 0.5 1" class="btm-arrowhead" />
			</marker>
		</defs>

		<polygon :points="flat(mFND.main)" style="opacity: 0" />

		<polygon :points="flat(mFND.F1)" class="bg-bottom-off" />
		<polygon :points="flat(mFND.F2)" class="bg-bottom-off" />
		<polygon :points="flat(mFND.D1)" class="bg-bottom-off" />
		<polygon :points="flat(mFND.D2)" class="bg-bottom-off" />
		<polygon :points="flat(mFND.E1)" class="bg-bottom-off" />
		<polygon :points="flat(mFND.E2)" class="bg-bottom-off" />
		<polygon :points="flat(mFND.T1)" class="bg-bottom-off" />
		<polygon :points="flat(mFND.T2)" class="bg-bottom-off" />

		<polygon :points="flat(mFND.Door)" class="bg-bottom" />

		<polygon :points="flat(mFND.Fi)" class="bg-bottom" />
		<polygon :points="flat(mFND.Fe)" class="bg-bottom" />
		<polygon :points="flat(mFND.Di)" class="bg-bottom" />
		<polygon :points="flat(mFND.De)" class="bg-bottom" />
		<polygon :points="flat(mFND.Ei)" class="bg-bottom" />
		<polygon :points="flat(mFND.Ee)" class="bg-bottom" />
		<polygon :points="flat(mFND.Ti)" class="bg-bottom" />
		<polygon :points="flat(mFND.Te)" class="bg-bottom" />

		<polygon :points="flat(mFND.DVF)" class="bg-bottom-on" />
		<polygon :points="flat(mFND.DVD)" class="bg-bottom-on" />
		<polygon :points="flat(mFND.DVE)" class="bg-bottom-on" />
		<polygon :points="flat(mFND.DVT)" class="bg-bottom-on" />

		<polyline
			points="10 80 125 80"
			class="btm-arrow"
			marker-end="url(#arrowhead)"
		/>
	</svg>
</template>

<script>
import { toRefs } from "vue";
import { useStore } from "vuex";
//_ import { useFlowBottom, gpfBottom } from "src/modules/xyBottom";
import { objectFlattener } from "src/modules/helperFunction";
import { gpfBottom, mFND } from "src/modules/xyBottom";

export default {
	name: "svgFlowBottom",
	setup() {
		const $store = useStore();
		const flat = (obj) => objectFlattener(obj);
		return {
			flat,
			gpfBottom,
			mFND,
		};
	},
};
</script>

<style lang="scss" scoped>
.flowBottom {
	// background-color: azure;
	// fill: aquamarine;
}
</style>
