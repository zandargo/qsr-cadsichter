import { app, BrowserWindow, nativeTheme } from "electron";
import path from "path";
import { initialize } from "@electron/remote/main";
initialize();
const { ipcMain } = require("electron");

try {
	if (
		process.platform === "win32" &&
		nativeTheme.shouldUseDarkColors === true
	) {
		require("fs").unlinkSync(
			require("path").join(app.getPath("userData"), "DevTools Extensions")
		);
	}
} catch (_) {}

let mainWindow;

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 600,
		frame: false,
		icon: `${__dirname}/icons/icon.ico`,
		useContentSize: true,
		webPreferences: {
			contextIsolation: true,
			enableRemoteModule: true,
			// More info: /quasar-cli/developing-electron-apps/electron-preload-script
			preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
		},
	});

	mainWindow.loadURL(process.env.APP_URL);

	if (process.env.DEBUGGING) {
		// if on DEV or Production with debug enabled
		//  mainWindow.webContents.openDevTools();
	} else {
		// we're on production; no access to devtools pls
		mainWindow.webContents.on("devtools-opened", () => {
			mainWindow.webContents.closeDevTools();
		});
	}

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	mainWindow.on("move", () => {
		//_ console.log("electron move");
	});
	mainWindow.on("minimize", () => {
		console.log("electron minimize");
		mainWindow.webContents.send("winState", "minimized");
	});
	mainWindow.on("maximize", () => {
		console.log("electron maximize");
		mainWindow.webContents.send("winState", "maximized");
	});
	mainWindow.on("restore", () => {
		console.log("electron restore");
		mainWindow.webContents.send("winState", "restored");
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});
