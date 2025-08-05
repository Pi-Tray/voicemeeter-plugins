/// <reference types="node" />

declare module "voicemeeter-remote" {
    export enum VoicemeeterType {
        unknown = 0,
        voicemeeter = 1,
        voicemeeterBanana = 2,
        voicemeeterPotato = 3,
    }

    export enum RunVoicemeeterType {
        VoicemeeterStandard = 1,
        VoicemeeterBanana = 2,
        VoicemeeterPotato = 3,
        VoicemeeterStandardx64 = 4,
        VoicemeeterBananax64 = 5,
        VoicemeeterPotatox64 = 6,
        VBDeviceCheck = 10,
        VoicemeeterMacroButtons = 11,
        VMStreamerView = 12,
        VoicemeeterBUSMatrix8 = 13,
        VoicemeeterBUSGEQ15 = 14,
        VBAN2MIDI = 15,
        VBCABLE_ControlPanel = 20,
        VBVMAUX_ControlPanel = 21,
        VBVMVAIO3_ControlPanel = 22,
        VBVoicemeeterVAIO_ControlPanel = 23,
    }

    export enum InterfaceType {
        strip = 0,
        bus = 1,
    }

    export enum LevelType {
        preFaderInput = 0,
        postFaderInput = 1,
        postMuteInput = 2,
        output = 3,
    }

    export enum DeviceType {
        mme = 1,
        wdm = 3,
        ks = 4,
        asio = 5,
    }

    export enum MacroButtonState {
        disabled = 0,
        enabled = 1,
    }

    export enum MacroButtonTrigger {
        disabled = 0,
        enabled = 1,
    }

    export enum MacroButtonColor {
        default = 0,
        brown = 1,
        yellow = 2,
        green = 3,
        cyan = 4,
        blue = 5,
        darkblue = 6,
        pink = 7,
        red = 8,
    }

    export interface VoicemeeterDevice {
        type: number;
        name: string;
        hardwareId: string;
    }

    export interface StripConfig {
        id: number;
        name?: string;
        isVirtual?: boolean;
    }

    export interface BusConfig {
        id: number;
        name?: string;
        isVirtual?: boolean;
    }

    export interface VoicemeeterConfig {
        strips: StripConfig[];
        buses: BusConfig[];
    }

    export const VoicemeeterDefaultConfig: {
        [key in VoicemeeterType]: VoicemeeterConfig | {};
    };

    export interface ParameterObject {
        type: InterfaceType;
        name: string;
        id: number;
        value: string | number;
    }

    export interface Voicemeeter {
        isInitialised: boolean;
        isConnected: boolean;
        outputDevices: VoicemeeterDevice[];
        inputDevices: VoicemeeterDevice[];
        type: VoicemeeterType;
        version: string | null;
        voicemeeterConfig: VoicemeeterConfig | null;

        init(): Promise<void>;
        runVoicemeeter(type: RunVoicemeeterType): void;

        login(): void;
        logout(): void;

        getOutputDeviceNumber(): number;
        getInputDeviceNumber(): number;
        updateDeviceList(): void;

        isParametersDirty(): number;

        /** @deprecated */
        getParameter(parameter: string): number;
        getRawParameterFloat(parameter: string): number;
        getRawParameterString(parameter: string): string;

        setRawParameterFloat(parameter: string, value: number): void;
        setRawParameterString(parameter: string, value: string): void;
        setRawParameters(script: string): void;

        setMacroButtonState(button: number, state: MacroButtonState): void;
        setMacroButtonStateOnly(button: number, state: MacroButtonState): void;
        setMacroButtonTrigger(button: number, trigger: MacroButtonTrigger): void;
        setMacroButtonColor(button: number, color: MacroButtonColor): void;

        showVoicemeeter(): void;
        shutdownVoicemeeter(): void;
        restartVoicemeeterAudioEngine(): void;
        ejectVoicemeeterCassette(): void;
        resetVoicemeeterConfiguration(): void;
        saveVoicemeeterConfiguration(filename: string): void;
        loadVoicemeeterConfiguration(filename: string): void;
        lockVoicemeeterGui(lock: boolean): void;

        showVbanChatDialog(): void;
        getLevel(type: LevelType, channel: number): number;

        _getParameterFloat(type: InterfaceType, name: string, id: number): number;
        _getParameterString(type: InterfaceType, name: string, id: number): string;
        _setParameterFloat(type: InterfaceType, name: string, id: number, value: number): void;
        _setParameterString(type: InterfaceType, name: string, id: number, value: string): void;
        _setParameters(parameters: ParameterObject[]): void;
        /** @deprecated */
        _sendRawParameterScript(script: string): void;

        // Dynamically defined
        [key: `setBus${string}`]: (busNumber: number, value: number | boolean) => void;
        [key: `getBus${string}`]: (busNumber: number) => number;
        [key: `setStrip${string}`]: (stripNumber: number, value: number | boolean) => void;
        [key: `getStrip${string}`]: (stripNumber: number) => number;
    }

    const voicemeeter: Voicemeeter;

    export default voicemeeter;
    export {
        VoicemeeterType,
        RunVoicemeeterType,
        InterfaceType,
        LevelType,
        DeviceType,
        MacroButtonState,
        MacroButtonTrigger,
        MacroButtonColor,
        VoicemeeterDefaultConfig,
    };
}
