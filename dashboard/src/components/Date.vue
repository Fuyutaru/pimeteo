<template>
    <div id="cal"> </div>
  </template>
  
<script>
import { defineComponent, onMounted } from 'vue';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';



export default {
    name: 'CalendarComponent',
    data() {
        return {
        selectedDate: null
        };
    },
    mounted() {
        new AirDatepicker('#cal', {
        timepicker: true,
        locale: localeEn,
        onSelect: ({ date }) => {
            this.selectedDate = date;
            console.log('Selected Date:', this.selectedDate);
        }
        });
    } 
};
</script>
  