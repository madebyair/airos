import { useAtomState } from "@zedux/react"
import "../../assets/css/App.css"
import { currentDirState } from "./filesState.tsx"
import DirectoryExplorer from "./explorer/DirectoryExplorer.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons"
import { getCurrent } from "@tauri-apps/api/window"
import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import User, { defaultUser } from "../../types/user.ts"
import "../../i18n.ts"
import { useTranslation } from "react-i18next"
import FilesSidebar from "./FilesSidebar.tsx"
import Tabs, { Tab } from "@uiw/react-tabs-draggable"
import FilesTab from "./FilesTab.tsx"

const FilesContainer = () => {
    // @ts-ignore
    const [currentDir, setCurrentDir, ] = useAtomState(currentDirState)
    const [user, setUser] = useState<User>(defaultUser)
    const [activeKey, setActiveKey] = useState("1")
    const [tabs, setTabs] = useState<Array<string>>([
        "1"
    ])
    const [ , i18n ] = useTranslation()

    useEffect(() => {
        emit("user-request")

        listen<User>("user-response", (r) => {
            setUser(r.payload)
            i18n.changeLanguage(r.payload.language)
        })

        listen<"light" | "dark">("theme-change", (event) => {
            setUser(prevUser => ({
                ...prevUser,
                theme: event.payload
            }))
        })

        if (window.location.port !== "1420") {
            window.addEventListener("contextmenu", e => e.preventDefault())
        }

    }, [])

    return (
        <div className={user.theme}>
            <div className="w-screen h-screen bg-slate-300 dark:bg-zinc-900 select-none dark:text-white flex">
                <div className="w-1/3 h-screen">
                    <FilesSidebar />
                </div>
                <div className="w-2/3">
                    <div data-tauri-drag-region={true} className="h-9 w-full relative" onDoubleClick={() => {
                        getCurrent().toggleMaximize()
                    }} onMouseDown={(event) => {
                        if (event.button === 1) {
                            getCurrent().minimize()
                        }
                    }}>
                        <div className="absolute w-11/12 overflow-auto">
                            <Tabs activeKey={activeKey} style={{ gap: 12 }} onTabClick={(id) => setActiveKey(id)}>
                                {tabs.map((object) => {
                                    return (
                                        <Tab id={object}><FilesTab path={currentDir} active={activeKey.toString() === object.toString()} /></Tab>
                                    )
                                })}
                                <div className="h-10 max-w-10/12 flex" onClick={() => {
                                    setCurrentDir("/home")

                                    setTabs(prevState => {
                                        const length = prevState.length + 1
                                        setActiveKey(length.toString())
                                        return [...prevState, String(length)]
                                    })
                                }}>
                                    <div className="m-auto">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </Tabs>
                        </div>
                        <div className="absolute right-0 h-9 w-9 flex" onClick={() => {
                            getCurrent().close()
                        }}>
                            <div className="m-auto">
                                <FontAwesomeIcon icon={faX} size={"sm"}/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mr-2" style={{
                        height: "calc(100% - 45px)"
                    }}>
                        <DirectoryExplorer directory={currentDir}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilesContainer