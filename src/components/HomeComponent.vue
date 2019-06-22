<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <MapComponent msg="XDDD"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MapComponent from '@/components/MapComponent.vue';

@Component
export default class HomeComponent extends Vue {
  @Prop() private msg!: string;
  private components: any = {
    MapComponent,
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
