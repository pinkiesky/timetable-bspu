import * as Koa from 'koa';
import * as Router from 'koa-router';
import { render } from './pug';
import { moment } from './services/moment';
import { LocalScheduleBackend } from './scheduleServer/LocalScheduleBackend';
import { createReadStream } from 'fs';
import { join } from 'path';

const app = new Koa();
const router = new Router();

const backend = new LocalScheduleBackend();

// FIXME
router.get('/style.css', (ctx) => {
  ctx.type = 'text/css';
  ctx.body = createReadStream(join(__dirname, 'styles', 'index.css'), {
    encoding: 'utf-8',
  });
});

router.get('/*', async (ctx) => {
  const from = moment().subtract(3, 'days');
  const to = moment();

  const schedule = await backend.loadSchedule(
    from.toISOString(),
    to.toISOString(),
    '4Z',
  );

  const range = moment.range(from, to);
  const rangeDays = Array.from(range.by('days'));
  // FIXME
  const times = [
    ['8:00', '9:30'],
    ['9:40', '11:10'],
    ['11:20', '12:50'],
    ['13:00', '14:30'],
    ['14:40', '16:10'],
    ['16:20', '17:50'],
    ['18:00', '19:30'],
    ['19:40', '21:10'],
  ];

  ctx.body = render('index', { schedule, rangeDays, times });
});

app.use(router.routes());

app.listen(3333);

console.log('Server running on port 3000');
