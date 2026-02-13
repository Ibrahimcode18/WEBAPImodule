const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const db = require('../helpers/database'); 
// Prefix means all routes here start with /api/v1/articles
const router = new Router({ prefix: '/api/v1/articles' });
// let articles = [
//     { id: 1,title: 'Hello World', fullText: 'This is my first article from Koa!' },
//     { id: 2, title: 'Vue is cool', fullText: 'We will learn Vue next week.' },
//     { id: 3, title: 'Refactored', fullText: 'We moved this to a separate file.' }
// ];


// Routes
router.get('/', getAll);
router.get('/:id', getById)
router.post('/', bodyParser(), createArticle); // We will build this next
router.delete('/:id', (ctx) => {
    const id = parseInt(ctx.params.id);
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) {
        articles.splice(index, 1);
        ctx.status = 204; // No Content
        console.log(`Deleted article with id ${id}`);
    } else {
        ctx.status = 404;
        ctx.body = { message: "Article not found" };
        console.log(`Article with id ${id} not found for deletion`);
    }
});

// Handlers
async function getAll(ctx) {
    const urlquery = ctx.request.query.q;
    if (urlquery) {
        const filtered = articles.filter(article => article.title.toLowerCase().includes(urlquery.toLowerCase()));
        if (filtered.length > 0){
            ctx.body = filtered;
        } else {
            ctx.body = {message: "Title and fullText are required"};
        }
    } else{
        const query = "SELECT * FROM articles";
        const data = await db.run_query(query);
        ctx.body = data;
    }
}

async function createArticle(ctx) {
    const { title, fullText } = ctx.request.body;
    // Simple validation
    if(!title || !fullText) {
        ctx.status = 400;
        ctx.body = { message: "Title and fullText are required" };
        return;
    }
    // let id = articles.length + 1;
    // const newArticle = { id, title, fullText };
    // articles.push(newArticle);
    const query = "INSERT INTO articles SET ?";
    const result = await db.run_query(query, { title, fullText });
    ctx.status = 201; // Created
    ctx.body = { ID: result.insertId, created: true };
}

function getById(ctx){
    const id = parseInt(ctx.params.id);
    const article = articles.find(a => a.id === id);
    if(article) {
        ctx.body = article;
    } else {
        ctx.status = 404;
        ctx.body = { message: "Article not found" };
    }
}

module.exports = router;