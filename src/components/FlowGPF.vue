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

		<SelLine v-if="bEditMode" />


		<!-- //* ------------------------------ GPF GUIDES ------------------------------ *// -->
		<g id="grGuide" class="guides" v-if="bEditMode">
			<polyline v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].CPts.F)" stroke-dasharray="3 2"/>
			<polyline v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].CPts.D)" stroke-dasharray="3 2"/>
			<polyline v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].CPts.E)" stroke-dasharray="3 2"/>
			<polyline v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].CPts.T)" stroke-dasharray="3 2"/>

			<ellipse v-for="i in nGavs" :key="i" rx="6" ry="10"
			:cx="xyGPF[sID[i]].CPts.Fe.X" :cy="xyGPF[sID[i]].CPts.Fe.Y" />
			<ellipse v-for="i in nGavs" :key="i" rx="10" ry="10"
			:cx="xyGPF[sID[i]].CPts.De.X" :cy="xyGPF[sID[i]].CPts.De.Y" />
			<ellipse v-for="i in nGavs" :key="i" rx="10" ry="10"
			:cx="xyGPF[sID[i]].CPts.Ee.X" :cy="xyGPF[sID[i]].CPts.Ee.Y" />
			<ellipse v-for="i in nGavs" :key="i" rx="6" ry="10"
			:cx="xyGPF[sID[i]].CPts.Te.X" :cy="xyGPF[sID[i]].CPts.Te.Y" />

		</g>



		<!-- //* ------------------------------- MAIN GPF ------------------------------- *// -->
		<g id="grGPFs"  @click.prevent="tglGuides">
				<!-- @click.prevent="tglGuides" -->
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp0)" class="gpf0" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp0F)" class="gpf0" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp0D)" class="gpf0" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp1)" class="gpf1" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp2)" class="gpf1" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp3)" class="gpf1" />
			<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF[sID[i]].Shp4)" class="gpf1" />

			<!-- <polygon v-for="i in nGavs" :key="i" :points="flat(pCham['cham'+sID[i]])" :class="getClassCh(GPF[sID[i]]['RX'])" /> -->
			<polygon v-for="i in nGavs" :key="i" :points="flat(pCham['cham'+sID[i]])" :class="getClassCh(i)" />
		</g>

		<!-- //* ------------------------------ FLOW LINES ------------------------------ *// -->

		<!-- <CPLine sID="Ai"/> -->
		<!-- <CPLine sID="Ae"/> -->
		<!-- <CPLine sID="Be"/> -->
		<CPLine v-for="i in nGavs" :key="i" :sID="'G'+('0'+i).slice(-2)+'RX'"/>
		<CPLine v-for="i in nGavs" :key="i" :sID="'G'+('0'+i).slice(-2)+'P1'"/>
		<CPLine v-for="i in nGavs" :key="i" :sID="'G'+('0'+i).slice(-2)+'P2'"/>
		<!-- <CPLine sID="G01P1"/>
		<CPLine sID="G01P2"/> -->


		<!-- //* ---------------------------- CONTROL POINTS ---------------------------- *// -->
		<g id="grCP" v-if="bEditMode" >
			<CP v-for="i in nGavs" :key="i" :sID="'cpG'+('0'+i).slice(-2)" sType="RX" @changed="cpChanged" />
			<CP v-for="i in nGavs" :key="i" :sID="'cpG'+('0'+i).slice(-2)" sType="P1" @changed="cpChanged"/>
			<CP v-for="i in nGavs" :key="i" :sID="'cpG'+('0'+i).slice(-2)" sType="P2" @changed="cpChanged"/>
		</g>

		<!-- //* ----------------------------- CP SNAP AREAS ---------------------------- *// -->
		<g v-if="bCPdrag">
			<!-- <SnapArea v-for="i in nGavs" :key="i" :gpf="i" pos="C" /> -->
			<SnapArea v-for="i in nGavs" :key="i" :gpf="i" pos="Fi" />
			<SnapArea v-for="i in nGavs" :key="i" :gpf="i" pos="Di" />
			<SnapArea v-for="i in nGavs" :key="i" :gpf="i" pos="Ei" />
			<SnapArea v-for="i in nGavs" :key="i" :gpf="i" pos="Ti" />
			<SnapArea v-for="i in nGavs" :key="i" :gpf="i" pos="Fe" />
			<SnapArea v-for="i in nGavs" :key="i" :gpf="i" pos="De" />
			<SnapArea v-for="i in nGavs" :key="i" :gpf="i" pos="Ee" />
			<SnapArea v-for="i in nGavs" :key="i" :gpf="i" pos="Te" />
		</g>

		//* TESTE........


	</svg>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { objectFlattener, convNLADO, convNIE } from "src/modules/helperFunction";
