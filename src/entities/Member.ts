import type { UUID } from "../types";

export enum MemberType {
    Male = 1,
    Female = 0,
};

type MemberConstructorOptions = {
    x: number,
    levelId?: UUID
}

class Member {
    public readonly id: UUID;
    public type: MemberType = MemberType.Male;
    public readonly formatted_x: string;
    public levelId?: UUID;
    public readonly icon_size: number;

    public readonly x: number;

    constructor(options: MemberConstructorOptions) {
        this.formatted_x = `${options.x}%`;
        this.x = options.x;
        this.icon_size = 20;
        this.id = crypto.randomUUID();

        if(options.levelId) this.levelId = options.levelId
    }

    changeType = () => {
        this.type = this.type === MemberType.Female ? MemberType.Male : MemberType.Female;
    }

    buildSiblingToTheRight = () => {
        return new Member({
            x: this.x + 35,
            levelId: this.levelId
        });
    };

    setLevelId = (levelId: UUID) => {
        this.levelId = levelId;
    }
}

export default Member;