import { cleanup, render, screen } from '@testing-library/svelte';
import MarriageUnion from './MarriageUnion.svelte';
import { describe, afterEach, test, expect } from 'vitest';

describe('MarriageUnion', () => {
    afterEach(() => cleanup());

    test('mounts', async () => {
        const { container } = render(MarriageUnion);
        const icon = await screen.findByTestId("marriage-union-icon");

        expect(container).toBeTruthy();
        expect(icon).toBeTruthy();
    });
});