import { gpfMain, xyGPF } from "src/modules/xyGPFmain";
import CP from 'components/FlowCP.vue'
import SnapArea from 'components/FlowSnapArea.vue'
import CPLine from 'components/FlowLine.vue'
import SelLine from 'components/FlowLineSel.vue'


export default {
	name: "svgFlowGPF",
	components: {CP, SnapArea, CPLine, SelLine},
	setup() {
		//* Initial definitions
		const $store = useStore();
		const flat = (obj) => objectFlattener(obj);
		const cLado = (nLado) => convNLADO(nLado);
		const cIE = (nIE) => convNIE(nIE);
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
		//* CP Drag
		const bCPdrag = computed({
			get: () => $store.state.flow.varMain.bCPdrag,
			set: () => $store.commit('flow/mutSetCPdrag', false),
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
		const getClassCh = (i) => {
			let str = "cham";
			let obj = GPF.value[sID[i]]['RX']
			if (obj.nIE==0 && obj.nPara == i ) {
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
			let aCP = ['RX', 'P1', 'P2']
			let tmpLado
			let tmpPara
			let cp
			for (let i = 1; i <= nGavs.value; i++) {
				let tmpID = 'G' + ('0' + i).slice(-2)
				obj['cp'+tmpID] = {
					RX: {
						X: 0,
						Y: 0,
					},
					P1: {
						X: 0,
						Y: 0,
					},
					P2: {
						X: 0,
						Y: 0,
					},
				 }
				// console.log(`${tmpID}`)
				for (let n = 0; n < aCP.length; n++) {
					tmpLado = null
					tmpPara = null
					cp = aCP[n]
					try {
						if (cLado(tmpObj[tmpID][cp]["nLado"]) && cIE(tmpObj[tmpID][cp]["nIE"])) {
							tmpLado = cLado(tmpObj[tmpID][cp]["nLado"]) + cIE(tmpObj[tmpID][cp]["nIE"])
						} else { tmpLado = "C" }
						if (tmpObj[tmpID][cp]["nPara"]>=i && tmpObj[tmpID][cp]["nPara"] <=nGavs.value) {
							tmpPara = 'G' + ('0' + tmpObj[tmpID][cp]["nPara"]).slice(-2)
						} else { tmpPara = tmpID }
						obj['cp'+tmpID][cp]["X"]=xyGPF[tmpPara]['CPts'][tmpLado]["X"]
						obj['cp'+tmpID][cp]["Y"]=xyGPF[tmpPara]['CPts'][tmpLado]["Y"]
						if (tmpLado == "C") {
							n == 1 ? obj['cp'+tmpID][cp]["X"] -=25 : false
							n == 2 ? obj['cp'+tmpID][cp]["X"] +=25 : false
						}
						// console.log(`   	${cp}: -->  ${tmpPara} ${tmpLado}`)
					} catch (error) {
						console.log(`Erro xyCP ${cp}`, error)
						console.log('tmpID:        ', tmpID)
						console.log('tmpPara:      ', tmpPara)
						console.log('tmpLado:      ', tmpLado)
					}
				}
				// console.log(obj['cp'+tmpID])
			}
			return obj
		})

		//* CP changed
		const cpChanged = ()=>{
			let svg = document.querySelector("#svgFlow")
			let circles = document.querySelectorAll("circle, ellipse")

		}

		//* Return
		return {
			flat,
			nGavs,
			sID,
			GPF,
			gpfMain,
			xyGPF,
			xyCP,
			bEditMode,
			bCPdrag,
			tglGuides,
			pCham,
			getClassCh,
			cpChanged,
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
	stroke: $color-l2;
	stroke-width: 1px;
	fill: $color-l5;
	// opacity: 25%;
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


// .flwARWH {
// 	fill: red;
// 	stroke: red;
// 	stroke-width: 6px;
// }
</style>
