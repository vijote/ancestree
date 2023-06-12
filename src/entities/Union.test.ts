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
        const union = new Union({
            leftItemIndex: 0,
            rightItemIndex: 1
        });

        expect(union.leftItemIndex).toBe(0);
        expect(union.rightItemIndex).toBe(1);
        expect(union.type).toBe(UnionType.Free);
    });
  });
});
