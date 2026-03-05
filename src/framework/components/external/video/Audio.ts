import { 
    EVENT_ON_ABORT, 
    EVENT_ON_CAN_PLAY,
    EVENT_ON_CAN_PLAY_THROUGH,
    EVENT_ON_DURATION_CHANGE,
    EVENT_ON_EMPTIED,
    EVENT_ON_ENDED,
    EVENT_ON_ERROR,
    EVENT_ON_LOAD_START,
    EVENT_ON_LOADED_DATA,
    EVENT_ON_LOADED_METADA_DATA,
    EVENT_ON_PAUSE,
    EVENT_ON_PLAY,
    EVENT_ON_PLAYING,
    EVENT_ON_PROGRESS,
    EVENT_ON_RATE_CHANGE,
    EVENT_ON_SEEKED,
    EVENT_ON_SEEKING,
    EVENT_ON_STALLED,
    EVENT_ON_SUSPEND,
    EVENT_ON_TIME_UPDATE,
    EVENT_ON_VOLUME_CHANGE,
    EVENT_ON_WAITING
} from "../../../constants/OnEvents";
import { 
    ATTR_AUTO_PLAY, 
    ATTR_CONTROLS,
    ATTR_LOOP,
    ATTR_MUTED,
    ATTR_PRELOAD,
    ATTR_SRC
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Audio extends Component{
    
    constructor() {
        super("audio");
    }

    public autoPlay(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_AUTO_PLAY, attr);
    }

    public controls(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CONTROLS, attr);
    }
    
    public loop(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LOOP, attr);
    }
    
    public muted(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MUTED, attr);
    }

    public preload(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_PRELOAD, attr);
    }

    public src(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC, attr);
    }

    public onAbort(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_ABORT, action);
    }

    public onCanPlay(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_CAN_PLAY, action);
    }

    public onCanPlayThrough(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_CAN_PLAY_THROUGH, action);
    }

    public onDurationChange(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_DURATION_CHANGE, action);
    }

    public onEmptied(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_EMPTIED, action);
    }

    public onEnded(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_ENDED, action);
    }

    public onError(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_ERROR, action);
    }

    public onLoadedData(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_LOADED_DATA, action);
    }

    public onLoadedMetaData(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_LOADED_METADA_DATA, action);
    }

    public onLoadStart(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_LOAD_START, action);
    }

    public onPause(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_PAUSE, action);
    }

    public onPlay(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_PLAY, action);
    }

    public onPlaying(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_PLAYING, action);
    }

    public onProgress(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_PROGRESS, action);
    }

    public onRateChange(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_RATE_CHANGE, action);
    }

    public onSeeked(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_SEEKED, action);
    }

    public onSeeking(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_SEEKING, action);
    }

    public onStalled(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_STALLED, action);
    }

    public onSuspend(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_SUSPEND, action);
    }

    public onTimeUpdate(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_TIME_UPDATE, action);
    }

    public onVolumeChange(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_VOLUME_CHANGE, action);
    }

    public onWaiting(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_WAITING, action);
    }
}
