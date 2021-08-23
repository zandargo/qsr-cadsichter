<template>
	<div id="main_div" class="no-scroll">
		<!--
	Anything after view="lHh lpr lFf" is only needed
	so we can display this example in the documentation

	Remove this part: container style="height: 400px" class="shadow-2 rounded-borders"
	-->

		<q-layout view="lHh lpr lFf">
			<q-header elevated>
				<TitleBar id="row-title" elevated class="shadow-3" />
				<Ribbon id="row-ribbon" class="text-black" />
			</q-header>

			<q-page-container class="q-ma-none q-pa-none">
				<!-- <router-view /> -->
				<!-- <Home /> -->
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore, mapState } from "vuex";
import TitleBar from "components/TitleBar.vue";
import Ribbon from "pages/Ribbon.vue";

export default defineComponent({
	name: "MainLayout",

	components: {
		TitleBar,
		Ribbon,
		// Home,
	},
	// 	};
	// },
	setup() {
		// const $store = useStore();
		// const winState = computed({
		// 	get: () => $store.state.main.winState,
		// 	set: (val) => {
		// 		$store.commit("main/updateWinState", val);
		// 	},
		// });
		return {
			splitterModel: ref(320),
		};
	},
});
</script>

<style lang="scss" scoped>
#main_div {
	overflow: hidden;
}
#row-title {
	// box-shadow: 0px 5px blue !important;
	z-index: 9999;
}

#row-ribbon {
	z-index: 9000;
}
</style>
