import {CharacterObject, GameObject, ArtifactObject} from "./resources/ObjectPreferences"; 
import {GameMap} from "./GameMap";
import { GameConfig } from './resources/GameConfig';

export class Player {
    gameMap : GameMap;

    res_tree : number = 0;
    res_ore : number = 0;
    res_mercury : number = 0;
    res_gold : number = 0;
    income_res_tree : number = 0;
    income_res_ore : number = 0;
    income_res_mercury : number = 0;
    income_res_gold : number = 0;
    PF : any = require("pathfinding");

    slots : any = {
        'head' : null,
        'body' : null,
        'ring1' : null,
        'ring2' : null
    }

    artifacts : any = {};

    heroes : Array<Hero>;
    activeHero : Hero;

    constructor(heroes : Array<Hero>, gameMap : GameMap) {
        this.heroes = heroes;
        this.activeHero = this.heroes[0];
        this.gameMap = gameMap;
    }

    public onTurnEnds() {
        this.heroes.forEach((hero) => hero.onTurnEnds());
    }

    public onWeekEnds() {
        console.log(this);
        this.res_tree += this.income_res_tree;
        this.res_ore += this.income_res_ore;
        this.res_gold += this.income_res_gold;
        this.res_mercury += this.income_res_mercury;

        this.heroes.forEach((hero) => hero.onTurnEnds());
    }

    public pickUpArtrifact(artifact : GameObject) {
        if ((artifact.preferences as ArtifactObject).slot != 'not equipable') {
            this.artifacts[artifact.index] = artifact;
            if ((artifact.preferences as ArtifactObject).slot == 'ring') {
                if (this.slots['ring1'] == null || this.slots['ring2'] == null) {
                    this.equipArtifact(artifact);
                }
            } else {
                if (this.slots[(artifact.preferences as ArtifactObject).slot] == null) {
                    this.equipArtifact(artifact);
                }
            }
        }
    }

    public equipArtifact(artifact : GameObject) {
        if ((artifact.preferences as ArtifactObject).slot == 'ring') {
            if (this.slots['ring2'] == null) {
                this.slots['ring2'] = artifact; 
            } else {
                if (this.slots['ring1'] != null) {
                    this.slots['ring1'].preferences.onUnequip(this);
                    this.slots['ring1'].equiped = "false";
                }
                this.slots['ring1'] = artifact; 
            }
        } else {
            if (this.slots[(artifact.preferences as ArtifactObject).slot] != null) {
                this.slots[(artifact.preferences as ArtifactObject).slot].equiped = "false";
                this.slots[(artifact.preferences as ArtifactObject).slot].preferences.onUnequip(this);
            }
            this.slots[(artifact.preferences as ArtifactObject).slot] = artifact;
        }
        (artifact as any).equiped = "true";
        (artifact.preferences as ArtifactObject).onEquip(this);
    }

    public removeArtifact(artifact : GameObject) {
        console.log(this.artifacts);
        if ((artifact as any).equiped == "true") {
            (artifact as any).equiped = "false";
            if ((artifact.preferences as ArtifactObject).slot == 'ring') {
                if (this.slots['ring1'] == artifact) {
                    this.slots['ring1'] = null;
                }
                if (this.slots['ring2'] == artifact) {
                    this.slots['ring2'] = null;
                }
            } else {
                this.slots[(artifact.preferences as ArtifactObject).slot] = null;
            }
            (artifact.preferences as ArtifactObject).onUnequip(this);
        }
    }

    // public moveHero(destX : number, destY : number) : HeroMovement {

    // }

    public findPath(destX: number, destY: number) {
        let finder : any = new this.PF.AStarFinder();;
        let grid = [];
        for (let i=0; i< this.gameMap.movementMap.length; i++) {
            grid.push([] as number[]);
            for (let j=0; j<this.gameMap.movementMap[i].length; j++) {
                let status = (this.gameMap.movementMap[i][j] == GameConfig.TILE_CANNOT_WALK || this.gameMap.movementMap[i][j] == GameConfig.TILE_OCCUPIED) ? 1 : 0;  
                grid[i].push(status);
            }
        };
        let gridobj = new this.PF.Grid(grid);
        let path = finder.findPath(this.heroes[0].posX, this.heroes[0].posY, destX, destY, gridobj);
        let pathObj = new HeroMovement();
        if (path.length == 0) {
            pathObj.isPossible = false;
        } else {
            pathObj.isPossible = true;
            for (let i = 1; i < path.length - 1; i++) {
                if (pathObj.totalEnergy + this.gameMap.movementMap[path[i][0]][path[i][1]] <= this.heroes[0].movepoints) {
                    pathObj.pathToLand.push(path[i]);
                    pathObj.totalEnergy += this.gameMap.movementMap[path[i][0]][path[i][1]];
                } else {
                    pathObj.restOfPath.push(path[i]);
                    pathObj.totalEnergy += 10000;
                }
            }
            let last = path.pop();
            pathObj.destX = last[0];
            pathObj.destY = last[1];
            if (pathObj.totalEnergy + this.gameMap.movementMap[last[0]][last[1]] <= this.heroes[0].movepoints) {
                pathObj.landAtX = last[0];
                pathObj.landAtY = last[1];
                pathObj.totalEnergy += this.gameMap.movementMap[last[0]][last[1]];
            } else {
                if (pathObj.pathToLand.length > 0) {
                    pathObj.landAtX = pathObj.pathToLand[pathObj.pathToLand.length - 1][0];
                    pathObj.landAtY = pathObj.pathToLand[pathObj.pathToLand.length - 1][1];
                } else {
                    pathObj.landAtX = this.heroes[0].posX;
                    pathObj.landAtY = this.heroes[0].posY;
                }
            }
        }
        console.log(pathObj);
        return pathObj
    }
}

export class Hero {
    posX : number = 0;
    posY : number = 0;
    maxMovepoints : number = 30;
    movepoints : number = this.maxMovepoints;
    preference : CharacterObject;


    constructor(preference : CharacterObject) {
        this.preference = preference;
    }

    public onTurnEnds() {
        this.movepoints = this.maxMovepoints;
    }
}

export class HeroMovement {
    destX : number = -1;                         //destination of hero movement according to user input
    destY : number = -1;  
    landAtX : number = -1;                       // real destination (closest point to destination with respect to moving points)
    landAtY : number = -1;
    pathToLand : Array<Array<number>> = [];
    restOfPath : Array<Array<number>> = [];
    isPossible : boolean = false;                       // is it possible to reach destination
    totalEnergy : number = 0;
}