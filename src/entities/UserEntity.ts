// @ts-ignore
import { Action, Entity, Field, IdField, TextField } from 'vue-dashboard-builder';

class UserEntity extends Entity {
  queryUrl: string = '/users';
  title: string = 'Utilisateurs';
  icon: string = 'fas fa-users';
  defaultKey: string = 'email';
  updateMethod:string = 'PUT';

  actions (): Array<Action> {
    return [];
  }

  fields (): Array<Field> {
    return [
      new IdField('id'),
      new TextField('name', 'Nom'),
      new TextField('username', "Nom d'utilisateur"),
      new TextField('email', 'Email'),
      new TextField('phone', 'Téléphone')
    ];
  }

  relations (): Array<any> {
    return [];
  }
}

export default UserEntity;
