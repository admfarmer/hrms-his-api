import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { SexMoldel } from '../../models/v1/l_sex';

const router: Router = Router();
const sexMoldel = new SexMoldel();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await sexMoldel.listall(db);
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

    let sex_id = req.body.sex_id;
    let sex_code = req.body.sex_code;
    let sex_name = req.body.sex_name;
    let datas: any = {
        sex_code: sex_code,
        sex_name: sex_name
    }
    try {
        let rows: any = await sexMoldel.add(db, datas);
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

    let sex_id = req.body.sex_id;
    let sex_code = req.body.sex_code;
    let sex_name = req.body.sex_name;
    let datas: any = {
        sex_id: sex_id,
        sex_code: sex_code,
        sex_name: sex_name
    }
    try {
        let rows: any = await sexMoldel.update(db, sex_id, datas);
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
    let sex_id = req.body.sex_id;
    try {
        let rows: any = await sexMoldel.del(db, sex_id);
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