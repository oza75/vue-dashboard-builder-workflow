import ProductEntity from '@/entities/ProductEntity';
import { Action, BooleanField, DateField, Entity, Field, IdField, TextField } from '../dashboard/src';

class CategoryEntity extends Entity {
  queryUrl: string = '/categories';
  title: string = 'Categories';
  defaultKey: string = 'name';
  icon: string = 'fas fa-tags';
  actions (): Array<Action> {
    return [];
  }

  fields (): Array<Field> {
    return [
      new IdField('id'),
      new TextField('name', 'Nom'),
      new BooleanField('active'),
      new DateField('created_at', 'Date de création').humanReadable().render(value => `<span class="font-bold">${value}</span>`)
    ];
  }

  relations (): Array<any> {
    return [
      this.hasMany(new ProductEntity(), 'products')
    ];
  }
}

export default CategoryEntity;
