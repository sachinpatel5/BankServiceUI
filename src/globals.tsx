// src/globals.ts
const globalStore: { [key: string]: any } = {
    store: {},
    set(key: string, value: any) {
        this.store[key] = value;
    },
    get(key: string) {
        return this.store[key];
    },
};

export default globalStore;