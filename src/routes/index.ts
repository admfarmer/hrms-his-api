import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { BotlineModel } from '../models/botline'

const botlineModel = new BotlineModel();
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.post('/botline', async (req: Request, res: Response) => {
    var message = req.body.message;
    try {
        let lineNotify: any = await botlineModel.mophNotify(message, 'TSRisk-Manager');
        console.log(lineNotify);
        res.send({ ok: true, message: 'ส่งข้อความสำเร็จ', code: HttpStatus.OK });
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  });

export default router;