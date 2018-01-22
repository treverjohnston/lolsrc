<template>
  <q-layout class="main" ref="layout">
    <div class="input row justify-center">
      <div class="input col-xs-8 col-md-4 text-center">
        <q-input dark placeholder="Find Summoner" color="white"  class="text-center" v-model="summoner" :after="[
        {
          icon: 'arrow_forward',
          content: true,
          handler () {
            findSummoner()
          }
        }
      ]"/>
        <!-- <q-btn outline @click="findSummoner">Find Summoner</q-btn> -->
      </div>
    </div>
    <router-view />
  </q-layout>
</template>

<script>
  import {
    dom,
    event,
    openURL,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QInput,
    QCard,
    QCardMedia,
    QParallax,
    QCardTitle,
    QCardSeparator,
    QCardActions,
    QTransition
  } from 'quasar'


  export default {
    name: 'index',
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QList,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain,
      QInput,
      QCard,
      QCardMedia,
      QParallax,
      QCardTitle,
      QCardSeparator,
      QCardActions,
      QTransition
    },
    data() {
      return {
        summoner: '',
        time: '',
        show: false,
        url: "https://ddragon.leagueoflegends.com/cdn/7.24.1/img/champion/",
        test: false,
        iconUrl: "http://ddragon.leagueoflegends.com/cdn/7.24.1/img/profileicon/",
        riot: false
      }
    },
    computed: {
      playing() {
        return this.$store.state.playing
      },
      top() {
        return this.$store.state.top
      },
      summoners() {
        return this.$store.state.summoner
      },
      matches() {
        return this.$store.state.matches
      },
      champ() {
        return this.$store.state.champions
      },
      allChampions() {
        return this.$store.state.allChampions
      },
      current() {
        return this.$store.state.currentSum
      },
      you() {
        return this.$store.state.you
      },
      youMatches() {
        return this.$store.state.you.matches
      }
    },
    methods: {
      findSummoner() {
        var obj = {
          name: this.summoner,
          summoners: this.$store.state.summoner
        }
        this.$store.dispatch('getSummoner', obj)

        var test = this.allChampions[34]
        this.$store.state.playing = true
        this.test = true
      },
      launch(url) {
        openURL(url)
      },
      moreInfo(sum) {
        if (!sum.masteries) {
          this.$store.dispatch('moreInfo', sum.id)
        }
        this.$store.state.summoner[sum.id].show = !this.$store.state.summoner[sum.id].show
        sum.show = true
        this.$store.state.currentSum = sum
      },
      matchData(id) {
        this.$store.dispatch('getSingleMatches', id)
      }


    },
    mounted() {
      this.$store.dispatch('getAllChampionsStatic')
      if (this.$route.path == '/riot.txt') {

      }
    },
    beforeDestroy() {

    }
  }
</script>

<style>
  .white{
    color: white;
  }
  test {
    margin-top: 2rem;
  }

  .white-back {
    background-color: rgba(255, 255, 255, 0.438);
  }

  .top {
    max-width: 10rem;
  }

  .lower {
    max-width: 8rem;
  }

  .white-border {
    border: 1px solid rgb(190, 190, 190);
  }

  .white {
    color: white;
  }

  .input {
    color: white;
    padding-bottom: 1rem;
  }

  .blue {
    border: 1px solid rgb(0, 0, 134);
    background-color: rgba(0, 0, 0, 0.815);
  }

  .green {
    border: 1px solid rgb(0, 102, 0);
    background-color: rgba(0, 0, 0, 0.815);
  }

  .red {
    border: 1px solid rgb(179, 0, 0);
    background-color: rgba(0, 0, 0, 0.815);

  }

  .little {
    width: 3rem;
  }

  .q-input-target {
    color: white;
  }
</style>