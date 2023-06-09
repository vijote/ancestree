import { afterEach, describe, expect, test, vitest } from 'vitest';
import Generation from './Generation';
import Member  from './Member';
import type { UUID } from '../types';
import type { Dependencies } from './Dependencies';
import Union from './Union';

describe('Generation', () => {
  const mockedId = `test-test-test-test-test`;
  type GenerateIdFn = () => UUID;
  const mockedGenerateId: GenerateIdFn  = vitest.fn(() => mockedId);

  function provideTestDependencies(): Dependencies {
    return {
      generateId: mockedGenerateId
    }
  }

  afterEach(() => {
    vitest.clearAllMocks();
  })

  describe("constructor", () => {
    test("generates id with provided dependency", () => {
      const generation = new Generation({
        children: [],
        dependencies: provideTestDependencies()
      });

      expect(generation.id).toBe(mockedId);
    });

    test("formats members correctly", () => {
      const mockedX = 0;
      const member = new Member({
        dependencies: provideTestDependencies(),
        x: mockedX
      });
  
      const generation = new Generation({
        dependencies: provideTestDependencies(),
        children: [member]
      });
      
      expect(Array.isArray(generation.members)).toBe(true);
      expect(generation.members.find(member => member.id === mockedId)?.generation).toBe(generation);
    });

    test("sets unions if provided", () => {
      const mother = new Member({
        dependencies: provideTestDependencies(),
        x: 0
      });

      const father = new Member({
        dependencies: provideTestDependencies(),
        x: 0
      });

      const union = new Union({
        mother,
        father
      });

      const generation = new Generation({
        children: [],
        dependencies: provideTestDependencies(),
        unions: [union]
      });

      expect(generation.unions).toEqual([union]);
    });

    test("sets height and y if height is provided", () => {

      const generation = new Generation({
        children: [],
        dependencies: provideTestDependencies(),
        height: 1
      });

      expect(generation.height).toEqual(1);
      expect(generation.y).toEqual("35%");
    });
  });

  describe("height getter", () => {
    test("returns private property height", () => {
      const generation = new Generation({
        children: [],
        height: 24,
        dependencies: provideTestDependencies()
      });

      expect(generation.height).toBe(24);
    });
  });

  describe("addMember", () => {
    test("adds a new member to its members array", () => {
      const generation = new Generation({
        children: [],
        dependencies: provideTestDependencies(),
      });

      const newMember = new Member({
        dependencies: provideTestDependencies(),
        x: 0
      });

      generation.addMember(newMember)();      

      expect(generation.members.find(member => member.id === newMember.id)).toEqual(newMember)
    });
  });

  describe("setHeight", () => {
    test("sets height and y", () => {
      const generation = new Generation({
        children: [],
        dependencies: provideTestDependencies()
      });

      generation.setHeight(4);

      expect(generation.height).toBe(4);
      expect(generation.y).toBe( 4 * 35 + "%");
    });
  });

  describe("addUnion", () => {
    	test("adds new Union to the unions array", () => {
        const generation = new Generation({
          children: [],
          dependencies: provideTestDependencies()
        });

        const father = new Member({
          dependencies: provideTestDependencies(),
          x: 0
        });

        const mother = new Member({
          dependencies: provideTestDependencies(),
          x: 1
        });

        const newUnion = new Union({
          mother,
          father
        })

        generation.addUnion(newUnion);

        expect(generation.unions).toContain(newUnion);
      });
  });
});
