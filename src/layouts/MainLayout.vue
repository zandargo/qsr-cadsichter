<template>
	<div>
		<!--
	Anything after view="lHh lpr lFf" is only needed
	so we can display this example in the documentation

	Remove this part: container style="height: 400px" class="shadow-2 rounded-borders"
	-->

		<q-layout view="lHh lpr lFf">
			<q-header elevated>
				<q-bar
					id="titlebar"
					class="q-electron-drag q-pr-none q-pl-sm"
					v-if="$q.platform.is.electron"
				>
					<q-avatar size="24px" square>
						<img src="../../public/icons/cs/cs-icon-01.svg" />
					</q-avatar>

					<q-space />
					<div><h4>CadSichter</h4></div>
					<q-space />

					<q-btn
						unelevated
						class="
							win-btn win-btn-regular
							q-ma-none
							cursor-inherit
							q-pt-md
						"
						@click="minimize"
					>
						<q-avatar square size="16px">
							<img
								src="../assets/img/titlebar/icon_minimize.svg"
								class="q-my-auto"
							/>
						</q-avatar>
					</q-btn>

					<q-btn
						unelevated
						size="md"
						class="win-btn win-btn-regular q-ma-none cursor-inherit"
						@click="toggleMaximize"
					>
						<q-avatar square size="16px">
							<img src="../assets/img/titlebar/icon_maximize.svg" />
						</q-avatar>
					</q-btn>

					<q-btn
						unelevated
						size="md"
						class="win-btn win-btn-regular q-ma-none cursor-inherit"
						@click="toggleMaximize"
					>
						<q-avatar square size="16px">
							<img src="../assets/img/titlebar/icon_restore.svg" />
						</q-avatar>
					</q-btn>

					<q-btn
						unelevated
						size="md"
						class="win-btn win-btn-close q-ma-none cursor-inherit"
						@click="closeApp"
					>
						<q-avatar square size="16px">
							<img src="../assets/img/titlebar/icon_close.svg" />
						</q-avatar>
					</q-btn>
				</q-bar>

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
					<p v-for="n in 15" :key="n">
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
// import TitleBar from "../components/TitleBar.vue";

export default {
	// data() {
	// 	return {
	// 		name: "MainLayout",
	// 		components: {
	// 			TitleBar,
	// 		},
	// 	};
	// },
	setup() {
		// we rely upon
		function minimize() {
			if (process.env.MODE === "electron") {
				window.myWindowAPI.minimize();
			}
		}

		function toggleMaximize() {
			if (process.env.MODE === "electron") {
				window.myWindowAPI.toggleMaximize();
			}
		}

		function closeApp() {
			if (process.env.MODE === "electron") {
				window.myWindowAPI.close();
			}
		}

		return { minimize, toggleMaximize, closeApp };
	},
};
</script>

<style lang="scss" scoped>
#titlebar {
	background-color: $color-d3;
}

#menu-row {
	color: $color-d3;

	background-color: $color-l4;
}

.win-btn {
	font-weight: 800;
	border-radius: 0px;
	&:hover {
		border-radius: 0px;
	}
}
.win-btn-close:hover {
	background: $red-8;
}
</style>
