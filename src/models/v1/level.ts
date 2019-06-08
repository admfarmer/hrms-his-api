'use strict';
import Knex = require('knex');

export class LevelMoldel {
    listall(knex: Knex) {
        return knex('risk_level')
    }

    select(knex: Knex, id_side: any) {
        return knex('risk_level')
            .where('group_level', id_side)
    }

    add(knex: Knex, data: any) {
        return knex('risk_level')
            .insert(data);
    }

    update(knex: Knex, id_level: any, data: any) {
        return knex('risk_level')
            .where('id_level', id_level)
            .update(data);
    }

    del(knex: Knex, id_level: any) {
        return knex('risk_level')
            .where('id_level', id_level)
            .del();
    }

}