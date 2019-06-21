<template>
  <div class = "main">
    <div class="map">
      <h1>{{ msg }}</h1>
      <div class='obj' v-for="obj in objects" style="position: relative; width: 0; height: 0" v-on:click="objectClicked(obj)">
        <img alt="obj" :src="obj.preferences.texturePath" style="position: absolute" v-bind:style="{ left: obj.posX*32 + 'px', top: obj.posY*32 + 'px' }">
      </div>
      <table>
        <tr v-for="(tiles_row, tiles_row_id) in gameMap.tilesMap">
          <td v-for="(tiles_col, tiles_col_id) in tiles_row" class='tile'>
            <img :src="tiles_col.texturePath" class="tile-img" v-on:click="tileClicked(tiles_row_id,tiles_col_id)"> 
          </td>
        </tr>
      </table>
      <button v-on:click="onTest()">test</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {GameMap} from '@/core/GameMap';
import {GameObject, objectPreferences} from '@/core/resources/ObjectPreferences';
import {GameConfig} from '@/core/resources/GameConfig';
import map1 from '@/assets/MapFile.ts';

@Component
export default class MapComponent extends Vue {
  private name: string = 'MapComponent';
  private props: any = {
    msg: String
  };
  private gameMap: GameMap = new GameMap(map1);
  private _tileSize = GameConfig.tileTextureSize; 
  private objects: Array<GameObject> = Array.from(this.gameMap.objects.values());

  private tileClicked(row: number, col: number) {
    console.log(this.objects);
    console.log("Tile [" + row + "," + col + "] clicked");
  };

  private objectClicked(object: any) {
    console.log(object.index + "(" + object.posX + "," + object.posY + ") clicked");
  };

  private removeObject(object: GameObject) {
    let index = this.objects.indexOf(object);
    if (index > -1) {
      this.objects.splice(index, 1);
      console.log("MapComponent: removed from objects: " + object);
    }
  }

  private addObject(object: GameObject) {
    this.objects.push(object);
    console.log("MapComponent: add to objects: " + object);
  }

  private onTest() {
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
</style>