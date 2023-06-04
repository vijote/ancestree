import { cleanup, render, screen } from '@testing-library/svelte';
import FemaleMember from './FemaleMember.svelte';
import { describe, afterEach, test, expect } from 'vitest';

describe('FemaleMember', () => {
    afterEach(() => cleanup());

    test('mounts', () => {
        const { container } = render(FemaleMember);
        expect(container).toBeTruthy();
        screen.findByTestId("female-member-icon");
    });
});
