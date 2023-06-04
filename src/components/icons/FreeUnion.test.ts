import { cleanup, render, screen } from '@testing-library/svelte';
import FreeUnion from './FreeUnion.svelte';
import { describe, afterEach, test, expect } from 'vitest';

describe('FreeUnion', () => {
    afterEach(() => cleanup());

    test('mounts', () => {
        const { container } = render(FreeUnion);
        expect(container).toBeTruthy();
        screen.findByTestId("free-union-icon");
    });
});