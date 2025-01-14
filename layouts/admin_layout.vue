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
        <v-list>
          <v-list-item link to="/admin/product">
            <v-list-item-icon>
              <v-icon>mdi-package-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Product</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/admin/category">
            <v-list-item-icon>
              <v-icon>mdi-tag</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Category</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/admin/orders">
            <v-list-item-icon>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/admin/analytics">
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Analytics</v-list-item-title>
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
      <v-footer app color="blue darken-4" dark>
        <v-col class="text-center white--text">© 2025 - My Admin Panel</v-col>
      </v-footer>
    </v-app>
  </v-locale-provider>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(false);

const logout = () => {
  alert("Logged out successfully.");
  // Add logout functionality here
};
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
