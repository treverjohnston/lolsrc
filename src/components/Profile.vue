<template>
    <q-layout class="main" ref="layout">
        <div v-if="!you.id" class="row justify-center">
        </div>

        <div v-if="you.matches != 0 && you.id" class="row justify-center white">
            <div class="col-md-3 self-center text-center mobile-hide" v-if="!test">
                <h2>Top Champs</h2>
                <h5 class="self-center align-center  text-center">Total Mastery Score: {{you.totalMasteries}}</h5>

            </div>
            <div class="self-center col-xs-12 col-md-6">
                <div class="row justify-center">
                    <div class="col-xs-12">
                        <h4 class="align-center text-center mobile-only ellipsis">{{you.name}}</h4>
                    </div>
                    <div v-if="you.profileIconId && this.$route.path == '/profile'" class="self-center col-xs-5">
                        <q-card class="mobile-only shadow-24 white-border">
                            <q-card-media overlay-position="full">
                                <img class="responsive" :src="iconUrl + `${you.profileIconId}` + '.png'" alt="Profile Icon">
                            </q-card-media>
                        </q-card>
                    </div>
                    <div class="col-xs-12">
                        <h5 class="align-center text-center mobile-only" v-if="you.league">{{you.league.tier}} {{you.league.rank}}</h5>
                        <h6 class="align-center text-center mobile-only" v-if="current.league">{{current.league.leaguePoints}}LP</h6>
                        <h5 class="self-center align-center mobile-only text-center">Total Mastery Score: {{you.totalMasteries}}</h5>
                        <h2 class="text-center desktop-only ellipsis">
                            {{you.name}}
                        </h2>
                    </div>
                </div>
            </div>

            <div class="desktop-only self-center col-xs-3 col-md-2">
                <q-card v-if="you.profileIconId" class="shadow-24 white-border">
                    <q-card-media overlay-position="full">
                        <img class="responsive" :src="iconUrl + `${you.profileIconId}` + '.png'" alt="Profile Icon">
                        <q-card-title slot="overlay">
                            <h6 class="align-center text-center" v-if="you.league">{{you.league.tier}} {{you.league.rank}}</h6>
                            <h6 class="align-center text-center" v-if="current.league">{{current.league.leaguePoints}}LP</h6>
                            <h5 class="align-center text-center">{{you.summonerLevel}}</h5>
                        </q-card-title>
                    </q-card-media>
                </q-card>
            </div>
            <div v-if="test && summoner != ''" class="col-md-12 text-center">
                <q-btn outline @click="test = false">No Game Going On, See Summoner Stats?</q-btn>
            </div>
            <div v-if="you.masteries && this.$route.path == '/profile'" class="col-xs-12 col-md-4">
                <div class="row justify-center">
                    <div class="col-md-6">
                        <div class="row justify-center">
                            <div v-for="champ in you.masteries" v-if="you.show" class="col-xs-5 col-md-12">
                                <q-transition appear enter="fadeIn" leave="fadeOut">
                                    <q-card class="shadow-24 white-back-padding">
                                        <q-tooltip>{{allChampions[champ.championId].name}} - {{champ.championPoints}} - {{champ.championLevel}}</q-tooltip>
                                        <q-card-media overlay-position="full">
                                            <img class="responsive" :src="url + `${allChampions[champ.championId].image.full}`" :alt="allChampions[champ.championId].name">
                                        </q-card-media>
                                    </q-card>
                                </q-transition>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="you && you.topStats" class="row justify-center mobile-only">
                    <!-- <div class="col-xs-3">
                        <q-btn @click="$refs.topModal.open()" outline>See Top Stats?</q-btn>
                    </div> -->
                </div>
                <!-- <q-btn no-caps outline @click="showTop = !showTop" class="desktop-only">
                    <h5 class="text-center">Top Stats Last 20 Matches</h5>
                </q-btn> -->
                <div v-if="you && you.topStats && showTop" class="row justify-around desktop-only">
                    <div class="col-xs-12 text-center">
                        <hr class="bhr">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Magic Stats
                            </q-item-tile>
                        </q-item-main>
                        <hr class="bhr">
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Magic Damage Dealt
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.magicDamageDealt}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Magic Damage Dealt To Champions
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.magicDamageDealtToChampions}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Magic Damage Taken
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.magicalDamageTaken}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-12 text-center">
                        <hr class="bhr">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Physical Stats
                            </q-item-tile>
                        </q-item-main>
                        <hr class="bhr">
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Physical Damage Dealt
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.DamageDealt}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Physical Damage Dealt To Champions
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.DamageDealtToChampions}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Physical Damage Taken
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.DamageTaken}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-12 text-center">
                        <hr class="bhr">
                        <q-item-main class="name">
                            <q-item-tile label>
                                True Stats
                            </q-item-tile>
                        </q-item-main>
                        <hr class="bhr">
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                True Damage Dealt
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.trueDamageDealt}}
                            </q-item-tile>
                        </q-item-main>
                    </div>


                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                True Damage Dealt To Champions
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.trueDamageDealtToChampions}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                True Damage Taken
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.trueDamageTaken}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-12 text-center">
                        <hr class="bhr">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Damage Stats
                            </q-item-tile>
                        </q-item-main>
                        <hr class="bhr">
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Total Damage Taken
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.totalDamageTaken}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Damage Dealt To Objectives
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.damageDealtToObjectives}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Damage Self Mitigated
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.damageSelfMitigated}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Damage Dealt To Turrets
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.damageDealtToTurrets}}
                            </q-item-tile>
                        </q-item-main>
                    </div>

                </div>
            </div>
            <div v-if="you.matches" class="col-xs-12 col-md-8">
                <div class="row justify-center">
                    <div v-if="you.wins != 0 || you.losses != 0" class="self-center text-center col-xs-12 col-md-8">
                        <h5>Last {{Object.keys(you.matches).length}} Matches</h5>
                        <h6>{{you.wins}}-{{you.losses}}</h6>
                        <h6>KDA: {{((you.kills+you.assists)/you.deaths).toFixed(2)}}</h6>
                    </div>
                </div>
                <div v-if="you.matches" class="row reverse reverse-wrap justify-center">
                    <div v-for="match in you.matches" class="xs-gutter col-xs-3 col-md-3 grow">
                        <div v-if="match.basic.stats">
                            <q-transition v-if="match.basic.stats.stats.win" appear enter="fadeIn" leave="fadeOut">
                                <q-card @click="viewSummoner(match), $refs.minimizedModal.open()" class="green shadow-24">
                                    <q-tooltip class="desktop-only">{{allChampions[match.basic.champion].name}}</q-tooltip>
                                    <q-card-media overlay-position="full">
                                        <img class="responsive" :src="url + `${allChampions[match.basic.champion].image.full}`" alt="allChampions[match.basic.champion].name">
                                        <q-card-title slot="overlay">
                                            <span slot="subtitle">{{match.basic.stats.stats.kills}}-{{match.basic.stats.stats.deaths}}-{{match.basic.stats.stats.assists}}</span>
                                        </q-card-title>
                                    </q-card-media>
                                    <q-card-separator />
                                </q-card>
                            </q-transition>
                            <q-transition v-if="!match.basic.stats.stats.win" appear enter="fadeIn" leave="fadeOut">
                                <q-card @click="viewSummoner(match), $refs.minimizedModal.open()" class="red shadow-24">
                                    <q-tooltip class="desktop-only">{{allChampions[match.basic.champion].name}}</q-tooltip>
                                    <q-card-media overlay-position="full">
                                        <img class="responsive" :src="url + `${allChampions[match.basic.champion].image.full}`" alt="allChampions[match.basic.champion].name">
                                        <q-card-title slot="overlay">
                                            <span slot="subtitle">{{match.basic.stats.stats.kills}}-{{match.basic.stats.stats.deaths}}-{{match.basic.stats.stats.assists}}</span>
                                        </q-card-title>
                                    </q-card-media>
                                    <q-card-separator />
                                </q-card>
                            </q-transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="Object.keys(you.matches).length >= 15" class="row justify-center">
            <q-collapsible id="chart" ref="collapse" class="white collapsible" label="View Graph Options">
                <div class="col-xs-5">
                    <q-field class="white" helper="Choose your options">
                        <q-option-group class="white" type="toggle" v-model="whichStat" :options="[
                     { label: 'Physical Damage Dealt To Champions', value: 'Physical Damage Dealt To Champions', color: 'red' },
                     { label: 'Physical Damage Taken', value: 'Physical Damage Taken', color: 'red' },
                     { label: 'Physical Damage Dealt', value: 'Physical Damage Dealt', color: 'red' },
                    ]" />
                        <q-option-group class="white" type="toggle" v-model="whichStat" :options="[
                    
                     { label: 'Magic Damage Dealt', value: 'Magic Damage Dealt', color: 'purple' },
                     { label: 'Magic Damage Dealt To Champions', value: 'Magic Damage Dealt To Champions', color: 'purple' },
                     { label: 'Magic Damage Taken', value: 'Magic Damage Taken', color: 'purple' }
                    ]" />
                    </q-field>

                </div>
                <div class="col-xs-5">
                    <q-field class="white" helper="Choose your options">

                        <q-option-group class="white" type="toggle" v-model="whichStat" :options="[ 
                     { label: 'True Damage Taken', value: 'True Damage Taken', color: 'orange' },
                     { label: 'True Damage Dealt To Champions', value: 'True Damage Dealt To Champions', color: 'orange' },
                     { label: 'True Damage Dealt', value: 'True Damage Dealt', color: 'orange' }
                     
                    ]" />
                        <q-option-group class="white" type="toggle" v-model="whichStat" :options="[
                    { label: 'Total Damage Taken', value: 'Total Damage Taken' },
                { label: 'Total Damage Dealt To Objectives', value: 'Total Damage Dealt To Objectives' },
                 { label: 'Damage Dealt To Turrets', value: 'Damage Dealt To Turrets' },
                 { label: 'Damage Self Mitigated', value: 'Damage Self Mitigated' },
                
                ]" />
                    </q-field>

                </div>
            </q-collapsible>

            <div class="col-xs-10 desktop-only">
                <q-btn outline no-caps class="white" @click="fillData(), $refs.chartModal.open()">See Graphs</q-btn>

            </div>
            <div class="col-xs-10 mobile-only">
                <q-btn outline no-caps class="white" @click="fillData(), $refs.chartModalMobile.open()">See Graphs</q-btn>

            </div>
        </div>
        <q-modal v-if="you && you.topStats" ref="chartModal" minimized>
            <div class="row justify-between">
                <div class="col-xs-11">
                    <chart class="chart" :chart-data="datacollection"></chart>
                </div>
                <div class="col-xs-5">
                    <q-btn push no-caps outline @click="$refs.chartModal.close()">Done</q-btn>
                </div>
                <div class="col-xs-5">
                        <q-btn push no-caps outline @click="$refs.chartModal.close(), $refs.collapse.open(), swal()">Change Graph</q-btn>
                </div>
            </div>
        </q-modal>
        <q-modal v-if="you && you.topStats" ref="chartModalMobile" maximized>
            <div class="row justify-between">
                <div class="col-xs-12">
                    <mobilechart :chart-data="datacollection"></mobilechart>
                </div>
                <div class="col-xs-5">
                    <q-btn push no-caps outline @click="$refs.chartModalMobile.close()">Done</q-btn>
                </div>
                <div class="col-xs-5">
                        <q-btn push no-caps outline @click="$refs.chartModalMobile.close(), $refs.collapse.open()">Change Graph</q-btn>
                </div>
            </div>
        </q-modal>
 
        <q-modal v-if="currentMatch && currentMatch.basic && currentMatch.basic.stats && currentMatch.basic.stats.stats" ref="minimizedModal"
            minimized>
            <div class="row justify-center">
                <q-item class="name col-xs-6 col-md-6">
                    <q-item-side :avatar="url + `${allChampions[currentMatch.basic.champion].image.full}`" />
                    <q-item-main>
                        <q-item-tile label>{{allChampions[currentMatch.basic.champion].name}}</q-item-tile>
                        <q-item-tile sublabel>{{currentMatch.basic.stats.stats.kills}}-{{currentMatch.basic.stats.stats.deaths}}-{{currentMatch.basic.stats.stats.assists}}</q-item-tile>
                    </q-item-main>
                </q-item>
                <q-item class="name col-xs-6 col-md-6">
                    <q-item-main>
                        <q-item-tile label>{{currentMatch.gameMode}}</q-item-tile>
                        <q-item-tile sublabel>{{currentMatch.basic.lane}}</q-item-tile>
                    </q-item-main>
                </q-item>
            </div>
            <div class="row justify-center">
                <q-item v-if="currentMatch.basic.stats.stats.doubleKills != 0" class="col-xs-12 col-md-6">
                    <q-item-side :avatar="scoreUrl + `score.png`" />
                    <q-item-main class="name">
                        <q-item-tile label>Double Kills</q-item-tile>
                        <q-item-tile sublabel>{{currentMatch.basic.stats.stats.doubleKills}}</q-item-tile>
                    </q-item-main>
                </q-item>
                <q-item v-if="currentMatch.basic.stats.stats.tripleKills != 0" class="col-xs-12 col-md-6">
                    <q-item-side :avatar="scoreUrl + `score.png`" />
                    <q-item-main class="name">
                        <q-item-tile label>Triple Kills</q-item-tile>
                        <q-item-tile sublabel>{{currentMatch.basic.stats.stats.tripleKills}}</q-item-tile>
                    </q-item-main>
                </q-item>
                <q-item v-if="currentMatch.basic.stats.stats.quadraKills != 0" class="col-xs-12 col-md-6">
                    <q-item-side :avatar="scoreUrl + `score.png`" />
                    <q-item-main class="name">
                        <q-item-tile label>Quadra Kills</q-item-tile>
                        <q-item-tile sublabel>{{currentMatch.basic.stats.stats.quadraKills}}</q-item-tile>
                    </q-item-main>
                </q-item>
                <q-item v-if="currentMatch.basic.stats.stats.pentaKills != 0" class="col-xs-12 col-md-6">
                    <q-item-side :avatar="scoreUrl + `score.png`" />
                    <q-item-main class="name">
                        <q-item-tile label>Penta Kills</q-item-tile>
                        <q-item-tile sublabel>{{currentMatch.basic.stats.stats.pentaKills}}</q-item-tile>
                    </q-item-main>
                </q-item>
            </div>
            <div class="row justify-center">
                <q-item class="col-xs-12 col-md-6">
                    <q-item-side :avatar="scoreUrl + `champion.png`" />
                    <q-item-main class="name">
                        <q-item-tile label>Killing Spree</q-item-tile>
                        <q-item-tile sublabel>{{currentMatch.basic.stats.stats.largestKillingSpree}}</q-item-tile>
                    </q-item-main>
                </q-item>
                <q-item class="col-xs-12 col-md-6">
                    <q-item-side :avatar="scoreUrl + `gold.png`" />
                    <q-item-main class="name">
                        <q-item-tile label>Total Gold</q-item-tile>
                        <q-item-tile sublabel>{{currentMatch.basic.stats.stats.goldEarned}}</q-item-tile>
                    </q-item-main>
                </q-item>
            </div>
            <div class="row justify-around">
                <div class="col-xs-5">
                    <q-btn push no-caps outline @click="$refs.minimizedModal.close()">Done</q-btn>
                </div>
                <div class="col-xs-5 desktop-only">
                    <q-btn push no-caps outline @click="fillData(), $refs.chartModal.open()">View More Stats</q-btn>
                </div>
                <div class="col-xs-5 mobile-only">
                    <q-btn push no-caps outline @click="fillData(), $refs.chartModalMobile.open()">View More Stats</q-btn>
                </div>
            </div>
        </q-modal>
       
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
        QTransition,
        QModal,
        QModalLayout,
        QItemTile,
        QTooltip,
        QOptionGroup,
        QField,
        QCollapsible
    } from 'quasar'


    import Chart from './Chart'
    import Mobilechart from './MobileChart'
    export default {
        name: 'profile',
        components: {
            Chart,
            Mobilechart,
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
            QTransition,
            QModal,
            QModalLayout,
            QItemTile,
            QTooltip,
            QOptionGroup,
            QField,
            QCollapsible
        },
        data() {
            return {
                summoner: '',
                time: '',
                show: false,
                url: "https://ddragon.leagueoflegends.com/cdn/8.2.1/img/champion/",
                test: false,
                iconUrl: "http://ddragon.leagueoflegends.com/cdn/8.2.1/img/profileicon/",
                scoreUrl: "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/",
                showTop: false,
                datacollection: null,
                whichStat: ['Magic Damage Taken', 'Magic Damage Dealt', 'Magic Damage Dealt To Champions']

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
            },
            currentMatch() {
                return this.$store.state.currentGame
            }
        },
        methods: {
            swal(){
                return swal({
                                title: 'Scroll To The Bottom of the Page For Graph Options',
                                timer: 2000
                            })
            },
            viewSummoner(match) {
                this.$store.state.currentGame = match
            },
            findSummoner() {
                this.$store.dispatch('getSummoner', this.summoner)

                this.$store.state.playing = true
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
            },
            fillData() {
                // switch (this.which) {
                //     case 1:
                this.datacollection = {
                    labels: this.getDamage(),
                    datasets: [
                        {
                            label: 'Lowest Damage',
                            backgroundColor: 'rgba(100, 0, 0, .9)',
                            data: this.getLDStats()
                        },
                        {
                            label: 'Average Damage',
                            backgroundColor: 'rgba(100, 0, 100, 0.815)',
                            data: this.getADStats()
                        },
                        {
                            label: 'Current Matches Damage',
                            backgroundColor: 'rgba(0, 0, 100, 0.815)',
                            data: this.getCDStats()
                        },
                        {
                            label: 'Top Damage',
                            backgroundColor: 'rgba(0, 100, 0, 0.815)',
                            data: this.getDStats()
                        }
                    ]
                }
                // this.which += 1

                // break;

                // }
            },
            getDamage() {
                var title = []
                for (const stat in this.you.topStats) {
                    if (this.you.topStats.hasOwnProperty(stat)) {
                        const el = this.you.topStats[stat];
                        if (this.whichStat.includes(el.title)) {
                            title.push(el.title)
                        }
                    }

                }
                return title
            },
            getCurrentDamage() {
                var title = []
                for (const stat in this.currentMatch.basic.charts.damage) {
                    if (this.currentMatch.basic.charts.damage.hasOwnProperty(stat)) {
                        const el = this.currentMatch.basic.charts.damage[stat];
                        title.push(el.title)
                    }
                }

                return title
            },


            getDStats() {
                var stats = []
                for (const stat in this.you.topStats) {
                    if (this.you.topStats.hasOwnProperty(stat)) {
                        const el = this.you.topStats[stat];
                        if (this.whichStat.includes(el.title)) {
                            stats.push(el.num)
                        }
                    }
                }
                return stats
            },
            getCDStats() {
                var stats = []
                for (const stat in this.currentMatch.basic.charts) {
                    if (this.currentMatch.basic.charts.hasOwnProperty(stat)) {
                        const el = this.currentMatch.basic.charts[stat];
                        if (this.whichStat.includes(el.title)) {
                            stats.push(el.num)
                        }
                    }
                }
                return stats
            },
            getLDStats() {
                var stats = []
                for (const stat in this.you.lowStats) {
                    if (this.you.lowStats.hasOwnProperty(stat)) {
                        const el = this.you.lowStats[stat];
                        if (this.whichStat.includes(el.title)) {
                            stats.push(el.num)
                        }
                    }
                }
                return stats
            },
            getADStats() {
                var stats = []
                for (const stat in this.you.avgStats) {
                    if (this.you.avgStats.hasOwnProperty(stat)) {
                        const el = this.you.avgStats[stat];
                        if (this.whichStat.includes(el.title)) {
                            stats.push(el.num / Object.keys(this.you.matches).length)
                        }
                    }
                }
                return stats
            },

            keepTrying() {
                // if (this.allChampions[1] != null) {
                // } else {
                //     this.$store.dispatch('getAllChampionsStatic')
                //     setTimeout(this.keepTrying, 3000)
                // }
            }


        },
        mounted() {
            this.$store.dispatch('getAllChampionsStatic')
            // this.keepTrying()
        }
    }
</script>

<style>
    a {
        color: white;
    }

    .q-icon {
        color: white;
    }

    .collapsible {
        color: white;
        /* background-color: rgba(255, 255, 255, 0.466); */
        /* border: 1px solid white; */
        padding: .5rem;
    }

    .chart {
        max-width: 50vw
    }

    .grow {
        transition: all .35s ease-in-out;
        margin-bottom: 2rem;
    }

    .grow:hover {
        transform: scale(1.1);
    }

    .bhr {
        border-color: blue;
        width: 95%
    }

    .stats {
        background-color: rgba(0, 0, 0, 0.651);
    }

    .white-back-padding {
        background-color: rgba(255, 255, 255, 0.438);
        border: 3px solid rgba(255, 255, 255, 0.438);
    }

    .name {
        font-size: 1.5rem;
        padding-bottom: 1rem;
    }


    .modal-content {
        padding: 1rem 1rem 1rem 1rem;
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

    .main {
        font-family: 'Bellefair', serif;
        padding-bottom: 3rem;
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