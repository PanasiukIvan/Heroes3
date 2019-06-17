export class ObjectPreference {
    name : string;
    width : number;
    height : number;
    isInteractive : boolean;    //does player can interact with object  
    texturePath: string;

    constructor(name: string, width: number, height: number, isInteractive: boolean, texturePath: string) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.isInteractive = isInteractive;
        this.texturePath = texturePath;
    }
}

export class GameObject {
    index: string;                      // unique id of each object on map, ie coal_mine_1, coal_mine_2, etc
    posX: number;                       // x,y of left top corner of object
    posY: number;
    preferences: ObjectPreference;

    constructor(index: string, x: number, y: number, preference: ObjectPreference) {
        this.index = index;
        this.posX = x;
        this.posY = y;
        this.preferences = preference;
    }
}

export class TerrainObject extends ObjectPreference {
    constructor(name: string, width: number, height: number, texturePath: string) {
        super(name, width, height, false, texturePath);
    }
}

export class BuildingObject extends ObjectPreference {
    constructor(name: string, width: number, height: number, texturePath: string) {
        super(name, width, height, true, texturePath);
    }
}

export class ArtifactObject extends ObjectPreference {
    onInteraction : Function;

    constructor(name: string, width: number, height: number, texturePath: string, onInteraction: Function) {
        super(name, width, height, true, texturePath);
        this.onInteraction = onInteraction;
    }
}

let objectPreferences = [
    new TerrainObject("tree", 1, 1, require('@/assets/dirt.png')),
    new BuildingObject("wood_warehouse", 3, 3, require('@/assets/buildings/Warehouse_of_Wood.gif')),
    new BuildingObject("ore_warehouse", 4, 4, require('@/assets/dirt.png')),
    new BuildingObject("mercury_warehouse", 4, 4, require('@/assets/dirt.png')),
    new BuildingObject("gold_warehouse", 4, 4, require('@/assets/dirt.png')),
]

export {objectPreferences};