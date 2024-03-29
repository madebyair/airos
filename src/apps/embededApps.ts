import { App } from "../types/app.ts"

const embededApps : Array<App> = [
    {
        "name": "Terminal",
        "description": "Terminal. For real Developers :D",
        "exec": "__airos_emebed_app_terminal__",
        "icon": "icons://terminal.webp"
    },
    {
        "name": "Files",
        "description": "File Manager",
        "exec": "__airos_emebed_app_files__",
        "icon": "icons://files.webp"
    },
    {
        "name": "Settings",
        "description": "Here you can manage with all settings",
        "exec": "__airos_emebed_app_settings__",
        "icon": "icons://settings.webp"
    },
    {
        "name": "Store",
        "description": "airstore is app which allows you to download any app.",
        "exec": "__airos_emebed_app_store__",
        "icon": "icons://store.webp"
    }
]

export default embededApps