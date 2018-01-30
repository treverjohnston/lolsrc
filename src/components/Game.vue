<template>
    <q-layout class="main" ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}">
        <div class="row justify-center align-center">
            <div class="sm-gutter col-xs-12 col-sm-3 desktop-only" v-show="current.masteries && current.teamId">
                <div class="row justify-center">
                    <div v-if="current.championId" class="col-xs-12 white text-center link">
                        <q-btn outline @click="openChamps(current.championId)" no-caps>
                            <h5>
                                {{allChampions[current.championId].name}}
                            </h5>
                        </q-btn>

                    </div>
                    <div class="white-back col-xs-6 col-md-8">
                        <q-card class="shadow-8">
                            <q-card-media overlay-position="full">
                                <img class="shadow-24 responsive" :src="iconUrl + `${current.profileIconId}` + '.png'" alt="Profile Icon">
                                <q-card-title class="text-center" slot="overlay">
                                    <h5>{{current.name}}</h5>
                                    <h6 v-if="current.league">{{current.league.tier}} {{current.league.rank}}</h6>
                                    <h6 v-if="current.league">LP {{current.league.leaguePoints}}</h6>
                                    <h6>MS {{current.totalMasteries}}</h6>
                                </q-card-title>
                            </q-card-media>
                        </q-card>
                    </div>
                </div>
                <div class="row justify-center">
                    <div class="col-xs-4 col-md-6" v-for="champ in current.masteries" v-show="current.masteries && current.show">
                        <q-transition appear enter="fadeIn" leave="fadeOut">
                            <q-card class="shadow-8">
                                <q-tooltip class="desktop-only">{{allChampions[champ.championId].name}} - {{champ.championPoints}} - {{champ.championLevel}}</q-tooltip>
                                <q-card-media overlay-position="full">
                                    <img class="responsive" :src="url + `${allChampions[champ.championId].image.full}`" :alt="allChampions[champ.championId].name">
                                </q-card-media>
                                <q-card-separator />
                            </q-card>
                        </q-transition>
                    </div>
                    <div class="col-xs-12 text-center">
                        <q-btn outline no-caps color="white" @click="viewSummonerDesk(current)">See Recent Matches</q-btn>
                    </div>
                    <div v-if="current.id != look" class="col-xs-12 text-center desktop-only">
                        <q-btn outline no-caps color="white comp" @click="compare(current)">Compare</q-btn>
                    </div>
                </div>
            </div>

            <!-- Desktop -->

            <div class="desktop-only col-xs-12 col-sm-9">
                <div class="row justify-center">
                    <div v-if="sum.teamId == 100" v-for="sum in summoners" class="col-xs-4 col-md-2">
                        <q-transition appear enter="fadeIn">
                            <q-card @click="moreInfo(sum)" color="transparent to-hover" class="blue shadow-24 pic">
                                <q-btn no-caps>
                                    <q-tooltip>{{allChampions[sum.championId].name}}</q-tooltip>
                                    <q-card-media overlay-position="full">
                                        <img class="responsive" :src="url + `${allChampions[sum.championId].image.full}`" :alt="allChampions[sum.championId].name">
                                    </q-card-media>
                                </q-btn>
                                <q-card-title>
                                    <span class="ellipsis">
                                        {{sum.name}}
                                    </span>
                                    <span slot="subtitle">Summoner Level: {{sum.summonerLevel}}</span>
                                </q-card-title>
                            </q-card>
                        </q-transition>
                    </div>
                </div>
                <div class="row reverse-wrap justify-center">
                    <div v-if="sum.teamId == 200" v-for="sum in summoners" class="col-xs-4 col-md-2">
                        <q-transition appear enter="fadeIn">
                            <q-card @click="moreInfo(sum)" color="transparent to-hover" class="red shadow-24 pic">
                                <q-btn no-caps>
                                    <q-tooltip>{{allChampions[sum.championId].name}}</q-tooltip>
                                    <q-card-media overlay-position="full">
                                        <img class="responsive" :src="url + `${allChampions[sum.championId].image.full}`" :alt="allChampions[sum.championId].name">
                                    </q-card-media>
                                </q-btn>
                                <q-card-title>
                                    <span class="ellipsis">
                                        {{sum.name}}
                                    </span>
                                    <span slot="subtitle">Summoner Level: {{sum.summonerLevel}}</span>
                                </q-card-title>
                            </q-card>
                        </q-transition>
                    </div>
                </div>
                <div v-if="you && you.matches && you.id != look && Object.keys(you.matches).length >= 15" class="row justify-center desktop-only">
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
                    <!-- <div class="col-xs-10 desktop-only">
                        <q-btn outline no-caps class="white" @click="fillData(), $refs.chartModal.open()">See Graphs</q-btn>
                    </div> -->
                </div>
            </div>


            <!-- Mobile -->

            <div class="mobile-only col-xs-6 col-sm-6">
                <div class="row justify-center">
                    <div v-if="playing && sum.teamId == 100" v-for="sum in summoners" class="col-xs-12 col-md-2">
                        <q-transition appear enter="fadeIn">
                            <q-card @click="moreInfo(sum), $refs.mini.open()" color="transparent to-hover" class="blue shadow-24 pic">
                                <q-btn class="full-width" no-caps>
                                    <q-card-media overlay-position="full">
                                        <img class="responsive" :src="url + `${allChampions[sum.championId].image.full}`" :alt="allChampions[sum.championId].name">
                                    </q-card-media>
                                </q-btn>
                                <q-card-title>
                                    <span class="ellipsis">
                                        {{sum.name}}
                                    </span>
                                    <span slot="subtitle">Summoner Level: {{sum.summonerLevel}}</span>
                                </q-card-title>
                            </q-card>
                        </q-transition>
                    </div>
                </div>
            </div>
            <div class="mobile-only col-xs-6 col-sm-6">
                <div class="row reverse-wrap justify-center">
                    <div v-if="playing && sum.teamId == 200" v-for="sum in summoners" class="col-xs-12 col-md-2">
                        <q-transition appear enter="fadeIn">
                            <q-card @click="moreInfo(sum), $refs.mini.open()" color="transparent to-hover" class="red shadow-24 pic">
                                <q-btn no-caps>
                                    <q-card-media overlay-position="full">
                                        <img class="responsive" :src="url + `${allChampions[sum.championId].image.full}`" :alt="allChampions[sum.championId].name">
                                    </q-card-media>
                                </q-btn>
                                <q-card-title>
                                    <span class="ellipsis">
                                        {{sum.name}}
                                    </span>
                                    <span slot="subtitle">Summoner Level: {{sum.summonerLevel}}</span>
                                </q-card-title>
                            </q-card>
                        </q-transition>
                    </div>
                </div>
            </div>
            <div class="col-xs-12">
                <div v-if="you && you.matches && current.id != look && Object.keys(you.matches).length >= 15" class="row justify-center mobile-only">
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
                    <div class="col-xs-10 mobile-only">
                        <q-btn outline no-caps class="white" @click="fillData(), $refs.chartModalMobile.open()">See Graphs</q-btn>
                    </div>
                </div>
            </div>
        </div>
        <q-modal class="mobile-only" ref="mini" minimized @close="close">
            <div class="row justify-center">
                <div v-if="current.championId" class="col-xs-12 text-center">
                    <q-btn @click="openChamps(current.championId)" class="link" outline no-caps>
                        <h4>{{allChampions[current.championId].name}}</h4>
                    </q-btn>
                </div>
                <div v-if="current" class="white-back col-xs-9 col-md-8">
                    <q-card class="shadow-8">
                        <q-card-media @click="viewSummoner(current)" overlay-position="full">
                            <img class="shadow-24 responsive" :src="iconUrl + `${current.profileIconId}` + '.png'" alt="">
                            <q-card-title class="text-center" slot="overlay">
                                <h5 class="ellipsis">{{current.name}}</h5>
                                <h6 v-if="current.league">{{current.league.tier}} {{current.league.rank}}</h6>
                                <h6 v-if="current.league">LP {{current.league.leaguePoints}}</h6>
                                <h6>MS {{current.totalMasteries}}</h6>
                            </q-card-title>
                        </q-card-media>
                        <q-card-separator />
                    </q-card>
                </div>
            </div>
            <div class="row justify-center">
                <div class="col-xs-6 col-md-6" v-for="champ in current.masteries" v-if="current.masteries && current.show">
                    <q-transition appear enter="fadeIn" leave="fadeOut">
                        <q-card class="shadow-8 white-back-padding">
                            <q-card-media overlay-position="full">
                                <q-tooltip class="mobile-only">{{allChampions[champ.championId].name}} - {{champ.championPoints}} - {{champ.championLevel}}</q-tooltip>
                                <img class="responsive" :src="url + `${allChampions[champ.championId].image.full}`" :alt="allChampions[champ.championId].name">
                            </q-card-media>
                            <q-card-separator />
                        </q-card>
                    </q-transition>
                </div>
            </div>
            <div class="row justify-around space">
                <div class="col-xs-5">
                    <q-btn outline no-caps class="done" @click="close">Done</q-btn>
                </div>
                <div class="col-xs-5">
                    <q-btn outline no-caps class="done" @click="viewSummoner(current)">See Recent Matches</q-btn>
                </div>
                <div v-if="current.id != look" class="col-xs-12">
                    <q-btn outline no-caps class="done comp" @click="compareMobile(current)">Compare</q-btn>
                </div>
            </div>

        </q-modal>
        <q-modal maximized class="mobile-only" ref="profile">
            <div class="row">
                <div class="col-xs-12">
                    <profile></profile>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <q-btn outline no-caps class="done" @click="closeProf">Done</q-btn>
                </div>
            </div>
        </q-modal>
        <q-modal v-if="you && you.topStats" ref="chartModal" class="mod" maximized>
            <div class="row justify-between">
                <div v-if="!graphing" class="col-xs-12 text-center">
                    <q-spinner-gears color="amber" size="40" />
                </div>
                <div v-if="graphing" class="col-xs-12">
                    <chart class="chart" :chart-data="datacollection"></chart>
                </div>
                <div class="col-xs-5">
                    <q-btn push no-caps outline @click="$refs.chartModal.close()">Done</q-btn>
                </div>
                <div class="col-xs-5">
                    <q-btn push no-caps outline @click="$refs.chartModal.close(), $refs.collapse.open()">Change Graph</q-btn>
                </div>
            </div>
        </q-modal>
        <q-modal v-if="you && you.topStats" ref="chartModalMobile" maximized>
            <div class="row justify-between">
                <div class="col-xs-12">
                    <q-spinner-gears v-if="graphing" color="amber" size="40" />
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
        <q-modal v-if="current && current.championId" maximized ref="champs">
            <div v-if="allChampions[current.championId].advanced" class="row justify-center">
                <hr class="bhr">
                <div class="col-xs-12 text-center">
                    <q-item-main class="name">
                        <q-item-tile label>
                            {{allChampions[current.championId].advanced.name}}
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{allChampions[current.championId].advanced.title}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-2 self-center">
                    <q-btn no-caps outline @click="tips = !tips">Toggle</q-btn>
                </div>
                <hr class="bhr">
                <div v-if="tips" class="col-xs-12 col-md-12">
                    <div v-for="tip in allChampions[current.championId].advanced.enemytips" class="tip col-xs-12 text-center">
                        <q-item-main>
                            <q-item-tile class="white" sublabel>
                                {{tip}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                </div>
                <div v-if="!tips" class="col-xs-12 col-md-12">
                    <div v-for="tip in allChampions[current.championId].advanced.allytips" class="tip col-xs-12 text-center">
                        <q-item-main>
                            <q-item-tile class="white" sublabel>
                                {{tip}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                </div>
                <div class="col-xs-12">
                    <hr class="bhr">
                </div>
            </div>
            <div class="row justify-around">
                <div class="col-xs-5">
                    <q-btn no-caps outline @click="closeChamps">Done</q-btn>
                </div>
                <div class="col-xs-5">
                    <q-btn outline @click="launch(buildUrl +`${allChampions[current.championId].name}`)" no-caps>
                        View Champion Builds
                    </q-btn>
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
        QTooltip,
        QItemTile,
        QOptionGroup,
        QField,
        QCollapsible,
        QSpinnerGears

    } from 'quasar'
    import Profile from './Profile'
    import Chart from './Chart'
    import Mobilechart from './MobileChart'

    export default {
        name: 'index',
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
            QTooltip,
            Profile,
            QItemTile,
            QOptionGroup,
            QField,
            QCollapsible,
            QSpinnerGears

        },
        data() {
            return {
                summoner: '',
                time: '',
                show: false,
                url: "https://ddragon.leagueoflegends.com/cdn/8.2.1/img/champion/",
                test: false,
                iconUrl: "http://ddragon.leagueoflegends.com/cdn/8.2.1/img/profileicon/",
                buildUrl: "http://www.lolking.net/builds/champion/",
                tips: true,
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
            },
            look() {
                return this.$store.state.look
            },
            graphing() {
                return this.$store.state.graphs
            }
        },
        methods: {
            fillData() {
                this.datacollection = {
                    labels: this.getDamage(),
                    datasets: [
                        {
                            label: 'Opponent Average',
                            backgroundColor: 'rgba(100, 0, 100, 0.815)',
                            data: this.getADStats()
                        },
                        {
                            label: 'Your Average',
                            backgroundColor: 'rgba(0, 0, 100, 0.815)',
                            data: this.getYAStats()
                        },
                        {
                            label: 'Opponent Top',
                            backgroundColor: 'rgba(100, 0, 100, 0.815)',
                            data: this.getDStats()
                        },
                        {
                            label: 'Your Top',
                            backgroundColor: 'rgba(0, 0, 100, 0.815)',
                            data: this.getYDStats()
                        }
                    ]
                }
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
            getYDStats() {
                var stats = []
                var temp = this.summoners[this.look]

                for (const stat in temp.topStats) {
                    if (temp.topStats.hasOwnProperty(stat)) {
                        const el = temp.topStats[stat];
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
                if (this.you.avgStats) {
                    // this.$store.state.graphs = true
                    // console.log(this.$store.state.graphs)
                }
                return stats
            },
            getYAStats() {
                var stats = []
                var temp = this.summoners[this.look]
                for (const stat in temp.avgStats) {
                    if (temp.avgStats.hasOwnProperty(stat)) {
                        const el = temp.avgStats[stat];
                        if (this.whichStat.includes(el.title)) {
                            stats.push(el.num / Object.keys(temp.matches).length)
                        }
                    }
                }
                return stats
            },
            openChamps(id) {
                this.$refs.champs.open()
                if (!this.allChampions[id].advanced) {
                    this.$store.dispatch('getChampionsInfo', id)
                }
                else {
                    console.log('already got it')
                }
            },
            close() {
                this.$refs.mini.close()
            },
            closeProf() {
                this.$refs.profile.close()
            },
            closeChamps() {
                this.$refs.champs.close()
            },
            viewSummoner(data) {
                this.$store.state.you = data
                // this.$router.push('/profile')
                if (!data.matches) {
                    this.$store.state.you.matches = {}
                    this.$store.dispatch('getMatches', data.accountId)
                }
                this.$refs.profile.open()
            },
            viewSummonerDesk(data) {
                this.$store.state.you = data
                this.$router.push('/profile')
                if (!data.matches) {
                    this.$store.state.you.matches = {}
                    this.$store.dispatch('getMatches', data.accountId)
                }
                // this.$refs.profile.open()
            },
            compare(data) {
                this.$store.state.you = data
                if (!data.matches) {
                    this.$store.state.graphs = false

                    this.$store.state.you.matches = {}
                    this.$store.dispatch('getMatches', data.accountId)
                }
                this.fillData()
                this.$refs.chartModal.open()
                setTimeout(() => { this.tryAgain() }, 2000)
            },
            compareMobile(data) {
                this.$store.state.you = data
                if (!data.matches) {
                    this.$store.state.graphs = false
                    this.$store.state.you.matches = {}
                    this.$store.dispatch('getMatches', data.accountId)
                }
                this.fillData()
                this.$refs.chartModalMobile.open()
                setTimeout(() => { this.tryAgain() }, 2000)
            },
            tryAgain() {
                if (this.you.avgStats[0] != 0) {
                    this.fillData()
                    this.$refs.chartModal.open()
                    if (this.$store.state.graphs == false) {
                        this.$store.state.graphs = true
                    }
                } else {
                    setTimeout(() => { this.tryAgain() }, 2000)
                }
            },
            tryAgainMobile() {
                if (this.you.avgStats[0] != 0) {
                    this.fillData()
                    this.$refs.chartModalMobile.open()
                    if (this.$store.state.graphs == false) {
                        this.$store.state.graphs = true
                    }
                } else {
                    setTimeout(() => { this.tryAgain() }, 2000)
                }
            },
            findSummoner() {
                this.$store.dispatch('getSummoner', this.summoner)

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
                // this.$store.state.you.show = !this.$store.state.you.show
                sum.show = true
                this.$store.state.currentSum = sum
            },
            matchData(id) {
                this.$store.dispatch('getSingleMatches', id)
            }


        },
        mounted() {
            this.$store.dispatch('getAllChampionsStatic')
        }
    }
</script>

<style>
    .comp {
        margin-top: .5rem;
    }

    .link {
        margin-bottom: 1rem;
    }

    .tip {
        margin-bottom: 1rem;
    }

    .full-width {
        width: 100%;
    }

    .btn {
        color: white;
        margin-top: 1rem;
    }

    .space {
        margin-top: 1rem;
    }

    .modal-header {
        color: white;
    }

    .modal-body {
        color: white;
    }

    .hover {
        opacity: 0;
    }

    .to-hover:hover .hover {
        opacity: 1;
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
        /* background-color: black */
        padding-bottom: 1rem;
    }

    .main {
        font-family: 'Bellefair', serif;
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