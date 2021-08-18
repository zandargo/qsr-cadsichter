<template>
	<div>
		<!--
	Anything after view="lHh lpr lFf" is only needed
	so we can display this example in the documentation

	Remove this part: container style="height: 400px" class="shadow-2 rounded-borders"
	-->

		<q-layout view="lHh lpr lFf">
			<q-header elevated>
				<TitleBar />
			</q-header>

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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { mapState } from "vuex";
//_ import EssentialLink from "components/EssentialLink.vue";
import TitleBar from "components/TitleBar.vue";
import Home from "pages/Index.vue";

import { defineComponent } from "vue";
export default defineComponent({
	// data() {
	// 	return {
	name: "MainLayout",

	components: {
		TitleBar,
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

<style lang="scss" scoped></style>
