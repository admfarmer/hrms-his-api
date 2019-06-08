import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { ReportModels } from '../../models/v1/report';

import * as moment from 'moment';
import * as _ from 'lodash';
import * as wrap from 'co-express';
import * as path from 'path';

const fse = require('fs-extra');
const fs = require('fs');
const json2xls = require('json2xls');
const router: Router = Router();
const reportModels = new ReportModels();

/* GET home page. */
router.post('/', async (req: Request, res: Response, next) => {
    let db = req.db;

    let sql = req.body.query_sql;
    let query_params = req.body.query_params;

    if (query_params) {
        // let params: any[] = query_params.split(",");
        let params: any[] = query_params;
        try {
            let rows: any = await reportModels.viewReport(db, sql, params);
            if (rows.length) {
                res.send({ ok: true, rows: rows, code: HttpStatus.OK });
            } else {
                res.send({ ok: true, rows: {}, code: HttpStatus.OK });
            }
        } catch (error) {
            res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    } else {
        try {
            let rows: any = await reportModels.viewReportNoParam(db, sql);
            if (rows.length) {
                res.send({ ok: true, rows: rows, code: HttpStatus.OK });
            } else {
                res.send({ ok: true, rows: {}, code: HttpStatus.OK });
            }
        } catch (error) {
            res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
})

router.get('/export/excel/:query_sql/:query_params', wrap(async (req: Request, res: Response, next) => {
    let db = req.db;
    //    let kpi_id = '101001';
    //    let hospcode = '27976';
    let sql = req.body.query_sql;
    let paramtype = req.body.query_params;

    fse.ensureDirSync(process.env.TMP_PATH);
    let params: any[] = paramtype.split(",");
    try {
        let result = await reportModels.viewReport(db, sql, params);
        let tmpFile = `excel-${moment().format('x')}.xlsx`;
        tmpFile = path.join(process.env.TMP_PATH, tmpFile);
        let excel = json2xls(result);
        fs.writeFileSync(tmpFile, excel, 'binary');
        res.download(tmpFile, (err) => {
            if (err) {
                res.send({ ok: false, message: err })
            } else {
                fse.removeSync(tmpFile);
            }
        });
    } catch (error) {
        console.log(error);
        res.send({ ok: false, error: 'ไม่สามารถส่งออกไฟล์ .xls ได้', code: HttpStatus.INTERNAL_SERVER_ERROR });
    }

}));

router.get('/export/excel/:query_sql', wrap(async (req: Request, res: Response, next) => {
    let db = req.db;
    //    let kpi_id = '101001';
    //    let hospcode = '27976';
    let sql = req.body.query_sql;

    fse.ensureDirSync(process.env.TMP_PATH);
    try {
        let result = await reportModels.viewReportNoParam(db, sql);
        let tmpFile = `excel-${moment().format('x')}.xlsx`;
        tmpFile = path.join(process.env.TMP_PATH, tmpFile);
        let excel = json2xls(result);
        fs.writeFileSync(tmpFile, excel, 'binary');
        res.download(tmpFile, (err) => {
            if (err) {
                res.send({ ok: false, message: err })
            } else {
                fse.removeSync(tmpFile);
            }
        });
    } catch (error) {
        console.log(error);
        res.send({ ok: false, error: 'ไม่สามารถส่งออกไฟล์ .xls ได้', code: HttpStatus.INTERNAL_SERVER_ERROR });
    }

}));



export default router;