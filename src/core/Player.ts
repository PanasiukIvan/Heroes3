import {CharacterObject} from "./resources/ObjectPreferences"; 

export class Player {
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

    constructor(heroes : Array<Hero>) {
        this.heroes = heroes;
        this.activeHero = this.heroes[0];
    }

    public onTurnEnds() {
        this.res_tree += this.income_res_tree;
        this.res_ore += this.income_res_ore;
        this.res_gold += this.income_res_gold;
        this.res_mercury += this.income_res_mercury;

        this.heroes.forEach((hero) => hero.onTurnEnds());
    }
}

export class Hero {
    posX : number = 0;
    posY : number = 0;
    maxMovepoints : number = 30;
    movepoints : number = this.maxMovepoints;
    destinationX : number = -1;
    destinationY : number = -1;
    preference : CharacterObject;


    constructor(preference : CharacterObject) {
        this.preference = preference;
    }

    public onTurnEnds() {
        this.movepoints = this.maxMovepoints;
    }
}