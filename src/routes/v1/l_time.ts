import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { TimeMoldel } from '../../models/v1/l_time';

const router: Router = Router();
const timeMoldel = new TimeMoldel();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await timeMoldel.listall(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.post('/', async (req: Request, res: Response, next) => {
    let db = req.db;

    let time_id = req.body.time_id;
    let time_name = req.body.time_name;
    let datas: any = {
        time_name: time_name
    }
    try {
        let rows: any = await timeMoldel.add(db, datas);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
})

router.put('/', async (req: Request, res: Response, next) => {
    let db = req.db;

    let time_id = req.body.time_id;
    let time_name = req.body.time_name;
    let datas: any = {
        time_id: time_id,
        time_name: time_name
    }
    try {
        let rows: any = await timeMoldel.update(db, time_id, datas);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
})

router.post('/del', async (req: Request, res: Response, next) => {
    let db = req.db;
    let time_id = req.body.time_id;
    try {
        let rows: any = await timeMoldel.del(db, time_id);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
})
export default router;