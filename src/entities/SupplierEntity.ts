import ProductEntity from '@/entities/ProductEntity';
import User from '@/entities/User';
import { Action, DateField, Entity, Field, IdField, TextField } from '../dashboard/src';

class SupplierEntity extends Entity {
  title: string = 'Fournisseurs';
  queryUrl: string = '/suppliers';
  searchIn: Array<string> = ['company_name'];
  defaultKey: string = 'company_name';
  icon: string = 'fas fa-parachute-box';

  actions (): Array<Action> {
    return [];
  }

  fields (): Array<Field> {
    return [
      new IdField('id'),
      new TextField('company_name', 'Nom de la société').render(value => `<span class="font-bold">${value}</span>`),
      new TextField('fax', 'Fax'),
      new TextField('website_url', 'Site Web'),
      new DateField('created_at', 'Date de création').humanReadable(),
      new DateField('updated_at', 'Date de modification').hideInIndex().fromNow().renderShow(value => `<span class="font-bold">${value}</span>`)
    ];
  }

  relations (): Array<any> {
    return [
      this.hasMany(new ProductEntity(), 'products'),
      this.hasOne(new User(), 'user', 'user_id').toPosition(2)
    ];
  }
}

export default SupplierEntity;
