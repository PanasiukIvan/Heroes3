<template>
  <div class="map">
    <MapComponent msg="XSS"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MapComponent from '@/components/MapComponent.vue'; // @ is an alias to /src

@Component({
  components: {
    MapComponent,
  },
})
export default class Map extends Vue {}
</script>
