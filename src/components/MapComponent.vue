<template>
  <div class="map">
    <h1>{{ msg }}</h1>
    <div class='obj' v-for="obj in objects" style="position: relative; width: 0; height: 0" v-on:click="objectClicked(obj)">
    <img alt="Vue logo" src="@/assets/inn.png" style="position: absolute" v-bind:style="{ left: obj.pos[0]*45 + 'px', top: obj.pos[1]*45 + 'px' }">
    </div>
    <table>
      <tr v-for="(tiles_row, tiles_row_id) in tiles">
        <td v-for="(tiles_col, tiles_col_id) in tiles_row" class='tile'>
           <img :src="mapFile.tiles_textures[tiles_col]" class="tile-img" v-on:click="tileClicked(tiles_row_id,tiles_col_id)"> 
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import map1 from '@/assets/MapFile.ts';

@Component
export default class MapComponent extends Vue {
  private name: string = 'MapComponent';
  private props: any = {
    msg: String
  };

  private mapWidth: number = 1080;
  private mapHeight: number = 720;
  private mapFile: any = map1;
  private tiles: any = map1.tiles;
  private objects: any = map1.objects;

  private tileClicked(row: number, col: number) {
    console.log("Tile [" + row + "," + col + "] clicked");
  };

  private objectClicked(object: any) {
    console.log("Object clicked");
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

td, tr, img  { padding: 0px; margin: 0px; border: none; }

.tile {
  width: 45px;
  height: 45px;
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
</style>