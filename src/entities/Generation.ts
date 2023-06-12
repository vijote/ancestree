import Member from "./Member";
import type { UUID } from "../types";
import type Union from "./Union";
import type { Dependencies } from "./Dependencies";

export type GenerationConstructorOptions = {
    height?: number,
    children: Member[],
    unions?: Union[],
    dependencies: Dependencies
}

class Generation {
    private dependencies: Dependencies;

    public readonly id: UUID;
    public readonly members: Member[];
    public readonly unions: Union[] = [];

    constructor(options: GenerationConstructorOptions) {

        if (options.unions) {
            this.unions = options.unions;
        }

        this.dependencies = options.dependencies;
        this.id = this.dependencies.generateId();
        this.members = this.formatMembers(options.children);
    }

    private formatMembers(members: Member[]) {
        const formattedMembers = Array.from(members);

        formattedMembers.forEach(member => member.setGeneration(this));

        return formattedMembers;
    }

    addMember = (newMember?: Member) => {
        let member = newMember;
        
        if(!member) member = new Member({
            dependencies: this.dependencies
        });

        this.members.push(member);
    }

    addUnion(newUnion: Union) {
        this.unions.push(newUnion);
    }
}

export default Generation;