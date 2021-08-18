<template>
	<div>
		<q-bar
			id="titlebar"
			class="q-electron-drag q-pr-none q-pl-sm"
			v-if="$q.platform.is.electron"
		>
			<q-avatar size="24px" square>
				<img src="../../public/icons/cs/cs-icon-02a.svg" />
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
	mounted() {
		window.ipc.on("winState", (event, msg) => {
			this.status = msg;
		});
	},
	unmounted() {},
	methods: {
		winMinimize() {
			if (window.csxAPI.envMode === "electron") {
				window.csxAPI.minimize();
			}
		},
		winMaximize() {
			if (window.csxAPI.envMode === "electron") {
				window.csxAPI.maximize();
			}
		},
		winRestore() {
			if (window.csxAPI.envMode === "electron") {
				window.csxAPI.restore();
			}
		},
		winClose() {
			if (window.csxAPI.envMode === "electron") {
				window.csxAPI.close();
			}
		},
	},
	computed: {},
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
