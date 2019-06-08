import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { LevelMoldel } from '../../models/v1/level';

const router: Router = Router();
const levelMoldel = new LevelMoldel();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await levelMoldel.listall(db);
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
        let rows: any = await levelMoldel.select(db, id_side);
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

    let id_level = req.body.id_level;
    let code_level = req.body.code_level;
    let name_level = req.body.name_level;
    let group_level = req.body.group_level;
    let datas: any = {
        code_level: code_level,
        name_level: name_level,
        group_level: group_level
    }
    try {
        let rows: any = await levelMoldel.add(db, datas);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }

    levelMoldel.add(db, datas)
        .then((results: any) => {
            res.send({ ok: true, rows: results, code: HttpStatus.OK });
        })
        .catch(error => {
            res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });
        })
        .finally(() => {
            db.destroy();
        })
})

router.put('/', async (req: Request, res: Response, next) => {
    let db = req.db;

    let id_level = req.body.id_level;
    let code_level = req.body.code_level;
    let name_level = req.body.name_level;
    let group_level = req.body.group_level;
    let datas: any = {
        id_level: id_level,
        code_level: code_level,
        name_level: name_level,
        group_level: group_level
    }
    try {
        let rows: any = await levelMoldel.update(db, id_level, datas);
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
    let id_level = req.body.id_level;
    try {
        let rows: any = await levelMoldel.del(db, id_level);
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