/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
import { contextBridge, ipcMain, ipcRenderer } from "electron";
import { BrowserWindow } from "@electron/remote";

// win.electron = require("electron");

contextBridge.exposeInMainWorld("csxAPI", {
	listenMinimize: ipcRenderer.on("winState", function () {
		console.log("Aaaah, malandro!!!");
	}),

	minimize() {
		BrowserWindow.getFocusedWindow().minimize();
	},

	toggleMaximize() {
		const win = BrowserWindow.getFocusedWindow();

		if (win.isMaximized()) {
			win.unmaximize();
			// win.webContents.send("winState", "restored1");
			mainWindow.webContents.send("winState", "restored1");
		} else {
			win.maximize();
			// win.webContents.send("winState", "maximized1");
			mainWindow.webContents.send("winState", "maximized1");
		}
	},

	close() {
		BrowserWindow.getFocusedWindow().close();
		BrowserWindow.getFocusedWindow().destroy();
	},

	qWinState() {
		switch (true) {
			case win.isMaximized():
				return "maximized";
				break;
			case win.isMinimized():
				return "minimized";
				break;

			default:
				return "normal";
				break;
		}
	},
});

// window.electron = require("electron");
// win.ipcRenderer = require("electron").ipcRenderer;
