import {GameConfig} from "./GameConfig";

class TilePreference {
    index: number;          //unique id of each background tile
    takesMp: number;        //how much movement points does it take to walk on this tile, -1 if can not walk
    texturePath: string;    //path to file with .png texture of tile with size GameConfig.tileTextureSize * GameConfig.tileTextureSize
    name: string;           //name of tile, used only for identification

    constructor(index: number, takesMp: number, texturePath: string, name: string) {
        this.index = index;
        this.takesMp = takesMp;
        this.texturePath = texturePath;
        this.name = name;
    };
}

let tilePreferences = [
    new TilePreference(0, 8, require('@/assets/terrain/Dirt_(s).gif'), 'dirt'),
    new TilePreference(0, 5, require('@/assets/terrain/Terrain_Grass.png'), 'grass'),
    new TilePreference(0, 3, require('@/assets/terrain/Dirt_(s).gif'), 'road'),
    new TilePreference(0, GameConfig.TILE_CANNOT_WALK, require('@/assets/terrain/Water_(s).gif'), 'water'),
];

export {TilePreference, tilePreferences};
