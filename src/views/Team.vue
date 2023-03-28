<template>
  <div class="project">
    <h1 class="subheading grey--text">Project</h1>
    <v-container mt-3>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 xl4>
          <v-expansion-panels>
            <v-expansion-panel v-for="project in projects" :key="project.title">
              <v-expansion-panel-header>
                {{ project.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card flat class="text-ms-center ma-2 center">
                  <v-responsive>
                    <img :src="project.img" width="300" height="300px" alt="" />
                  </v-responsive>
                  <v-card-text class="subheading ms-text-center">{{
                    project.title
                  }}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      projects: [
        {
          img: "pexels-designecologist-1287561.jpg",
          title: "ระบบจองร้านเหล้า",
        },
        {
          img: "pexels-eberhard-grossgasteiger-1284296.jpg",
          title: "ระบบจองร้านเหล้า.",
        },
        {
          img: "pexels-efdal-yildiz-917494.jpg",
          title: "ระบบจองร้านเหล้า..",
        },
        {
          img: "pexels-rodnae-productions-8553094.jpg",
          title: "ระบบจองร้านเหล้า...",
        },
        {
          img: "pexels-simon-berger-1323550.jpg",
          title: "ระบบจองร้านเหล้า....",
        },
        {
          img: "pexels-simon-berger-1323550.jpg",
          title: "ระบบจองร้านเหล้า.....",
        },
      ],
    };
  },
};
</script>

<style>
</style>