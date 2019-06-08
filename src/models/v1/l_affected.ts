'use strict';
import Knex = require('knex');

export class AffectedMoldel {
    listall(knex: Knex) {
        return knex('l_affected')
    }

    add(knex: Knex, data: any) {
        return knex('l_affected')
            .insert(data);
    }

    update(knex: Knex, affected_id: any, data: any) {
        return knex('l_affected')
            .where('affected_id', affected_id)
            .update(data);
    }

    del(knex: Knex, affected_id: any) {
        return knex('l_affected')
            .where('affected_id', affected_id)
            .del();
    }

}