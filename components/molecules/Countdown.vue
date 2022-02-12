<template>
	<div class="flex justify-center items-center mt-8 lg:mt-14 text-9xl text-title font-rajdhani">
		<CountdownDigits :digits="minutes" />
		<span class="bg-background px-2">:</span>
		<CountdownDigits :digits="seconds" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { Mutations } from '~/store/countdown/types'
import CountdownDigits from '~/components/atoms/CountdownDigits.vue'

let TIMEOUT_REFERENCE: ReturnType<typeof setTimeout>

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

	setTime!: (time: number) => Promise<void>;
	resetTime!: () => Promise<void>
	public time!: number
	public isActive!: boolean

		@Watch('isActive')
		isActiveChanged(newValue: boolean){
			this.runCountdown(newValue)

			if(!newValue){
				this.resetTime()
			}
		}

		@Watch('time')
		timeChanged(newValue: number){
			if(newValue > 0){
				this.runCountdown(true)
			}else{
				this.$emit('completed')
			}
		}

		runCountdown(flag: boolean){
		if(this.isActive && flag){
			TIMEOUT_REFERENCE = setTimeout(() => {
				this.setTime(this.time -1)
			}, 1000)
		}else{
			clearTimeout(TIMEOUT_REFERENCE)
		}
	}

}
</script>
