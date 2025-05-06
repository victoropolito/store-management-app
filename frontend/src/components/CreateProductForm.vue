<template>
  <form @submit.prevent="submitForm">
    <h2>Create Product</h2>

    <label>
      Name:
      <input v-model="name" required />
    </label>

    <label>
      Description:
      <input v-model="description" />
    </label>

    <label>
      Price:
      <input type="number" v-model.number="price" required min="0" step="0.01" />
    </label>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Creating...' : 'Create' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createProduct } from '../services/product.service';
import { useRouter } from 'vue-router';

const name = ref('');
const description = ref('');
const price = ref(0);
const loading = ref(false);
const error = ref<string | null>(null);

const router = useRouter();

const submitForm = async () => {
  try {
    loading.value = true;
    await createProduct({ name: name.value, description: description.value, price: price.value });
    router.go(0);
  } catch (err) {
    error.value = 'Failed to create product.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin-bottom: 2rem;
}

.error {
  color: red;
}
</style>
