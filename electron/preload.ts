import { contextBridge, ipcRenderer } from "electron";

declare global {
    interface Window {
        electron: {
            store: {
                get: (key: string) => any;
                set: (key: string, val: any) => any;
                push: (key: string, val: any) => any;
                delete: (key: string) => any;
            };
            file: {
                getFilepath: () => string | null;
                buildFileTree: () => void;
            };
        };
    }
}

contextBridge.exposeInMainWorld("electron", {
    store: {
        get(key: string) {
            return ipcRenderer.sendSync("electron-store-get", key);
        },
        set(property: string, val: any) {
            ipcRenderer.send("electron-store-set", property, val);
        },
        push(key: string, val: any) {
            ipcRenderer.send("electron-store-array-push", key, val);
        },
        delete(key: string, val: any) {
            ipcRenderer.send("electron-store-delete", key);
        },
    },
    file: {
        getFilepath() {
            return ipcRenderer.sendSync("open-file-dialog");
        },
        buildFileTree() {
            return ipcRenderer.send("build-file-tree");
        },
    },
});
