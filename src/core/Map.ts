import {TilePreference, tilePreferences} from "./resources/TilesPreferences";
import {objectPreferences, Object} from "./resources/ObjectPreferences";
import {GameConfig} from "./resources/GameConfig";

export default class GameMap {
    width: number;
    height: number;
    tilesMap: Array<Array<TilePreference>>;
    movementMap: Array<Array<number>>;
    objects : Map<string, Object>;                             // map <object_id, object>

    constructor(mapFile: any) {
        this.width = mapFile.width;
        this.height = mapFile.height;
        this._loadTiles(mapFile.tiles);
        this._loadObjects(mapFile.objects);
        
    };

    private _loadTiles(tiles : Array<Array<number>>) {
        this.tilesMap = this._createArray2D(this.width, this.height);
        this.movementMap = tiles;
        // load background tiles
        this.movementMap.forEach((row, rowId) => {
            row.forEach((tileIndex, colId) => {
                this.movementMap[rowId][colId] = tilePreferences[tileIndex].takesMp;
                this.tilesMap[rowId][colId] = tilePreferences[tileIndex];
            })
        });
    };

    private _loadObjects(objects : Array<Object>) {
        // load objects
        this.objects = new Map([]);
        objects.forEach((obj) => {
            this.objects.set(obj.index, obj);
            // if object is interactive (item, building, npc) mark tiles as occupied
            if (obj.preferences.isInteractive) {
                this._modifyMovementMap(obj.posX, obj.posY, obj.preferences.width, obj.preferences.height, GameConfig.TILE_OCCUPIED);
            } else {
                // if object is interactive (item, building, npc) mark tiles as cannot walk
                this._modifyMovementMap(obj.posX, obj.posY, obj.preferences.width, obj.preferences.height, GameConfig.TILE_CANNOT_WALK);
            }
        })
    }

    private _createArray2D (width: number, height: number): Array<Array<TilePreference>> {
        let array = new Array(width);
        for (let i=0; i<width; i++) {
            array[i] = new Array(height);
        }
        return array;
    }

    // replace all tiles in movement map in square with left corner in (posX, posY) with value
    private _modifyMovementMap(posX: number, posY: number, width: number, height: number, value: number) {
        for (let i = posX; i < posX + width; i++) {
            for (let j=posY; j < posY + height; j++) {
                this.movementMap[i][j] = value;
            }
        }
    }
}