import * as Koa from 'koa';
import * as Router from 'koa-router';
import { render } from './pug';

const app = new Koa();
const router = new Router();

router.get('/*', (ctx) => {
  ctx.body = render('index');
});

app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');
