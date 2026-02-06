<script setup>
  import { ref, onMounted, computed } from 'vue'   
  const articles = ref([])     // 2. Create a reactive box to hold the list
  const loading = ref(true)
  const searchQuery = ref('')

  onMounted(async () => {     // 3. Fetch data ONLY when the component mounts
    try {
      const response = await fetch('http://localhost:3000/api/v1/articles')
      const data = await response.json()
      articles.value = data // Update the reactive variable
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally{
      loading.value = false
    }
  })

  async function removeArticle(id){
    try{
      const response = await fetch(`http://localhost:3000/api/v1/articles/${id}`, {
        method : 'DELETE',
      })
      if (response.ok){
        console.log(`Article with id ${id} deleted successfully.`)
        articles.value = articles.value.filter(article => article.id !== id)
      } else {
        console.error(`Failed to delete article with id ${id}. Status: ${response.status}`)
      }
    } catch (error){
      console.error("Network issues", error)
    }
  }

const filteredArticles = computed(() => {
  return articles.value.filter(article =>
    article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
 )
})

</script>

<template>
  <h1>Latest Articles</h1>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
  </div>
  <div v-if="loading">
    Loading articles... please wait.
  </div>
  <div v-else-if="articles.length === 0">
    <h1>No articles found. Go write some!</h1>
  </div>
  <div v-else>
    <div v-for="article in filteredArticles" :key="article.id" class="article-card">
      <h2>{{ article.title }}</h2>
      <p>{{ article.fullText }}</p>
      <button @click="removeArticle(article.id)">Delete</button>
    </div>
 </div>
</template>

<style scoped>
  .article-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
  }
</style>