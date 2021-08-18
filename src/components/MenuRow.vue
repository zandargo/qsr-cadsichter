<template>
	<div>
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
									<q-item v-for="n in 3" :key="n" dense clickable>
										<q-item-section>Submenu Label</q-item-section>
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
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#menu-row {
	padding: 0px 16px;
	height: 24px;
	color: $color-d3;
	background-color: $color-l5;
}
</style>
