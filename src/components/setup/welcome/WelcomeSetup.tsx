import Button from "../../../elements/Button.tsx";
import Toggle from "../../../elements/Toggle.tsx";
import { useState } from "react";
import { useAtomState } from "@zedux/react";
import { colorSchemeState } from "../../../state/themeState.ts";
import { useTranslation } from "react-i18next";

const WelcomeSetup = () => {
    const [enabled, setEnabled] = useState(false)
    const [, setThemeScheme] = useAtomState(colorSchemeState)

    const { t } = useTranslation()

    function trigger() {
        console.log("trigger")
        if (!enabled) {
            setThemeScheme("dark");
        } else {
            setThemeScheme("light");
        }
    }

    return (
        <div className="">
            <h1 className="text-5xl dark:text-white">{t("Welcome!")}</h1>
            <h2 className="text-zinc-700 dark:text-zinc-300 mt-4 w-72">
                {t("Welcome to Airos! Before we begin, let's connect to the network and log in to your air account.")}
            </h2>
            <Toggle onChange={trigger} enabled={enabled} setEnabled={setEnabled} />
            <span className="text-zinc-700 dark:text-zinc-300">Dark mode</span>
            <Button label={t("Continue")} submit={() => console.log("Button works")} />
        </div>
    );
};

export default WelcomeSetup;