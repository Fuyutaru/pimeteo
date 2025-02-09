<script>
export default {
  data() {
    return {
        dataLive: {},
    }
  },
  mounted(){
    fetch("./live.json")
        .then(response => response.json())
        .then(json => this.dataLive=json);
  },
  
  methods: {
    hello(){
        console.log(this.dataLive.data.date);
    },
    read(){

    }
}}


</script>

<template>
    <ul class="list-group">
        <li class="list-group-item" @click="hello">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
    </ul>
</template>