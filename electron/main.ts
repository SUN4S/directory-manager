import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import SimpleElectronStore from "./simpleElectronStore.ts";
import FileTree from "./FileTree.ts";

const store = new SimpleElectronStore();
const fileTree = new FileTree(store.get("parentDirectory"));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, "public")
    : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        width: 1600,
        height: 900,
        icon: path.join(process.env.VITE_PUBLIC!, "electron-vite.svg"),
        webPreferences: {
            preload: path.join(__dirname, "preload.mjs"),
        },
    });

    // Test active push message to Renderer-process.
    win.webContents.on("did-finish-load", () => {
        win?.webContents.send(
            "main-process-message",
            new Date().toLocaleString()
        );
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, "index.html"));
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        win = null;
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(() => {
    fileTree.build();
    createWindow();
});

// IPC listener
// // Store
ipcMain.on("electron-store-get", async (event, val) => {
    event.returnValue = store.get(val);
});
ipcMain.on("electron-store-set", async (_event, key, val) => {
    store.set(key, val);
});
ipcMain.on("electron-store-array-push", async (_event, key, val) => {
    store.push(key, val);
});
ipcMain.on("electron-store-delete", async (_event, key) => {
    store.delete(key);
});

// // File
ipcMain.on("open-file-dialog", async (event) => {
    const { filePaths } = await dialog.showOpenDialog({
        title: "Select Directory",
        properties: ["openFile", "openDirectory"],
    });
    console.log(filePaths);
    if (filePaths && filePaths.length > 0) {
        event.returnValue = filePaths[0]; // Send the first selected file path
    } else {
        event.returnValue = null; // Handle case where no file is selected
    }
});
ipcMain.on("build-file-tree", async (_event) => {
    fileTree.build();
});
