import { MemberType, type UUID } from "./types";

class Ancestor {
    public type: MemberType;
    public x: string;
    public y: string;
    public levelId: UUID;

    private _x: number;
    private _y: number;

    constructor(type: MemberType, x: number, y: number, levelId: UUID) {
        this.type = type;
        this.x = `${x}%`;
        this._x = x;
        this.y = `${y}%`;
        this._y = y;
        this.levelId = levelId;
    }

    changeType = () => {            
        this.type = this.type === MemberType.Female ? MemberType.Male : MemberType.Female;
    }

    buildSiblingToTheRight = () => {
        return new Ancestor(MemberType.Male, this._x + 35, this._y, this.levelId);
    };
}

export default Ancestor;