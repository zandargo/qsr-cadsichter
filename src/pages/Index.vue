<template>
	<div>
		<!-- <div v-for="n in 20" :key="n" class="q-my-md">
			{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
			praesentium cumque magnam odio iure quidem, quod illum numquam possimus
			obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
			In, libero.
		</div> -->
		<q-splitter v-model="splitterModel">
			<template v-slot:before>
				<div class="q-pa-md">
					<div class="text-h4 q-mb-md">Before</div>
					<div v-for="n in 20" :key="n" class="q-my-md">
						{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Quis praesentium cumque magnam odio iure quidem, quod
						illum numquam possimus obcaecati commodi minima assumenda
						consectetur culpa fuga nulla ullam. In, libero.
					</div>
				</div>
			</template>

			<template v-slot:after>
				<div class="q-pa-md">
					<div class="text-h4 q-mb-md">After</div>
					<div v-for="n in 20" :key="n" class="q-my-md">
						{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Quis praesentium cumque magnam odio iure quidem, quod
						illum numquam possimus obcaecati commodi minima assumenda
						consectetur culpa fuga nulla ullam. In, libero.
					</div>
				</div>
			</template>
		</q-splitter>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "MainPage",
	setup() {
		return {
			splitterModel: ref(20), // start at 20%
		};
		// const $store = useStore();
		// const winState = computed({
		// 	get: () => $store.state.main.winState,
		// 	set: (val) => {
		// 		$store.commit("main/updateWinState", val);
		// 	},
		// });
	},
});
</script>
