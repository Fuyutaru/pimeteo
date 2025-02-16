<template>
    <div class="SensorItem">
        <div class="col d-flex align-items-start border-bottom border-dark-subtle mb-4">
            <div class="icon-square bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                <img alt="Vue logo" class="icon-square" src="@/assets/temperature.png"/>
            </div>
            <div>
                <h3 class="fs-3 text-body-emphasis">Wind Speed</h3>
            </div>
        </div>
        <div>
            <p class="text-center">10 km/h</p>
        </div>

    </div>

        
</template>

<style scoped>

.icon-square {
width: 3rem;
height: 3rem;
border-radius: .75rem;
background-color: rgb(219 234 254);
}

.SensorItem {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    background-color: rgb(219 234 254);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1);
}

</style>