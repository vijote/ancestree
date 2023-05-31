import type { UUID } from "../types";
import Generation from "./Generation";
import Member, { MemberType } from "./Member";
import Union from "./Union";

type TreeConstructorOptions = {
    generations: Generation[]
}

class Tree {
    id: UUID;
    public generations: Generation[];

    constructor(options: TreeConstructorOptions) {
        this.id = crypto.randomUUID();
        this.generations = options.generations;
    }

    static initializeTree() {
        const generation = new Generation({
            children: [new Member({ x: 25 })],
        });

        return new Tree({
            generations: [generation],
        });
    }

    addParents = (member: Member) => () => {
        if (!member.generation) return;

        if (this.generations.length < member.generation.height) {
            // TODO: Implement logic to handle existing generation
            throw new Error("Not implemented yet!");
        }

        const newGeneration = this.addGenerationUpwards(member.generation.height);        

        const father = new Member({
            x: member.x - Math.round(Member.icon_size / 2),
            generation: newGeneration,
            type: MemberType.Male
        });

        const mother = new Member({
            x: member.x + Math.round(member.x / 2),
            generation: newGeneration,
            type: MemberType.Female
        });

        newGeneration.addMember(father)();
        newGeneration.addMember(mother)();

        newGeneration.addUnion(new Union({
            father,
            mother
        }));
    }

    addGenerationUpwards = (height: number) => {
        const newGeneration = new Generation({
            children: [],
            height
        })

        this.generations.forEach(generation => generation.setHeight(generation.height + 1));
        this.generations.unshift(newGeneration);

        return newGeneration
    }
}

export default Tree;
