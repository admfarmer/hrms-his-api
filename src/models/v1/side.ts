'use strict';
import Knex = require('knex');

export class SideModels {
    listall(knex: Knex) {
        return knex('risk_side')
    }

    add(knex: Knex, data: any) {
        return knex('risk_side')
            .insert(data);
    }

    update(knex: Knex, id_side: any, data: any) {
        return knex('risk_side')
            .where('id_side', id_side)
            .update(data);
    }

    del(knex: Knex, id_side: any) {
        return knex('risk_side')
            .where('id_side', id_side)
            .del();
    }

}