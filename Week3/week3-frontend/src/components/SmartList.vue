<script setup>
import { ref } from 'vue'
    // The child owns the data and the logic
    const users = ref([
    { id: 1, name: 'Alice', status: 'Active' },
    { id: 2, name: 'Bob', status: 'Offline' },
    { id: 3, name: 'Charlie', status: 'Banned' }
    ])
</script>
<template>
    <div style="border: 2px solid #1890ff; padding: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0;">System Users</h3>

        <ul style="list-style: none; padding: 0;">
            <li v-for="user in users" :key="user.id" style="margin-bottom: 10px;">

                <slot :person="user">
                    {{ user.name }} ({{ user.status }})
                </slot>

            </li>
        </ul>
    </div>
</template>