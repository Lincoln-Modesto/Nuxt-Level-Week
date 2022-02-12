<template>
	<div class="flex justify-center items-center mt-8 lg:mt-14 text-9xl text-title font-rajdhani">
		<CountdownDigits :digits="minutes" />
		<span class="bg-background px-2">:</span>
		<CountdownDigits :digits="seconds" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { Mutations } from '~/store/countdown/types'
import CountdownDigits from '~/components/atoms/CountdownDigits.vue'

@Component({
	components:{
		CountdownDigits
	},
	computed:{
			...mapState('countdown', ['time', 'isActive']),
			...mapGetters('countdown', ['minutes', 'seconds'])
	},
	methods:{
		...mapMutations('countdown', {
			setTime: Mutations.SET_TIME,
			resetTime: Mutations.RESET_TIME
		}),
	}
})
export default class Countdown extends Vue{


	runCountdown(flag: boolean){
		if(this.isActive && flag){
			setTimeout(() => {
				this.setTime(this.time -1)
			}, 1000)
		}
	}
}
</script>
