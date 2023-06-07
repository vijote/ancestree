import { render, screen } from '@testing-library/svelte';
import FemaleMember from './FemaleMember.svelte';
import { describe, test, expect } from 'vitest';

describe('FemaleMember', () => {
    test('mounts', async () => {
        const { container } = render(FemaleMember);
        const icon = await screen.findByTestId("female-member-icon");

        expect(container).toBeTruthy();
        expect(icon).toBeTruthy();
    });
});
