<template>
	<svg
		id="svgFlow"
		xmlns="http://www.w3.org/2000/svg"
		:width="gpfMain.width"
		:height="gpfMain.yOff * (nGavs + 2)"
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

		<!-- <polygon :points="flat(xyGPF.G01.Shp0)" class="gpf0" /> -->
		<!-- <polygon v-for="(value, name) in xyGPF" :key="name" :points="flat(value.Shp0)" class="gpf0" />
		<polygon v-for="(value, name) in xyGPF" :key="name" :points="flat(value.Shp0F)" class="gpf0" />
		<polygon v-for="(value, name) in xyGPF" :key="name" :points="flat(value.Shp0D)" class="gpf0" /> -->
		<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF['G' + ('0' + i).slice(-2)].Shp0)" class="gpf0" />
		<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF['G' + ('0' + i).slice(-2)].Shp0F)" class="gpf0" />
		<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF['G' + ('0' + i).slice(-2)].Shp0D)" class="gpf0" />
		<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF['G' + ('0' + i).slice(-2)].Shp1)" class="gpf1" />
		<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF['G' + ('0' + i).slice(-2)].Shp2)" class="gpf1" />
		<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF['G' + ('0' + i).slice(-2)].Shp3)" class="gpf1" />
		<polygon v-for="i in nGavs" :key="i" :points="flat(xyGPF['G' + ('0' + i).slice(-2)].Shp4)" class="gpf1" />

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
			get: () => $store.state.flow.nGavs,
			set: () => {},
		});

		const getClassGPF = (obj) => {
			let str = "gpf0 ";
			if (obj.act ) {
				str += "isON";
			} else {
				str += "isOFF";
			}
			return str;
		};

		//* Return
		return {
			flat,
			nGavs    ,
			gpfMain  ,
			xyGPF,
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
	fill: white;
	stroke: $color-d2;
	stroke-width: 2px;
	stroke-linejoin: round;
	stroke-linecap: round;
}
.gpf1 {
	fill: black;
	stroke: none;
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
