'use strict';
import Knex = require('knex');

export class PersonMoldel {
    listall(knex: Knex) {
        return knex('risk_person')
            .orderBy('first_name', 'ASC')
    }

    select(knex: Knex) {
        return knex('risk_person')
            .orderBy('first_name', 'ASC')
        // .where('personla', '<>', ' ')
    }

    selectjoin(knex: Knex) {
        var subquery = knex('risk_user').select('idcard');
        return knex('risk_person')
            .where(function () {
                this.where('idcard', 'not in', subquery)
            })
    }

    selectcard(knex: Knex, idcard: any) {
        // console.log(idcard);
        return knex('risk_person')
            .select('risk_person.*')
            .select(knex.raw(`s.sex_name as sex_name`))
            .innerJoin('l_sex as s', { 's.sex_id': 'risk_person.sex' })
            .where('idcard', idcard)
    }

    add(knex: Knex, data: any) {
        return knex('risk_person')
            .insert(data);
    }

    update(knex: Knex, id_person: any, data: any) {
        return knex('risk_person')
            .where('id_person', id_person)
            .update(data);
    }

    del(knex: Knex, id_person: any) {
        return knex('risk_person')
            .where('id_person', id_person)
            .del();
    }

}