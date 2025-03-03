<template>
  <div class="SensorItem">
    <div class="col d-flex align-items-start border-dark-subtle">
      <div
        class="icon-square bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
      >
        <slot name="icon"></slot>
      </div>
      <div>
        <h3 class="fs-3 text-body-emphasis"><slot name="title"></slot></h3>
      </div>
    </div>
    <div>
      <canvas :id="sensorData.name"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  props: {
    sensorData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.drawChart()
 
  },
  methods: {
    drawChart() {
      const ctx = document.getElementById(this.sensorData.name)
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.sensorData.dates,
          datasets: [
            {
              label: this.sensorData.name,
              data: this.sensorData.val,
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
                text: `${this.sensorData.unit}`,
              },
              beginAtZero: false,
            },
          },
        },
      })
    },
    getTimeLabel() {
      return this.sensorData.dates.map((e) =>
        new Date(e).toLocaleTimeString('fr-FR', { timeStyle: 'short' }),
      )
    },
  },
}
</script>

<style scoped>
.icon-square {
  width: 2rem;
  height: 2rem;
  border-radius: 0.75rem;
  background-color: rgb(219 234 254);
}

.SensorItem {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
  background-color: rgb(219 234 254);
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.25),
    0 1px 2px rgba(0, 0, 0, 0.1);
  width: 440px;
}

#lineChart {
  flex: 1 0 400px;
}
</style>
