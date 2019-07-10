import * as request from 'request';
import * as moment from 'moment';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { InciDentModels } from '../../models/v1/incident';
import { LocationMoldel } from '../../models/v1/l_location';
import { BotlineModel } from '../../models/botline'

const router: Router = Router();
const inciDentModels = new InciDentModels();
const locationMoldel = new LocationMoldel();
const botlineModel = new BotlineModel();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await inciDentModels.listall(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
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
        let rows: any = await inciDentModels.select(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/selectShow', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await inciDentModels.listShow(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});
router.get('/selectShowRisk', async (req: Request, res: Response, next) => {
    let db = req.db;
    try {
        let rows: any = await inciDentModels.showRisk(db);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});
router.get('/quality/:quality', async (req: Request, res: Response, next) => {
    let db = req.db;
    let quality = req.params.quality;
    try {
        let rows: any = await inciDentModels.Quality(db, quality);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/qualityIn/:quality', async (req: Request, res: Response, next) => {
    let db = req.db;
    let quality = req.params.quality;
    try {
        let rows: any = await inciDentModels.QualityIN(db, quality);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/qualityOut/:quality', async (req: Request, res: Response, next) => {
    let db = req.db;
    let quality = req.params.quality;
    try {
        let rows: any = await inciDentModels.QualityOUT(db, quality);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/selectIn/:dep_res_one/:dep_res_group', async (req: Request, res: Response, next) => {
    let db = req.db;
    let dep_res_one = req.params.dep_res_one;
    let dep_res_group = req.params.dep_res_group;
    try {
        let rows: any = await inciDentModels.selectIn(db, dep_res_one, dep_res_group);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/selectShowIn/:dep_res_one/:dep_res_group', async (req: Request, res: Response, next) => {
    let db = req.db;
    let dep_res_one = req.params.dep_res_one;
    let dep_res_group = req.params.dep_res_group;
    try {
        let rows: any = await inciDentModels.selectIn(db, dep_res_one, dep_res_group);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/qualityIn/:dep_res_one/:dep_res_two/:dep_res_group', async (req: Request, res: Response, next) => {
    let db = req.db;
    let dep_res_one = req.params.dep_res_one;
    let dep_res_two = req.params.dep_res_two;
    let dep_res_group = req.params.dep_res_group;
    try {
        let rows: any = await inciDentModels.listInraw(db, dep_res_one, dep_res_two, dep_res_group);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/qualityShowIn/:dep_res_one/:dep_res_two/:dep_res_group', async (req: Request, res: Response, next) => {
    let db = req.db;
    let dep_res_one = req.params.dep_res_one;
    let dep_res_two = req.params.dep_res_two;
    let dep_res_group = req.params.dep_res_group;
    try {
        let rows: any = await inciDentModels.listShowInraw(db, dep_res_one, dep_res_two, dep_res_group);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/selectOut/:dep_rep_one/:dep_res_group', async (req: Request, res: Response, next) => {
    let db = req.db;
    let dep_rep_one = req.params.dep_rep_one;
    let dep_res_group = req.params.dep_res_group;
    try {
        let rows: any = await inciDentModels.selectOut(db, dep_rep_one, dep_res_group);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/selectShowOut/:dep_rep_one/:dep_res_group', async (req: Request, res: Response, next) => {
    let db = req.db;
    let dep_rep_one = req.params.dep_rep_one;
    let dep_res_group = req.params.dep_res_group;
    try {
        let rows: any = await inciDentModels.selectShowOut(db, dep_rep_one, dep_res_group);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/qualityOut/:dep_rep_one/:dep_rep_two/:dep_res_group', async (req: Request, res: Response, next) => {
    let db = req.db;
    let dep_rep_one = req.params.dep_rep_one;
    let dep_rep_two = req.params.dep_rep_two;
    let dep_res_group = req.params.dep_res_group;
    try {
        let rows: any = await inciDentModels.listOutraw(db, dep_rep_one, dep_rep_two, dep_res_group);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.get('/qualityShowOut/:dep_rep_one/:dep_rep_two/:dep_res_group', async (req: Request, res: Response, next) => {
    let db = req.db;
    let dep_rep_one = req.params.dep_rep_one;
    let dep_rep_two = req.params.dep_rep_two;
    let dep_res_group = req.params.dep_res_group;
    try {
        let rows: any = await inciDentModels.listShowOutraw(db, dep_rep_one, dep_rep_two, dep_res_group);
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

    let id_incident = req.body.id_incident;
    let hn_incident = req.body.hn_incident;
    let idcard_incident = req.body.idcard_incident;
    let dep_rep_id = req.body.dep_rep_id;
    let dep_res_id = req.body.dep_res_id;
    let id_side = req.body.id_side;
    let id_safety = req.body.id_safety;
    let id_type = req.body.id_type;
    let id_notype = req.body.id_notype;
    let code_account = req.body.code_account;
    let affected_id = req.body.affected_id;
    let sex_incident = req.body.sex_incident;
    let age_incident = req.body.age_incident;
    let location_incident = req.body.location_incident;
    let date_incident = req.body.date_incident;
    let date_account = req.body.date_account;
    let time_incident = req.body.time_incident;
    let agents_involved = req.body.agents_involved;
    let code_level = req.body.code_level;
    let other_involved = req.body.other_involved;
    let noteceo = req.body.noteceo;
    let date_rep = req.body.date_rep;
    let date_res = req.body.date_res;
    let conf_status = req.body.conf_status;
    let resulting_actions = req.body.resulting_actions;
    let conf_output = req.body.conf_output;
    let conf_chief = req.body.conf_chief;
    let conf_nrls = req.body.conf_nrls;
    let near_miss_status = req.body.near_miss_status;
    let datas: any = {
        hn_incident: hn_incident,
        idcard_incident: idcard_incident,
        dep_rep_id: dep_rep_id,
        dep_res_id: dep_res_id,
        id_side: id_side,
        id_safety: id_safety,
        id_type: id_type,
        id_notype: id_notype,
        code_account: code_account,
        affected_id: affected_id,
        sex_incident: sex_incident,
        age_incident: age_incident,
        location_incident: location_incident,
        date_incident: date_incident,
        date_account: date_account,
        time_incident: time_incident,
        agents_involved: agents_involved,
        code_level: code_level,
        other_involved: other_involved,
        noteceo: noteceo,
        date_rep: date_rep,
        date_res: date_res,
        resulting_actions: resulting_actions,
        conf_output: conf_output,
        conf_chief: conf_chief,
        conf_nrls: conf_nrls,
        near_miss_status: near_miss_status
    }
    try {
        let rows: any = await inciDentModels.add(db, datas);
        if (rows.length) {

            const loc: any = await locationMoldel.select(db, location_incident);
            console.log(loc);
            console.log(loc[0].location_name);

            let message1 = loc[0].location_name;
            let message2 = agents_involved;
            let message3 = code_level;
            let messages = 'สถานที่เกิด : [' + message1 + '] สรุปความเสียง : [' + message2 + '] ความรุ่นแรงระดับ :  [' + message3 + ']';
            // console.log(messages);
            const rsx: any = botlineModel.botLine(messages);

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

    let id_incident = req.body.id_incident;
    let hn_incident = req.body.hn_incident;
    let idcard_incident = req.body.idcard_incident;
    let dep_rep_id = req.body.dep_rep_id;
    let dep_res_id = req.body.dep_res_id;
    let id_side = req.body.id_side;
    let id_safety = req.body.id_safety;
    let id_type = req.body.id_type;
    let id_notype = req.body.id_notype;
    let code_account = req.body.code_account;
    let affected_id = req.body.affected_id;
    let sex_incident = req.body.sex_incident;
    let age_incident = req.body.age_incident;
    let location_incident = req.body.location_incident;
    let date_incident = req.body.date_incident;
    let date_account = req.body.date_account;
    let time_incident = req.body.time_incident;
    let agents_involved = req.body.agents_involved;
    let code_level = req.body.code_level;
    let other_involved = req.body.other_involved;
    let noteceo = req.body.noteceo;
    let date_rep = req.body.date_rep;
    let date_res = req.body.date_res;
    let conf_status = req.body.conf_status;
    let resulting_actions = req.body.resulting_actions;
    let conf_output = req.body.conf_output;
    let conf_chief = req.body.conf_chief;
    let conf_nrls = req.body.conf_nrls;
    let near_miss_status = req.body.near_miss_status;
    let datas: any = {
        id_incident: id_incident,
        hn_incident: hn_incident,
        idcard_incident: idcard_incident,
        dep_rep_id: dep_rep_id,
        dep_res_id: dep_res_id,
        id_side: id_side,
        id_safety: id_safety,
        id_type: id_type,
        id_notype: id_notype,
        code_account: code_account,
        affected_id: affected_id,
        sex_incident: sex_incident,
        age_incident: age_incident,
        location_incident: location_incident,
        date_incident: date_incident,
        date_account: date_account,
        time_incident: time_incident,
        agents_involved: agents_involved,
        code_level: code_level,
        other_involved: other_involved,
        noteceo: noteceo,
        date_rep: date_rep,
        date_res: date_res,
        resulting_actions: resulting_actions,
        conf_output: conf_output,
        conf_chief: conf_chief,
        conf_nrls: conf_nrls,
        near_miss_status: near_miss_status
    }
    try {
        let rows: any = await inciDentModels.update(db, id_incident, datas);
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
    let id_incident = req.body.id_incident;
    try {
        let rows: any = await inciDentModels.del(db, id_incident);
        if (rows.length) {
            res.send({ ok: true, rows: rows, code: HttpStatus.OK });
        } else {
            res.send({ ok: true, rows: {}, code: HttpStatus.OK });
        }
    } catch (error) {
        res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
});

router.post('/botline', function (req: Request, res: Response, next) {
    var token = req.body.token;
    var message = req.body.message;
    console.log(token);
    console.log(message);

    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            'bearer': token
        },
        form: {
            message: message
        }
    }, (err, httpResponse, body) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                httpResponse: httpResponse,
                body: body
            });
        }
    });
});

export default router;