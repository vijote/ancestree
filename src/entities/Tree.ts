import type { UUID } from "../types";
import type { Dependencies } from "./Dependencies";
import Generation from "./Generation";
import Member, { MemberType } from "./Member";
import Union from "./Union";

type TreeConstructorOptions = {
    generations: Generation[],
    dependencies: Dependencies
}

class Tree {
    private dependencies: Dependencies;
    public readonly id: UUID;
    public generations: Generation[];

    constructor(options: TreeConstructorOptions) {
        this.dependencies = options.dependencies;
        this.id = this.dependencies.generateId();
        this.generations = options.generations;
    }

    static initializeTree(dependencies: Dependencies) {
        const generation = new Generation({
            dependencies: dependencies,
            children: [new Member({ x: 25, dependencies: dependencies })],
        });

        return new Tree({
            dependencies,
            generations: [generation],
        });
    }

    addParents = (member: Member) => () => {
        const newGeneration = this.addGenerationUpwards(member.generation!.height);        

        const father = new Member({
            dependencies: this.dependencies,
            x: member.x - Math.round(Member.icon_size / 2),
            generation: newGeneration,
            type: MemberType.Male
        });

        const mother = new Member({
            dependencies: this.dependencies,
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
            dependencies: this.dependencies,
            children: [],
            height
        })

        this.generations.forEach(generation => generation.setHeight(generation.height + 1));
        this.generations.unshift(newGeneration);

        return newGeneration
    }
}

export default Tree;
