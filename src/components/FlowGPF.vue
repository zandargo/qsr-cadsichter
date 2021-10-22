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
				<polygon points="0 0, 4 1, 0 2, 0.5 1" class="btmARWH" />
			</marker>
		</defs>
	</svg>
</template>

<script>
import { toRefs, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { objectFlattener } from "src/modules/helperFunction";
import {} from "src/modules/xyGPFmain";

export default {
	name: "svgFlowGPF",
	setup() {
		//* Initial definitions
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

		//* Outlet pannel state references
		const FND = computed({
			get: () => $store.state.flow.FND,
			set: () => {},
		});
		const DV = computed({
			get: () => $store.state.flow.DV,
			set: () => {},
		});
		const DI = computed({
			get: () => $store.state.flow.DI,
			set: () => {},
		});

		//* Get outlet class
		const getClassFr = (obj) => {
			let str = "btmFr ";
			if (obj.act) {
				str += " bgON";
			} else {
				str += " bgOFF";
			}
			if (obj.sel) {
				str += " " + obj.type + obj.prod;
			}
			return str;
		};
		//* Get text class
		const getClassTxt = (obj) => {
			let str = "";
			if (obj.act && obj.sel) {
				str += "txt-ON";
			}
			return str;
		};
		//* Get DV class
		const getClassDV = (obj) => {
			let str = "btmDV ";
			if (obj.act) {
				str += "isON";
			} else {
				str += "isOFF";
			}
			return str;
		};
		//* Get arrow class
		const getClassArw = (obj) => {
			let str = "btmARW ";
			if (obj.act) {
				str += "isON";
			} else {
				str += "isOFF";
			}
			return str;
		};

		//* Toggle exit selection state
		const clkBtm = (obj) => $store.dispatch("flow/actClkBtm", obj);

		//* Toggle DV selection state
		const clkDV = (obj) => $store.dispatch("flow/actClkBtmDV", obj);

		//* Return
		return {
			flat,
			gpfBottom,
			mFND,
			FND,
			DV,
			DI,
			getClassFr,
			getClassTxt,
			getClassDV,
			getClassArw,
			clkBtm,
			clkDV,
		};
	},
};
</script>

<style lang="scss" scoped>
$bg-on: darken($color-l2, 5%);
$bg-off: lighten($bg-on, 10%);

.bgON {
	background-color: $bg-on;
	fill: $bg-on;
}
.bgOFF {
	background-color: $bg-off;
	fill: $bg-off;
}

.btmCh {
	fill: $bg-off;
	stroke: $color-l3-hl1;
	stroke-width: 4px;
}
.btmFr {
	stroke: $color-l3-hl1;
	stroke-width: 8px;
}
.btmDV {
	fill: $color-d2;
	stroke: $color-l3-hl1;
	stroke-width: 4px;
}

text {
	font-size: 24px;
	fill: $color-l1;
	font-family: "RobotoCondensed", Arial, Helvetica, sans-serif;
}

.txt-ON {
	fill: $color-l5 !important;
}

.txt-Ac {
}

.divAc {
	height: 24px;
	border-radius: 0 0 24px 24px !important;
	background-color: $bg-off;
	font-size: 20px;
	line-height: 24px;
	font-variant-caps: petite-caps;
	letter-spacing: 2px;
	fill: $color-d2;
	color: $color-d2;
}

.btmARW {
	stroke: $color-d2;
	stroke-width: 6px;
	marker-end: url(#btm-arwhead);
}
.btmARWH {
	fill: $color-d2;
	stroke-width: 0;
}

.isON {
	// visibility: visible;
	opacity: 100%;
}
.isOFF {
	// visibility: hidden;
	opacity: 0%;
}

.RxA {
	fill: $color_Pr_A;
}
.PnA {
	fill: $color_Pn_A;
}
.RxB {
	fill: $color_Pr_B;
}
.PnB {
	fill: $color_Pn_B;
}
.Rx0 {
	fill: $color_Pr_0;
}
.Pn0 {
	fill: $color_Pn_0;
}
</style>
