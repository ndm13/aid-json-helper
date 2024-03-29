import {writable} from 'svelte/store';

export default function resettable<T>(initial: () => T) {
    const {subscribe, set, update} = writable<T>(initial());
    return {
        subscribe, set, update, reset: () => set(initial())
    }
}