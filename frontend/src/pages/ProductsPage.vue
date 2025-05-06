<template>
  <div>
    <h1>Product List</h1>

    <CreateProductForm />

    <div v-if="loading">Loading products...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price (R$)</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description || '-' }}</td>
            <td>{{ product.price.toFixed(2) }}</td>
            <td>{{ new Date(product.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllProducts } from '../services/product.service.ts';
import type { Product } from '../types/Product';
import CreateProductForm from '../components/CreateProductForm.vue';

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    products.value = await getAllProducts();
  } catch (err: any) {
    error.value = 'Failed to fetch products.';
  } finally {
    loading.value = false;
  }
});
</script>
