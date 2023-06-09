import { cleanup, createEvent, fireEvent, render, screen } from '@testing-library/svelte';
import Member from './MemberComponent.svelte';
import { describe, afterEach, test, expect, vitest } from 'vitest';
import { MemberType } from '../entities/Member';

describe('MemberComponent', () => {
    const mockedChangeType  = vitest.fn(() => {});
    const mockedAddToTheRight  = vitest.fn(() => {});
    const mockedAddParents  = vitest.fn(() => {});

    afterEach(() => {
        cleanup();
        vitest.clearAllMocks();
    });

    test('mounts member component', async () => {
        const { container } = render(Member, {
            props: {
                type: MemberType.Male,
                addParents: mockedAddParents,
                addToTheRight: mockedAddToTheRight,
                changeType: mockedChangeType
            }
        });

        const member = await screen.findByTestId("member");

        expect(container).toBeTruthy();
        expect(member).toBeTruthy();
    });

    test('mounts male member component', async () => {
        const { container } = render(Member, {
            props: {
                type: MemberType.Male,
                addParents: mockedAddParents,
                addToTheRight: mockedAddToTheRight,
                changeType: mockedChangeType
            }
        });

        const member = await screen.findByTestId("member");
        const memberIcon = await screen.findByTestId("male-member-icon");

        expect(container).toBeTruthy();
        expect(member).toBeTruthy();
        expect(memberIcon).toBeTruthy();
    });

    test('mounts female member component', async () => {
        const { container } = render(Member, {
            props: {
                type: MemberType.Female,
                addParents: mockedAddParents,
                addToTheRight: mockedAddToTheRight,
                changeType: mockedChangeType
            }
        });

        const member = await screen.findByTestId("member");
        const memberIcon = await screen.findByTestId("female-member-icon");

        expect(container).toBeTruthy();
        expect(member).toBeTruthy();
        expect(memberIcon).toBeTruthy();
    });

    test('calls add parents function when its button is clicked', async () => {
        const { container } = render(Member, {
            props: {
                type: MemberType.Female,
                addParents: mockedAddParents,
                addToTheRight: mockedAddToTheRight,
                changeType: mockedChangeType
            }
        });

        const member = await screen.findByTestId("member");
        const button = await screen.findByTestId("add-parents-button");

        await fireEvent.click(button);

        expect(container).toBeTruthy();
        expect(member).toBeTruthy();
        expect(button).toBeTruthy();        
        expect(mockedAddParents).toHaveBeenCalled();
    });

    test('calls add to the right function when its button is clicked', async () => {
        const { container } = render(Member, {
            props: {
                type: MemberType.Female,
                addParents: mockedAddParents,
                addToTheRight: mockedAddToTheRight,
                changeType: mockedChangeType
            }
        });

        const member = await screen.findByTestId("member");
        const button = await screen.findByTestId("add-to-the-right-button");

        await fireEvent.click(button);

        expect(container).toBeTruthy();
        expect(member).toBeTruthy();
        expect(button).toBeTruthy();        
        expect(mockedAddToTheRight).toHaveBeenCalled();
    });

    test('calls add to the right function when its button is clicked', async () => {
        const { container } = render(Member, {
            props: {
                type: MemberType.Female,
                addParents: mockedAddParents,
                addToTheRight: mockedAddToTheRight,
                changeType: mockedChangeType
            }
        });

        const member = await screen.findByTestId("member");
        const button = await screen.findByTestId("change-type-button");

        await fireEvent.click(button);

        expect(container).toBeTruthy();
        expect(member).toBeTruthy();
        expect(button).toBeTruthy();        
        expect(mockedChangeType).toHaveBeenCalled();
    });
});