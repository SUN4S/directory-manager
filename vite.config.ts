import { defineConfig } from "vitest/config";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        resolveSnapshotPath: (testPath, snapExtension) =>
            testPath + snapExtension,
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@redux": path.resolve(__dirname, "src/redux"),
            "@router": path.resolve(__dirname, "src/router"),
            "@layout": path.resolve(__dirname, "src/layout"),
        },
    },
    plugins: [
        react(),
        tsconfigPaths(),
        electron({
            main: {
                // Shortcut of `build.lib.entry`.
                entry: "electron/main.ts",
            },
            preload: {
                // Shortcut of `build.rollupOptions.input`.
                // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
                input: path.join(__dirname, "electron/preload.ts"),
            },
            // Ployfill the Electron and Node.js API for Renderer process.
            // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
            // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
            renderer:
                process.env.NODE_ENV === "test"
                    ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
                      undefined
                    : {},
        }),
    ],
});
