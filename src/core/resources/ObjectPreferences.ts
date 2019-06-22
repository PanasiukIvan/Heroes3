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
    constructor(name: string, width: number, height: number, texturePath: string, onInteraction: Function) {
        super(name, width, height, true, texturePath);
        this.onInteraction = onInteraction;
    }
}

export class ArtifactObject extends ObjectPreference {

    constructor(name: string, width: number, height: number, texturePath: string, onInteraction: Function) {
        super(name, width, height, true, texturePath);
        this.onInteraction = onInteraction;
    }

    onEquip(player: Player) {};
    onUnequip(player: Player) {};

    slot: string = 'not equipable';
    equiped: boolean = false;
    
}

export class CharacterObject extends ObjectPreference {

    constructor(name: string, width: number, height: number, texturePath: string, onInteraction: Function) {
        super(name, width, height, true, texturePath);
        this.onInteraction = onInteraction;
    }
}

export class PlayerObject extends ObjectPreference {

    constructor(name: string, width: number, height: number, texturePath: string, onInteraction: Function) {
        super(name, width, height, true, texturePath);
        this.onInteraction = onInteraction;
    }
}


let ring_of_gems = new ArtifactObject("Ring of Gems", 1, 1, require('@/assets/artifacts/Artifact_Ring_of_Infinite_Gems.gif'), (map: GameMap, self: GameObject) => {
    console.log("Ring of gems activated");
    map.player.pickUpArtrifact(self);
    map.removeObj(self);
});

ring_of_gems.onEquip = (player : Player) => {
    player.income_res_gold += 25;
    console.log("Ring of gem equiped");
}

ring_of_gems.onUnequip = (player : Player) => {
    player.income_res_gold -= 25;
    console.log("Ring of gem unequiped");
}

ring_of_gems.slot = 'ring';

let objectPreferences = [
    new TerrainObject("tree", 1, 1, require('@/assets/terrain/tree.png')),
    new BuildingObject("wood_warehouse", 2, 2, require('@/assets/buildings/Warehouse_of_Wood.gif'),(map: GameMap, self: GameObject) => {
        console.log("wood warhause activated");
        if ((self as any).owned != true) {
            map.player.res_tree += 50;
            map.player.income_res_tree += 50;
            (self as any).owned = true;
        }
    }),
    new BuildingObject("ore_warehouse", 1, 2, require('@/assets/buildings/Warehouse_of_Ore.gif'),(map: GameMap, self: GameObject) => {
        console.log("ore warhause activated");
        if ((self as any).owned != true) {
            map.player.res_ore += 50;
            map.player.income_res_ore += 50;
            (self as any).owned = true;
        }
    }),
    new BuildingObject("mercury_warehouse", 2, 2, require('@/assets/buildings/Warehouse_of_Mercury.gif'),(map: GameMap, self: GameObject) => {
        console.log("mercury warhause activated");
        if ((self as any).owned != true) {
            map.player.res_mercury += 50;
            map.player.income_res_mercury += 50;
            (self as any).owned = true;
        }
    }),
    new BuildingObject("gold_warehouse", 2, 2, require('@/assets/buildings/Warehouse_of_Gold.gif'),(map: GameMap, self: GameObject) => {
        console.log("gold warhause activated");
        if ((self as any).owned != true) {
            map.player.res_gold += 50;
            map.player.income_res_gold += 50;
            (self as any).owned = true;
        }
    }),
    new BuildingObject("castle", 4, 4, require('@/assets/buildings/Adventure_Map_Castle_fort.gif'),(map: GameMap, self: GameObject) => {
        console.log("castle");
    }),

    new ArtifactObject("ore_cart", 1, 1, require('@/assets/artifacts/Artifact_Inexhaustible_Cart_of_Ore.gif'), (map: GameMap, self: GameObject) => {
        console.log("Ore cart activated");
        map.player.res_ore += 100;
        map.removeObj(self);
    }),

    new PlayerObject("player", 1, 1, require('@/assets/characters/Pikeman_(HotA)_(adventure_map).gif'), (map: GameMap, self: GameObject) => {}),
    ring_of_gems
]

export {objectPreferences};