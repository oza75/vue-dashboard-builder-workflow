import { Action, Entity, Field, IdField, ImageField, Relation, TextField } from '../dashboard/src';

class Cart extends Entity {
  queryUrl = '/carts';
  title = 'Pannier';

  actions (): Array<Action> {
    return [];
  }

  fields (): Array<Field> {
    return [
      new IdField('id'),
      new ImageField('product', 'Image').render((value: any) => this.mediaConversion(value.image)).classes('w-12').circle().hideInShow().hideInEdit(),
      new TextField('product', 'Produit').render((value: any) => value.name).hideInShow().hideInEdit(),
      new TextField('price', 'Prix').render(this.money)
    ];
  }

  relations (): Array<Relation> {
    return [];
  }

  money (value: number) {
    return new Intl.NumberFormat('fr-BF', { style: 'currency', currency: 'xof' }).format(value);
  }

  mediaConversion (value: any, item?: any) {
    if (!value) return;
    return value.conversions.thumb.fullUrl || value.fullUrl;
  }
}

export default Cart;
