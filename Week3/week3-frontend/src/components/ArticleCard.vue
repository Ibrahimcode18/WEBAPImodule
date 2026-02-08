<script setup>
    import { ref } from 'vue'
// We define a prop named 'data' that represents one article
    const likes = ref(0)
    defineProps(['data'])
    const emit = defineEmits(['delete-article', 'updateLikes'])
    /// The functions below are now replaced by inline event handlers in the template, but you can still define them here if you prefer that style.
    // The buttons onclick will be onclick="deleteClicked" and onclick="likeClicked" respectively, and the functions will emit events to the parent component (App.vue) with the necessary data (like article ID for deletion).
    // function deleteClicked() {
    //     // Shout "delete-article" to the parent, and pass the ID
    //     emit('delete-article', data.id)
    // }
    // function likeClicked() {
    //     likes.value++;
    //     emit('updateLikes')
    // }
</script>

<template>
    <div class="article-card">
        <h2>{{ data.title }}</h2>
        <p>{{ data.fullText }}</p>
        <button @click="$emit('delete-article', data.id)">Delete</button>
        <button @click="$emit('updateLikes'); likes++">Like {{ likes }}</button>
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