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
    new TilePreference(0,8,require('@/assets/dirt.png'),"dirt"),
    new TilePreference(0,5,require('@/assets/grass.png'),"grass"),
    new TilePreference(0,3,require('@/assets/road.png'),"road"),
    new TilePreference(0,GameConfig.TILE_CANNOT_WALK,require('@/assets/water.png'),"water"),
];

export {TilePreference, tilePreferences};