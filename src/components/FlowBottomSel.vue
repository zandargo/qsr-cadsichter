<template>
	<!-- //* ----------------------- BOTTOM SELECTION POLYGONS ---------------------- *// -->
	<polygon points="100 100 150 150" />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import mFnd from "src/modules/xyBottom";

export default {
	name: "flwBtmSel",
	setup() {
		//* Initial definitions
		const $store = useStore();

		const aPoly = () => {
			let sArray = "-20 -20 -20 -20";

			return sArray;
		};

		//* RETURN
		return {};
	},
};
</script>

<style lang="scss" scoped>
polygon {
	fill: brown;
}
</style>
