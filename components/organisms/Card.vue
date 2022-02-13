<template>
	<div class="bg-white rounded-md flex flex-1 w-full mt-8 lg:mt-0 shadow-sm">
		<Challenge v-if="currentChallenge" v-bind="currentChallenge" />
		<StartCycle v-else />
		<LevelUpModal/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StartCycle from '~/components/atoms/StartCycle.vue'
import LevelUpModal from '~/components/atoms/LevelUpModal.vue'
import Challenge from '~/components/molecules/Challenge.vue'

import { mapGetters } from 'vuex'

@Component({
	components:{
		Challenge,
		StartCycle,
		LevelUpModal
	},
	computed:{
		...mapGetters('challenges', ['currentChallenge'])
	}
})
export default class Card extends Vue{

}
</script>
