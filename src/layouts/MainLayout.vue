<template>
	<div id="main_div">
		<!--
	Anything after view="lHh lpr lFf" is only needed
	so we can display this example in the documentation

	Remove this part: container style="height: 400px" class="shadow-2 rounded-borders"
	-->

		<q-layout view="lHh lpr lFf">
			<q-header elevated>
				<TitleBar id="title-bar" elevated />
				<Ribbon class="text-black" />
			</q-header>

			<q-page-container class="q-ma-none q-pa-none">
				<!-- <router-view /> -->
				<!-- <Home /> -->

				<div class="text-black">
					<q-splitter
						class="text-black"
						v-model="splitterModel"
						:limits="[300, 600]"
						unit="px"
						:separator-style="{ cursor: 'col-resize' }"
					>
						<template v-slot:before>
							<div class="q-pa-md">
								<div class="text-h4 q-mb-md">Before</div>
								<div v-for="n in 5" :key="n" class="q-my-md">
									{{ n }}. Lorem ipsum dolor sit, amet consectetur
									adipisicing elit. Quis praesentium cumque magnam odio
									iure quidem, quod illum numquam possimus obcaecati
									commodi minima assumenda consectetur culpa fuga nulla
									ullam. In, libero.
								</div>
							</div>
						</template>

						<template v-slot:after>
							<div class="q-pa-md">
								<div class="text-h4 q-mb-md">After</div>
								<div v-for="n in 20" :key="n" class="q-my-md">
									{{ n }}. Lorem ipsum dolor sit, amet consectetur
									adipisicing elit. Quis praesentium cumque magnam odio
									iure quidem, quod illum numquam possimus obcaecati
									commodi minima assumenda consectetur culpa fuga nulla
									ullam. In, libero.
								</div>
							</div>
						</template>
					</q-splitter>
				</div>
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore, mapState } from "vuex";
import TitleBar from "components/TitleBar.vue";
import Ribbon from "pages/Ribbon.vue";

export default defineComponent({
	name: "MainLayout",

	components: {
		TitleBar,
		Ribbon,
		// Home,
	},
	// 	};
	// },
	setup() {
		// const $store = useStore();
		// const winState = computed({
		// 	get: () => $store.state.main.winState,
		// 	set: (val) => {
		// 		$store.commit("main/updateWinState", val);
		// 	},
		// });
		return {
			splitterModel: ref(320),
		};
	},
});
</script>

<style lang="scss" scoped>
#main_div {
	overflow: hidden;
}
#title-bar {
	box-shadow: 5px 5px blue, 10px 10px red, 15px 15px green !important;
	z-index: 999;
}
</style>
