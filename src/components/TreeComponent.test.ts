import { cleanup, render, screen } from '@testing-library/svelte';
import Tree from './TreeComponent.svelte';
import { describe, afterEach, test, expect, vitest } from 'vitest';
import type { Dependencies } from '../entities/Dependencies';
import type { UUID } from '../types';

describe('TreeComponent', () => {
    afterEach(() => cleanup());
    const mockedId = `test-test-test-test-test`;
    type GenerateIdFn = () => UUID;
    const mockedGenerateId: GenerateIdFn = vitest.fn(() => mockedId);

    function provideTestDependencies(): Dependencies {
        return {
            generateId: mockedGenerateId
        }
    }

    test('mounts', async () => {
        const { container } = render(Tree, {getDependencies: provideTestDependencies});

        const tree = await screen.findByTestId("tree");

        expect(container).toBeTruthy();
        expect(tree).toBeTruthy();
    });

    test('renders initial member', async () => {
        const { container } = render(Tree, {getDependencies: provideTestDependencies});

        const tree = await screen.findByTestId("tree");
        const member = await screen.findByTestId("member");

        expect(container).toBeTruthy();
        expect(tree).toBeTruthy();
        expect(member).toBeTruthy();
    });
});