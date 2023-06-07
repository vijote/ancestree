import { afterEach, describe, expect, test, vitest } from 'vitest';
import type { UUID } from '../types';
import type { Dependencies } from './Dependencies';
import Union, { UnionType } from './Union';
import Member from './Member';

describe('Union', () => {
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
  });

  describe("constructor", () => {
    test("sets default properties correctly", () => {
        const father = new Member({
            dependencies: provideTestDependencies(),
            x: 0,
        });

        const mother = new Member({
            dependencies: provideTestDependencies(),
            x: 1,
        });

        const union = new Union({
            father,
            mother
        });

        expect(union.startingPoint).toBe(0 + 10 + "%");
        expect(union.endingPoint).toBe(1 + 10 + 5 + "%");
        expect(union.type).toBe(UnionType.Free);
    });

    test("uses mother's x value as startingPoint if it's lower than fathers", () => {
      const father = new Member({
          dependencies: provideTestDependencies(),
          x: 4,
      });

      const mother = new Member({
          dependencies: provideTestDependencies(),
          x: 3,
      });

      const union = new Union({
          father,
          mother
      });

      expect(union.startingPoint).toBe(3 + 10 + "%");
      expect(union.endingPoint).toBe(4 + 10 + 5 + "%");
      expect(union.type).toBe(UnionType.Free);
  });

    test("sets type property if received", () => {
        const father = new Member({
            dependencies: provideTestDependencies(),
            x: 0,
        });

        const mother = new Member({
            dependencies: provideTestDependencies(),
            x: 1,
        });

        const union = new Union({
            father,
            mother,
            type: UnionType.Marriage
        });

        expect(union.type).toBe(UnionType.Marriage);
    });
  });
});
