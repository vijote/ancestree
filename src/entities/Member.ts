import type { UUID } from "../types";
import type Level from "./Level";

export enum MemberType {
    Male = 1,
    Female = 0,
};

type MemberConstructorOptions = {
    x: number,
    level?: Level,
    type?: MemberType
}

class Member {
    public readonly id: UUID;
    public type: MemberType = MemberType.Male;
    public readonly formatted_x: string;
    public level?: Level;
    public static readonly icon_size = 20;
    public static readonly margin = 10;

    public readonly x: number;

    constructor(options: MemberConstructorOptions) {
        this.formatted_x = `${options.x}%`;
        this.x = options.x;
        this.id = crypto.randomUUID();        

        if(options.level !== undefined) this.level = options.level;
        if(options.type !== undefined) this.type = options.type;
    }

    changeType = () => {
        this.type = this.type === MemberType.Female ? MemberType.Male : MemberType.Female;
    }

    buildSiblingToTheRight = () => {
        return new Member({
            x: this.x + 35,
            level: this.level
        });
    };

    setLevel = (newLevel: Level) => {
        this.level = newLevel;
    }
}

export default Member;