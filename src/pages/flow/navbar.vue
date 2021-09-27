<template>
	<q-page>
		<q-card elevated class="bg-cs-hl-1 q-pa-sm cs-border">
			<q-card-section class="cs-dense row justify-between">
				<div class="col-grow text-h3">Número de Gavetas:</div>
				<div class="col-shrink text-h3">{{ nGavs }}</div>
			</q-card-section>

			<q-separator color="primary" />

			<q-card-section class="q-px-sm q-pb-xs">
				<q-slider
					v-model="nGavs"
					:min="12"
					:max="32"
					:step="1"
					snap
					dense
					color="primary"
				/>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script>
import { computed, ref } from "vue";
import { useStore, mapState, mapMutations, mapActions } from "vuex";

export default {
	name: "FlowNavbar",
	setup() {
		return { nGavs: ref(28) };
	},
};
</script>
