import type { UUID } from "../types";
import Level from "./Level";
import Member, { MemberType } from "./Member";
import Union, { UnionType } from "./Union";

type TreeConstructorOptions = {
    levels: Level[]
}

class Tree {
    id: UUID;
    public levels: Level[];

    constructor(options: TreeConstructorOptions) {
        this.id = crypto.randomUUID();
        this.levels = options.levels;
    }

    static initializeTree() {
        const level = new Level({
            children: [new Member({ x: 25 })],
        });

        return new Tree({
            levels: [level],
        });
    }

    addParents = (member: Member) => () => {
        if (!member.level) return;

        if (this.levels.length < member.level.height) {
            // TODO: Implement logic to handle existing level
            throw new Error("Not implemented yet!");
        }

        const newLevel = this.addLevelUpwards(member.level.height);        

        const father = new Member({
            x: member.x - Math.round(Member.icon_size / 2),
            level: newLevel,
            type: MemberType.Male
        });

        const mother = new Member({
            x: member.x + Math.round(member.x / 2),
            level: newLevel,
            type: MemberType.Female
        });

        newLevel.addMember(father)();
        newLevel.addMember(mother)();

        newLevel.addUnion(new Union({
            father,
            mother,
            level: newLevel
        }));
    }

    addLevelUpwards = (height: number) => {
        const newLevel = new Level({
            children: [],
            height
        })

        this.levels.forEach(level => level.setHeight(level.height + 1));
        this.levels.unshift(newLevel);

        return newLevel
    }
}

export default Tree;
