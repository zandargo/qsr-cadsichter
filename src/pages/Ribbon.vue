<template>
	<div id="ribbon" class="column justify-end">
		<div class="q-gutter-y-none bg-cs-l4">
			<q-tabs
				v-model="tab"
				dense
				no-caps
				align="left"
				id="row_tabs"
				class="
					bg-cs-l4
					q-pl-md
					text-grey-8 text-caption
					justify-start
					items-start
				"
			>
				<q-route-tab
					name="flow"
					title="flow"
					label="Esquema"
					style="width: 120px"
					to="/flow"
					exact
				/>
				<q-route-tab
					name="chart"
					title="chart"
					label="Esquemino"
					style="width: 120px"
					to="/chart"
					exact
				/>
				<q-route-tab
					name="defs"
					title="defs"
					label="Definições"
					style="width: 120px"
					to="/defs"
					exact
				/>
			</q-tabs>

			<q-tab-panels
				v-model="tab"
				id="row_buttons"
				class="bg-cs-l2 q-pt-sm"
				animated
				transition-prev="fade"
				transition-next="fade"
			>
				<q-tab-panel
					name="flow"
					style="height: 80px"
					class="bg-cs-l2 q-py-xs row justify-start items-center no-scroll"
				>
					<Button v-for="btn in BtnsFlow" :key="btn.title" v-bind="btn" />
				</q-tab-panel>
				<q-tab-panel
					name="chart"
					style="height: 80px"
					class="bg-cs-l2 q-py-xs row justify-start items-center no-scroll"
				>
					Botões de Esquemino
				</q-tab-panel>
				<q-tab-panel
					name="defs"
					style="height: 80px"
					class="bg-cs-l2 q-py-xs row justify-start items-center no-scroll"
				>
					Botões de Definições
				</q-tab-panel>
			</q-tab-panels>
		</div>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { defineComponent, ref } from "vue";
//_ import { useRouter, useRoute } from "vue-router";

import Button from "components/RbnButton.vue";

export default defineComponent({
	name: "Ribbon",

	components: {
		Button,
	},

	setup() {
		//*  INITIAL DEFINITIONS  *//

		const tab = ref("flow");
		const $store = useStore();
		//_ const router = useRouter();
		//_ const route = useRoute();
		//_ const setRoute = (name) => {
		//_ 	router.push(name);
		//_ 	$store.commit("main/mutSetTab", name);
		//_ };

		const BtnsFlow = [
			{
				title: "Novo",
				icon: require("../assets/img/ribbon/new-file-96.png"),
				action: () => $store.dispatch("flow/actResetAll"),
			},
			{
				title: "Abrir",
				icon: require("../assets/img/ribbon/opened-folder.png"),
			},
			{
				title: "Salvar",
				icon: require("../assets/img/ribbon/save-96.png"),
			},
		];

		return {
			BtnsFlow,
			tab,
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
