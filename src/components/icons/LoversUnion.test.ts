import { cleanup, render, screen } from '@testing-library/svelte';
import LoversUnion from './LoversUnion.svelte';
import { describe, afterEach, test, expect } from 'vitest';

describe('LoversUnion', () => {
    afterEach(() => cleanup());

    test('mounts', () => {
        const { container } = render(LoversUnion);
        expect(container).toBeTruthy();
        screen.findByTestId("lovers-union-icon");
    });
});