<template>
    <div class="SensorItem" @click="drawChart">
        <div class="col d-flex align-items-start border-dark-subtle ">
            <div class="icon-square bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                <slot name="icon"></slot>
            </div>
            <div>
                <h3 class="fs-3 text-body-emphasis">
                    <slot name="title"></slot> Humidity
                </h3>
            </div>
        </div>
        <div>
            <canvas id="lineChart"></canvas>
        </div>
    </div>

</template>

<script>
import Chart from 'chart.js/auto'

export default {
    data() {
        return {
            dataHistory : {},
            
        }
    },
    mounted() {
        fetch("./now.json")
        .then(response => response.json())
        .then(json => {
            this.dataHistory=json.data;
        });
        
    },
    methods: {
        hello() {
            console.log("hello");
        },
        drawChart() {
            const ctx = document.getElementById('lineChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.getTimeLabel(),
                    datasets: [
                    {
                        label: 'Temperature',
                        data: this.getSensorData('temperature'),
                        borderWidth: 1,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                    },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            title: {
                                display: true,
                                align: 'center',
                                text: 'en C'
                            },
                            beginAtZero: false
                        }
                    }
                }
            });
        },
        getSensorData(sensor) {
            return Object.values(this.dataHistory).map( e => e[sensor]);
        },
        getTimeLabel() {
            return Object.keys(this.dataHistory).map( e => new Date(e).toLocaleTimeString('fr-FR', {timeStyle: 'short'}));
        }
    }
}
</script>

<style scoped>
    .icon-square {
    width: 2rem;
    height: 2rem;
    border-radius: .75rem;
    background-color: rgb(219 234 254);
    }

    .SensorItem {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 15px;
        background-color: rgb(219 234 254);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1);
        width: 600px;
    }

    #lineChart {
        flex: 1 0 500px;
    }
</style>