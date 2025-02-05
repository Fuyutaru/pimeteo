<template>
        <nav>
        <ul>
            <li>Logo</li>
            <li>Home</li>
            <li>Products</li>
            <li>Services</li>
        </ul>
        <form>
            <input type="text">
            <button>Go</button>
        </form>

    </nav>
</template>

<style scoped>
nav {
    background: lightsteelblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
ul {
    padding: 0;
    display: flex;
}
li {
    margin: 10px;
    list-style-type: none;
}
form {
    margin-right: 10px;
}
</style>