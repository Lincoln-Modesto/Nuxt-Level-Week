<template>
  <p class="w-1/2 flex gap-x-1">
    <span
      v-for="(digit, index) in splittedDigits"
      :key="index"
      class="w-1/2 bg-white rounded-md flex items-center justify-center py-3"
    >
      {{ digit }}
    </span>
  </p>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { splitValue } from "~/utils";

@Component({
  props: {
    digits: {
      type: Number,
      required: true,
    },
  }
})
export default class CountdownDigits extends Vue {

  get splittedDigits(): string[] {
    return splitValue(this.$props.digits);
  }
}
</script>
