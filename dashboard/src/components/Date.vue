<template>
  <div id="cal"></div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import localeEn from 'air-datepicker/locale/en'

export default {
  name: 'CalendarComponent',
  data() {
    return {
      selectedDate: null,
    }
  },
  mounted() {
    new AirDatepicker('#cal', {
      range: true, // Enable range selection
      timepicker: true,
      locale: localeEn,
      timeFormat: 'HH:mm AA',
      onSelect: ({ date, formattedDate, datepicker }) => {
        console.log(date[0].toISOString())
        console.log(formattedDate)
      },
    })
  },
}
</script>
