import * as Knex from 'knex';

export class Login {
  doCustomerLogin(db: Knex, username: string, password: string) {
    return db('risk_user as u')
      .select('u.idcard', 'p.first_name', 'p.last_name')
      .leftJoin('risk_person as p', 'p.idcard', 'u.idcard')
      .where('u.username', username)
      .where('u.password', password)
      .limit(1);
  }

}