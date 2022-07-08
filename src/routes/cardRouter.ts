import { Router } from 'express';

const cardRouter = Router();

cardRouter.post('/card'); // create a new card
cardRouter.post('/card/activate'); // activate a card
cardRouter.get('/cards/:id'); // get cards of a user
cardRouter.get('/card/:id'); // get balance and transactions of a card
cardRouter.put('/card/block'); // block a card
cardRouter.put('/card/unblock'); // unblock a card

export default cardRouter;
