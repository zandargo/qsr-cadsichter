<template>
	<div></div>
</template>

<script>
const { ipcRenderer } = require("electron");

export default {
	name: "titlebar",
	data: function () {
		return {
			status: "normal",
			isMaximized: false,
		};
	},
	mounted() {},
	unmounted() {
		this.$electron.ipcRenderer.removeAllListeners();
	},
	methods: {
		toggleMaximize: function () {
			// this.isMaximized = !this.isMaximized
			console.log("toggleMaximize");
		},
		winMinimize: function () {
			this.$electron.remote.BrowserWindow.getFocusedWindow().minimize();
			//_ this.status = 'minimized'
			console.log("winMinimize", "App minimized");
		},
		winMaximize: function () {
			this.$electron.remote.BrowserWindow.getFocusedWindow().maximize();
			this.status = "maximized";
			console.log("winMaximize", "App maximized");
		},
		winRestore: function () {
			this.$electron.remote.BrowserWindow.getFocusedWindow().restore();
			this.status = "normal";
			console.log("winRestore", "App restored");
		},
		winClose: function () {
			ipcRenderer.send("winClose");
		},
	},
};
</script>

<style></style>
