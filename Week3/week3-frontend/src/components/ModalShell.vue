<script setup>
    import { defineProps, defineEmits } from 'vue'
    defineProps({
        isOpen: Boolean
    })
    defineEmits(['close'])
</script>
<template>
    <div v-if="isOpen" class="modal-backdrop">
        <div class="modal-content">
            <header>
                <slot name="header">Default Header</slot>
            </header>

            <main>
                <slot name="main">Default body text goes here.</slot>
            </main>

            <footer>
                <slot name="footer">
                    <button @click="$emit('close')">Close</button>
                </slot>
            </footer>
        </div>
    </div>
</template>
<style scoped>
    .modal-backdrop {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex; align-items: center; justify-content: center;
    }
    .modal-content {
        background: white; padding: 20px; border-radius: 8px;
        min-width: 300px;
    }
    header { font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ccc; }
    footer { margin-top: 15px; border-top: 1px solid #ccc; padding-top: 10px; text-align: right; }
</style>
