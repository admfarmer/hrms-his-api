import * as HttpStatus from 'http-status-codes';
import { Router, Request, Response } from 'express';
import { UserModels } from '../../models/v1/user';

const router: Router = Router();
const userModels = new UserModels();

let crypto = require('crypto');
let Encrypt = require('../../models/v1/encrypt');


router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await userModels.listall(db);
        if (rows.length) {
            let token = Encrypt.encrypt(JSON.stringify({ rows }));
            res.send({ ok: true, token: token, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, token: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/users', async (req: Request, res: Response, next) => {
    console.log("111111");
    let db = req.db;
    try {
        let rows: any = await userModels.select(db);
        if (rows.length) {
            res.send({ ok: true, results: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, token: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});


router.post('/password', async (req: Request, res: Response, next) => {
    let db = req.db;
    let idcard = req.body.idcard;
    try {
        let rows: any = await userModels.listpass(db, idcard);
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

    let id_user = req.body.id_user;
    let idcard = req.body.idcard;
    let username = req.body.username;
    let password = req.body.password;
    let device_token = req.body.device_token;
    let is_accept = req.body.is_accept;
    let id_depart = req.body.id_depart;
    let admin_status = req.body.admin_status;
    let chief_user = req.body.chief_user;
    let maniger_user = req.body.maniger_user;
    let datas: any = {
        idcard: idcard,
        username: username,
        password: password,
        device_token: device_token,
        is_accept: is_accept,
        id_depart: id_depart,
        admin_status: admin_status,
        chief_user: chief_user,
        maniger_user: maniger_user
    }
    try {
        let rows: any = await userModels.add(db, datas);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.put('/', async (req: Request, res: Response, next) => {
    let db = req.db;

    let id_user = req.body.id_user;
    let idcard = req.body.idcard;
    let username = req.body.username;
    let varpassword = req.body.password;

    // let hashPassword = crypto.createHash('md5')
    //     .update(varpassword).digest('hex');

    let device_token = req.body.device_token;
    let is_accept = req.body.is_accept;
    let id_depart = req.body.id_depart;
    let admin_status = req.body.admin_status;
    let chief_user = req.body.chief_user;
    let maniger_user = req.body.maniger_user;
    let datas: any = {
        // id_user: id_user,
        idcard: idcard,
        username: username,
        password: varpassword,
        device_token: device_token,
        is_accept: is_accept,
        id_depart: id_depart,
        admin_status: admin_status,
        chief_user: chief_user,
        maniger_user: maniger_user
    }
    try {
        let rows: any = await userModels.update(db, id_user, datas);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.put('/newpass', async (req: Request, res: Response, next) => {
    let db = req.db;

    let id_user = req.body.id_user;
    let idcard = req.body.idcard;
    let username = req.body.username;
    let varpassword = req.body.password;

    let hashPassword = crypto.createHash('md5')
        .update(varpassword).digest('hex');

    let device_token = req.body.device_token;
    let is_accept = req.body.is_accept;
    let id_depart = req.body.id_depart;
    let admin_status = req.body.admin_status;
    let chief_user = req.body.chief_user;
    let maniger_user = req.body.maniger_user;
    let datas: any = {
        // id_user: id_user,
        idcard: idcard,
        username: username,
        password: hashPassword,
        device_token: device_token,
        is_accept: is_accept,
        id_depart: id_depart,
        admin_status: admin_status,
        chief_user: chief_user,
        maniger_user: maniger_user
    }
    try {
        let rows: any = await userModels.update(db, id_user, datas);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.post('/del', async (req: Request, res: Response, next) => {
    let db = req.db;
    let id_user = req.body.id_user;
    try {
        let rows: any = await userModels.del(db, id_user);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.post('/login', async (req: Request, res: Response, next) => {
    let data = req.body.data;
    let db = req.db;
    let decryptedData = Encrypt.decrypt(data);
    let user = JSON.parse(decryptedData);

    try {
        let hashPassword = crypto.createHash('md5').update(user.password).digest('hex');
        let rows: any = await userModels.login(db, user.username, hashPassword);
        if (rows.length) {
            let token = Encrypt.encrypt(JSON.stringify({ rows }));
            res.send({ ok: true, token: token, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, token: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: 'ชื่อผู้ใช้งาน/รหัสผ่านไม่ถูกต้อง', code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.post('/save-device-token', async (req: Request, res: Response, next) => {
    // let id = req.decoded.id;
    let token = req.body.token;
    let deviceToken = req.body.deviceToken;
    let db = req.db;
    try {
        let rows: any = await userModels.saveDeviceToken(db, token, deviceToken);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

export default router;