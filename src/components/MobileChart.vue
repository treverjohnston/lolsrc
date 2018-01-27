
<script>
        import { HorizontalBar, mixins } from 'vue-chartjs'
        const { reactiveProp } = mixins
        export default {
            name: 'mobilechart',
            data() {
                return {}
            },
            mixins: [reactiveProp],
            extends: HorizontalBar,
            props: ['options'],
            mounted() {
                this.renderChart(this.chartData, this.options)
            },
            computed:{
                playing() {
                    return this.$store.state.playing
                },
                top() {
                    return this.$store.state.top
                },
                summoners() {
                    return this.$store.state.summoner
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
            }
        }
    </script>
    
    <style>
    </style>