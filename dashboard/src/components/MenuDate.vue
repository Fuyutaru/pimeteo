<template>
  <div class="container mt-3">
    <h2>History</h2>

    <div class="d-flex flex-column ms-2">
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          v-model="timeRangePicked"
          id="hour"
          value="hour"
        />
        <label class="form-check-label" for="hour"> Last Hour </label>
      </div>

      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          v-model="timeRangePicked"
          id="day"
          value="day"
        />
        <label class="form-check-label" for="day"> Last Day </label>
      </div>

      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          v-model="timeRangePicked"
          id="week"
          value="week"
        />
        <label class="form-check-label" for="week"> Last week </label>
      </div>

      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="radio"
          v-model="timeRangePicked"
          name="exampleRadios"
          id="range"
          value="range"
        />
        <label class="form-check-label" for="range"> Choose timerange </label>
      </div>
    </div>

    <div v-if="timeRangePicked === 'range'">
      <span class="badge text-bg-primary my-2">Date selection</span>

      <div class="input-group input-group-sm mb-5">
        <input type="text" class="form-control" id="cal" />
      </div>
    </div>
  </div>
</template>

<script>
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import localeEn from 'air-datepicker/locale/en'

export default {
  data() {
    return {
      buttonTimerange: false,
      timeRangePicked: '',
      timeRange: { start: null, stop: null },
    }
  },

  methods: {
    helloTimeRange() {
      this.$emit('updateTimeRange', this.timeRange)
    },
    dateToLocalISO(date) {
      return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString()
    },
  },
  watch: {
    timeRangePicked(newVal) {
      if (newVal === 'range') {
        this.$nextTick(() => {
          new AirDatepicker('#cal', {
            range: true,
            position: 'top center',
            timepicker: true,
            locale: localeEn,
            maxDate: new Date(),
            minDate: new Date('2025-02-14'),
            timeFormat: 'HH:mm',
            onSelect: ({ date }) => {
              this.timeRange.start = date[0]?.toISOString()
              this.timeRange.stop = date[1] ? date[1].toISOString() : this.timeRange.start
              this.helloTimeRange()
            },
          })
        })
      } else {
        const hour = 1000 * 60 * 60
        const day = hour * 24
        const week = day * 7
        const today = new Date()

        this.timeRange.stop = 'now'

        if (newVal === 'hour') {
          this.timeRange.start = new Date(today.getTime() - 2 * hour)
        }

        if (newVal === 'day') {
          this.timeRange.start = new Date(today.getTime() - day)
        }

        if (newVal === 'week') {
          this.timeRange.start = new Date(today.getTime() - week)
        }
        this.timeRange.start = this.dateToLocalISO(this.timeRange.start)
        this.helloTimeRange()
      }
    },
  },
}
</script>
