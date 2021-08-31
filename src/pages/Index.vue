<template>
	<q-page class="q-pa-md">
		<div v-for="n in 100" :key="n">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua.
		</div>
	</q-page>
</template>

<script>
// import { defineComponent } from "vue";

export default {
	name: "MainPage",
	setup() {
		return {
			contentStyle: {
				backgroundColor: "rgba(0,0,0,0)",
				color: "#555",
			},

			contentActiveStyle: {
				backgroundColor: "#eee",
				color: "black",
			},

			thumbStyle: {
				right: "6px",
				borderRadius: "3px",
				backgroundColor: "#027be3",
				width: "12px",
				opacity: 0.75,
			},
		};
		// const $store = useStore();
		// const winState = computed({
		// 	get: () => $store.state.main.winState,
		// 	set: (val) => {
		// 		$store.commit("main/updateWinState", val);
		// 	},
		// });
	},
};
</script>

<style lang="scss" scoped>
// div {
// 	::-webkit-scrollbar {
// 		display: auto;
// 	}
// 	-ms-overflow-style: none; /* IE and Edge */
// 	scrollbar-width: none; /* Firefox */
// }
#c1 {
	background-color: $color-l3;
	height: 100%;
}
#c2 {
	background-color: $color-l4;
	height: 100%;
}
</style>
