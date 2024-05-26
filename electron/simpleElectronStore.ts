import * as fs from "fs";
import * as path from "path";

class SimpleElectronStore {
    private data: Record<string, any>;
    private filePath: string;

    constructor(fileName: string = "store.json") {
        const userDataPath = path.resolve("."); // or app.getPath('userData')
        this.filePath = path.join(userDataPath, fileName);

        try {
            // Try to read the file and parse it as JSON
            this.data = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
        } catch (error) {
            // If file read or parse fails, start with an empty object
            this.data = {};
        }
    }

    // Get a value from the store
    get(key: string): any {
        console.log("get", key);
        return this.data[key];
    }

    // Set a value in the store
    set(key: string, value: any): void {
        console.log("set", key, value);
        this.data[key] = value;
        this.save();
    }

    // Delete a value from the store
    delete(key: string): void {
        console.log("delete", key);
        delete this.data[key];
        this.save();
    }

    // Push to value array
    push(key: string, value: any): void {
        console.log("push", key, value);
        const oldList = this.data[key];
        if (!oldList) throw Error(`Cannot find Array of ${key}`);
        if (!(oldList instanceof Array))
            throw Error(`Cannot add ${key} to ${key}. Not a List`);
        this.data[key] = oldList ? oldList.concat(value) : [value];
        this.save();
    }

    // Save the current state to disk
    private save(): void {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data));
    }
}

export default SimpleElectronStore;
