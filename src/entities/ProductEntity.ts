import {
  Action,
  BooleanField,
  DateField,
  Entity,
  Field,
  IdField,
  ImageField, MoneyField, Relation,
  TextField,
  TrixField,
  NumberField,
  Helpers
} from '../dashboard/src';
import SupplierEntity from '@/entities/SupplierEntity';
import CategoryEntity from '@/entities/CategoryEntity';
import DeleteAction from '@/Actions/DeleteAction';
class ProductEntity extends Entity {
  title: string = 'Produits';
  description: string = 'Liste de tous les produits';
  icon: string = 'fas fa-store';
  queryUrl: string = '/products';
  searchIn: Array<string> = ['name', 'sku', 'id', 'code'];
  defaultKey: string = 'name';

  // key: string = 'slug';

  fields (): Array<Field> {
    return [
      new IdField('id', 'ID').hideInEdit(),
      new ImageField('image', 'Image').multiple().valueKey('id').srcKey('fullUrl').alt((value: string, item: any) => item.name).circle().classes('w-12'),
      new TextField('name', 'Nom').render(Helpers.capitalize).renderInTable(value => Helpers.limit(value, 50)).rules(['required', ['min', 10]]),
      new TrixField('description').hideInIndex().uploadUrl('/media/uploads').fileKey('file'),
      new NumberField('code').render(value => `<span class="font-bold">${value}</span>`).rules([['min', 2], 'required']),
      new TextField('sku', 'SKU').hideInEdit(),
      new BooleanField('available', 'Disponible').hideInIndex(),
      new MoneyField('unit_price', 'Prix Unitaire').rules([['min', 0]]).currency('fr-BF', 'xof').render(value => `<span class="font-bold">${value}</span>`),
      new NumberField('discount', 'Rémise').hideInIndex().rules([['min', 0], ['max', 100]]),
      new NumberField('units_in_stock', 'Unité en stock').hideInIndex().rules([['min', 0]]),
      new BooleanField('available', 'Disponible').hideInShow().hideInEdit(),
      new NumberField('qty_per_unit', 'Quantité par unité').hideInIndex().rules([['min', 0]]),
      new TextField('unit_name', `Nom d'une unité`).hideInIndex(),
      new NumberField('units_ordered', 'Quantité commandée').hideInIndex(),
      new DateField('created_at', 'Date de création').hideInIndex().humanReadable(),
      new DateField('updated_at', 'Date de modification').hideInIndex().addProp('sendUsingTimestamps', true).humanReadable().renderShow(value => `<span class="font-bold">${value}</span>`)
    ];
  }

  relations (): Array<Relation> {
    return [
      this.hasOne(new SupplierEntity(), 'supplier', 'supplier_id').toPosition(3),
      this.hasMany(new CategoryEntity(), 'categories')
    ];
  }

  actions (): Array<Action> {
    return [
      new DeleteAction()
    ];
  }

  mediaConversion (value: any, item: any) {
    if (!value) return;
    return value.conversions.thumb.fullUrl || value.fullUrl;
  }

  money (value: number) {
    return new Intl.NumberFormat('fr-BF', { style: 'currency', currency: 'xof' }).format(value);
  }
}

export default ProductEntity;
