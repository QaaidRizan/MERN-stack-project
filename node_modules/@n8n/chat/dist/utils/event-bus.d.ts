export type CallbackFn = Function;
export type UnregisterFn = () => void;
export interface EventBus {
    on: (eventName: string, fn: CallbackFn) => UnregisterFn;
    off: (eventName: string, fn: CallbackFn) => void;
    emit: <T = Event>(eventName: string, event?: T) => void;
}
export declare function createEventBus(): EventBus;
