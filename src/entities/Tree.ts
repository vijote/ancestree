import type { UUID } from "../types";
import Level from "./Level";
import Member from "./Member";

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

    addLevelUpwards = (x: number) => () => {
        this.levels.forEach(level => level.setHeight(level.height + 1));
        
        this.levels.unshift(new Level({
            children: [new Member({ x: x - 17.5 })],
            height: 0
        }))
        
    }
}

export default Tree;
