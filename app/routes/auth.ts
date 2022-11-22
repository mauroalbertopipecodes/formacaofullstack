import express from 'express';
import controller from '../controllers/auth';
const _router = express.Router();
   /**
   * @swagger
   * components:
   *   schemas:
   *     User_Signin:
   *       type: object
   *       required:
   *         - email
   *         - password
   *       properties:
   *         email:
   *           type: string
   *           description: email do utilizador
   *         password:
   *           type: string
   *           description: password do utilizador
   *       example:
   *         email: "SU@email.com"
   *         password: "ere+rwrewrw"
   *     User_Signup:
   *       type: object
   *       required:
   *         - name
   *         - email
   *         - password
   *       properties:
   *         id:
   *           type: integer
   *           description: ID auto-gerado
   *         name:
   *           type: string
   *           description: nome do utilizador
   *         email:
   *           type: string
   *           description: email do utilizador
   *         password:
   *           type: string
   *           description: password do utilizador
   *       example:
   *         name: "Super User"
   *         email: "SU@email.com"
   *         password: "ere+rwrewrw"
   * 
   *
   */
   /**
   * @swagger
   *  tags:
   *    name: User
   *    description: User existentes na aplicação
   */

  /**
   * @swagger
   * /signup:
   *   post:
   *     summary: Create a new user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User_Signup'
   *     responses:
   *       200:
   *         description: User created sucessfully!
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Content cannot be empty
   *       502:
   *         description: Some server error
   */
   _router.post('/signup', controller.signup)

   /**
   * @swagger
   * /signin:
   *   post:
   *     summary: Sign in with a user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User_Signin'
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User_Signup'
   *       400:
   *         description: Incorrect Email or Password!
   *       401:
   *         description: User not found
   */

_router.post('/signin', controller.signin)

export const router = _router;