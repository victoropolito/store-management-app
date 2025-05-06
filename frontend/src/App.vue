<template>
  <div>
    <nav>
      <router-link to="/products">Products</router-link> |
      <router-link to="/stock">Stock</router-link> |
      <router-link to="/payables">Payables</router-link> |
      <router-link to="/receivables">Receivables</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  padding: 1rem;
  background-color: #f4f4f4;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #333;
}
</style>
