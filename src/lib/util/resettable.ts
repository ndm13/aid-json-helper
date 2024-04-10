import {writable} from "../../deps.ts";

export default function resettable<T>(initial: () => T) {
    const {subscribe, set, update} = writable<T>(initial());
    return {
        subscribe, set, update, reset: () => set(initial())
    }
}