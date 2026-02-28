<script setup>
    import { ref, computed, watch } from 'vue'
    import VotingButton from '../components/VotingButton.vue'
    const rawText = ref('')
    // Computed properties automatically update when 'rawText' changes
    const characterCount = computed(() => {
        return rawText.value.length
    })
    const reversedText = computed(() => {
        return rawText.value.split('').reverse().join('')
    })
    const isTooLong = computed(() => {
        return rawText.value.length > 50
    })

    const note = ref('')
    const saveStatus = ref('Waiting for input...')
    let timeoutId = null
    // Watch the 'note' variable
    watch(note, (newValue, oldValue) => {
        saveStatus.value = 'Typing...'

        // Clear the previous timer if they are still typing
        if (timeoutId) clearTimeout(timeoutId)

        // Set a new timer. If they stop typing for 1 second, "save" it.
        timeoutId = setTimeout(() => {  
            saveStatus.value = 'Saved securely to cloud!'
            console.log('Sending to API:', newValue) // Simulate API call
        }, 1000)    
    })

    const totalScore = ref(0)
    // These functions handle the shouts from the child
    function addScore(amount) {
        totalScore.value += amount
    }
    function subScore(amount) {
        totalScore.value -= amount
    }

    const isCompleted = ref(false)
    const hasError = ref(false)
</script>
<template>
    <div style="padding: 50px; max-width: 600px;">
        <h2>The Text Analyser</h2>

        <textarea
            v-model="rawText"
            placeholder="Type something here..."
            rows="4"
            style="width: 100%; margin-bottom: 20px;"
        ></textarea>
        <div style="background: #f0f2f5; padding: 20px; border-radius: 8px;">
            <p><strong>Length:</strong> {{ characterCount }} characters</p>
            <p><strong>Reversed:</strong> {{ reversedText }}</p>

            <p v-if="isTooLong" style="color: red; font-weight: bold;">
            Warning: Text exceeds 50 characters!
            </p>
        </div>
    </div>
    <hr>
    <div style="padding: 50px;">
        <h2>Auto-Save Notepad</h2>
        <p>Status: <strong>{{ saveStatus }}</strong></p>

        <input
        v-model="note"
        type="text"
        style="width: 300px; padding: 8px;"
        />
    </div>
    <hr>
    <div style="padding: 50px;">
        <h2>Parent Component</h2>
        <h1>Total Score: {{ totalScore }}</h1>

        <VotingButton @upvote="addScore" @downvote="subScore" />
    </div>
    <hr>
    <div style="padding: 50px;">
        <h2>Task Status Box</h2>
        <label>
            <input type="checkbox" v-model="isCompleted"> Mark Complete
        </label>
        <br>
        <label>
            <input type="checkbox" v-model="hasError"> Simulate Error
        </label>
        <div class="task-box"
            :class="{ 'success': isCompleted, 'danger': hasError }"
            >
            <p v-if="hasError">Error connecting to server!</p>
            <p v-else-if="isCompleted">Task finished successfully.</p>
            <p v-else>Task is pending...</p>
        </div>
    </div>
</template>

<style scoped>
.task-box {
 margin-top: 20px;
 padding: 20px;
 border: 2px solid #ccc;
 background: #f9f9f9;
 transition: all 0.3s ease;
}
/* These classes are applied dynamically */
.success {
 border-color: #52c41a;
 background: #f6ffed;
 color: #52c41a;
}
.danger {
 border-color: #ff4d4f;
 background: #fff2f0;
 color: #ff4d4f;
}
</style>
