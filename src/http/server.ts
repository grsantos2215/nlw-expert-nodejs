import fastify from 'fastify';
import cookie from '@fastify/cookie';
import websocket from '@fastify/websocket';
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';
import { PollResults } from './ws/poll-results';

const app = fastify();

app.register(cookie, {
    secret: 'polls-app-nlw',
    hook: 'onRequest',
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

app.register(PollResults);

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running on http://localhost:3333');
});
