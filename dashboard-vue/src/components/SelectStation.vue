<script>
export default {
  data() {
    return {
      selected: ''
    }
  }
}
</script>


<template>
    <select class="form-select form-select-lg mb-3" aria-label="Large select example" v-model="selected">
        <option disabled value="">Please select a station</option>
        <option>piensg027</option>
        <option>piensg028</option>
        <option>piensg030</option>
        <option>piensg031</option>
        <option>piensg032</option>
    </select>
    <p class="m-3">Selected: {{ selected }}</p>
</template>

