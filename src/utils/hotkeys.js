/**
 * Handle key events with handlers
 * @param {{[keyName: string]: () => void}} hotkeys an object with keyboard key
 *   names and associated handlers to call for those keys
 * @returns {(keyEvent: KeyboardEvent) => void} an event handler to handle key
 *   events for the given hotkeys
 */
export const handleHotkeys = (hotkeys) => (keyEvent) => {
    if (Object.hasOwn(hotkeys, keyEvent.key)) {
        hotkeys[keyEvent.key]();
    }
};
