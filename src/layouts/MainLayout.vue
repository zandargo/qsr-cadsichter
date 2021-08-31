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
				class="bg-cs-l3 absolute-left shadow-2"
				style="overflow: hidden; min-height: 100%"
			>
				<!-- drawer content -->
			</q-drawer>

			<q-drawer
				v-model="rightDrawerOpen"
				side="right"
				behavior="desktop"
				elevated
				class="bg-cs-l3 absolute-right shadow-2"
				style="overflow: hidden; min-height: 100%"
			>
				<!-- drawer content -->
			</q-drawer>

			<q-page-container
				class="bg-cs-l5 q-mb-none row items-stretch window-height"
			>
				<q-scroll-area
					:thumb-style="thumbStyle"
					:bar-style="barStyle"
					style="min-height: 300px; width: 100%"
					class="q-py-none q-px-md q-ma-none"
				>
					<router-view />
				</q-scroll-area>
				<!-- <Home /> -->
			</q-page-container>

			<q-footer
				elevated
				class="bg-cs-d3 q-px-md q-py-xs shadow-up-2 absolute-bottom"
				>Footer</q-footer
			>
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
		const rightDrawerOpen = ref(false);
		// const $store = useStore();
		// const winState = computed({
		// 	get: () => $store.state.main.winState,
		// 	set: (val) => {
		// 		$store.commit("main/updateWinState", val);
		// 	},
		// });
		return {
			contentStyle: {
				backgroundColor: "rgba(0,0,0,0)",
				color: "#555",
			},

			contentActiveStyle: {
				backgroundColor: "#eee",
				color: "black",
			},

			thumbStyle: {
				right: "0px",
				borderRadius: "8px",
				backgroundColor: "#607d8b",
				width: "16px",
				opacity: 0.5,
			},

			leftDrawerOpen,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},

			rightDrawerOpen,
			toggleRightDrawer() {
				rightDrawerOpen.value = !rightDrawerOpen.value;
			},
		};
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
