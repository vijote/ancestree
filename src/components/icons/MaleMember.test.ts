import { cleanup, render, screen } from '@testing-library/svelte';
import MaleMember from './MaleMember.svelte';
import { describe, afterEach, test, expect } from 'vitest';

describe('MaleMember', () => {
    afterEach(() => cleanup());

    test('mounts', async () => {
        const { container } = render(MaleMember);
        const icon = await screen.findByTestId("male-member-icon");

        expect(container).toBeTruthy();
        expect(icon).toBeTruthy();
    });
});