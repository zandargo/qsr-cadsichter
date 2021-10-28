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

		<polygon :points="flat(mFND.F1)" :class="getClassFr(FND.F1)" @click="clkBtm(FND.F1)" />
		<polygon :points="flat(mFND.F2)" :class="getClassFr(FND.F2)" @click="clkBtm(FND.F2)" />
		<polygon :points="flat(mFND.D1)" :class="getClassFr(FND.D1)" @click="clkBtm(FND.D1)" />
		<polygon :points="flat(mFND.D2)" :class="getClassFr(FND.D2)" @click="clkBtm(FND.D2)" />
		<polygon :points="flat(mFND.E1)" :class="getClassFr(FND.E1)" @click="clkBtm(FND.E1)" />
		<polygon :points="flat(mFND.E2)" :class="getClassFr(FND.E2)" @click="clkBtm(FND.E2)" />
		<polygon :points="flat(mFND.T1)" :class="getClassFr(FND.T1)" @click="clkBtm(FND.T1)" />
		<polygon :points="flat(mFND.T2)" :class="getClassFr(FND.T2)" @click="clkBtm(FND.T2)" />

		<polygon :points="flat(mFND.Fi)" class="btmCh" />
		<polygon :points="flat(mFND.Fe)" class="btmCh" />
		<polygon :points="flat(mFND.Di)" class="btmCh" />
		<polygon :points="flat(mFND.De)" class="btmCh" />
		<polygon :points="flat(mFND.Ei)" class="btmCh" />
		<polygon :points="flat(mFND.Ee)" class="btmCh" />
		<polygon :points="flat(mFND.Ti)" class="btmCh" />
		<polygon :points="flat(mFND.Te)" class="btmCh" />

		<polygon :points="flat(mFND.DVF)" :class="getClassDV(DV.F)" @click="clkDV(DV.F)" />
		<polygon :points="flat(mFND.DVD)" :class="getClassDV(DV.D)" @click="clkDV(DV.D)"/>
		<polygon :points="flat(mFND.DVE)" :class="getClassDV(DV.E)" @click="clkDV(DV.E)"/>
		<polygon :points="flat(mFND.DVT)" :class="getClassDV(DV.T)" @click="clkDV(DV.T)"/>

		<polyline :points="flat(mFND.F1i)" :class="getClassArw(DI.F1.i)" />
		<polyline :points="flat(mFND.F1e)" :class="getClassArw(DI.F1.e)" />
		<polyline :points="flat(mFND.F2i)" :class="getClassArw(DI.F2.i)" />
		<polyline :points="flat(mFND.F2e)" :class="getClassArw(DI.F2.e)" />
		<polyline :points="flat(mFND.D1i)" :class="getClassArw(DI.D1.i)" />
		<polyline :points="flat(mFND.D1e)" :class="getClassArw(DI.D1.e)" />
		<polyline :points="flat(mFND.D2i)" :class="getClassArw(DI.D2.i)" />
		<polyline :points="flat(mFND.D2e)" :class="getClassArw(DI.D2.e)" />
		<polyline :points="flat(mFND.E1i)" :class="getClassArw(DI.E1.i)" />
		<polyline :points="flat(mFND.E1e)" :class="getClassArw(DI.E1.e)" />
		<polyline :points="flat(mFND.E2i)" :class="getClassArw(DI.E2.i)" />
		<polyline :points="flat(mFND.E2e)" :class="getClassArw(DI.E2.e)" />
		<polyline :points="flat(mFND.T1i)" :class="getClassArw(DI.T1.i)" />
		<polyline :points="flat(mFND.T1e)" :class="getClassArw(DI.T1.e)" />
		<polyline :points="flat(mFND.T2i)" :class="getClassArw(DI.T2.i)" />
		<polyline :points="flat(mFND.T2e)" :class="getClassArw(DI.T2.e)" />

		<!-- //* ---------------------------------- F1 ---------------------------------- *// -->
		<text
			:x="mFND.tF1.x"
			:y="mFND.tF1.y"
			text-anchor="end"
			dominant-baseline="text-top"
			:class="getClassTxt(FND.F1)"
			@click="clkBtm(FND.F1)"
		>
			{{ FND.F1.name }}
		</text>
		<!-- //* ---------------------------------- F2 ---------------------------------- *// -->
		<text
			:x="mFND.tF2.x"
			:y="mFND.tF2.y"
			text-anchor="start"
			dominant-baseline="text-top"
			:class="getClassTxt(FND.F2)"
			@click="clkBtm(FND.F2)"
		>
			{{ FND.F2.name }}
		</text>
		<!-- //* ---------------------------------- T1 ---------------------------------- *// -->
		<text
			:x="mFND.tT1.x"
			:y="mFND.tT1.y"
			text-anchor="end"
			dominant-baseline="hanging"
			:class="getClassTxt(FND.T1)"
			@click="clkBtm(FND.T1)"
		>
			{{ FND.T1.name }}
		</text>
		<!-- //* ---------------------------------- T2 ---------------------------------- *// -->
		<text
			:x="mFND.tT2.x"
			:y="mFND.tT2.y"
			text-anchor="start"
			dominant-baseline="hanging"
			:class="getClassTxt(FND.T2)"
			@click="clkBtm(FND.T2)"
		>
			{{ FND.T2.name }}
		</text>
		<!-- //* ---------------------------------- D1 ---------------------------------- *// -->
		<text
			:x="mFND.tD1.x"
			:y="mFND.tD1.y"
			text-anchor="end"
			dominant-baseline="text-top"
			:class="getClassTxt(FND.D1)"
			@click="clkBtm(FND.D1)"
		>
			{{ FND.D1.name }}
		</text>
		<!-- //* ---------------------------------- D2 ---------------------------------- *// -->
		<text
			:x="mFND.tD2.x"
			:y="mFND.tD2.y"
			text-anchor="end"
			dominant-baseline="hanging"
			:class="getClassTxt(FND.D2)"
			@click="clkBtm(FND.D2)"
		>
			{{ FND.D2.name }}
		</text>
		<!-- //* ---------------------------------- E1 ---------------------------------- *// -->
		<text
			:x="mFND.tE1.x"
			:y="mFND.tE1.y"
			text-anchor="start"
			dominant-baseline="text-top"
			:class="getClassTxt(FND.E1)"
			@click="clkBtm(FND.E1)"
		>
			{{ FND.E1.name }}
		</text>
		<!-- //* ---------------------------------- E2 ---------------------------------- *// -->
		<text
			:x="mFND.tE2.x"
			:y="mFND.tE2.y"
			text-anchor="start"
			dominant-baseline="hanging"
			:class="getClassTxt(FND.E2)"
			@click="clkBtm(FND.E2)"
		>
			{{ FND.E2.name }}
		</text>
	</svg>

	<div class="divAc txt-Ac full-width text-center  q-mt-xs">Porta</div>
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
			if (obj.act) {str += " bgON"} else { str += " bgOFF" }
			if (obj.sel) { str += " " + obj.type + obj.prod}
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
			if (obj.act ) {
				str += "isON";
			} else {
				str += "isOFF";
			}
			return str;
		};
		//* Get arrow class
		const getClassArw = (obj) => {
			let str = "btmARW "
			if (obj.act) {
				str+="isON"
				} else {
				str+="isOFF"
			}
			return str
		}



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
	$bg-on: darken($color-l2,5%);
	$bg-off: lighten($bg-on,10%);

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
