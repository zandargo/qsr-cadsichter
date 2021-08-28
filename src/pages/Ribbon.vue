<template>
	<div id="ribbon" class="column justify-end">
		<div class="q-gutter-y-none bg-cs-l4">
			<q-tabs
				v-model="tab"
				dense
				no-caps
				align="left"
				id="row_tabs"
				class="bg-cs-l4 q-mt-sm q-pl-md text-grey-8 text-caption"
			>
				<q-tab name="flow" label="Esquema" style="width: 120px" />
				<q-tab name="chart" label="Esquemino" style="width: 120px" />
				<q-tab name="defs" label="Definições" style="width: 120px" />
			</q-tabs>

			<q-tab-panels v-model="tab" animated id="row_buttons" class="bg-cs-l2">
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
.q-tab__indicator {
	display: none !important;
}

.q-tab {
	border-radius: 8px 8px 0 0;
	font-variant-caps: small-caps !important;
}
.q-tab__content {
	font-variant-caps: small-caps !important;
}
.q-tab--active {
	border: none;
	color: $color-d4;
	background-color: $color-l2;
	box-shadow: $shadow2;
}
</style>
