import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { PositionMoldel } from '../../models/v1/position';

const router: Router = Router();
const positionMoldel = new PositionMoldel();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await positionMoldel.listall(db);
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

    let id_pos = req.body.id_pos;
    let pos_name = req.body.pos_name;
    let datas: any = {
        pos_name: pos_name
    }
    try {
        let rows: any = await positionMoldel.add(db, datas);
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

    let id_pos = req.body.id_pos;
    let pos_name = req.body.pos_name;
    let datas: any = {
        id_pos: id_pos,
        pos_name: pos_name
    }
    try {
        let rows: any = await positionMoldel.update(db, id_pos, datas);
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
    let PosId = req.body.PosId;
    try {
        let rows: any = await positionMoldel.del(db, PosId);
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