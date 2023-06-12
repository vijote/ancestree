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
            children: [new Member({ dependencies: dependencies })],
        });

        return new Tree({
            dependencies,
            generations: [generation],
        });
    }

    addParents = () => () => {
        const newGeneration = this.addGenerationUpwards();        

        const father = new Member({
            dependencies: this.dependencies,
            generation: newGeneration,
            type: MemberType.Male
        });

        const mother = new Member({
            dependencies: this.dependencies,
            generation: newGeneration,
            type: MemberType.Female
        });        

        newGeneration.addMember(father);
        newGeneration.addMember(mother);

        newGeneration.addUnion(new Union({
            leftItemIndex: newGeneration.members.findIndex(member => member === father),
            rightItemIndex: newGeneration.members.findIndex(member => member === mother)
        }));
    }

    addGenerationUpwards = () => {
        const newGeneration = new Generation({
            dependencies: this.dependencies,
            children: [],
        })

        this.generations.unshift(newGeneration);

        return newGeneration
    }
}

export default Tree;
