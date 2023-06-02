import type { UUID } from "../types";

export interface Dependencies {
    generateId: () => UUID
}

export const provideBrowserDependencies: () => Dependencies = () => {
    return {
        generateId: () => window.crypto.randomUUID()
    };
}