<script setup>
  import { ref, onMounted, computed, watch } from 'vue'
  import ArticleCard from './components/ArticleCard.vue'   
  import PostCard from './components/PostCard.vue'
  const articles = ref([])     // 2. Create a reactive box to hold the list
  const loading = ref(true)
  const searchQuery = ref('')
  const totalLikes = ref(0)
  

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

  
  watch(searchQuery, async (newValue, oldValue) => {
    console.log('User is typing...', newValue)
    const response = await fetch(`http://localhost:3000/api/v1/articles?q=${newValue}`)
    const data = await response.json()
    articles.value = data
  })

  function updateLikes(){
    totalLikes.value++;
  }


</script>

<template>
  <h1>Latest Articles</h1>
  <p>Total Likes: {{ totalLikes }}</p>
  <div>
    <input v-model="searchQuery" placeholder="Search articles (Server side demo)..." />
  </div>
  <div v-if="loading">
    Loading articles... please wait.
  </div>
  <div v-else-if="articles.length === 0">
    <h1>No articles found. Go write some!</h1>
  </div>
  <div v-else>
    <ArticleCard 
      v-for="article in articles" 
      :key="article.id" 
      :data="article" 
      @delete-article="removeArticle"
      @updateLikes="updateLikes" 
    />
 </div>
 <hr />
  <div style="padding: 50px;">
    <h1>Design System Test</h1>
    <a-button type="primary">My First Ant Button</a-button>
    <br /><br />
    <a-button type="dashed" danger>Dangerous Button</a-button>
  </div>
  <PostCard />
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