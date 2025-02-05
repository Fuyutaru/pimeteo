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
        fetch("./quiz.json")
        .then(response => response.json())
        .then(json => console.log(json));
        }
    }
}


</script>

<template>
    <!-- <h1>Comment récupérer une data qui est dans un autre component</h1>
    <h1>Comment load un json local file</h1> -->
    <ul class="list-group">
        <li class="list-group-item" @click="read">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
    </ul>
</template>

