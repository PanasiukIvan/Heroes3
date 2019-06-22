import {TilePreference, tilePreferences} from "./resources/TilesPreferences";
import {GameObject} from "./resources/ObjectPreferences";
import {GameConfig} from "./resources/GameConfig";
import { Player, Hero, HeroMovement } from './Player';

export class GameMap {
    width: number;
    height: number;
    tilesMap: Array<Array<TilePreference>> = [];
    movementMap: Array<Array<number>> = [];
    objects : Map<string, GameObject> = new Map([]);                             // map <object_id, object>
    objectRemovedSubscribers : Array<any> = [];                                 
    objectAddedSubscribers : Array<any> = [];
    player : Player = new Player([], this);
    player_id : string = "";
    day : number = 0;  // Currend day of week


    constructor(mapFile: any) {
        console.log("Initiating Game Map object");
        this.width = mapFile.width;
        this.height = mapFile.height;
        this._loadTiles(mapFile.tiles);
        this._loadObjects(mapFile.objects);
        this._loadHero(mapFile.hero);
        
    };

    public subscribeOnRemove(callback: Function) {
        this.objectRemovedSubscribers.push(callback);
    }

    public subscribeOnAdd(callback: Function) {
        this.objectAddedSubscribers.push(callback);
    }

    public addObject(obj : GameObject) {
        this.objects.set(obj.index, obj);
        this.objectAddedSubscribers.forEach((x) => {
            x(obj);
        })
        this._modifyMovementMap(obj.posX, obj.posY, obj.preferences.width, obj.preferences.height, GameConfig.TILE_OCCUPIED);
    }

    public removeObj(obj : GameObject) {
        if (this.objects.has(obj.index)) {
            this.objects.delete(obj.index);
            this.objectRemovedSubscribers.forEach((x) => {
                x(obj);
            })
        }
    }

    public interactWithObj(obj: GameObject) {
        console.log("Interaction with object " + obj.index + " started");
        let closeCells = [];
        for (let i=0; i<obj.preferences.width; i++) {
            for (let j=0; j<obj.preferences.width; j++) {
                closeCells.push([obj.posX + i + 1, obj.posY + j + 1]);
                closeCells.push([obj.posX + i + 1, obj.posY + j - 1]);
                closeCells.push([obj.posX + i + 1, obj.posY + j]);
                closeCells.push([obj.posX + i - 1, obj.posY + j + 1]);
                closeCells.push([obj.posX + i - 1, obj.posY + j - 1]);
                closeCells.push([obj.posX + i - 1, obj.posY + j]);
                closeCells.push([obj.posX + i, obj.posY + j + 1]);
                closeCells.push([obj.posX + i, obj.posY + j - 1]);
                closeCells.push([obj.posX + i, obj.posY + j]);
            }
        }
        for (let i=0; i<closeCells.length; i++) {
            if (closeCells[i][0] == this.player.heroes[0].posX && closeCells[i][1] == this.player.heroes[0].posY) {
                console.log("interaction allowed");
                obj.onInteractionRun(this);
            }
        } 
    }

    public movePlayer(path : HeroMovement) {
            this.player.heroes[0].movepoints -= path.totalEnergy;
            this.player.heroes[0].posX = path.landAtX;
            this.player.heroes[0].posY = path.landAtY;
            let player_obj : GameObject = this.objects.get("player") as GameObject;
            player_obj.posX = path.landAtX;
            player_obj.posY = path.landAtY;
    }

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

    private _loadObjects(objects : Array<GameObject>) {
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

    private _loadHero(obj : GameObject) {
        this.objects.set(obj.index, obj)
        this.player_id = obj.index;
        let hero : Hero = new Hero(obj.preferences);
        hero.posX = obj.posX;
        hero.posY = obj.posY;
        this.player = new Player([hero], this);
    }

    private _createArray2D (width: number, height: number): Array<Array<TilePreference>> {
        let array = new Array(width);
        for (let i=0; i<width; i++) {
            array[i] = new Array(height).fill(null);
        }
        return array;
    }

    // replace all tiles in movement map in square with left corner in (posX, posY) with value
    private _modifyMovementMap(posY: number, posX: number, width: number, height: number, value: number) {
        for (let i = posX; i < posX + width; i++) {
            for (let j=posY; j < posY + height; j++) {
                this.movementMap[i][j] = value;
            }
        }
    }

        // replace all tiles in movement map in square with left corner in (posX, posY) with value
        private _modifyMovementMapFree(posY: number, posX: number, width: number, height: number) {
            for (let i = posX; i < posX + width; i++) {
                for (let j=posY; j < posY + height; j++) {
                    this.movementMap[i][j] = this.tilesMap[i][j].takesMp;
                }
            }
        }

    public nextTurn() {
        this.day += 1;
        this.day %= 7;
        console.log("Day " + this.day + " started");
        this.player.onTurnEnds();
        if (this.day == 0) {
            console.log("Next week  started, resources obtained");
            this.player.onWeekEnds();
        }
    }
}
