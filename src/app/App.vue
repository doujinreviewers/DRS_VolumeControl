<template>
  <div>
    <div class="sticky bg-white top-0 z-50">
      <div class="max-w-full mx-auto">
        <div class="flex justify-center items-center py-10">
          <div class="flex flex-col justify-center">
            <label>
              <input v-model="bgm" class="form-check-input h-4 w-4 border rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 mt-1 align-top cursor-pointer" type="checkbox" id="bgm">
              BGMを演奏する
            </label>
            <label>
              <input v-model="me" class="form-check-input h-4 w-4 border rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 mt-1 align-top cursor-pointer" type="checkbox" id="me">
              MEを演奏する
            </label>
            <label>
              <input v-model="bgs" class="form-check-input h-4 w-4 border rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 mt-1 align-top cursor-pointer" type="checkbox" id="bgs">
              BGSを演奏する
            </label>
            <label>
              <input v-model="se" class="form-check-input h-4 w-4 border rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 mt-1 align-top cursor-pointer" type="checkbox" id="se">
              SEを演奏する
            </label>
          </div>
        </div>
        <div v-if="error" class="flex justify-center items-center py-2">
          <div class="bg-red-100 rounded-lg py-2 px-6 text-base text-red-700" role="alert">
            {{error}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      bgm: true,
      me: true,
      bgs: true,
      se: true,
    }
  },
  watch: {
    bgm(newVal, old) {
      this.reflect();
    },
    me(newVal, old) {
      this.reflect();
    },
    bgs(newVal, old) {
      this.reflect();
    },
    se(newVal, old) {
      this.reflect();
    },
  },
  methods: {
    reflect: function(){
      const event = new CustomEvent('changegamevolume', {
        detail: {
          bgm: this.bgm,
          me: this.me,
          bgs: this.bgs,
          se: this.se,
        }
      });
      nw.Window.get().window.dispatchEvent(event);
    },
  },
  mounted: function(){
    let states = JSON.parse(document.getElementById("currentStates").textContent);
    this.bgm = states.state_bgm;
    this.me = states.state_me;
    this.bgs = states.state_bgs;
    this.se = states.state_se;
  }
}
</script>