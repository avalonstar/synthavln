// System defaults.
const EMOTE_THRESHOLD = 100;
const TIME_THRESHOLD = 1 * 60 * 1000;
const SYSTEM_COOLDOWN = 5 * 60 * 1000;

export default class EmoteBucketSystem {
  constructor({
    emoteThreshold = EMOTE_THRESHOLD,
    timeThreshold = TIME_THRESHOLD,
    systemCooldown = SYSTEM_COOLDOWN,
    trackedEmotes,
    onThresholdReached
  }) {
    if (
      !trackedEmotes ||
      !Array.isArray(trackedEmotes) ||
      !trackedEmotes.length
    ) {
      throw new Error('No trackedEmotes array provided');
    }
    if (!onThresholdReached || typeof onThresholdReached !== 'function') {
      throw new Error('No onThresholdReached function provided');
    }

    this.onThresholdReached = onThresholdReached;
    this.emoteThreshold = emoteThreshold;
    this.timeThreshold = timeThreshold;
    const systemThroughput = this.emoteThreshold / this.timeThreshold;
    this.depletionRate = (this.emoteThreshold - 1) / systemThroughput;
    this.systemCooldown = systemCooldown;
    this.trackedEmotes = trackedEmotes;
    this.blocked = false;
    this.initializeBuckets();
    this.startTimers();
  }

  initializeBuckets() {
    this.buckets = {};
    this.trackedEmotes.forEach(emote => {
      this.buckets[emote] = 0;
    });
  }

  startTimers() {
    this.leakingTimer = setInterval(() => {
      if (!this.blocked) {
        Object.keys(this.buckets).forEach(emote => {
          if (this.buckets[emote] > 0) {
            this.buckets[emote] -= 1;
          }
        });
      }
    }, this.depletionRate);
  }

  stopTimers() {
    if (this.leakingTimer) clearInterval(this.leakingTimer);
  }

  processIncomgingEmote(emote, occurances = 1) {
    if (!this.blocked) {
      if (this.buckets[emote] !== null && this.buckets[emote] !== undefined) {
        this.buckets[emote] += occurances;
        if (this.buckets[emote] >= this.emoteThreshold) {
          this.fireThresholdEvent(emote);
        }
      }
    }
  }

  fireThresholdEvent(e) {
    if (this.onThresholdReached) {
      this.onThresholdReached(e);
    }
    this.initiateCooldown();
  }

  initiateCooldown() {
    console.log('system is in cooldown for:', this.systemCooldown);
    this.blocked = true;
    this.initializeBuckets();
    this.cooldownTimer = setTimeout(() => {
      this.blocked = false;
    }, this.systemCooldown);
  }

  reset() {
    this.stopTimers();
    if (this.cooldownTimer) clearTimeout(this.cooldownTimer);
    this.blocked = false;
    this.initializeBuckets();
    this.startTimers();
  }

  destroy() {
    this.stopTimers();
    if (this.cooldownTimer) clearTimeout(this.cooldownTimer);
  }
}
