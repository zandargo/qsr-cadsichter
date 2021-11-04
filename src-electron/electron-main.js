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
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: true,

			// nodeIntegration: true,
			// More info: /quasar-cli/developing-electron-apps/electron-preload-script
			preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
		},
	});

	mainWindow.setSize(1000, 1040);
	mainWindow.setPosition(2560 - 1000, 0);

	mainWindow.loadURL(process.env.APP_URL);

	if (process.env.DEBUGGING) {
		// if on DEV or Production with debug enabled
		mainWindow.webContents.openDevTools({ mode: "detach" });
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
		mainWindow.webContents.send("winState", "normal");
	});
	mainWindow.on("minimize", () => {
		//_ console.log("electron minimize");
		mainWindow.webContents.send("winState", "minimized");
	});
	mainWindow.on("maximize", () => {
		//_ console.log("electron maximize");
		mainWindow.webContents.send("winState", "maximized");
	});
	mainWindow.on("unmaximize", () => {
		//_ console.log("electron unmaximize");
		mainWindow.webContents.send("winState", "normal");
	});
	mainWindow.on("restore", () => {
		//_ console.log("electron restore");
		mainWindow.webContents.send("winState", "normal");
	});

	// const knex = require("knex")({
	// 	client: "sqlite3",
	// 	connection: {
	// 		filename: "./data.db",
	// 	},
	// });

	// try {
	// 	// Create a table
	// 	knex.schema
	// 		.createTable("users", (table) => {
	// 			table.increments("id");
	// 			table.string("user_name");
	// 		})
	// 		// ...and another
	// 		.createTable("accounts", (table) => {
	// 			table.increments("id");
	// 			table.string("account_name");
	// 			table.integer("user_id").unsigned().references("users.id");
	// 		});

	// 	// Then query the table...
	// 	const insertedRows = knex("users").insert({ user_name: "Tim" });

	// 	// ...and using the insert id, insert into the other table.
	// 	knex("accounts").insert({
	// 		account_name: "knex",
	// 		user_id: insertedRows[0],
	// 	});

	// 	// Query both of the rows.
	// 	const selectedRows = knex("users")
	// 		.join("accounts", "users.id", "accounts.user_id")
	// 		.select("users.user_name as user", "accounts.account_name as account");

	// 	// map over the results
	// 	const enrichedRows = selectedRows.map((row) => ({
	// 		...row,
	// 		active: true,
	// 	}));

	// 	// Finally, add a catch statement
	// } catch (e) {
	// 	console.error(e);
	// }
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
