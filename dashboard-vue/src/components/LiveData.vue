<script>
export default {
  data() {
    return {
        dataLive: {},
    }
  },
  methods: {
    hello(){
        console.log("hello")
    },
    read(){

        fetch("./assets/quiz.json")
        .then(response => response.json())
        .then(json => console.log(json));

        }
    }
}


</script>

<template>
    <ul class="list-group">
        <li class="list-group-item" @click="read">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
    </ul>
</template>

