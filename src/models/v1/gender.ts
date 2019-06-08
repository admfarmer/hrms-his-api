'use strict';
import Knex = require('knex');

export class GenderModels {
    listall(knex: Knex) {
        return knex('risk_gender')
    }

    add(knex: Knex, data: any) {
        return knex('risk_gender')
            .insert(data);
    }

    update(knex: Knex, id_gender: any, data: any) {
        return knex('risk_gender')
            .where('id_gender', id_gender)
            .update(data);
    }

    del(knex: Knex, id_gender: any) {
        return knex('risk_gender')
            .where('id_gender', id_gender)
            .del();
    }
}