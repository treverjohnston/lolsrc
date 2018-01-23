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
                    <div class="col-xs-3">
                        <q-btn @click="$refs.topModal.open()" outline>See Top Stats?</q-btn>
                    </div>
                </div>
                <q-btn no-caps outline @click="showTop = !showTop" class="desktop-only">
                    <h5 class="text-center">Top Stats Last 20 Matches</h5>
                </q-btn>
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
                                {{you.topStats.magic.magicDamageDealt}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Magic Damage Dealt To Champions
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.magic.magicDamageDealtToChampions}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Magic Damage Taken
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.magic.magicalDamageTaken}}
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
                                {{you.topStats.physical.physicalDamageDealt}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Physical Damage Dealt To Champions
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.physical.physicalDamageDealtToChampions}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Physical Damage Taken
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.physical.physicalDamageTaken}}
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
                                {{you.topStats.true.trueDamageDealt}}
                            </q-item-tile>
                        </q-item-main>
                    </div>


                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                True Damage Dealt To Champions
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.true.trueDamageDealtToChampions}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                True Damage Taken
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.true.trueDamageTaken}}
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
                                {{you.topStats.damage.totalDamageTaken}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Damage Dealt To Objectives
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.damage.damageDealtToObjectives}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Damage Self Mitigated
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.damage.damageSelfMitigated}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Damage Dealt To Turrets
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.damage.damageDealtToTurrets}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-12 text-center">
                        <hr class="bhr">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Heal Stats
                            </q-item-tile>
                        </q-item-main>
                        <hr class="bhr">
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Total Heal
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.heal.totalHeal}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Total Units Healed
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.heal.totalUnitsHealed}}
                            </q-item-tile>
                        </q-item-main>
                    </div>

                    <div class="col-xs-12 text-center">
                        <hr class="bhr">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Vision Stats
                            </q-item-tile>
                        </q-item-main>
                        <hr class="bhr">
                    </div>

                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Vision Score
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.vision.visionScore}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Wards Placed
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.vision.wardsPlaced}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Wards Killed
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.vision.wardsKilled}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-12 text-center">
                        <hr class="bhr">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Various Stats
                            </q-item-tile>
                        </q-item-main>
                        <hr class="bhr">
                    </div>

                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Gold Spent
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.various.goldSpent}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Largest Critical Strike
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.various.largestCriticalStrike}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Largest Multi-Kill
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.various.largestMultiKill}}
                            </q-item-tile>
                        </q-item-main>
                    </div>


                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Total Crowd Control Dealt
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.various.totalTimeCrowdControlDealt}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Total Minions Killed
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.various.totalMinionsKilled}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Turret Kills
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.various.turretKills}}
                            </q-item-tile>
                        </q-item-main>
                    </div>
                    <div class="col-xs-5">
                        <q-item-main class="name">
                            <q-item-tile label>
                                Inhibitor Kills
                            </q-item-tile>
                            <q-item-tile sublabel>
                                {{you.topStats.various.inhibitorKills}}
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
        <q-modal v-if="you && you.topStats" ref="topModal" minimized>
            <div class="row justify-around mobile-only">
                <div class="col-xs-12 text-center">
                    <h5 class="text-center">Top Stats Last 20 Matches</h5>
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
                            {{you.topStats.magic.magicDamageDealt}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Magic Damage Dealt To Champions
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.magic.magicDamageDealtToChampions}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Magic Damage Taken
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.magic.magicalDamageTaken}}
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
                            {{you.topStats.physical.physicalDamageDealt}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Physical Damage Dealt To Champions
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.physical.physicalDamageDealtToChampions}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Physical Damage Taken
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.physical.physicalDamageTaken}}
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
                            {{you.topStats.true.trueDamageDealt}}
                        </q-item-tile>
                    </q-item-main>
                </div>


                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            True Damage Dealt To Champions
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.true.trueDamageDealtToChampions}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            True Damage Taken
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.true.trueDamageTaken}}
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
                            {{you.topStats.damage.totalDamageTaken}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Damage Dealt To Objectives
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.damage.damageDealtToObjectives}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Damage Self Mitigated
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.damage.damageSelfMitigated}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Damage Dealt To Turrets
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.damage.damageDealtToTurrets}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-12 text-center">
                    <hr class="bhr">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Heal Stats
                        </q-item-tile>
                    </q-item-main>
                    <hr class="bhr">
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Total Heal
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.heal.totalHeal}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Total Units Healed
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.heal.totalUnitsHealed}}
                        </q-item-tile>
                    </q-item-main>
                </div>

                <div class="col-xs-12 text-center">
                    <hr class="bhr">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Vision Stats
                        </q-item-tile>
                    </q-item-main>
                    <hr class="bhr">
                </div>

                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Vision Score
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.vision.visionScore}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Wards Placed
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.vision.wardsPlaced}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Wards Killed
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.vision.wardsKilled}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-12 text-center">
                    <hr class="bhr">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Various Stats
                        </q-item-tile>
                    </q-item-main>
                    <hr class="bhr">
                </div>

                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Gold Spent
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.various.goldSpent}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Largest Critical Strike
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.various.largestCriticalStrike}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Largest Multi-Kill
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.various.largestMultiKill}}
                        </q-item-tile>
                    </q-item-main>
                </div>


                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Total Crowd Control Dealt
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.various.totalTimeCrowdControlDealt}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Total Minions Killed
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.various.totalMinionsKilled}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Turret Kills
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.various.turretKills}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Inhibitor Kills
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{you.topStats.various.inhibitorKills}}
                        </q-item-tile>
                    </q-item-main>
                </div>
            </div>
            </div>
            <div class="row justify-around">
                <div class="col-xs-5">
                    <q-btn push no-caps outline @click="$refs.topModal.close()">Done</q-btn>
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
                <div class="col-xs-5">
                    <q-btn push no-caps outline @click="$refs.stats.open()">View More Stats</q-btn>
                </div>
            </div>
        </q-modal>
        <q-modal v-if="currentMatch && currentMatch.basic && currentMatch.basic.stats" ref="stats" minimized class="stats">
            <div class="row justify-around">
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
                            {{currentMatch.basic.stats.stats.magicDamageDealt}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Magic Damage Dealt To Champions
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.magicDamageDealtToChampions}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Magic Damage Taken
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.magicalDamageTaken}}
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
                            {{currentMatch.basic.stats.stats.physicalDamageDealt}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Physical Damage Dealt To Champions
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.physicalDamageDealtToChampions}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Physical Damage Taken
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.physicalDamageTaken}}
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
                            {{currentMatch.basic.stats.stats.trueDamageDealt}}
                        </q-item-tile>
                    </q-item-main>
                </div>


                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            True Damage Dealt To Champions
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.trueDamageDealtToChampions}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            True Damage Taken
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.trueDamageTaken}}
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
                            {{currentMatch.basic.stats.stats.totalDamageTaken}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Damage Dealt To Objectives
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.damageDealtToObjectives}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Damage Self Mitigated
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.damageSelfMitigated}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Damage Dealt To Turrets
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.damageDealtToTurrets}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-12 text-center">
                    <hr class="bhr">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Heal Stats
                        </q-item-tile>
                    </q-item-main>
                    <hr class="bhr">
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Total Heal
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.totalHeal}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Total Units Healed
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.totalUnitsHealed}}
                        </q-item-tile>
                    </q-item-main>
                </div>

                <div class="col-xs-12 text-center">
                    <hr class="bhr">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Vision Stats
                        </q-item-tile>
                    </q-item-main>
                    <hr class="bhr">
                </div>

                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Vision Score
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.visionScore}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Wards Placed
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.wardsPlaced}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Wards Killed
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.wardsKilled}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-12 text-center">
                    <hr class="bhr">
                    <q-item-main class="name">
                        <q-item-tile label>
                            First Stats
                        </q-item-tile>
                    </q-item-main>
                    <hr class="bhr">
                </div>

                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            First Blood Kill
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.firstBloodKill}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            First Blood Assist
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.firstBloodAssist}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            First Tower Kill
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.firstTowerKill}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            First Tower Assist
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.firstTowerAssist}}
                        </q-item-tile>
                    </q-item-main>
                </div>


                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            First Inhibitor Kill
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.firstInhibitorKill}}
                        </q-item-tile>
                    </q-item-main>
                </div>

                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            First Inhibitor Assist
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.firstInhibitorAssist}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-12 text-center">
                    <hr class="bhr">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Various Stats
                        </q-item-tile>
                    </q-item-main>
                    <hr class="bhr">
                </div>

                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Champion Level
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.champLevel}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Gold Spent
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.goldSpent}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Largest Critical Strike
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.largestCriticalStrike}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Largest Multi-Kill
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.largestMultiKill}}
                        </q-item-tile>
                    </q-item-main>
                </div>


                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Total Crowd Control Dealt
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.totalTimeCrowdControlDealt}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Total Minions Killed
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.totalMinionsKilled}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Turret Kills
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.turretKills}}
                        </q-item-tile>
                    </q-item-main>
                </div>
                <div class="col-xs-5">
                    <q-item-main class="name">
                        <q-item-tile label>
                            Inhibitor Kills
                        </q-item-tile>
                        <q-item-tile sublabel>
                            {{currentMatch.basic.stats.stats.inhibitorKills}}
                        </q-item-tile>
                    </q-item-main>
                </div>


                <div class="col-xs-8">
                    <q-btn push no-caps outline @click="$refs.stats.close()">Done</q-btn>
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
        QTooltip
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
            QTransition,
            QModal,
            QModalLayout,
            QItemTile,
            QTooltip
        },
        data() {
            return {
                summoner: '',
                time: '',
                show: false,
                url: "https://ddragon.leagueoflegends.com/cdn/8.1.1/img/champion/",
                test: false,
                iconUrl: "http://ddragon.leagueoflegends.com/cdn/8.1.1/img/profileicon/",
                scoreUrl: "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/",
                showTop: false
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
            }


        },
        mounted() {
            this.$store.dispatch('getAllChampionsStatic')
        }
    }
</script>

<style>
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