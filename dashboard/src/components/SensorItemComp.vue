<template>
  <div class="SensorItem">
    <div class="col d-flex align-items-start border-dark-subtle">
      <div
        class="icon-square bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
      >
        <slot name="icon"></slot>
      </div>
      <div>
        <h3 class="fs-3 text-body-emphasis">
          <slot name="title">Humidity</slot>
        </h3>
      </div>
    </div>
    <div class="card m-2" style="width: 14rem">
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between">
          Pi 28 <span class="badge rounded-pill text-bg-primary">1000 %</span>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          Pi 28 <span class="badge rounded-pill text-bg-primary">1000 %</span>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          Pi 28 <span class="badge rounded-pill text-bg-primary">1000 %</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.icon-square {
  width: 2rem;
  height: 2rem;
  border-radius: 0.75rem;
  background-color: rgb(219 234 254);
}

.SensorItem {
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 275px;
  background-color: rgb(219 234 254);
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.25),
    0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
