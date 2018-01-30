
<script>
    import { Bar, mixins } from 'vue-chartjs'
    const { reactiveProp } = mixins
    export default {
        name: 'chart',
        data() {
            return {}
        },
        mixins: [reactiveProp],
        extends: Bar,
        props: ['options'],
        mounted() {
            this.renderChart(this.chartData, this.options)
        }
    }
</script>

<style>
</style>