import { cleanup, render, screen } from '@testing-library/svelte';
import MarriageUnion from './MarriageUnion.svelte';
import { describe, afterEach, test, expect } from 'vitest';

describe('MarriageUnion', () => {
    afterEach(() => cleanup());

    test('mounts', () => {
        const { container } = render(MarriageUnion);
        expect(container).toBeTruthy();
        screen.findByTestId("marriage-union-icon");
    });
});