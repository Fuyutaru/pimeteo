<script>
import MenuApp from '@/components/MenuApp.vue'
import DataLive from '@/components/DataLive.vue'

export default {
  components: {
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
    <MenuApp @update="maj_sensor" class="menu" />
    <DataLive />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.menu {
  grid-column: 1;
  display: flex;
  flex-direction: column;
}
</style>
