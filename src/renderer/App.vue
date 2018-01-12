<template>
    <div id="app">
        <!--<router-view></router-view>-->
        <edit-page></edit-page>
    </div>
</template>

<script>
  import EditPage from './view/EditPage'
  export default {
    name: 'easy-config',
    components: {
      EditPage
    }
  }
</script>

<style>
    /* CSS */
    html {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
    }
</style>
