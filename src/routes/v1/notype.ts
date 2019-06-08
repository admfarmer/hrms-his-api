import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { NoTypeModels } from '../../models/v1/notype';

const router: Router = Router();
const noTypeModels = new NoTypeModels();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await noTypeModels.listall(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});
router.get('/:id_type', async (req: Request, res: Response, next) => {
    let db = req.db;
    let id_type = req.params.id_type;
    try {
        let rows: any = await noTypeModels.select(db, id_type);
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

    let id_notype = req.body.id_notype;
    let id_type = req.body.id_type;
    let code_notype = req.body.code_notype;
    let name_notype = req.body.name_notype;
    let name_TH = req.body.name_TH;
    let datas: any = {
        id_type: id_type,
        code_notype: code_notype,
        name_notype: name_notype,
        name_TH: name_TH
    }
    try {
        let rows: any = await noTypeModels.add(db, datas);
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

    let id_notype = req.body.id_notype;
    let id_type = req.body.id_type;
    let code_notype = req.body.code_notype;
    let name_notype = req.body.name_notype;
    let name_TH = req.body.name_TH;
    let datas: any = {
        id_notype: id_notype,
        id_type: id_type,
        code_notype: code_notype,
        name_notype: name_notype,
        name_TH: name_TH
    }
    try {
        let rows: any = await noTypeModels.update(db, id_notype, datas);
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
    let id_notype = req.body.id_notype;
    try {
        let rows: any = await noTypeModels.del(db, id_notype);
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