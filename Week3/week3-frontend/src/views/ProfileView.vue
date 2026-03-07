<template>
    <div style="max-width: 500px; margin: 50px auto;">
    <a-card title="My Account Settings">

        <a-form :model="draftState" layout="vertical" @finish="onSave">
            <a-form-item label="Username" name="username" :rules="[{ required: true }]">
                <a-input v-model:value="draftState.username" />
            </a-form-item>
            <a-form-item label="Email" name="email" :rules="[{ required: true, type:'email' }]">
                <a-input v-model:value="draftState.email" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">Save Changes</a-button>
            </a-form-item>
        </a-form>
    </a-card>
    </div>
</template>

<script setup>
    import { reactive } from 'vue';
    import { useUserStore } from '@/stores/user';
    const userStore = useUserStore();
    // THE PHOTOCOPY: We use the spread operator (...) to pull the current data
    // OUT of Pinia and into a safe, local draft object.
    const draftState = reactive({
        ...userStore.user
    });
    const onSave = async () => {
    // In a real app, you would run a fetch('.../users/me', { method: 'PUT' }) here first!
    // For now, we just pass the completed draft back to Pinia to update globally
        userStore.updateProfile(draftState);
        alert("Profile updated globally!");
    };
</script>
