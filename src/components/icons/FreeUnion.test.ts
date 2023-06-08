import { cleanup, render, screen } from '@testing-library/svelte';
import FreeUnion from './FreeUnion.svelte';
import { describe, afterEach, test, expect } from 'vitest';

describe('FreeUnion', () => {
    afterEach(() => cleanup());

    test('mounts', async () => {
        const { container } = render(FreeUnion);
        const icon = await screen.findByTestId("free-union-icon");
        
        expect(container).toBeTruthy();
        expect(icon).toBeTruthy();
    });
});