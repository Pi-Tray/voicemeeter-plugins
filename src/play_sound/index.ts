import path from "path";
import fs from "fs";

import voicemeeter from "voicemeeter-remote";

export const display_name = "Play sound with Voicemeeter";

export const config_template = {
    path: {
        type: "string",
        description: "Path of the sound file to load"
    }
};

interface Options {
    config?: {
        path?: string;
    }
}

export const handle_push = async ({config}: Options): Promise<void> => {
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

    voicemeeter.logout();
}
