<template>
  <v-app >
        <v-container fluid>
            <!-- breadcrumbs -->
            <v-breadcrumbs :items="breadcrumbItems" class="dark--text">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
            </v-breadcrumbs>
            <!-- breadcrumbs End-->

            <!-- Cards -->
            <v-row dense>
              <v-col>
                <v-list dense>
                  <v-list-item>
                      <v-list-item-action>
                          <v-switch v-model="theme" color="dark"></v-switch>
                      </v-list-item-action>
                      <v-list-item-content>
                          <v-list-item-title class="dark--text">Theme Switch</v-list-item-title>
                      </v-list-item-content>
                  </v-list-item>
                  
                </v-list>
              </v-col>
            </v-row>
            <!-- Cards Ends-->
            <br>
        </v-container>
    </v-app>
</template>

<script>
export default {
  data(){
    return{
      theme: true,
      breadcrumbItems: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/adminportal',
        },
        {
          text: 'Settings',
          disabled: true,
        },
      ],
    }
  },
  mounted(){
    document.title = 'Techminate | Settings'
    this.$vuetify.theme.dark = true;
  },
  watch:{
    theme: function(old, newVal){
      this.$vuetify.theme.dark = old;
    }
  },
}
</script>

<style>

</style>