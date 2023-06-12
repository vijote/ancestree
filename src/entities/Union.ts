export enum UnionType {
    Free = 1,
    Lovers = 2,
    Marriage = 3
}

type UnionConstructorOptions = {
    type?: UnionType,
    leftItemIndex: number,
    rightItemIndex: number,
}

/**
 * Horizontal line that represents the union between two members
 */
class Union {
    public type: UnionType = UnionType.Free;
    public leftItemIndex: number;
    public rightItemIndex: number;

    constructor(options: UnionConstructorOptions) {
        this.leftItemIndex = options.leftItemIndex;
        this.rightItemIndex = options.rightItemIndex;
    }
}

export default Union;