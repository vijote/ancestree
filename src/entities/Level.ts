import type Member from "./Member";
import type { UUID } from "../types";

export type LevelConstructorOptions = {
    height?: number,
    children: Member[]
}

class Level {
    public id: UUID;
    private _height: number = 0;
    public y: string = "0%";
    public readonly children: Map<UUID, Member>;

    get height() {
        return this._height;
    }

    constructor(options: LevelConstructorOptions) {        
        if(options.height) {
            this._height = options.height;
            this.y = `${this._height * 35}%`;
        }

        this.id = crypto.randomUUID();
        this.children = this.formatChildren(options.children);
    }

    private formatChildren(children: Member[]) {
        const formattedChildren: [UUID, Member][] = [];

        children.forEach(child => {
            child.setLevelId(this.id);
            formattedChildren.push([child.id, child]);
        });

        return new Map(formattedChildren);
    }

    addChildToTheRight = (newAncestor: Member) => () => {
        this.children.set(crypto.randomUUID(), newAncestor)
    }

    setHeight(newHeight: number) {
        this._height = newHeight;
        this.y = `${this._height * 35}%`;
    }
}

export default Level;