import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { DepartMoldel } from '../../models/v1/depart';

const router: Router = Router();
const departMoldel = new DepartMoldel();


/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await departMoldel.listall(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }

});
router.get('/quality', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await departMoldel.listquality(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/selectOne/:code_depart', async (req: Request, res: Response, next) => {
    let db = req.db;
    let code_depart = req.params.code_depart;
    try {
        let rows: any = await departMoldel.selectOne(db, code_depart);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/selectID/:id_depart', async (req: Request, res: Response, next) => {
    let db = req.db;
    let id_depart = req.params.id_depart;
    try {
        let rows: any = await departMoldel.selectID(db, id_depart);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/:code_depart/:varquality', async (req: Request, res: Response, next) => {
    let db = req.db;
    let code_depart = req.params.code_depart;
    let varquality = req.params.varquality;
    try {
        let rows: any = await departMoldel.select(db, code_depart, varquality);
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

    let id_depart = req.body.id_depart;
    let code_depart = req.body.code_depart;
    let code_group = req.body.code_group;
    let name_depart = req.body.name_depart;
    let status = req.body.status;
    let datas: any = {
        code_depart: code_depart,
        code_group: code_group,
        name_depart: name_depart,
        status: status
    }
    try {
        let rows: any = await departMoldel.add(db, datas);
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

    let id_depart = req.body.id_depart;
    let code_depart = req.body.code_depart;
    let code_group = req.body.code_group;
    let name_depart = req.body.name_depart;
    let status = req.body.status;
    let datas: any = {
        id_depart: id_depart,
        code_depart: code_depart,
        code_group: code_group,
        name_depart: name_depart,
        status: status
    }
    try {
        let rows: any = await departMoldel.update(db, id_depart, datas);
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
    let id_depart = req.body.id_depart;
    try {
        let rows: any = await departMoldel.del(db, id_depart);
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