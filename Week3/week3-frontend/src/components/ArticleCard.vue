<script setup>
// We define a prop named 'data' that represents one article
    defineProps(['data'])
    const emit = defineEmits(['delete-article'])
    function deleteClicked() {
        // Shout "delete-article" to the parent, and pass the ID
        emit('delete-article', data.id)
    }
</script>

<template>
    <div class="article-card">
        <h2>{{ data.title }}</h2>
        <p>{{ data.fullText }}</p>
        <button @click="$emit('delete-article', data.id)">Delete</button>
    </div>
</template>

<style scoped>
 /* Move the CSS from App.vue to here */
 .article-card {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px 0;
        border-radius: 8px;
        background-color: #f9f9f9;
        }
</style>