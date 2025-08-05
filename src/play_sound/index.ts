import path from "path";
import fs from "fs";

import type {Plugin} from "pi-tray-server/src/types";

import voicemeeter from "voicemeeter-remote";

export default {
    display_name: "Play a sound with Voicemeeter",

    config_template: {
        path: {
            type: "string",
            description: "Path of the sound file to load"
        }
    },

    handle_push: async ({config}) => {
        if (!config || !config.path) {
            throw new Error("No path provided in config.");
        }

        // check the path is valid and make it absolute
        if (!path.isAbsolute(config.path)) {
            config.path = path.resolve(config.path);
        }

        if (!fs.existsSync(config.path)) {
            throw new Error(`File does not exist at path: ${config.path}`);
        }

        await voicemeeter.init();
        voicemeeter.login();

        voicemeeter.setRawParameterString("Recorder.load", config.path);
        voicemeeter.setRawParameterFloat("Recorder.play", 1);

        // ensure sound is played before logging out
        setTimeout(() => {
            voicemeeter.logout();
        }, 100);
    }
} as Plugin;
