import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { AffectedMoldel } from '../../models/v1/l_affected';

const router: Router = Router();
const affectedMoldel = new AffectedMoldel();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await affectedMoldel.listall(db);
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

    let affected_id = req.body.affected_id;
    let affected_code = req.body.affected_code;
    let affected_name = req.body.affected_name;
    let datas: any = {
        affected_code: affected_code,
        affected_name: affected_name
    }
    try {
        let rows: any = await affectedMoldel.add(db, datas);
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

    let affected_id = req.body.affected_id;
    let affected_code = req.body.affected_code;
    let affected_name = req.body.affected_name;
    let datas: any = {
        affected_id: affected_id,
        affected_code: affected_code,
        affected_name: affected_name
    }
    try {
        let rows: any = await affectedMoldel.update(db, affected_id, datas);
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
    let affected_id = req.body.affected_id;
    try {
        let rows: any = await affectedMoldel.del(db, affected_id);
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