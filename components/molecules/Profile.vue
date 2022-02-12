<template>
  <div class="flex items-center">
    <img
      src="https://github.com/Lincoln-Modesto.png"
      alt="Maiatto Dev"
      class="mr-6 w-20 h-20 rounded-full"
    />
    <div class="flex flex-col w-full">
      <strong class="text-title text-2xl">Lincoln Modesto</strong>
      <p class="flex items-center">
        <img src="icons/level.svg" alt="level" class="mr-2" />
        <span class="text-base">Level {{ level }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "vuex";

@Component({
  computed: mapState("challenges", ["level"])
})
export default class Profile extends Vue {}
</script>
