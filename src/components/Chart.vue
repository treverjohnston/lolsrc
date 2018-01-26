
<script>
    import { Line, mixins } from 'vue-chartjs'
    const { reactiveProp } = mixins
    export default {
        name: 'chart',
        data() {
            return {}
        },
        mixins: [reactiveProp],
        extends: Line,
        props: ['options'],
        mounted() {
            this.renderChart(this.chartData, this.options)
            // Overwriting base render method with actual data.
            // for(stat in you.topStats[damage]){
            //     this.renderChart({
            //         labels: Object.keys(stat),
            //         datasets:[
            //             {
            //                 label: 'Damage',
            //                 backgroundColor: '#f87979',
            //                 data: stat
            //             }

            //         ]
            //     })
            // }
            // this.renderChart({
            //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            //     datasets: [
            //         {
            //             label: 'GitHub Commits',
            //             backgroundColor: '#f87979',
            //             data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            //         }
            //     ]
            // })
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