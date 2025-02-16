<script>
import HeaderApp from '@/components/HeaderApp.vue'
import MenuApp from '@/components/MenuApp.vue'
import DataLive from '@/components/DataLive.vue'

export default {
  components: {
    HeaderApp,
    MenuApp,
    DataLive,
  },
  data() {
    return {
      sensorList: [],
    }
  },
  methods: {
    maj_sensor(newList) {
      this.sensorList = newList
      console.log(this.sensorList)
    },
  },
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <HeaderApp />
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <MenuApp @update="maj_sensor" />
            </div>
            <div class="col-10">
                <DataLive />
            </div>
        </div>
    </div>
</template>
