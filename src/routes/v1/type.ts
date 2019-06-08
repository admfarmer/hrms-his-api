import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { TypeModels } from '../../models/v1/type';

const router: Router = Router();
const typeModels = new TypeModels();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await typeModels.listall(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/:id_safety', async (req: Request, res: Response, next) => {
    let db = req.db;
    let id_safety = req.params.id_safety;
    try {
        let rows: any = await typeModels.select(db, id_safety);
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

    let id_type = req.body.id_type;
    let id_safety = req.body.id_safety;
    let code_type = req.body.code_type;
    let name_type = req.body.name_type;
    let name_TH = req.body.name_TH;
    let id_depart = req.body.id_depart;
    let datas: any = {
        id_safety: id_safety,
        code_type: code_type,
        name_type: name_type,
        name_TH: name_TH,
        id_depart: id_depart
    }
    try {
        let rows: any = await typeModels.add(db, datas);
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

    let id_type = req.body.id_type;
    let id_safety = req.body.id_safety;
    let code_type = req.body.code_type;
    let name_type = req.body.name_type;
    let name_TH = req.body.name_TH;
    let id_depart = req.body.id_depart;
    let datas: any = {
        id_type: id_type,
        id_safety: id_safety,
        code_type: code_type,
        name_type: name_type,
        name_TH: name_TH,
        id_depart: id_depart
    }
    try {
        let rows: any = await typeModels.update(db, id_type, datas);
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
    let id_type = req.body.id_type;
    try {
        let rows: any = await typeModels.del(db, id_type);
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