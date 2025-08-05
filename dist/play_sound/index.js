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
exports.handle_push = exports.config_template = exports.display_name = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const voicemeeter_connector_1 = require("voicemeeter-connector");
exports.display_name = "Play sound with Voicemeeter";
exports.config_template = {
    path: {
        type: "string",
        description: "Path of the sound file to load"
    }
};
const handle_push = (config) => __awaiter(void 0, void 0, void 0, function* () {
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
    const vm = yield voicemeeter_connector_1.Voicemeeter.init();
    vm.connect();
    yield vm.setOption(`Recorder.load=${config.path}`);
    yield vm.setOption("Recorder.play=1");
    vm.disconnect();
});
exports.handle_push = handle_push;
