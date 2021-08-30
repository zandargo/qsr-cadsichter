<template>
	<q-page>
		<!-- <div class="row">
			<div class="col-1">
				<q-scroll-area
					:thumb-style="thumbStyle"
					:bar-style="barStyle"
					style="height: 300px; width: 430px"
					class="fit"
				>
					<div v-for="n in 100" :key="n" class="q-pa-xs">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
						do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</div>
				</q-scroll-area>
			</div>
			<div class="col-8">
				<q-scroll-area class="fit">
					<div v-for="n in 100" :key="n" class="q-pa-xs">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
						do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</div>
				</q-scroll-area>
			</div>
		</div> -->

		<div class="flex flex-center column">
			<div
				class="row bg-blue-grey-2"
				style="min-height: 400px; width: 80%; padding: 0px"
			>
				<div
					id="parent"
					class="fit row wrap justify-start items-start content-start"
					style="overflow: hidden; min-height: 100%"
				>
					<div
						class="col-2 bg-cs-l3"
						style="overflow: auto; min-height: 100%"
					>
						<q-card class="no-border-radius">
							<q-card-section> Child #0 </q-card-section>
						</q-card>
					</div>
					<div class="col-grow bg-cs-l4" style="overflow: auto">
						<q-card class="no-border-radius">
							<q-card-section> Child #1 </q-card-section>
						</q-card>
					</div>
				</div>
			</div>
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
