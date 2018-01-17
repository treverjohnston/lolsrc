import Vue from 'vue'
import axios from 'axios'
import vuex from 'vuex'
import router from '../router'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//lol-tracker.herokuapp.com/' : '//localhost:5000/';

let api = axios.create({
    baseURL: baseUrl + 'api/',
    timeout: 4000,
    withCredentials: true
})

Vue.use(vuex)

var store = new vuex.Store({
    state: {
        summoner: {},
        matches: {},
        champions: {},
        currents: {},
        top: {},
        allChampions: {},
        playing: false,
        currentSum: {},
        you: { matches: 0 },
        currentGame: {}
    },
    mutations: {
        handleError(state, err) {
            console.error(err)
        },
        setSummoner(state, data) {
            if (state.summoner[data.id]) {
                var temp = state.summoner[data.id]
                temp.accountId = data.accountId
                temp.championId = data.championId
                temp.id = data.id
                temp.name = data.name
                temp.profileIconId = data.profileIconId
                temp.revisionDate = data.revisionDate
                temp.summonerLevel = data.summonerLevel
                temp.teamId = data.teamId
                Vue.set(state.summoner, temp.id, temp)
            }
            else {
                data.wins = 0
                data.losses = 0
                data.kills = 0
                data.assists = 0
                data.deaths = 0
                data.topStats = {
                    magic: {
                        magicDamageDealt: 0,
                        magicDamageDealtToChampions: 0,
                        magicalDamageTaken: 0
                    },
                    physical: {
                        physicalDamageDealt: 0,
                        physicalDamageDealtToChampions: 0,
                        physicalDamageTaken: 0
                    },
                    true: {
                        trueDamageDealt: 0,
                        trueDamageDealtToChampions: 0,
                        trueDamageTaken: 0
                    },
                    damage: {
                        totalDamageTaken: 0,
                        damageDealtToObjectives: 0,
                        damageSelfMitigated: 0,
                        damageDealtToTurrets: 0
                    },
                    heal: {
                        totalHeal: 0,
                        totalUnitsHealed: 0
                    },
                    vision: {
                        visionScore: 0,
                        wardsPlaced: 0,
                        wardsKilled: 0
                    },
                    various: {
                        goldSpent: 0,
                        largestCriticalStrike: 0,
                        largestMultiKill: 0,
                        totalTimeCrowdControlDealt: 0,
                        totalMinionsKilled: 0,
                        turretKills: 0,
                        inhibitorKills: 0
                    }
                }
                Vue.set(state.summoner, data.id, data)
            }
        },
        setSummonerLeague(state, data) {
            if (data[0]) {
                var sum = data[0]
                if (state.summoner[sum.playerOrTeamId]) {
                    state.summoner[sum.playerOrTeamId].league = sum
                }
                else {
                    Vue.set(state.summoner, [sum.playerOrTeamId].league, sum)
                }
            }
        },
        setMasteries(state, data) {
            if (data[0]) {
                var id = data[0].playerId
                state.summoner[data[0].playerId].masteries = {}
                for (let i = 0; i < 3; i++) {
                    let element = data[i]
                    state.summoner[id].masteries[i] = element
                }
                Vue.set(state.summoner[id], state.summoner[id].test, 'test')
            }
        },
        setTotalMasteries(state, data) {
            var id = data.summonerId
            state.summoner[id].totalMasteries = data.data
            Vue.set(state.summoner[id], state.summoner[id].totalMasteries, data.data)
        },
        setChampions(state, data) {
            state.champions = data
        },
        setTest(state) {

        },
        setAllChampions(state, data) {
            state.allChampions = data.data
        },
        setAllChampionsStatic(state, data) {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const champ = data[key];
                    Vue.set(state.allChampions, champ.key, champ)

                }
            }
        },
        setAdvanced(state, data) {
            state.allChampions[data.id].advanced = {}
            Vue.set(state.allChampions, [data.id].advanced, data)
            state.allChampions[data.id].advanced = data
        },
        setTop(state, data) {
            for (let i = 0; i < 3; i++) {
                let element = data[i];
                Vue.set(state.top, element.sumId, element)

            }
        },
        setCurrents(state, data) {
            state.currents = data
        },
        clearData(state) {
            state.currents = {}
            state.summoner = {}
            state.top = {}
            state.playing = false
            state.currentSum = {}
            state.currentGame = {}
            state.you = { matches: 0 }
            state.matches = {}

        },
        setGame(state, data) {
            state.playing = data
        },
        setYou(state, data) {
            state.you = data
            state.currentSum = data
        },
        setMatches(state, data) {
            if (data.participantIdentities) {
                for (let i = 0; i < data.participantIdentities.length; i++) {
                    let element = data.participantIdentities[i];
                    if (element.player.currentAccountId == state.you.accountId) {
                        if (!state.summoner[data.participantIdentities[element.participantId - 1].player.summonerId].matches[data.gameId]) {
                            data.basic.stats = data.participants[element.participantId - 1]
                            if (data.basic.stats.stats.win) {
                                state.summoner[data.participantIdentities[element.participantId - 1].player.summonerId].wins += 1
                            } else {
                                state.summoner[data.participantIdentities[element.participantId - 1].player.summonerId].losses += 1
                            }
                            state.summoner[data.participantIdentities[element.participantId - 1].player.summonerId].kills += data.basic.stats.stats.kills
                            state.summoner[data.participantIdentities[element.participantId - 1].player.summonerId].assists += data.basic.stats.stats.assists
                            state.summoner[data.participantIdentities[element.participantId - 1].player.summonerId].deaths += data.basic.stats.stats.deaths
                            Vue.set(state.summoner, [data.participantIdentities[element.participantId - 1].player.summonerId].matches, data)

                            var top = state.summoner[data.participantIdentities[element.participantId - 1].player.summonerId].topStats
                            for (const i in top) {
                                if (top.hasOwnProperty(i)) {
                                    const place = top[i];
                                    for (const stat in place) {
                                        if (place.hasOwnProperty(stat)) {
                                            // console.log('place', place)
                                            if (data.basic.stats.stats[stat]) {
                                                // console.log('place@stat', place[stat])
                                                if (data.basic.stats.stats[stat] > place[stat]) {
                                                    place[stat] = data.basic.stats.stats[stat]
                                                    // console.log('stat', place[stat])
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
                // console.log('top done', state.summoner[data.participantIdentities[element.participantId - 1].player.summonerId].topStats)
            }

            state.currentGame = data
            Vue.set(state.you.matches, data.gameId, data)
        },
        setGeneralMatches(state, data) {
            Vue.set(state.summoner, data[0].playerId.matches, data)
        },
        clearCurrents(state, id) {
            var temp = {}
            for (const sum in state.summoner) {
                if (state.summoner.hasOwnProperty(sum)) {
                    const element = state.summoner[sum];
                    if (element.id == id) {
                        temp = element
                    }

                }
            }
            state.summoner = {}
            Vue.set(state.summoner, temp.id, temp)
        }
    },
    actions: {
        getSummoner({ commit, dispatch }, obj) {
            api(`summoners/${obj.name}`)
                .then(res => {
                    if (res.data.status) {
                        if (res.data.status.status_code == 429) {
                            return swal({
                                title: 'Rate Limit Exceeded, Try Again Later',
                                timer: 4000
                            })
                        }
                        return swal({
                            title: 'No Summoner By That Name Found',
                            timer: 4000
                        })
                    }
                    if (obj.summoners[res.data.id]) {
                        res.data.show = true
                        commit('setYou', obj.summoners[res.data.id])
                        return dispatch('getCurrents', res.data)
                    }
                    res.data.matches = {}
                    if (!res.data.wins) {
                        res.data.wins = 0
                        res.data.losses = 0
                        res.data.kills = 0
                        res.data.deaths = 0
                    }
                    commit('setSummoner', res.data)
                    res.data.show = true
                    commit('setYou', res.data)
                    dispatch('getMasteries', res.data.id)
                    dispatch('getTotalMasteries', res.data.id)
                    dispatch('getMatches', res.data.accountId)
                    dispatch('getCurrents', res.data)
                    dispatch('getSummonerLeague', res.data.id)

                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getSummoners({ commit, dispatch }, obj) {
            api(`summoners/${obj.summonerName}`)
                .then(res => {
                    res.data.championId = obj.championId
                    res.data.show = false
                    res.data.teamId = obj.teamId
                    commit('setSummoner', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getSummonerLeague({ commit, dispatch }, id) {
            api(`summoners/id/${id}`)
                .then(res => {
                    if (res.data != []) {
                        commit('setSummonerLeague', res.data)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getChampions({ commit, dispatch }, name) {
            api(`champions/${name}`)
                .then(res => {
                    commit('setChampions', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getChampionsInfo({ commit, dispatch }, id) {
            api(`champions/${id}`)
                .then(res => {
                    if (res.data.status) {
                        console.error(res.data.status.message)

                    }
                    commit('setAdvanced', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getAllChampions({ commit, dispatch }) {
            api(`champions`)
                .then(res => {
                    commit('setAllChampions', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getAllChampionsStatic({ commit, dispatch }) {
            api(`statics`)
                .then(res => {
                    commit('setAllChampionsStatic', res.data.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        sendChampions({ commit, dispatch }) {
            api.post(`champions`)
                .then(res => {
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getTop({ commit, dispatch }, obj) {
            api(`champions/${obj.sumId}`)
                .then(res => {
                    res.data.sumId = obj.sumId
                    commit('setTop', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getMatches({ commit, dispatch }, id) {
            api(`matches/${id}`)
                .then(res => {
                    for (const match in res.data.matches) {
                        if (res.data.matches.hasOwnProperty(match)) {
                            let element = res.data.matches[match];
                            dispatch('getSingleMatches', element)
                        }
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getGeneralMatches({ commit, dispatch }, id) {
            api(`matches/${id}`)
                .then(res => {
                    commit('setGeneralMatches', res.data.matches)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getSingleMatches({ commit, dispatch }, data) {
            api(`matches/single/${data.gameId}`)
                .then(res => {
                    res.data.basic = data
                    commit('setMatches', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getMasteries({ commit, dispatch }, id) {
            api(`masteries/${id}`)
                .then(res => {
                    commit('setMasteries', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getTotalMasteries({ commit, dispatch }, id) {
            api(`masteries/total/${id}`)
                .then(res => {
                    res.summonerId = id
                    commit('setTotalMasteries', res)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        moreInfo({ commit, dispatch }, id) {
            dispatch('getMasteries', id)
            dispatch('getTotalMasteries', id)
        },
        getCurrents({ commit, dispatch }, data) {
            commit('setTest')
            api(`currents/${data.id}`)
                .then(res => {
                    if (res.data.status) {
                        commit('setGame', false)
                        router.push('profile')
                        console.log('No game going on mate')
                    } else {
                        commit('clearCurrents', data.id)
                        commit('setCurrents', res.data)
                        commit('setGame', true)
                        router.push('game')
                        console.log('Proceeding with finding game info')
                        if (res.data.gameId != null) {
                            for (let i = 0; i < res.data.participants.length; i++) {
                                let element = res.data.participants[i];
                                dispatch('getSummoners', element)
                                dispatch('getSummonerLeague', element.summonerId)
                            }
                        }

                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        }
    }
})


export default store