<script>
import Chart from 'chart.js/auto'

export default {
  data() {
    return {
      url_bitcoin: 'https://api.coincap.io/v2/assets/bitcoin/history?interval=d1',
      url_usd:
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
    }
  },
  mounted() {
    this.fetchDataAndRenderChart()
  },
  methods: {
    async fetchDataAndRenderChart() {
      try {
        let [bitcoinData, usdToEurRate] = await Promise.all([
          fetch(this.url_bitcoin)
            .then((result) => result.json())
            .then((data) => ({
              valeurs: data.data.map((val) => parseFloat(val.priceUsd)),
              dates: data.data.map((val) => new Date(val.date).toLocaleDateString()),
            })),
          fetch(this.url_usd)
            .then((result) => result.json())
            .then((data) => data.usd.eur),
        ])

        const ctx = document.getElementById('myChart').getContext('2d')
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: bitcoinData.dates,
            datasets: [
              {
                label: 'Bitcoin Price in EUR',
                data: bitcoinData.valeurs.map((x) => x * usdToEurRate),
                borderWidth: 1,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        })
        console.error(error)
      } catch (error) {
      }
    },
  },
}
</script>

<template>
  <h1>Bitcoin</h1>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<style scoped></style>
