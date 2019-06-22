<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomeComponent msg="Heroes App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeComponent from '@/components/HomeComponent.vue'; // @ is an alias to /src

@Component({
  components: {
    HomeComponent,
  },
})
export default class Home extends Vue {}
</script>
