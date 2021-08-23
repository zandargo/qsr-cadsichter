<template>
	<div id="ribbon" class="column justify-end">
		<!-- <div class="col-auto"></div> -->
		<!-- <div id="row_tabs"></div> -->
		<!-- <div id="row_buttons"></div> -->

		<div class="q-gutter-y-none">
			<q-tabs
				v-model="tab"
				dense
				align="left"
				id="row_tabs"
				class="bg-cs-l4"
			>
				<q-tab name="flow" label="Esquema" />
				<q-tab name="chart" label="Esquemino" />
				<q-tab name="defs" label="Definições" />
			</q-tabs>

			<q-tab-panels v-model="tab" animated id="row_buttons" class="bg-cs-l3">
				<q-tab-panel name="flow"> Botões de Esquema </q-tab-panel>

				<q-tab-panel name="chart"> Botões de Esquemino </q-tab-panel>

				<q-tab-panel name="defs"> Botões de Definições </q-tab-panel>
			</q-tab-panels>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "Ribbon",
	setup() {
		return {
			tab: ref("flow"),
		};
	},
});
</script>

<style lang="scss" scoped>
#ribbon {
	height: $h_title + 28px + $h_tabs + $h_ribbon;
	font-variant-caps: petite-caps !important;
	// z-index: 100;

	#row_tabs {
		height: $h_tabs;
		// background-color: $color-l4;
		// z-index: 90;
	}

	#row_buttons {
		height: $h_ribbon;
		// z-index: 1000;
	}
}

.space {
}
</style>
