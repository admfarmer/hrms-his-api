import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { SideModels } from '../../models/v1/side';

const router: Router = Router();
const sideModels = new SideModels();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await sideModels.listall(db);
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

    let id_side = req.body.id_side;
    let code_side = req.body.code_side;
    let name_side = req.body.name_side;
    let datas: any = {
        code_side: code_side,
        name_side: name_side
    }
    try {
        let rows: any = await sideModels.add(db, datas);
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

    let id_side = req.body.id_side;
    let code_side = req.body.code_side;
    let name_side = req.body.name_side;
    let datas: any = {
        id_side: id_side,
        code_side: code_side,
        name_side: name_side
    }
    try {
        let rows: any = await sideModels.update(db, id_side, datas);
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
    let id_side = req.body.id_side;
    try {
        let rows: any = await sideModels.del(db, id_side);
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