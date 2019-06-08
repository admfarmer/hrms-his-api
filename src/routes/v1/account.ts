import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { AccountModels } from '../../models/v1/account';

const router: Router = Router();
const accountModels = new AccountModels();


/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await accountModels.listall(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/selectacc/:code_account', async (req: Request, res: Response, next) => {
    let db = req.db;
    let code_account = req.params.code_account;
    try {
        let rows: any = await accountModels.selectacc(db, code_account);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/:id_side/:id_safety/:id_type/:id_notype', async (req: Request, res: Response, next) => {
    let db = req.db;
    let id_side = req.params.id_side;
    let id_safety = req.params.id_safety;
    let id_type = req.params.id_type;
    let id_notype = req.params.id_notype;

    try {
        let rows: any = await accountModels.select(db, id_side, id_safety, id_type, id_notype);
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

    let id_account = req.body.id_account;
    let code_account = req.body.code_account;
    let id_side = req.body.id_side;
    let id_safety = req.body.id_safety;
    let id_type = req.body.id_type;
    let id_notype = req.body.id_notype;
    let name_account = req.body.name_account;
    let simple = req.body.simple;
    let status_acc = req.body.status_acc;
    let datas: any = {
        code_account: code_account,
        id_side: id_side,
        id_safety: id_safety,
        id_type: id_type,
        id_notype: id_notype,
        name_account: name_account,
        simple: simple,
        status_acc: status_acc
    }
    try {
        let rows: any = await accountModels.add(db, datas);
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

    let id_account = req.body.id_account;
    let code_account = req.body.code_account;
    let id_side = req.body.id_side;
    let id_safety = req.body.id_safety;
    let id_type = req.body.id_type;
    let id_notype = req.body.id_notype;
    let name_account = req.body.name_account;
    let simple = req.body.simple;
    let status_acc = req.body.status_acc;
    let datas: any = {
        id_account: id_account,
        code_account: code_account,
        id_side: id_side,
        id_safety: id_safety,
        id_type: id_type,
        id_notype: id_notype,
        name_account: name_account,
        simple: simple,
        status_acc: status_acc
    }
    try {
        let rows: any = await accountModels.update(db, id_account, datas);
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
    let id_account = req.body.id_account;
    try {
        let rows: any = await accountModels.del(db, id_account);
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