<template>
	<div class="flex-center text-center no-padding no-margin cs-caps txt-cs-d4">
		<q-btn
			elevated
			dense
			bordered
			class="q-mx-sm cs-border q-mb-xs bg-cs-hl-1"
			@click="action"
		>
			<q-avatar size="36px" rounded>
				<img :src="icon" />
			</q-avatar>
		</q-btn>
		<h5>{{ title }}</h5>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "RbnButton",
	props: {
		title: {
			type: String,
			required: true,
		},

		icon: {
			type: String,
			default: "",
		},

		action: {
			type: Function,
			required: false, //Por enquanto
		},
	},
});
</script>

<style lang="scss" scoped></style>
