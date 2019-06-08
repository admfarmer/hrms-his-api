import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { SubMenuItemModels } from '../../models/v1/sub_item';

const router: Router = Router();
const subMenuItemModels = new SubMenuItemModels();

/* GET home page. */
router.get('/', async (req: Request, res: Response, next) => {
  let db = req.db;
  try {
    let rows: any = await subMenuItemModels.listall(db);
    if (rows.length) {
      res.send({ ok: true, rows: rows, code: HttpStatus.OK });
    } else {
      res.send({ ok: true, rows: {}, code: HttpStatus.OK });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/other', async (req: Request, res: Response, next) => {
  let db = req.db;
  try {
    let rows: any = await subMenuItemModels.listother(db);
    if (rows.length) {
      res.send({ ok: true, rows: rows, code: HttpStatus.OK });
    } else {
      res.send({ ok: true, rows: {}, code: HttpStatus.OK });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/manager', async (req: Request, res: Response, next) => {
  let db = req.db;
  try {
    let rows: any = await subMenuItemModels.listmanager(db);
    if (rows.length) {
      res.send({ ok: true, rows: rows, code: HttpStatus.OK });
    } else {
      res.send({ ok: true, rows: {}, code: HttpStatus.OK });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/depart', async (req: Request, res: Response, next) => {
  let db = req.db;
  try {
    let rows: any = await subMenuItemModels.listdepart(db);
    if (rows.length) {
      res.send({ ok: true, rows: rows, code: HttpStatus.OK });
    } else {
      res.send({ ok: true, rows: {}, code: HttpStatus.OK });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/:sub_id', async (req: Request, res: Response, next) => {
  let db = req.db;
  let sub_id = req.params.sub_id;
  try {
    let rows: any = await subMenuItemModels.listone(db, sub_id);
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

  let sub_item_id = req.body.sub_item_id;
  let item_id = req.body.item_id;
  let sub_item_name = req.body.sub_item_name;
  let query_sql = req.body.query_sql;
  let query_params = req.body.query_params;
  let column_selected = req.body.column_selected;
  let template = req.body.template;
  let comment = req.body.comment;
  let sub_item_status = req.body.sub_status;
  let datas: any = {
    item_id: item_id,
    sub_item_name: sub_item_name,
    query_sql: query_sql,
    query_params: query_params,
    column_selected: column_selected,
    template: template,
    sub_item_status: sub_item_status,
    comment: comment,
  }
  try {
    let rows: any = await subMenuItemModels.add(db, datas);
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

  let sub_item_id = req.body.sub_item_id;
  let item_id = req.body.item_id;
  let sub_item_name = req.body.sub_item_name;
  let query_sql = req.body.query_sql;
  let query_params = req.body.query_params;
  let column_selected = req.body.column_selected;
  let template = req.body.template;
  let comment = req.body.comment;
  let sub_item_status = req.body.sub_status;
  let datas: any = {
    item_id: item_id,
    sub_item_name: sub_item_name,
    query_sql: query_sql,
    query_params: query_params,
    column_selected: column_selected,
    template: template,
    sub_item_status: sub_item_status,
    comment: comment,
  }
  try {
    let rows: any = await subMenuItemModels.update(db, sub_item_id, datas);
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
  let sub_item_id = req.body.sub_item_id;
  try {
    let rows: any = await subMenuItemModels.del(db, sub_item_id);
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