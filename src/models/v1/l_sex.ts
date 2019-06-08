'use strict';
import Knex = require('knex');

export class SexMoldel {
    listall(knex: Knex) {
        return knex('l_sex')
    }

    add(knex: Knex, data: any) {
        return knex('l_sex')
            .insert(data);
    }

    update(knex: Knex, sex_id: any, data: any) {
        return knex('l_sex')
            .where('sex_id', sex_id)
            .update(data);
    }

    del(knex: Knex, sex_id: any) {
        return knex('l_sex')
            .where('sex_id', sex_id)
            .del();
    }

}