import { Entity, Action, Field, IdField } from "../dashboard/src";

class Order extends Entity {
  queryUrl = '/orders';
  title = 'Commandes';
  icon = 'fas fa-shipping-fast';

  actions (): Array<Action> {
    return [];
  }

  fields (): Array<Field> {
    return [
      new IdField('id')
    ];
  }

  relations (): Array<any> {
    return [];
  }
}

export default Order;
