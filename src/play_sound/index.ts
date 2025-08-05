import path from "path";
import fs from "fs";

import { Voicemeeter } from "voicemeeter-connector";

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

    const vm = await Voicemeeter.init();
    vm.connect();

    await vm.setOption(`Recorder.load=${config.path}`);
    await vm.setOption("Recorder.play=1");

    vm.disconnect();
}
