<template>
  <div class="home">
     <HelloWorld msg="Bienvenid@s"/>
     
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style>
div{
 font-family:Arial, Helvetica, sans-serif;
}

</style>