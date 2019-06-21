import {Player} from "../Player";
import {GameMap} from "../GameMap";

export class ObjectPreference {
    name : string;
    width : number;
    height : number;
    isInteractive : boolean;    //does player can interact with object  
    texturePath: string;
    onInteraction : Function = (map: GameMap, self: GameObject) => {
        console.log("If u see this message == u fucked up");
    }

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

    public onInteractionRun(map: GameMap) {
        this.preferences.onInteraction(map, this);
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

    constructor(name: string, width: number, height: number, texturePath: string, onInteraction: Function) {
        super(name, width, height, true, texturePath);
        this.onInteraction = onInteraction;
    }
}

export class CharacterObject extends ObjectPreference {

    constructor(name: string, width: number, height: number, texturePath: string, onInteraction: Function) {
        super(name, width, height, true, texturePath);
        this.onInteraction = onInteraction;
    }
}

let objectPreferences = [
    new TerrainObject("tree", 1, 1, require('@/assets/terrain/tree.png')),
    new BuildingObject("wood_warehouse", 2, 2, require('@/assets/buildings/Warehouse_of_Wood.gif')),
    new BuildingObject("ore_warehouse", 2, 2, require('@/assets/buildings/Warehouse_of_Ore.gif')),
    new BuildingObject("mercury_warehouse", 2, 2, require('@/assets/buildings/Warehouse_of_Mercury.gif')),
    new BuildingObject("gold_warehouse", 2, 2, require('@/assets/buildings/Warehouse_of_Gold.gif')),
    new BuildingObject("castle", 4, 4, require('@/assets/buildings/Adventure_Map_Castle_fort.gif')),

    new ArtifactObject("ore_warehouse", 1, 1, require('@/assets/artifacts/Artifact_Inexhaustible_Cart_of_Ore.gif'), (map: GameMap, self: GameObject) => {
        console.log("Ore warhause activated");
        map.player.res_ore += 100;
        map.removeObj(self);
    })
]

export {objectPreferences};