import {CharacterObject} from "./resources/ObjectPreferences"; 
import {GameMap} from "./GameMap";

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

    heroes : Array<Hero>;
    activeHero : Hero;

    constructor(heroes : Array<Hero>, gameMap : GameMap) {
        this.heroes = heroes;
        this.activeHero = this.heroes[0];
        this.gameMap = gameMap;
    }

    public onTurnEnds() {
        this.res_tree += this.income_res_tree;
        this.res_ore += this.income_res_ore;
        this.res_gold += this.income_res_gold;
        this.res_mercury += this.income_res_mercury;

        this.heroes.forEach((hero) => hero.onTurnEnds());
    }

    // public moveHero(destX : number, destY : number) : HeroMovement {

    // }
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
    destX : number = 0;                         //destination of hero movement according to user input
    destY : number = 0;  
    landAtX : number = 0;                       // real destination (closest point to destination with respect to moving points)
    landAtY : number = 0;
    pathToLand : Array<Array<number>> = [];
    restOfPath : Array<Array<number>> = [];
    isPossible : boolean = false;                       // is it possible to reach destination
}