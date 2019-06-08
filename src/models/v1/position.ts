'use strict';
import Knex = require('knex');

export class PositionMoldel {
    listall(knex: Knex) {
        return knex('risk_position')
    }

    add(knex: Knex, data: any) {
        return knex('risk_position')
            .insert(data);
    }

    update(knex: Knex, id_pos: any, data: any) {
        return knex('risk_position')
            .where('id_pos', id_pos)
            .update(data);
    }

    del(knex: Knex, id_pos: any) {
        return knex('risk_position')
            .where('id_pos', id_pos)
            .del();
    }

}