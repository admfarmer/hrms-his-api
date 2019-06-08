import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { SafetyModels } from '../../models/v1/safety';

const router: Router = Router();
const safetyModels = new SafetyModels();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await safetyModels.listall(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});
router.get('/:id_side', async (req: Request, res: Response, next) => {
    let db = req.db;
    let id_side = req.params.id_side;
    try {
        let rows: any = await safetyModels.select(db, id_side);
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

    let id_safety = req.body.id_safety;
    let id_side = req.body.id_side;
    let code_safety = req.body.code_safety;
    let name_safety = req.body.name_safety;
    let datas: any = {
        id_side: id_side,
        code_safety: code_safety,
        name_safety: name_safety
    }
    try {
        let rows: any = await safetyModels.add(db, datas);
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

    let id_safety = req.body.id_safety;
    let id_side = req.body.id_side;
    let code_safety = req.body.code_safety;
    let name_safety = req.body.name_safety;
    let datas: any = {
        id_safety: id_safety,
        id_side: id_side,
        code_safety: code_safety,
        name_safety: name_safety
    }
    try {
        let rows: any = await safetyModels.update(db, id_safety, datas);
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
    let id_safety = req.body.id_safety;
    try {
        let rows: any = await safetyModels.del(db, id_safety);
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