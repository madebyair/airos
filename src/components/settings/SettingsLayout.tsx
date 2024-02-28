import SettingsSidebarItem from "./SettingsSidebarItem.tsx"
import "../../assets/css/App.css"
import { faDownload, faPalette, faWifi } from "@fortawesome/free-solid-svg-icons"
import { settingsComponent } from "./settingsState.tsx"
import { useAtomState } from "@zedux/react"
import SettingsPersonalization from "./personalization/SettingsPersonalization.tsx"
import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import User from "../../types/user.ts"

const SettingsLayout = () => {
    const [component] = useAtomState(settingsComponent)
    const [user, setUser] = useState<User>()

    useEffect(() => {
        emit("user-request")

        listen<User>("user-response", (r) => {
            setUser(r.payload)
        })
    }, [])

    return (
        <div className={"w-screen h-screen bg-slate-300 flex select-none " + user?.theme}>
            <div className="w-1/2 p-4">
                <div className="mt-2 mb-2">
                    <SettingsSidebarItem name="Connections" icon={faWifi} description="Wifi ・ Bluetooth" component={<></>}/>
                    <SettingsSidebarItem name="Personalization" icon={faPalette} description="Dark mode ・ Wallpaper" component={<SettingsPersonalization />}/>
                    <SettingsSidebarItem name="Updates" icon={faDownload} description="Download and Install ・ Labs" component={<></>}/>
                </div>
            </div>
            <div className="w-1/2 mt-2 mb-2 mx-2">
                {component}
            </div>
        </div>
    )
}

export default SettingsLayout