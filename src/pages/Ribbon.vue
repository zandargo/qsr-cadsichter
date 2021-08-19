<template>
	<div id="ribbon">
		<q-avatar size="48px" square>
			<!-- <img src="../../public/icons/cs/cs-icon-02a.svg" /> -->
		</q-avatar>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "Ribbon",
});
</script>

<style lang="scss">
#ribbon {
	height: 64px;
	background-color: $color-l3;
}
</style>
