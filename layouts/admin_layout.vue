<template>
  <v-locale-provider rtl>
    <v-app>
      <!-- App Bar -->
      <v-app-bar app color="blue darken-3" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>Admin Panel</v-toolbar-title>
      </v-app-bar>

      <!-- Navigation Drawer -->
      <v-navigation-drawer app v-model="drawer" color="blue-grey lighten-4">
        <v-list :items="menuItems"></v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>

      <!-- Footer -->
      <v-footer app color="blue darken-4" dark>
        <v-col class="text-center white--text">© 2025 - My Admin Panel</v-col>
      </v-footer>
    </v-app>
  </v-locale-provider>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(false);
const menuItems = ref([
  {
    title: "Product",
    value: 1,
    props: {
      prependIcon: "mdi-package-variant",
      href: "/admin/product",
    },
  },
  {
    title: "Category",
    value: 2,
    props: {
      prependIcon: "mdi-tag",
      href: "/admin/category",
    },
  },
  {
    title: "Orders",
    value: 3,
    props: {
      prependIcon: "mdi-cart",
      href: "/admin/orders",
      disabled: true,
    },
  },
  {
    title: "Analytics",
    value: 4,
    props: {
      prependIcon: "mdi-chart-line",
      href: "/admin/analytics",
      disabled: true,
    },
  },
]);

</script>

<style>
/* Add custom styles for admin panel */
.v-toolbar-title {
  font-weight: bold;
  text-transform: uppercase;
}

.v-navigation-drawer {
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.v-avatar img {
  border-radius: 50%;
}
</style>
