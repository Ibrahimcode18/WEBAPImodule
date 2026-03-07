<script setup>
    import { useUserStore } from '@/stores/user' // Import Store
    const userStore = useUserStore()
</script>

<template>
    <a-card title="Your Profile" style="max-width: 400px; margin: 50px auto;">
        <p><strong>Username:</strong> {{ userStore.user.username }}</p>
        <p><strong>Email:</strong> {{ userStore.user.email }}</p>
    </a-card>
</template>