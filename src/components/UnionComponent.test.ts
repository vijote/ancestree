import { cleanup, render, screen } from '@testing-library/svelte';
import Union from './UnionComponent.svelte';
import { describe, afterEach, test, expect } from 'vitest';
import { UnionType } from '../entities/Union';

describe('UnionComponent', () => {
    afterEach(() => cleanup());

    test('mounts free union component', async () => {
        const { container } = render(Union, {props: { type: UnionType.Free }});
        const union = await screen.findByTestId("free-union-icon");

        expect(container).toBeTruthy();
        expect(union).toBeTruthy();
    });

    test('mounts marriage union component', async () => {
        const { container } = render(Union, {props: { type: UnionType.Marriage }});
        const union = await screen.findByTestId("marriage-union-icon");

        expect(container).toBeTruthy();
        expect(union).toBeTruthy();
    });

    test('mounts lovers union component', async () => {
        const { container } = render(Union, {props: { type: UnionType.Lovers }});
        const union = await screen.findByTestId("lovers-union-icon");

        expect(container).toBeTruthy();
        expect(union).toBeTruthy();
    });
});