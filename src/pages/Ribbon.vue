<template>
	<div id="ribbon" class="column">
		<div class="col-auto"></div>
		<div id="row_tabs"></div>
		<div id="row_buttons"></div>

		<div class="q-gutter-y-md">
			<!-- <q-card> -->
			<q-tabs v-model="tab" dense align="left">
				<q-tab name="mails" label="Mails" />
				<q-tab name="alarms" label="Alarms" />
				<q-tab name="movies" label="Movies" />
			</q-tabs>

			<q-tab-panels v-model="tab" animated>
				<q-tab-panel name="mails">
					<div class="text-h6">Mails</div>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</q-tab-panel>

				<q-tab-panel name="alarms">
					<div class="text-h6">Alarms</div>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</q-tab-panel>

				<q-tab-panel name="movies">
					<div class="text-h6">Movies</div>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</q-tab-panel>
			</q-tab-panels>
			<!-- </q-card> -->
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "Ribbon",
	setup() {
		return {
			tab: ref("mails"),
		};
	},
});
</script>

<style lang="scss" scoped>
#ribbon {
	height: $h_title + $h_tabs + $h_ribbon + 300px;
	font-variant-caps: petite-caps !important;
	// background-color: $color-d3;

	#row_tabs {
		height: $h_tabs;
		// background-color: $color-l3;
	}

	#row_buttons {
		height: $h_ribbon;
		// background-color: $color-l1;
	}
}

.space {
}
</style>
