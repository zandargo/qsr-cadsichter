<template>
	<svg
		id="svgBottom"
		xmlns="http://www.w3.org/2000/svg"
		:width="gpfBottom.width"
		:height="gpfBottom.height"
	>
		<defs>
			<marker
				id="btm-arwhead"
				markerWidth="4"
				markerHeight="2"
				refX="0.8"
				refY="1"
				orient="auto"
			>
				<polygon points="0 0, 4 1, 0 2, 0.5 1" class="btm-arrowhead" />
			</marker>
		</defs>

		<!-- <polygon :points="flat(mFND.main)" style="opacity: 0" /> -->

		<polygon :points="flat(mFND.F1)" class="bg-bottom-off PrA" />
		<polygon :points="flat(mFND.F2)" class="bg-bottom-off PnA" />
		<polygon :points="flat(mFND.D1)" class="bg-bottom-off PrB" />
		<polygon :points="flat(mFND.D2)" class="bg-bottom-off PnB" />
		<polygon :points="flat(mFND.E1)" class="bg-bottom-off" />
		<polygon :points="flat(mFND.E2)" class="bg-bottom-off" />
		<polygon :points="flat(mFND.T1)" class="bg-bottom-off Pr0" />
		<polygon :points="flat(mFND.T2)" class="bg-bottom-off Pn0" />

		<!-- <polygon :points="flat(mFND.Door)" class="bg-bottom" />
		<text
			:x="mFND.tAc.x"
			:y="mFND.tAc.y"
			text-anchor="middle"
			dominant-baseline="mathematical"
			class="txt-Ac"
		>
			Porta
		</text> -->

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

		<polyline :points="flat(mFND.F1i)" class="btm-arw" />
		<polyline :points="flat(mFND.F1e)" class="btm-arw" />
		<polyline :points="flat(mFND.F2i)" class="btm-arw" />
		<polyline :points="flat(mFND.F2e)" class="btm-arw" />
		<polyline :points="flat(mFND.D1i)" class="btm-arw" />
		<polyline :points="flat(mFND.D1e)" class="btm-arw" />
		<polyline :points="flat(mFND.D2i)" class="btm-arw" />
		<polyline :points="flat(mFND.D2e)" class="btm-arw" />
		<polyline :points="flat(mFND.E1i)" class="btm-arw" />
		<polyline :points="flat(mFND.E1e)" class="btm-arw" />
		<polyline :points="flat(mFND.E2i)" class="btm-arw" />
		<polyline :points="flat(mFND.E2e)" class="btm-arw" />
		<polyline :points="flat(mFND.T1i)" class="btm-arw" />
		<polyline :points="flat(mFND.T1e)" class="btm-arw" />
		<polyline :points="flat(mFND.T2i)" class="btm-arw" />
		<polyline :points="flat(mFND.T2e)" class="btm-arw" />

		<text
			:x="mFND.tF1.x"
			:y="mFND.tF1.y"
			text-anchor="end"
			dominant-baseline="text-top"
			class="txt-ON"
		>
			<!-- F1 -->
			{{ FND.F1.name }}
		</text>
		<text
			:x="mFND.tF2.x"
			:y="mFND.tF2.y"
			text-anchor="start"
			dominant-baseline="text-top"
			class="txt-ON"
		>
			F2
		</text>

		<text
			:x="mFND.tT1.x"
			:y="mFND.tT1.y"
			text-anchor="end"
			dominant-baseline="hanging"
			class="txt-ON"
		>
			T1
		</text>
		<text
			:x="mFND.tT2.x"
			:y="mFND.tT2.y"
			text-anchor="start"
			dominant-baseline="hanging"
			class="txt-ON"
		>
			T2
		</text>
		<text
			:x="mFND.tD1.x"
			:y="mFND.tD1.y"
			text-anchor="end"
			dominant-baseline="text-top"
			class="txt-ON"
		>
			D1
		</text>
		<text
			:x="mFND.tD2.x"
			:y="mFND.tD2.y"
			text-anchor="end"
			dominant-baseline="hanging"
			class="txt-ON"
		>
			D2
		</text>
		<text
			:x="mFND.tE1.x"
			:y="mFND.tE1.y"
			text-anchor="start"
			dominant-baseline="text-top"
		>
			E1
		</text>
		<text
			:x="mFND.tE2.x"
			:y="mFND.tE2.y"
			text-anchor="start"
			dominant-baseline="hanging"
		>
			E2
		</text>
	</svg>

	<div class="txt-Ac full-width text-center divAc q-mt-xs">Porta</div>
</template>

<script>
import { toRefs, onMounted, computed } from "vue";
import { useStore } from "vuex";
//_ import { useFlowBottom, gpfBottom } from "src/modules/xyBottom";
import { objectFlattener } from "src/modules/helperFunction";
import { gpfBottom, mFND } from "src/modules/xyBottom";

export default {
	name: "svgFlowBottom",
	setup() {
		const $store = useStore();
		const flat = (obj) => objectFlattener(obj);

		onMounted(() => {
			// const svgCircle = document.getElementById("svgBottom");
			// const NS = "http://www.w3.org/2000/svg";
			// const circlex = 20;
			// const circley = 20;
			// for (let i = 0; i < 10; i++) {
			// 	let circle = document.createElementNS(NS, "circle");
			// 	console.log(circle);
			// 	circle.setAttribute("cx", circlex + i * 15);
			// 	circle.setAttribute("cy", circley + i * 15);
			// 	circle.setAttribute("r", 8);
			// 	svgCircle.appendChild(circle);
			// }
		});

		const FND = computed({
			get: () => $store.state.flow.FND,
			// set: () => {},
		});

		return {
			flat,
			gpfBottom,
			mFND,
			FND,
		};
	},
};
</script>

<style lang="scss" scoped>
.flowBottom {
	// background-color: azure;
	// fill: aquamarine;
}

text {
	font-size: 24px;
	fill: $color-l1;
	font-family: "RobotoCondensed", Arial, Helvetica, sans-serif;
	// &:hover {
	// 	fill: $color-d4;
	// }
}

.txt-ON {
	fill: $color-l5 !important;
}

.txt-Ac {
	font-size: 20px;
	fill: $color-d2;
	color: $color-d2;
	font-variant-caps: petite-caps;
	letter-spacing: 2px;
}

.divAc {
	height: 24px;
	line-height: 24px;
	border-radius: 0 0 24px 24px !important;
	background-color: $color-l2;
}

.PrA {
	fill: $color_Pr_A;
}
.PnA {
	fill: $color_Pn_A;
}
.PrB {
	fill: $color_Pr_B;
}
.PnB {
	fill: $color_Pn_B;
}
.Pr0 {
	fill: $color_Pr_0;
}
.Pn0 {
	fill: $color_Pn_0;
}
</style>
