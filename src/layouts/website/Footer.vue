<template>
    <div>
        <v-footer color="primary" class="hidden-sm-and-down py-4 white--text" >
            <div class="container">
                <v-row
                justify="center"
                no-gutters
                >
                <v-btn
                    v-for="link in links"
                    :key="link"
                    color="white"
                    text
                    rounded
                    class="my-2"
                >
                    {{ link }}
                </v-btn>
                </v-row>
            </div>
        </v-footer>
        <div class="primary darken-1 py-4 text-center white--text">
            <span>Copyright © Techminate {{ new Date().getFullYear() }}</span>
        </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Contact Us',
      ],
    }),
  }
</script>

<style>

</style>