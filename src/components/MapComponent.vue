<template>
  <div class = "main">
    <div class="map">
      <div class='obj' v-for="obj in objects" style="position: relative; width: 0; height: 0" v-on:click="objectClicked(obj)">
        <img alt="obj" :src="obj.preferences.texturePath" style="position: absolute" v-bind:style="{ left: obj.posX*32 + 'px', top: obj.posY*32 + 'px' }">
      </div>

      <div class='path' v-for="path in path_green" style="position: relative; width: 0; height: 0">
        <img alt="path" src="@/assets/ui/path_green.png" style="position: absolute" v-bind:style="{ left: path[0]*32 + 'px', top: path[1]*32 + 'px' }">

      </div>
      <div class='path' v-for="path in path_green_end" style="position: relative; width: 0; height: 0">
        <img alt="path" src="@/assets/ui/path_green_end.png" style="position: absolute" v-bind:style="{ left: path[0]*32 + 'px', top: path[1]*32 + 'px' }">

      </div>
      <div class='path' v-for="path in path_red" style="position: relative; width: 0; height: 0">
        <img alt="path" src="@/assets/ui/path_red.png" style="position: absolute" v-bind:style="{ left: path[0]*32 + 'px', top: path[1]*32 + 'px' }">

      </div>
      <div class='path' v-for="path in path_red_end" style="position: relative; width: 0; height: 0">
        <img alt="path" src="@/assets/ui/path_red_end.png" style="position: absolute" v-bind:style="{ left: path[0]*32 + 'px', top: path[1]*32 + 'px' }">

      </div>
      <table>
        <tr v-for="(tiles_row, tiles_row_id) in gameMap.tilesMap">
          <td v-for="(tiles_col, tiles_col_id) in tiles_row" class='tile'>
            <img :src="tiles_col.texturePath" class="tile-img" v-on:click="tileClicked(tiles_row_id,tiles_col_id)"> 
          </td>
        </tr>
      </table>
      <button v-on:click="onTest()">test</button>
      <button v-on:click="onTurnEnds()">end turn</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {GameMap} from '@/core/GameMap';
import {GameObject, objectPreferences} from '@/core/resources/ObjectPreferences';
import {GameConfig} from '@/core/resources/GameConfig';
import map1 from '@/assets/MapFile.ts';
import { ArrayPropsDefinition } from 'vue/types/options';
import { HeroMovement } from '@/core/Player';

@Component
export default class MapComponent extends Vue {
  private name: string = 'MapComponent';
  private props: any = {
    msg: String
  };
  private gameMap: GameMap = new GameMap(map1);
  private _tileSize = GameConfig.tileTextureSize; 
  private objects: Array<GameObject> = Array.from(this.gameMap.objects.values());

  // path drowing
  private path_green : Array<Array<number>> = [];
  private path_red : Array<Array<number>> = [];
  private path_green_end : Array<Array<number>> = [];
  private path_red_end : Array<Array<number>> = [];
  private clickedRow : number = -1;
  private clickedCol : number = -1;

  constructor() {
    super();
    this.gameMap.subscribeOnAdd(this.addObject);
    this.gameMap.subscribeOnRemove(this.removeObject);
  }

  private tileClicked(row: number, col: number) {
    console.log("Tile [" + col + "," + row + "] clicked");
    if (col == this.clickedCol && row == this.clickedRow) {
      console.log("Moving player");
      let path = this.gameMap.player.findPath(col,row);
      this.clearPath();
      this.gameMap.movePlayer(path);
    } else {
      let path = this.gameMap.player.findPath(col,row);
      this.drowPath(path);
      this.clickedCol = path.destX;
      this.clickedRow = path.destY;
    }
    
  };

  private objectClicked(object: any) {
    console.log(object.index + "(" + object.posX + "," + object.posY + ") clicked");
    this.gameMap.interactWithObj(object);
  };

  public removeObject(object: GameObject) {
    let index = this.objects.indexOf(object);
    if (index > -1) {
      this.objects.splice(index, 1);
      console.log("MapComponent: removed from objects: " + object);
    }
  }

  private clearPath() {
    while(this.path_green.length > 0) {
      this.path_green.pop();
    }
    while(this.path_red.length > 0) {
      this.path_red.pop();
    }
    while(this.path_green_end.length > 0) {
      this.path_green_end.pop();
    }
    while(this.path_red_end.length > 0) {
      this.path_red_end.pop();
    }
  }

  public drowPath(object: HeroMovement) {
    this.clearPath()
    object.pathToLand.forEach((x) => {
      this.path_green.push(x);
    })
    object.restOfPath.forEach((x) => {
      this.path_red.push(x);
    })

    if (object.destX == object.landAtX && object.destY == object.landAtY) {
      this.path_green_end.push([object.destX, object.destY]);
    } else {
      this.path_red_end.push([object.destX, object.destY]);
    }
  }

  public addObject(object: GameObject) {
    this.objects.push(object);
    console.log("MapComponent: add to objects: " + object);
  }

  private onTest() {
    this.gameMap.removeObj(this.gameMap.objects.get("player"));
  }

    private onTurnEnds() {
    this.gameMap.nextTurn();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

td, tr, img  { padding: 0px; margin: 0px; border: none; }

.tile {
  width: 32px;
  height: 32px;
  background-color: green;
}
table { border-collapse: collapse; }

table {
  border-spacing:0; /* Removes the cell spacing via CSS */
  border-collapse: collapse;  /* Optional - if you don't want to have double border where cells touch */
}

.tile-img {
  display: block;
}

.main {
  height: 800px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map {
  max-width: 50%;
  max-height: 100%;
  overflow: scroll;
  background-color: black;
}

.path {
  pointer-events: none;
}
</style>