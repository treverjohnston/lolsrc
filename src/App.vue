<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
  /*
   * Root component
   */
  export default {
  }
</script>

<style>
  .swal-modal {
    background-color: rgba(0, 0, 0, 0.767);

  }

  .swal-button {
    background-color: rgb(77, 75, 75);
    font-family: 'Bellefair', serif;

  }

  .swal-title {
    color: white;
    font-family: 'Bellefair', serif;

  }

  .q-btn {
    width: 100%;
  }

  .done {
    background-color: rgb(77, 75, 75);
  }

  .modal-content {
    font-family: 'Bellefair', serif;
    background-color: rgba(0, 0, 0, .95);
    color: white;
    padding: 0rem 0 1rem 1rem;
  }

  .q-input-target {
    color: white;
  }

  .q-if:before {
    color: white;
  }

  .q-item {
    padding: 0 0 1rem 0;
  }

  #q-app {
    font-family: 'Bellefair', serif;
    background-image: url("~statics/dark-triangles.png");
  }
</style>