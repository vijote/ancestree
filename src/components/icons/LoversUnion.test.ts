import { cleanup, render, screen } from '@testing-library/svelte';
import LoversUnion from './LoversUnion.svelte';
import { describe, afterEach, test, expect } from 'vitest';

describe('LoversUnion', () => {
    afterEach(() => cleanup());

    test('mounts', async () => {
        const { container } = render(LoversUnion);
        const icon = await screen.findByTestId("lovers-union-icon");
        
        expect(container).toBeTruthy();
        expect(icon).toBeTruthy();
    });
});