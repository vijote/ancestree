import { afterEach, describe, expect, test, vitest } from 'vitest';
import Generation from './Generation';
import Member  from './Member';
import type { UUID } from '../types';
import type { Dependencies } from './Dependencies';
import Union from './Union';
import Tree from './Tree';

describe('Tree', () => {
  const mockedId = `test-test-test-test-test`;
  type GenerateIdFn = () => UUID;
  const mockedGenerateId  = vitest.fn(() => mockedId);

  function provideTestDependencies(): Dependencies {
    //@ts-ignore
    const generateId: GenerateIdFn = mockedGenerateId;

    return {
      generateId: generateId
    }
  }

  afterEach(() => {
    vitest.clearAllMocks();
  });

  describe("constructor", () => {
    test("sets default properties", () => {
        // this.dependencies = options.dependencies;
        // this.id = this.dependencies.generateId();
        // this.generations = options.generations;

        const tree = new Tree({
            dependencies: provideTestDependencies(),
            generations: []
        });

        expect(tree.id).toBe(mockedId);
        expect(tree.generations).toEqual([]);
    });
  });

  describe("initializeTree", () => {
    test("creates new tree object with correct properties", () => {
        const tree = Tree.initializeTree(provideTestDependencies());

        expect(tree.generations).toHaveLength(1);
        expect(tree.id).toBe(mockedId);
    });
  });

  describe("addGenerationUpwards", () => {
    test("adds new generation and increases height of the existing ones", () => {
        const tree = Tree.initializeTree(provideTestDependencies());

        tree.addGenerationUpwards(0);

        // Adds new generation
        expect(tree.generations).toHaveLength(2);
        expect(tree.generations[0].height).toBe(0);

        // Increases height of the existing one 
        expect(tree.generations[1].height).toBe(1);
    });
  });

  describe("addParents", () => {
    test("adds new generation and union", () => {
        // Different id's for each element
        mockedGenerateId.mockReturnValueOnce("test-test-test-test-test1");
        mockedGenerateId.mockReturnValueOnce("test-test-test-test-test2");
        mockedGenerateId.mockReturnValueOnce("test-test-test-test-test3");
        mockedGenerateId.mockReturnValueOnce("test-test-test-test-test4");
        mockedGenerateId.mockReturnValueOnce("test-test-test-test-test5");

        const tree = Tree.initializeTree(provideTestDependencies());

        const child = tree.generations[0].members.get("test-test-test-test-test1");

        tree.addParents(child!)();

        // Inserted new union and generation
        expect(tree.generations).toHaveLength(2);
        expect(tree.generations[0].unions).toHaveLength(1);

        // New generation has 2 members
        expect(tree.generations[0].members.size).toBe(2);
    });
  });
});