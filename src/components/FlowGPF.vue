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

		<g id="grGuide" class="guides" v-if="bGuides">
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

		<!-- <polygon :points="flat(xyGPF.G01.Shp0)" class="gpf0" /> -->
		<!-- <polygon v-for="(value, name) in xyGPF" :key="name" :points="flat(value.Shp0)" class="gpf0" />
		<polygon v-for="(value, name) in xyGPF" :key="name" :points="flat(value.Shp0F)" class="gpf0" />
		<polygon v-for="(value, name) in xyGPF" :key="name" :points="flat(value.Shp0D)" class="gpf0" /> -->
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
		const bGuides = computed({
			get: () => $store.state.flow.varMain.bGuides,
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
						console.log('xyGPF.ChF', xyGPF.ChF)
						console.log('xyGPF[tmpID]["ChF"]', xyGPF[tmpID]["ChF"])

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
							X1: 0,
							Y1: 0,
							X2: 0,
							Y2: 0,
							X3: 0,
							Y3: 0,
							X4: 0,
							Y4: 0,
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

		//* Return
		return {
			flat,
			nGavs,
			sID,
			GPF,
			gpfMain,
			xyGPF,
			bGuides,
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
</style>
