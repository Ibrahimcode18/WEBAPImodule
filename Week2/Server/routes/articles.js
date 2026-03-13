const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const db = require('../helpers/database'); 
const auth = require('../controllers/auth');

// Prefix means all routes here start with /api/v1/articles
const router = new Router({ prefix: '/api/v1/articles' });

// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', auth, bodyParser(), createArticle); // We will build this next
router.put('/:id', auth, bodyParser(), updateArticle);
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
    const page = parseInt(ctx.request.query.page);
    const limit = parseInt(ctx.request.query.limit);
    const offset = (page - 1) * limit;
    if (urlquery) {
        // const filtered = articles.filter(article => article.title.toLowerCase().includes(urlquery.toLowerCase()));
        const query = "SELECT * FROM articles WHERE title LIKE ?";
        const data = await db.run_query(query, [`%${urlquery}%`]);
        if (data.length){
            ctx.body = data;
        } else {
            ctx.body = {message: "No articles found matching the query"};
        }
    } else if (page && limit) {
        const query = "SELECT * FROM articles LIMIT ? OFFSET ?";
        const data = await db.run_query(query, [limit, offset]);
        ctx.body = data;
    } else {
        const query = "SELECT * FROM articles";
        const data = await db.run_query(query, []);
        ctx.body = data;
    }
}

async function createArticle(ctx) {
    const { title, allText } = ctx.request.body;
    // Simple validation
    if(!title || !allText) {
        ctx.status = 400;
        ctx.body = { message: "Title and fullText are required" };
        return;
    }
   
    const query = "INSERT INTO articles (title, allText) VALUES (?, ?)";
    const result = await db.run_query(query, [title, allText]);
    ctx.status = 201; // Created
    ctx.body = { ID: result.insertId, created: true };
}

async function getById(ctx){
    const id = parseInt(ctx.params.id);
    const query = "SELECT * FROM articles WHERE id = ?";
    const data = await db.run_query(query, [id]);
    if(data.length) {
        ctx.body = data;
    } else {
        ctx.status = 404;
        ctx.body = { message: "Article not found" };
    }
}

async function updateArticle(ctx) {
    const id = ctx.params.id;
    let result = await articles.getById(id); // Fetch the existing article
    if (result.length) {
        let article = result[0];

        // CHECK PERMISSION
        // ctx.state.user contains the logged-in user (thanks to Passport)
        const permission = can.update(ctx.state.user, article);

        if (!permission.granted) {
            ctx.status = 403; // Forbidden
            ctx.body = { error: "You do not own this article" };
        } else {
            // PROCEED
            const body = ctx.request.body;
            // ... existing update logic ...
            // IMPORTANT: Don't let them change the authorID!
            const { ID, authorID, ...updateData } = body;
            Object.assign(article, updateData);

            const updateResult = await articles.update(article);
            if (updateResult.affectedRows) {
                ctx.body = { ID: id, updated: true, link: ctx.request.path };
            }
        }
    }
}
module.exports = router;