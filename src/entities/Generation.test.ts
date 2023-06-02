import { describe, expect, test, vitest } from 'vitest';
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
      
      expect(generation.members instanceof Map).toBe(true);
      expect(generation.members.get(mockedId)?.generation).toBe(generation);
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
});
