<script setup>
    // We declare the events this component is allowed to emit
    const emit = defineEmits(['upvote', 'downvote'])
    function handleUp() {
        // Shout 'upvote' to the parent, and pass the number 1 alongside it
        emit('upvote', 1)
    }
</script>
<template>
    <div style="border: 1px solid blue; padding: 10px; display: inline-block;">
    <p>I am the child component.</p>
    <button @click="handleUp">Vote Up</button>
    <button @click="$emit('downvote', 1)">Vote Down</button>
    </div>
</template>