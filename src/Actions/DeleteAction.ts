import { Action, Entity } from '../dashboard/src';

class DeleteAction extends Action {
  description: string = 'Voulez-vous supprimer ces entités ? ';

  run (items: Array<any>, entity: Entity): Promise<any> {
    let entityKey: string | null = entity.getKey();
    if (!entityKey) {
      this.context.admin.alert.error("Une Erreur s'est produite ");
      return new Promise<any>((resolve, reject) => {
      });
    }
    console.log(entityKey, items);
    // @ts-ignore
    let keys: string = items.map(item => item[entityKey]).join(',');
    let url: string = entity.buildIndexUrl(this.context.config.baseUrl, { ids: keys });

    return new Promise<any>((resolve, reject) => {
      this.context.admin.confirm.ask(this.description, this.title).then(() => {
        this.context.admin.axios.delete(url).then(resolve).catch(reject);
      }).catch(reject);
    });
  }
}

export default DeleteAction;
