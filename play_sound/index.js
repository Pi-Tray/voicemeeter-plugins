"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const voicemeeter_remote_1 = __importDefault(require("voicemeeter-remote"));
exports.default = {
    display_name: "Play a sound with Voicemeeter",
    config_template: {
        path: {
            type: "string",
            description: "Path of the sound file to load"
        }
    },
    handle_push: (_a) => __awaiter(void 0, [_a], void 0, function* ({ config }) {
        if (!config || !config.path) {
            throw new Error("No path provided in config.");
        }
        // check the path is valid and make it absolute
        if (!path_1.default.isAbsolute(config.path)) {
            config.path = path_1.default.resolve(config.path);
        }
        if (!fs_1.default.existsSync(config.path)) {
            throw new Error(`File does not exist at path: ${config.path}`);
        }
        yield voicemeeter_remote_1.default.init();
        voicemeeter_remote_1.default.login();
        voicemeeter_remote_1.default.setRawParameterString("Recorder.load", config.path);
        voicemeeter_remote_1.default.setRawParameterFloat("Recorder.play", 1);
        // ensure sound is played before logging out
        setTimeout(() => {
            voicemeeter_remote_1.default.logout();
        }, 100);
    })
};
