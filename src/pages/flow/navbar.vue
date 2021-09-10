<template>
	<q-page>
		<q-card elevated class="bg-cs-hl-1 q-pa-sm cs-border">
			<q-card-section class="text-h3 cs-caps no-padding no-margin">
				Número de Gavetas
			</q-card-section>

			<q-separator color="primary" />

			<q-card-section>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script>
import { computed } from "vue";
import { useStore, mapState, mapMutations, mapActions } from "vuex";

export default {
	name: "FlowNavbar",
	setup() {
		return {};
	},
};
</script>
