<script>
export default {
  data() {
    return {
      selected: '',
      dataLive: {}
    }
  },
  mounted(){
    fetch("./live.json")
        .then(response => response.json())
        .then(json => this.dataLive=json);
  },
  
  methods: {
    hello(){
        console.log(this.dataLive.data);
    },
    read(){

    }
}
}
</script>


<template>
    <select class="form-select form-select-lg mb-3" aria-label="Large select example" v-model="selected" @click="hello">
        <option disabled value="">Please select a station</option>
        <option>piensg027</option>
        <option>piensg028</option>
        <option>piensg030</option>
        <option>piensg031</option>
        <option>piensg032</option>
    </select>
    <p class="m-3">Selected: {{ selected }}</p>

    <ul class="list-group m-3 p-3">
        <li class="list-group-item">ID station : {{dataLive.id}}</li>
        <li class="list-group-item">Date : {{dataLive.data?.date}}</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
    </ul>
</template>

