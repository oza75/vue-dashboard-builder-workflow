import Cart from '@/entities/Cart';
import { Action, BooleanField, Entity, Field, IdField, TextField } from '../dashboard/src';

class User extends Entity {
  queryUrl: string = '/users';
  title: string = 'Utilisateurs';
  icon: string = 'fas fa-users';
  defaultKey: string = 'email';

  actions (): Array<Action> {
    return [];
  }

  fields (): Array<Field> {
    return [
      new IdField('id'),
      new TextField('first_name', 'Prénom'),
      new TextField('last_name', 'Nom'),
      new TextField('email', 'Email').render(value => value ? `<a class="font-bold" href="mailto:${value}" target="_blank">${value}</a>` : value),
      new TextField('phone', 'Téléphone').render(value => `<a href="mailto:${value}" target="_blank">${value}</a>`),
      new BooleanField('email_verified_at', 'Email Confirmé ?').render(value => !!value)
    ];
  }

  relations (): Array<any> {
    return [
      this.hasMany(new Cart(), 'carts')
    ];
  }
}

export default User;
