'use strict';
import Knex = require('knex');

export class UserModels {

    listall(knex: Knex) {
        return knex.select('risk_user.*', 'risk_person.title', 'risk_person.first_name', 'risk_person.last_name')
            .from('risk_user')
            .innerJoin('risk_person', { 'risk_person.idcard': 'risk_user.idcard' })
    }
    select(knex: Knex) {
        return knex.select('risk_user.*', 'risk_person.title', 'risk_person.first_name', 'risk_person.last_name')
            .from('risk_user')
            .innerJoin('risk_person', { 'risk_person.idcard': 'risk_user.idcard' })
            .limit(10)
    }

    listpass(knex: Knex, idcard: any) {
        return knex('risk_user')
            .where('idcard', idcard)
    }

    add(knex: Knex, data: any) {
        return knex('risk_user')
            .insert(data);
    }

    update(knex: Knex, id_user: any, data: any) {
        return knex('risk_user')
            .where('id_user', id_user)
            .update(data);
    }

    del(knex: Knex, id_user: any) {
        return knex('risk_user')
            .where('id_user', id_user)
            .del();
    }

    login(knex: Knex, username: any, password: any) {
        return knex('risk_user')
            .where('username', username)
            .where('password', password)
    }

    saveDeviceToken(knex: Knex, Token: any, deviceToken: any) {
        return knex('risk_user')
            .where('username', deviceToken)
            .update('device_token', Token);
    }

}