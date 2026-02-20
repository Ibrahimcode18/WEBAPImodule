<script setup>
import { Card } from 'ant-design-vue';
import { LikeOutlined, MessageOutlined, LikeFilled } from '@ant-design/icons-vue';
import { ref } from 'vue'

    const liked = ref(false);
// Define what data this component EXPECTS to receive
    defineProps({
    title: String,
    summary: String,
    imageURL: String // In JS, props are optional by default unless you specify { required: true
    })

    function toggleLike() {
        liked.value = !liked.value
    }

</script>
<template>
    <a-card hoverable style="width: 300px">
        <template #cover>
            <img :alt="title" :src="imageURL || 'https://picsum.photos/300/200'" />
        </template>
        <template #actions>
            <div @click="toggleLike">
                <like-filled v-if="liked" key="like" />
                <like-outlined v-else key="liked" />
            </div>
            
            <message-outlined key="message" />
        </template>
        <a-card-meta :title="title">
            <template #description>
                {{ summary }}
            </template>
        </a-card-meta>
    </a-card>
</template>