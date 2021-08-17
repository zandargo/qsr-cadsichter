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
				<EssentialLink />

				<div class="q-pa-sm q-pl-md row items-center" id="menu-row">
					<div class="non-selectable">
						<h4>File</h4>
						<q-menu>
							<q-list dense style="min-width: 100px">
								<q-item clickable v-close-popup>
									<q-item-section>Open...</q-item-section>
								</q-item>
								<q-item clickable v-close-popup>
									<q-item-section>New</q-item-section>
								</q-item>

								<q-separator />

								<q-item clickable>
									<q-item-section>Preferences</q-item-section>
									<q-item-section side>
										<q-icon name="keyboard_arrow_right" />
									</q-item-section>

									<q-menu anchor="top end" self="top start">
										<q-list>
											<q-item
												v-for="n in 3"
												:key="n"
												dense
												clickable
											>
												<q-item-section
													>Submenu Label</q-item-section
												>
												<q-item-section side>
													<q-icon name="keyboard_arrow_right" />
												</q-item-section>
												<q-menu
													auto-close
													anchor="top end"
													self="top start"
												>
													<q-list>
														<q-item
															v-for="n in 3"
															:key="n"
															dense
															clickable
														>
															<q-item-section
																>3rd level Label</q-item-section
															>
														</q-item>
													</q-list>
												</q-menu>
											</q-item>
										</q-list>
									</q-menu>
								</q-item>

								<q-separator />

								<q-item clickable v-close-popup @click="closeApp">
									<q-item-section>Quit</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
					</div>

					<div class="q-ml-md non-selectable">
						<h4>Edit</h4>
						<q-menu auto-close>
							<q-list dense style="min-width: 100px">
								<q-item clickable>
									<q-item-section>Cut</q-item-section>
								</q-item>
								<q-item clickable>
									<q-item-section>Copy</q-item-section>
								</q-item>
								<q-item clickable>
									<q-item-section>Paste</q-item-section>
								</q-item>
								<q-separator />
								<q-item clickable>
									<q-item-section>Select All</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
					</div>
				</div>
			</q-header>

			<q-page-container>
				<q-page class="q-pa-md">
					<p v-for="n in 5" :key="n">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
						nihil praesentium molestias a adipisci, dolore vitae odit,
						quidem consequatur optio voluptates asperiores pariatur eos
						numquam rerum delectus commodi perferendis voluptate?
					</p>
				</q-page>
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
// We guard the Electron API calls, but this
// is only needed if we build same app with other
// Quasar Modes as well (SPA/PWA/Cordova/SSR...)
import { computed } from "vue";
import { useStore } from "vuex";
import { mapState } from "vuex";

import EssentialLink from "components/EssentialLink.vue";
import TitleBar from "components/TitleBar.vue";

import { defineComponent } from "vue";
export default defineComponent({
	// data() {
	// 	return {
	name: "MainLayout",

	components: {
		TitleBar,
	},
	// 	};
	// },
	setup() {
		const $store = useStore();
		const winState = computed({
			get: () => $store.state.main.winState,
			set: (val) => {
				$store.commit("main/updateWinState", val);
			},
		});

		// we rely upon
		// function minimize() {
		// 	if (process.env.MODE === "electron") {
		// 		window.myWindowAPI.minimize();
		// 	}
		// }

		// function toggleMaximize() {
		// 	if (process.env.MODE === "electron") {
		// 		window.myWindowAPI.toggleMaximize();
		// 	}
		// }

		// function closeApp() {
		// 	if (process.env.MODE === "electron") {
		// 		window.myWindowAPI.close();
		// 	}
		// }

		// return { minimize, toggleMaximize, closeApp, winState };
	},
});
</script>

<style lang="scss" scoped>
#menu-row {
	color: $color-d3;
	background-color: $color-l4;
}
</style>
