import { FastifyInstance } from 'fastify';
import { voting } from '../../utils/voting-pub-sub';
import { z } from 'zod';

export async function PollResults(app: FastifyInstance) {
    app.get('/poll/:pollId/results', { websocket: true }, (connection, request) => {
        const getPollParams = z.object({
            pollId: z.string().uuid(),
        });

        const { pollId } = getPollParams.parse(request.params);

        voting.subscribe(pollId, (message) => {
            connection.socket.send(JSON.stringify(message));
        });
    });
}
