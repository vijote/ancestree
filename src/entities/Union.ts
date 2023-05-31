import type Generation from './Generation';
import Member from './Member';

export enum UnionType {
    Free = 1,
    Lovers = 2,
    Marriage = 3
}

type UnionConstructorOptions = {
    mother: Member,
    father: Member,
    type?: UnionType
}

/**
 * Horizontal line that represents the union between two members
 */
class Union {
    private mother: Member;
    private father: Member;

    public type: UnionType = UnionType.Free;
    public startingPoint: string;
    public endingPoint: string;

    constructor(options: UnionConstructorOptions) {
        this.mother = options.mother;
        this.father = options.father;
        this.startingPoint = this.father.x < this.mother.x ? `${this.father.x + Member.margin}%` : `${this.mother.x + Member.margin}%`;
        this.endingPoint = this.father.x > this.mother.x ? `${this.father.x + Member.margin + 5}%` : `${this.mother.x + Member.margin + 5}%`;

        if (options.type) this.type = options.type;
    }
}

export default Union;