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

			<text
				id="tF1"
				x="125"
				y="140"
				text-anchor="middle"
				dominant-baseline="middle"
				class="txtF1"
			></text>
		</defs>

		<!-- <polygon :points="flat(mFND.main)" style="opacity: 0" /> -->

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
		>
			F1
		</text>
		<text
			:x="mFND.tF2.x"
			:y="mFND.tF2.y"
			text-anchor="start"
			dominant-baseline="text-top"
		>
			F2
		</text>

		<text
			:x="mFND.tT1.x"
			:y="mFND.tT1.y"
			text-anchor="end"
			dominant-baseline="hanging"
		>
			T1
		</text>
		<text
			:x="mFND.tT2.x"
			:y="mFND.tT2.y"
			text-anchor="start"
			dominant-baseline="hanging"
		>
			T2
		</text>
		<text
			:x="mFND.tD1.x"
			:y="mFND.tD1.y"
			text-anchor="end"
			dominant-baseline="text-top"
		>
			D1
		</text>
		<text
			:x="mFND.tD2.x"
			:y="mFND.tD2.y"
			text-anchor="end"
			dominant-baseline="hanging"
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
</template>

<script>
import { toRefs, onMounted } from "vue";
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
</style>
