import { writable } from "svelte/store";

export const zoom = writable(100);

export const actions = {
    increment: function() {
        return zoom.update(prevZoom => prevZoom + 25);
    },
    decrement: function() {
        return zoom.update(prevZoom => prevZoom - 25);
    }
}