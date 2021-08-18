/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 */
import { contextBridge, ipcRenderer } from "electron";
import { BrowserWindow } from "@electron/remote";

contextBridge.exposeInMainWorld("csxAPI", {
	envMode: process.env.MODE,
	minimize() {
		BrowserWindow.getFocusedWindow().minimize();
	},
	maximize() {
		BrowserWindow.getFocusedWindow().maximize();
	},
	restore() {
		BrowserWindow.getFocusedWindow().unmaximize();
	},
	close() {
		BrowserWindow.getFocusedWindow().close();
		BrowserWindow.getFocusedWindow().destroy();
	},
});

const validChannels = ["winState"];
contextBridge.exposeInMainWorld("ipc", {
	send: (channel, data) => {
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	on: (channel, func) => {
		if (validChannels.includes(channel)) {
			// Strip event as it includes `sender` and is a security risk
			//_ ipcRenderer.on(channel, (event, ...args) => func(...args));
			ipcRenderer.on(channel, (...args) => func(...args));
		}
	},
});
