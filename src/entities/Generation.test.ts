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
      const member = new Member({
        dependencies: provideTestDependencies(),
      });
  
      const generation = new Generation({
        dependencies: provideTestDependencies(),
        children: [member]
      });
      
      expect(Array.isArray(generation.members)).toBe(true);
      expect(generation.members.find(member => member.id === mockedId)?.generation).toBe(generation);
    });

    test("sets unions if provided", () => {
      const union = new Union({
        leftItemIndex: 0,
        rightItemIndex: 1
      });

      const generation = new Generation({
        children: [],
        dependencies: provideTestDependencies(),
        unions: [union]
      });

      expect(generation.unions).toEqual([union]);
    });
  });

  describe("addMember", () => {
    test("adds a new member to its members array", () => {
      const generation = new Generation({
        children: [],
        dependencies: provideTestDependencies(),
      });


      generation.addMember();      

      expect(generation.members.find(member => member.id === mockedId)).toBeTruthy()
    });
  });

  describe("addUnion", () => {
    	test("adds new Union to the unions array", () => {
        const generation = new Generation({
          children: [],
          dependencies: provideTestDependencies()
        });

        const newUnion = new Union({
          leftItemIndex: 0,
          rightItemIndex: 1,
        })

        generation.addUnion(newUnion);

        expect(generation.unions).toContain(newUnion);
      });
  });
});
