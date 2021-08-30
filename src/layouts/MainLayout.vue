<template>
	<div id="main_div" class="no-scroll hide-scrollbar">
		<q-layout view="hHh LpR fFf" class="no-scroll hide-scrollbar">
			<q-header elevated>
				<TitleBar id="row-title" elevated class="shadow-3 absolute-top" />
				<div class="space"></div>
				<Ribbon id="row-ribbon" class="text-black" />
			</q-header>

			<q-drawer
				show-if-above
				v-model="leftDrawerOpen"
				side="left"
				behavior="desktop"
				elevated
				class="bg-cs-l3"
				style="overflow: auto; min-height: 100%"
			>
				<!-- drawer content -->
			</q-drawer>
			<q-page-container class="q-ma-none hide-scrollbar">
				<router-view />
				<!-- <Home /> -->
			</q-page-container>

			<q-footer></q-footer>
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
		const leftDrawerOpen = ref(true);
		// const $store = useStore();
		// const winState = computed({
		// 	get: () => $store.state.main.winState,
		// 	set: (val) => {
		// 		$store.commit("main/updateWinState", val);
		// 	},
		// });
		return {};
	},
});
</script>

<style lang="scss" scoped>
// #main_div {
// 	overflow: hidden;
// }
#row-title {
	// box-shadow: 0px 5px blue !important;
	z-index: 9999;
}

#row-ribbon {
	z-index: 9000;
}

.space {
	height: 32px;
}

.scrolless {
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>
