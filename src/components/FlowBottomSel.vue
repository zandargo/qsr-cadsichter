<template>
	<!-- //* ----------------------- BOTTOM SELECTION POLYGONS ---------------------- *// -->
	<!-- <polygon points="100 100 150 100 150 150 100 150" /> -->
	<g v-if="bEditMode">
		<polygon :points="aPoly()" class="sSelBtm SelBtm1" />
		<polygon :points="aPoly()" class="sSelBtm SelBtm2" />
		<!-- <polygon :points="aPoly()" class="sSelBtm SelBtm3" /> -->
		<!-- <polygon :points="aPoly()" class="sSelBtm SelBtm4" /> -->
	</g>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { mFND } from "src/modules/xyBottom";
import { convNLADO, convNIE } from "src/modules/helperFunction";

export default {
	name: "flwBtmSel",
	setup() {
		//* Initial definitions
		const $store = useStore();
		const cLado = (val) => convNLADO(val);
		const cIE = (val) => convNIE(val);

		const cpSel = computed({
			get: () => $store.state.flow.varMain.cpSel,
			set: () => {},
		});
		const bEditMode = computed({
			get: () => $store.state.flow.varMain.bEditMode,
			set: () => {},
		});

		//* Selected CP to Bottom bounding box
		const aPoly = () => {
			// let sArray = "100 100 150 100 150 150 100 150";
			let sArray = "-20 -20 -20 -20 -20 -20 -20 -20";
			if (cpSel.value.bGoBtm) {
				sArray = "";
				let sLado = cLado(cpSel.value.nLado);
				switch (sLado) {
					case "F":
						sArray += mFND.F1.pt1.x + " ";
						sArray += mFND.F1.pt1.y + " ";
						sArray += mFND.F1.pt2.x + " ";
						sArray += mFND.F1.pt2.y + " ";
						sArray += mFND.F2.pt3.x + " ";
						sArray += mFND.F2.pt3.y + " ";
						sArray += mFND.F2.pt4.x + " ";
						sArray += mFND.F2.pt4.y + " ";
						break;
					case "D":
						sArray += mFND.D2.pt1.x + " ";
						sArray += mFND.D2.pt1.y + " ";
						sArray += mFND.D1.pt2.x + " ";
						sArray += mFND.D1.pt2.y + " ";
						sArray += mFND.D1.pt3.x + " ";
						sArray += mFND.D1.pt3.y + " ";
						sArray += mFND.D2.pt4.x + " ";
						sArray += mFND.D2.pt4.y + " ";
						break;
					case "E":
						sArray += mFND.E2.pt1.x + " ";
						sArray += mFND.E2.pt1.y + " ";
						sArray += mFND.E1.pt2.x + " ";
						sArray += mFND.E1.pt2.y + " ";
						sArray += mFND.E1.pt3.x + " ";
						sArray += mFND.E1.pt3.y + " ";
						sArray += mFND.E2.pt4.x + " ";
						sArray += mFND.E2.pt4.y + " ";
						break;
					case "T":
						sArray += mFND.T1.pt1.x + " ";
						sArray += mFND.T1.pt1.y + " ";
						sArray += mFND.T1.pt2.x + " ";
						sArray += mFND.T1.pt2.y + " ";
						sArray += mFND.T2.pt3.x + " ";
						sArray += mFND.T2.pt3.y + " ";
						sArray += mFND.T2.pt4.x + " ";
						sArray += mFND.T2.pt4.y + " ";
						break;

					default:
						sArray = "100 100 150 100 150 150 100 150";
						break;
				}
			}

			return sArray;
		};

		//* RETURN
		return { bEditMode, cpSel, aPoly };
	},
};
</script>

<style lang="scss" scoped>
polygon {
	// fill: brown;
}

.sSelBtm {
	transform-box: fill-box;
	transform-origin: center;
	stroke: rgba($selBTM, 0.75);
	fill: none;
}

.SelBtm1 {
	animation: selAnim 2s ease-out -4s infinite forwards;
}
.SelBtm2 {
	animation: selAnim 2s ease-out -3s infinite forwards;
}
// .SelBtm3 {
// 	animation: selAnim 3s ease-out -1s infinite forwards;
// }
// .SelBtm4 {
// 	animation: selAnim 4s ease-in-out 0s infinite forwards;
// }

@keyframes selAnim {
	0% {
		transform: scale(0.9);
		stroke-width: 0px;
		opacity: 0%;
	}
	10% {
		// transform: scale(1.05);
		stroke-width: 3px;
		opacity: 100%;
	}
	90% {
		// transform: scale(2);
		stroke-width: 0.1px;
		opacity: 100%;
	}
	100% {
		transform: scale(1.2);
		stroke-width: 0.1px;
		opacity: 0%;
	}
}
</style>
