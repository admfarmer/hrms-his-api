import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { LocationMoldel } from '../../models/v1/l_location';

const router: Router = Router();
const locationMoldel = new LocationMoldel();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await locationMoldel.listall(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/select/:locationId', async (req: Request, res: Response, next) => {
    let db = req.db;
    let locationId = req.params.locationId;
    console.log(locationId);

    try {
        let rows: any = await locationMoldel.select(db, locationId);
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

    let location_id = req.body.location_id;
    let location_name = req.body.location_name;
    let datas: any = {
        location_name: location_name
    }
    try {
        let rows: any = await locationMoldel.add(db, datas);
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

    let location_id = req.body.location_id;
    let location_name = req.body.location_name;
    let datas: any = {
        location_id: location_id,
        location_name: location_name
    }
    try {
        let rows: any = await locationMoldel.update(db, location_id, datas);
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
    let location_id = req.body.location_id;
    try {
        let rows: any = await locationMoldel.del(db, location_id);
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