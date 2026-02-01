const Koa = require('koa');
const cors = require('@koa/cors'); // Import cors
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
app.use(cors()); // Enable CORS for everyone
app.use(bodyParser());
let articles = [
{ title: 'Hello World', fullText: 'This is my first article from Koa!' },
{ title: 'Vue is cool', fullText: 'We will learn Vue next week.' },
{ title: 'CORS Fixed', fullText: 'Now the browser allows the connection.' }
];
router.get('/api/v1/articles', (ctx) => {
ctx.body = articles;
});
app.use(router.routes());
app.listen(3000);
console.log('Server running on port 3000');