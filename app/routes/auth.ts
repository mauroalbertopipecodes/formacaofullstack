import express from 'express';
import controller from '../controllers/auth';
const _router = express.Router();

_router.post('/signup', controller.signup)
_router.post('/signin', controller.signin)

export const router = _router;