import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { GenderModels } from '../../models/v1/gender';

const router: Router = Router();
const genderModels = new GenderModels();


/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await genderModels.listall(db);
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

    let id_gender = req.body.id_gender;
    let code_gender = req.body.code_gender;
    let name_genser = req.body.name_genser;
    let datas: any = {
        code_gender: code_gender,
        name_genser: name_genser
    }
    try {
        let rows: any = await genderModels.add(db, datas);
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

    let id_gender = req.body.id_gender;
    let code_gender = req.body.code_gender;
    let name_genser = req.body.name_genser;
    let datas: any = {
        id_gender: id_gender,
        code_gender: code_gender,
        name_genser: name_genser
    }
    try {
        let rows: any = await genderModels.update(db, id_gender, datas);
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
    let id_gender = req.body.id_gender;
    try {
        let rows: any = await genderModels.del(db, id_gender);
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