<template>
	<div>
		<q-bar
			id="titlebar"
			class="q-electron-drag q-pr-none q-pl-sm"
			v-if="$q.platform.is.electron"
		>
			<q-avatar size="24px" square>
				<img src="../../public/icons/cs/cs-icon-01.svg" />
			</q-avatar>

			<q-space />
			<div><h4>CadSichter</h4></div>
			<q-space />

			<q-btn
				unelevated
				class="win-btn win-btn-regular q-ma-none cursor-inherit q-pt-md"
				@click="winMinimize"
			>
				<q-avatar square size="16px">
					<img
						src="../assets/img/titlebar/icon_minimize.svg"
						class="q-my-auto"
					/>
				</q-avatar>
			</q-btn>

			<q-btn
				unelevated
				size="md"
				class="win-btn win-btn-regular q-ma-none cursor-inherit"
				v-if="status === 'normal'"
				@click="winMaximize"
			>
				<q-avatar square size="16px">
					<img src="../assets/img/titlebar/icon_maximize.svg" />
				</q-avatar>
			</q-btn>

			<q-btn
				unelevated
				size="md"
				class="win-btn win-btn-regular q-ma-none cursor-inherit"
				v-if="status === 'maximized'"
				@click="winRestore"
			>
				<q-avatar square size="16px">
					<img src="../assets/img/titlebar/icon_restore.svg" />
				</q-avatar>
			</q-btn>

			<q-btn
				unelevated
				size="md"
				class="win-btn win-btn-close q-ma-none cursor-inherit"
				@click="winClose"
			>
				<q-avatar square size="16px">
					<img src="../assets/img/titlebar/icon_close.svg" />
				</q-avatar>
			</q-btn>
		</q-bar>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { mapState } from "vuex";

export default {
	name: "titlebar",
	data: function () {
		return {
			status: "normal",
			isMaximized: false,
		};
	},
	created() {},
	mounted() {},
	unmounted() {},
	methods: {
		winMinimize() {
			if (process.env.MODE === "electron") {
				console.log("winMinimize", "App minimized");
				this.status = "minimized";
				window.csxAPI.minimize();
			}
		},
		winMaximize() {
			console.log("winMaximize", "App maximized");
			window.csxAPI.toggleMaximize();
			// status = "maximized";
		},
		winRestore() {
			if (process.env.MODE === "electron") {
				// this.status = "normal";
				window.csxAPI.toggleMaximize();
				console.log("winRestore", "App restored");
			}
		},
		winClose() {
			if (process.env.MODE === "electron") {
				console.log("winClose", "App closed");
				window.csxAPI.close();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
#titlebar {
	background-color: $color-d3;
}

#menu-row {
	color: $color-d3;

	background-color: $color-l4;
}

.win-btn {
	font-weight: 800;
	border-radius: 0px;
	&:hover {
		border-radius: 0px;
	}
}
.win-btn-close:hover {
	background: $red-8;
}
</style>
