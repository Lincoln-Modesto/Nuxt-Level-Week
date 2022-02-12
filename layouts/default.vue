<template>
	<div class="min-h-screen max-m-5xl mx-auto flex flex-col px-5 py-8 md:py-10">
			<Experiencebar/>
			<Nuxt/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Experiencebar from '~/components/atoms/Experiencebar.vue'

@Component({
  components: {
    Experiencebar
  }
})
export default class Default extends Vue {

}
</script>
