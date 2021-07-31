<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container-md">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1050"
        img-height="480"
      >
      <b-carousel-slide
        img-src="https://images.unsplash.com/photo-1562552052-dbdd31c06339?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://images.unsplash.com/photo-1530549387789-4c1017266635?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://images.unsplash.com/photo-1489824740691-7a25f94fc85a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fHRlbm5pc3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://images.unsplash.com/photo-1609869496575-c9c35de76498?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGZvb3RiYWxsfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      ></b-carousel-slide>
      </b-carousel>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


