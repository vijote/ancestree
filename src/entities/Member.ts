import type { UUID } from "../types";
import type { Dependencies } from "./Dependencies";
import type Generation from "./Generation";

export enum MemberType {
    Male = 1,
    Female = 0,
};

type MemberConstructorOptions = {
    generation?: Generation,
    type?: MemberType,
    dependencies: Dependencies
}

class Member {
    public readonly id: UUID;
    public type: MemberType = MemberType.Male;
    public generation?: Generation;
    public static readonly icon_size = 20;
    public static readonly margin = 10;
    private dependencies: Dependencies;

    constructor(options: MemberConstructorOptions) {
        this.dependencies = options.dependencies;
        this.id = this.dependencies.generateId();        

        if(options.generation !== undefined) this.generation = options.generation;
        if(options.type !== undefined) this.type = options.type;
    }

    changeType = () => {
        this.type = this.type === MemberType.Female ? MemberType.Male : MemberType.Female;
    }

    buildMember = () => {
        return new Member({
            dependencies: this.dependencies,
            generation: this.generation
        });
    };

    setGeneration = (newGeneration: Generation) => {
        this.generation = newGeneration;
    }
}

export default Member;