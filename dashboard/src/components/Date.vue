<template>
  <input id="cal"></input>
</template>

<script>
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
      maxDate: new Date(),
      minDate: new Date('2025-02-14'),
      timeFormat: 'HH:mm AA',
      onSelect: ({ date, formattedDate }) => {
        console.log(date[0]?.toISOString())
        console.log(formattedDate)
      },
    })
  },
}
</script>
