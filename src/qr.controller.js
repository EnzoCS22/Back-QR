import { Router } from 'express';
import { getQR } from './qr.service.js';
import { getQR_id } from './qr.service.js';
import { createQr } from './qr.service.js';
import { deleteQr } from './qr.service.js';

const router = Router();

router.get("/codigos", getQR);

router.get("/codigos/:id", getQR_id);

router.post("/codigos", createQr);

router.delete("/codigos/:id", deleteQr); 

export default router;