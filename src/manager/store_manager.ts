import { Store } from "@tauri-apps/plugin-store"

export const store = new Store("/usr/flareos/data.dat")

export function get(key: string) {
    return store.get(key)
}

export function set(key: string, value : unknown) {
    return store.set(key, value).then(() => {
        save()
    })
}

export function save() {
    store.save()

    return
}