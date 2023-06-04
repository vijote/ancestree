import { cleanup, render, screen } from '@testing-library/svelte';
import MaleMember from './MaleMember.svelte';
import { describe, afterEach, test, expect } from 'vitest';

describe('MaleMember', () => {
    afterEach(() => cleanup());

    test('mounts', () => {
        const { container } = render(MaleMember);
        expect(container).toBeTruthy();
        screen.findByTestId("male-member-icon");
    });
});