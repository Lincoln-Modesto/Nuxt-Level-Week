<template>
  <section
    class="flex flex-col flex-1 justify-center items-center py-6 px-10 md:px-16"
  >
    <header class="w-full pb-6 border-b-2 border-background">
      <h2 class="text-xl text-blue font-semibold text-center">
        {{ `Win ${amount} xp` }}
      </h2>
    </header>
    <main class="flex flex-col flex-1 justify-center items-center mt-6">
      <img
        :src="`icons/${type}.svg`"
        :alt="type"
        :style="{ minHeight: '70px' }"
      />
      <h1 class="font-semibold text-3xl text-title mt-6 mb-2">Work out</h1>
      <p class="text-center text-base leading-6">
        {{ description }}
      </p>
    </main>
    <footer class="flex w-full gap-x-2">
      <button class="button failed" @click="resetChallenges">Failed</button>
      <button class="button succeeded" @click="challengeSucceeded">
        Completed
      </button>
    </footer>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapState, mapMutations } from "vuex";
import { Mutations as CountdownMT } from "~/store/countdown/types";
import { Mutations as ChallengesMT } from "~/store/challenges/types";

@Component({
  computed: {
    ...mapState("challenges", ["level", "xp", "completedChallenges"]),
  },
  methods: {
    ...mapMutations({
      resetTime: `countdown/${CountdownMT.RESET_TIME}`,
      setIsActive: `countdown/${CountdownMT.SET_IS_ACTIVE}`,
      setHasCompleted: `countdown/${CountdownMT.SET_HAS_COMPLETED}`,
      setCurrentChallengeIndex: `challenges/${ChallengesMT.SET_CURRENT_CHALLENGE_INDEX}`,
      completeChallenge: `challenges/${ChallengesMT.COMPLETE_CHALLENGE}`,
    }),
  },
})
export default class Challenge extends Vue {
  @Prop({ required: true }) type!: string;
  @Prop({ required: true }) description!: string;
  @Prop({ required: true }) amount!: number;

  resetTime!: () => Promise<void>;
  setIsActive!: (isActive: boolean) => Promise<void>;
  setHasCompleted!: (hasCompleted: boolean) => Promise<void>;
  setCurrentChallengeIndex!: (index: number | null) => Promise<void>;
  completeChallenge!: (xpAmount: number) => Promise<void>;

  resetChallenges() {
    this.resetTime();
    this.setIsActive(false);
    this.setHasCompleted(false);
    this.setCurrentChallengeIndex(null);
  }

  challengeSucceeded() {
    this.resetChallenges();
    this.completeChallenge(this.amount);
  }
}
</script>
