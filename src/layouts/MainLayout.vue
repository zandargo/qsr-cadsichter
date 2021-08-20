<template>
	<div>
		<!--
	Anything after view="lHh lpr lFf" is only needed
	so we can display this example in the documentation

	Remove this part: container style="height: 400px" class="shadow-2 rounded-borders"
	-->

		<q-layout view="lHh lpr lFf">
			<q-header elevated flat>
				<TitleBar id="title-bar" />
			</q-header>
			<Ribbon />

			<q-page-container>
				<!-- <router-view /> -->
				<!-- <Home /> -->
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
// We guard the Electron API calls, but this
// is only needed if we build same app with other
// Quasar Modes as well (SPA/PWA/Cordova/SSR...)
import { defineComponent, computed, ref } from "vue";
import { useStore, mapState } from "vuex";
//_ import EssentialLink from "components/EssentialLink.vue";
import TitleBar from "components/TitleBar.vue";
import Ribbon from "pages/Ribbon.vue";
// import Home from "pages/Index.vue";

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
	},
});
</script>

<style lang="scss" scoped>
// #title-bar {
// 	shadow: 5px 5px 5px;
// 	z-index: 999;
// }
</style>
