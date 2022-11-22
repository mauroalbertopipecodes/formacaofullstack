import express from 'express';
import controller from '../controllers/transaction';
const _router = express.Router();
   /**
   * @swagger
   * components:
   *   schemas:
   *     Transaction_Created:
   *       type: object
   *       required:
   *         - description
   *         - movementType
   *         - transationType
   *         - value
   *       properties:
   *         description:
   *           type: string
   *           description: Description of the transaction
   *         movementType:
   *           type: number
   *           description: Movement type (Entrance, Exit)
   *         transationType:
   *           type: string
   *           description: Type of Transaction
   *         value:
   *           type: number
   *           description: Value of transaction
   *       example:
   *         description: "Gasolina 1.87/l"
   *         movementType: 1
   *         transationType: "Gasolina"   
   *         value: 50
   *
   */
   /**
   * @swagger
   *  tags:
   *    name: Transaction
   *    description: Transactions created from the user
   */
  /**
   * @swagger
   * /transaction:
   *   post:
   *     summary: Create a new transaction
   *     tags: [Transaction]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Transaction_Created'
   *     responses:
   *       200:
   *         description: Transaction created sucessfully!
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Transaction'
   *       400:
   *         description: Content cannot be empty
   *       502:
   *         description: Some server error
   */
   _router.post('/transaction', controller.createTransaction)

export const router = _router;