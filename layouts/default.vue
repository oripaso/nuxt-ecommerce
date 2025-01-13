<template>
  <v-locale-provider rtl>
    <v-app>
      <!-- App Bar -->
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>Custom Layout</v-toolbar-title>
      </v-app-bar>

      <!-- Navigation Drawer -->
      <v-navigation-drawer app v-model="drawer" color="grey lighten-4">
        <v-list>
          <v-list-item link to="/home">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/admin">
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>

      <!-- Footer -->
      <v-footer app color="primary" dark>
        <v-col class="text-center white--text">© 2025 - My Nuxt App</v-col>
      </v-footer>
    </v-app>
  </v-locale-provider>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>

<style>
/* Add custom styles if needed */
</style>
