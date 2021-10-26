<template>
	<svg
		id="svgFlow"
		xmlns="http://www.w3.org/2000/svg"
		:width="gpfMain.width"
		:height="gpfMain.y0 + gpfMain.yOff * (nGavs + 2)"

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

		<!-- //* ------------------------------ GPF GUIDES ------------------------------ *// -->
		<g id="grGuide" class="guides" v-if="bEditMode">
			<polyline v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].CPts.F)"/>
			<polyline v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].CPts.D)"/>
			<polyline v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].CPts.E)"/>
			<polyline v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].CPts.T)"/>

			<ellipse v-for="i in nGavs" :key="i" rx="4" ry="8"
			:cx="xyGPF[sID[i]].CPts.Fe.X" :cy="xyGPF[sID[i]].CPts.Fe.Y" />
			<ellipse v-for="i in nGavs" :key="i" rx="8" ry="8"
			:cx="xyGPF[sID[i]].CPts.De.X" :cy="xyGPF[sID[i]].CPts.De.Y" />
			<ellipse v-for="i in nGavs" :key="i" rx="8" ry="8"
			:cx="xyGPF[sID[i]].CPts.Ee.X" :cy="xyGPF[sID[i]].CPts.Ee.Y" />
			<ellipse v-for="i in nGavs" :key="i" rx="4" ry="8"
			:cx="xyGPF[sID[i]].CPts.Te.X" :cy="xyGPF[sID[i]].CPts.Te.Y" />
		</g>

		<!-- //* ------------------------------- MAIN GPF ------------------------------- *// -->
		<g id="grGPFs" @click.prevent="tglGuides" >
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp0)" class="gpf0" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp0F)" class="gpf0" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp0D)" class="gpf0" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp1)" class="gpf1" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp2)" class="gpf1" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp3)" class="gpf1" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp4)" class="gpf1" />

			<polygon v-for="i in nGavs" :key="i" :points="flat(pCham['cham'+sID[i]])" :class="getClassCh(GPF[sID[i]]['RX'])" />
		</g>

		<!-- //* ---------------------------- CONTROL POINTS ---------------------------- *// -->
		<g id="grCP" v-if="bEditMode" >
			<circle cx="50" cy="50" r="10" class="cpRxA" />
			<circle cx="20" cy="50" r="10" class="cpPnA" />
			<circle cx="80" cy="50" r="10" class="cpPnA" />
		</g>

		//* TESTE........
		<!-- <polyline points="20 20 20 90 80 90 80 220" fill="none" stroke= "teal"
		stroke-width="4px" stroke-dasharray="8 10" stroke-linejoin="round" stroke-linecap="round">
			<animate
				attributeName="stroke-dashoffset"
				from="18"
				to="0"
				dur="2s"
				repeatCount="indefinite"
			/>
		</polyline> -->

	</svg>
</template>

<script>
import { ref, toRefs, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { objectFlattener } from "src/modules/helperFunction";
import { gpfMain, xyGPF } from "src/modules/xyGPFmain";

export default {
	name: "svgFlowGPF",
	setup() {
		//* Initial definitions
		const $store = useStore();
		const flat = (obj) => objectFlattener(obj);
		const nGavs = computed({
			get: () => $store.state.flow.varMain.nGavs,
			set: () => {},
		});

		const GPF = computed({
			get: () => $store.state.flow.GPF,
			set: () => {},
		});
		//* List of names
		let tmpID = []
		for (let i = 0; i <= 32; i++) {
			tmpID.push('G' + ('0' + i).slice(-2))
		}
		const sID = tmpID
		//* Edit Mode
		const bEditMode = computed({
			get: () => $store.state.flow.varMain.bEditMode,
			set: () => $store.commit('flow/mutTglEditMode'),
		});

		const tglGuides = () => {
			$store.commit('flow/mutTglEditMode')
		}
		//* Inner Channel
		const pCham = computed(() => {
			let obj = {}
			let tmpObj = GPF.value
			for (let i = 1; i <= nGavs.value; i++) {
				let tmpID = 'G' + ('0' + i).slice(-2)
				switch (tmpObj[tmpID]["RX"]["nLado"]) {
					case 1:
						obj['cham'+tmpID]=xyGPF[tmpID]["ChF"]
						break;
					case 2:
						obj['cham'+tmpID]=xyGPF[tmpID]["ChD"]
						break;
					case 3:
						obj['cham'+tmpID]=xyGPF[tmpID]["ChE"]
						break;
					case 4:
						obj['cham'+tmpID]=xyGPF[tmpID]["ChT"]
						break;
					default:
						obj['cham'+tmpID]={
							X1: -100,
							Y1: -100,
							X2: -100,
							Y2: -100,
							X3: -100,
							Y3: -100,
							X4: -100,
							Y4: -100,
						}
						break;
				}
			}
			return obj
		})
		console.log('pCham', pCham.value)
		const getClassCh = (obj) => {
			let str = "cham";
			if (obj.nIE==0 ) {
				str += "ON";
			} else {
				str += "OFF";
			}
			return str;
		};
		//* Control Points
		const xyCP = computed(() => {
			let obj = {}
			let tmpObj = GPF.value
			for (let i = 1; i <= nGavs.value; i++) {
				let tmpID = 'G' + ('0' + i).slice(-2)
				switch (tmpObj[tmpID]["RX"]["nLado"]) {
					case 1:
						obj['cham'+tmpID]=xyGPF[tmpID]["ChF"]
						break;
					case 2:
						obj['cham'+tmpID]=xyGPF[tmpID]["ChD"]
						break;
					case 3:
						obj['cham'+tmpID]=xyGPF[tmpID]["ChE"]
						break;
					case 4:
						obj['cham'+tmpID]=xyGPF[tmpID]["ChT"]
						break;
					default:
						obj['cham'+tmpID]={
							X1: -100,
							Y1: -100,
							X2: -100,
							Y2: -100,
							X3: -100,
							Y3: -100,
							X4: -100,
							Y4: -100,
						}
						break;
				}
			}
			return obj
		})

		//* Return
		return {
			flat,
			nGavs,
			sID,
			GPF,
			gpfMain,
			xyGPF,
			bEditMode,
			tglGuides,
			pCham,
			getClassCh,
		};
	},
};
</script>

<style lang="scss" scoped>
.isON {
	// visibility: visible;
	opacity: 100%;
}
.isOFF {
	// visibility: hidden;
	opacity: 0%;
}

.gpf0 {
	fill: rgba(255, 255, 255, 0.9);
	stroke: $color-d4;
	stroke-width: 2px;
	stroke-linejoin: round;
	stroke-linecap: round;
}
.gpf1 {
	fill: $color-d4;
	stroke: none;
	stroke: $color-d4;
	stroke-width: 2px;
	stroke-linejoin: round;
	stroke-linecap: round;
}
.guides {
	stroke: $color-l1;
	stroke-width: 1px;
	fill: none;
	opacity: 50%;
}
.chamON {
	fill: none;
	stroke: $color-d4;
	stroke-width: 2px;
	stroke-linejoin: round;
	stroke-linecap: round;
}
.chamOFF {
	fill: $color_cham;
	stroke: $color-d4;
	stroke-width: 2px;
	stroke-linejoin: round;
	stroke-linecap: round;
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

.cpRxA {
	fill: rgba($color_Pr_A, 0.75);
	stroke: none;
}
.cpPnA {
	fill: rgba($color_Pn_A, 0.75);
	stroke: none;
}

</style>
