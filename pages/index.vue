<template>
  <section
    class="
      flex flex-col
      lg:flex-row
      flex-1
      lg:flex-none lg:mt-16
      sm:gap-x-10
      md:gap-x-20
    "
  >
    <div class="flex flex-col w-full lg:w-1/2">
      <Profile />
      <CompletedChallenges />
      <Countdown @completed="getNewChallenge" />

      <button v-if="hasCountdownCompleted" disabled class="button completed">
        Cycle completed
      </button>

      <button
        v-else-if="isCountdownActive"
        class="button abandon"
        @click="setCountdownState(false)"
      >
        Abandon cycle
      </button>

      <button v-else class="button start" @click="setCountdownState(true)">
        Start a cycle
      </button>
    </div>

		<Card class="w-full lg:w-1/2" id="challenge"/>
  </section>
</template>

<script lang="ts">
interface Head {
  title: string;
}

import Vue from "vue";
import Component from "vue-class-component";
import CompletedChallenges from "~/components/atoms/CompletedChallenges.vue";
import Profile from "~/components/molecules/Profile.vue";
import Countdown from "~/components/molecules/Countdown.vue";
import Card from "~/components/organisms/Card.vue";

import { playAudio, sendNotification, getRamdomNumber, scrollToElement } from "~/utils";

import { mapState, mapGetters, mapMutations } from "vuex";
import { Mutations as CountdownMT } from "~/store/countdown/types";
import { Mutations as ChallengesMT } from "~/store/challenges/types";

@Component({
  head(): Head {
    return {
      title: "Home | movue.it",
    };
  },
  components: {
    CompletedChallenges,
    Profile,
    Countdown,
		Card
  },
  computed: {
    ...mapState("countdown", {
      hasCountdownCompleted: "hasCompleted",
      isCountdownActive: "isActive",
    }),
		...mapGetters('challenges', ['challengesLength'])
  },
  methods: {
    ...mapMutations({
      setCountdownHasCompleted: `countdown/${CountdownMT.SET_HAS_COMPLETED}`,
      setCountdownIsActive: `countdown/${CountdownMT.SET_IS_ACTIVE}`,
			setCurrentChallengeIndex: `challenges/${ChallengesMT.SET_CURRENT_CHALLENGE_INDEX}`
    }),
  },
  mounted() {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  },
})
export default class Index extends Vue {
  setCountdownHasCompleted!: (isActive: boolean) => Promise<void>;
  setCountdownIsActive!: (hasCompleted: boolean) => Promise<string>;
  setCurrentChallengeIndex!: (index: number) => Promise<void>;

	public challengesLength!: number

  setCountdownState(flag: boolean) {
    this.setCountdownHasCompleted(false);
    this.setCountdownIsActive(flag);
  }

  getNewChallenge() {
		const index = getRamdomNumber(0, this.challengesLength)
    this.setCountdownHasCompleted(true);
		this.setCurrentChallengeIndex(index)

    if (Notification?.permission === "granted") {
      playAudio("./notification.mp3");
      sendNotification("New Challenge!", {
        body: "A new challenge has started! Go a complete it",
        icon: "./favicon.png",
      });
    }

		this.$nextTick(() => {
			scrollToElement('#challenge')
		})
  }
}
</script>
