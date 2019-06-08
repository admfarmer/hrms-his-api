'use strict';
import Knex = require('knex');

export class DepartMoldel {
    listall(knex: Knex) {
        return knex('risk_depart')
            .orderBy('name_depart', 'ASC')
            .orderBy('status', 'ASC')
    }
    listquality(knex: Knex) {
        return knex('risk_depart')
            .where('status', '1')
            .orderBy('name_depart', 'ASC')
            .orderBy('status', 'ASC')
    }
    select(knex: Knex, code_depart: any, varquality: any) {
        return knex('risk_depart')
            .where('code_depart', code_depart)
            .orWhere('code_depart', varquality)
    }

    selectOne(knex: Knex, code_depart: any) {
        return knex('risk_depart')
            .where('code_depart', code_depart)
    }

    selectID(knex: Knex, id_depart: any) {
        return knex('risk_depart')
            .where('id_depart', id_depart)
    }

    add(knex: Knex, data: any) {
        return knex('risk_depart')
            .insert(data);
    }

    update(knex: Knex, id_depart: any, data: any) {
        return knex('risk_depart')
            .where('id_depart', id_depart)
            .update(data);
    }

    del(knex: Knex, id_depart: any) {
        return knex('risk_depart')
            .where('id_depart', id_depart)
            .del();
    }

}