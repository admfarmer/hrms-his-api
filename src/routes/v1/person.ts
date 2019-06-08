import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { PersonMoldel } from '../../models/v1/person';

const router: Router = Router();
const personMoldel = new PersonMoldel();


/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;

    try {
        let rows: any = await personMoldel.listall(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }

});

router.get('/join', async (req: Request, res: Response, next) => {
    let db = req.db;

    try {
        let rs: any = await personMoldel.selectjoin(db);
        if (rs.length) {
            res.send({ ok: true, rows: rs, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});
router.get('/select', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rs: any = await personMoldel.select(db);
        if (rs.length) {
            res.send({ ok: true, rows: rs, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});
router.get('/:idcard', async (req: Request, res: Response, next) => {
    let db = req.db;
    let idcard = req.params.idcard;

    try {
        let rs: any = await personMoldel.selectcard(db, idcard);
        if (rs.length) {
            res.send({ ok: true, rows: rs, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }

});

router.post('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    let id_person = req.body.id_person;
    let idcard = req.body.idcard;
    let title = req.body.title;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let title_en = req.body.title_en;
    let fname_en = req.body.fname_en;
    let lname_en = req.body.lname_en;
    let sex = req.body.sex;
    let position = req.body.position;
    let addr = req.body.addr;
    let bdate = req.body.bdate;
    let workdate = req.body.workdate;
    let depart = req.body.depart;
    let typetext = req.body.typetext;
    let lasasom = req.body.lasasom;
    let personla = req.body.personla;
    let telephone = req.body.telephone;
    let email = req.body.email;
    let quality = req.body.quality;
    let datas: any = {
        idcard: idcard,
        title: title,
        first_name: first_name,
        last_name: last_name,
        title_en: title_en,
        fname_en: fname_en,
        lname_en: lname_en,
        sex: sex,
        position: position,
        addr: addr,
        bdate: bdate,
        workdate: workdate,
        depart: depart,
        typetext: typetext,
        lasasom: lasasom,
        personla: personla,
        telephone: telephone,
        email: email,
        quality: quality
    }

    // console.log(datas);
    try {
        let rs: any = await personMoldel.add(db, datas);
        if (rs.length) {
            res.send({ ok: true, rows: rs, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
})

router.put('/', async (req: Request, res: Response, next) => {
    let db = req.db;

    let id_person = req.body.id_person;
    let idcard = req.body.idcard;
    let title = req.body.title;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let title_en = req.body.title_en;
    let fname_en = req.body.fname_en;
    let lname_en = req.body.lname_en;
    let sex = req.body.sex;
    let position = req.body.position;
    let addr = req.body.addr;
    let bdate = req.body.bdate;
    let workdate = req.body.workdate;
    let depart = req.body.depart;
    let typetext = req.body.typetext;
    let lasasom = req.body.lasasom;
    let personla = req.body.personla;
    let telephone = req.body.telephone;
    let email = req.body.email;
    let quality = req.body.quality;
    let datas: any = {
        id_person: id_person,
        idcard: idcard,
        title: title,
        first_name: first_name,
        last_name: last_name,
        title_en: title_en,
        fname_en: fname_en,
        lname_en: lname_en,
        sex: sex,
        position: position,
        addr: addr,
        bdate: bdate,
        workdate: workdate,
        depart: depart,
        typetext: typetext,
        lasasom: lasasom,
        personla: personla,
        telephone: telephone,
        email: email,
        quality: quality
    }

    // console.log(datas);
    try {
        let rs: any = await personMoldel.update(db, id_person, datas);
        if (rs.length) {
            res.send({ ok: true, rows: rs, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
})
router.post('/del', async (req: Request, res: Response, next) => {
    let db = req.db;
    let id_person = req.body.id_person;
    try {
        let rs: any = await personMoldel.del(db, id_person);
        if (rs.length) {
            res.send({ ok: true, rows: rs, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
})


export default router;