'use strict';
import Knex = require('knex');

export class TimeMoldel {
    listall(knex: Knex) {
        return knex('l_time')
    }

    add(knex: Knex, data: any) {
        return knex('l_time')
            .insert(data);
    }

    update(knex: Knex, time_id: any, data: any) {
        return knex('l_time')
            .where('time_id', time_id)
            .update(data);
    }

    del(knex: Knex, time_id: any) {
        return knex('l_time')
            .where('time_id', time_id)
            .del();
    }

}