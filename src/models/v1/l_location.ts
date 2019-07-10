'use strict';
import Knex = require('knex');

export class LocationMoldel {
    listall(knex: Knex) {
        return knex('l_location')
    }
    select(knex: Knex, locationId: any) {
        return knex('l_location')
            .where('location_id', locationId)
    }

    add(knex: Knex, data: any) {
        return knex('l_location')
            .insert(data);
    }

    update(knex: Knex, location_id: any, data: any) {
        return knex('l_location')
            .where('location_id', location_id)
            .update(data);
    }

    del(knex: Knex, location_id: any) {
        return knex('l_location')
            .where('location_id', location_id)
            .del();
    }

}