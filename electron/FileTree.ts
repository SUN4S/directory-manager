import * as fs from "node:fs";

export default class FileTree {
    private path: string;
    private name: string | null;
    private items: any[];

    constructor(path: string, name = null) {
        this.path = path;
        this.name = name;
        this.items = [];
    }

    static readDir(path: string) {
        const fileArray = [];

        if (!path) return fileArray;

        fs.readdirSync(path).forEach((file) => {
            const fileInfo = new FileTree(`${path}\\${file}`, file);

            const stat = fs.statSync(fileInfo.path);

            if (stat.isDirectory()) {
                fileInfo.items = FileTree.readDir(fileInfo.path);
            }

            fileArray.push(fileInfo);
        });

        return fileArray;
    }

    build = () => {
        this.items = FileTree.readDir(this.path);
    };
}
