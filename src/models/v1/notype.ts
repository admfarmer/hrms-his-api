'use strict';
import Knex = require('knex');

export class NoTypeModels {
    listall(knex: Knex) {
        return knex('risk_notype')
    }

    select(knex: Knex, id_type: any) {
        return knex('risk_notype')
            .where('id_type', id_type)
    }

    add(knex: Knex, data: any) {
        return knex('risk_notype')
            .insert(data);
    }

    update(knex: Knex, id_notype: any, data: any) {
        return knex('risk_notype')
            .where('id_notype', id_notype)
            .update(data);
    }

    del(knex: Knex, id_notype: any) {
        return knex('risk_notype')
            .where('id_notype', id_notype)
            .del();
    }

}