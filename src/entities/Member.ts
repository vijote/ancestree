import type { UUID } from "../types";
import type Generation from "./Generation";

export enum MemberType {
    Male = 1,
    Female = 0,
};

type MemberConstructorOptions = {
    x: number,
    generation?: Generation,
    type?: MemberType
}

class Member {
    public readonly id: UUID;
    public type: MemberType = MemberType.Male;
    public readonly formatted_x: string;
    public generation?: Generation;
    public static readonly icon_size = 20;
    public static readonly margin = 10;

    public readonly x: number;

    constructor(options: MemberConstructorOptions) {
        this.formatted_x = `${options.x}%`;
        this.x = options.x;
        this.id = crypto.randomUUID();        

        if(options.generation !== undefined) this.generation = options.generation;
        if(options.type !== undefined) this.type = options.type;
    }

    changeType = () => {
        this.type = this.type === MemberType.Female ? MemberType.Male : MemberType.Female;
    }

    buildSiblingToTheRight = () => {
        return new Member({
            x: this.x + 35,
            generation: this.generation
        });
    };

    setGeneration = (newGeneration: Generation) => {
        this.generation = newGeneration;
    }
}

export default Member;