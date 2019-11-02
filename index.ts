import * as express from 'express';
import * as cors from 'cors';

import { postsRouter } from './routes';

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/posts', postsRouter);

server.listen(5000, () => console.log('listening on port 5000'));
