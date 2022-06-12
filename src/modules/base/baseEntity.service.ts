import { DeepPartial, EntityManager, Repository } from 'typeorm';

export abstract class BaseEntityService<R> {
  protected repository: Repository<R>;
  protected repositoryClass: new () => R;

  public async findOneSafe(params: DeepPartial<new () => R>, manager?: EntityManager): Promise<R> {
    return this.getRepository(manager).findOne({ where: params });
  }

  protected transaction(manager?: EntityManager, fn?: (EntityManager) => any) {
    if (manager) {
      return fn(manager);
    }
    return this.repository.manager.transaction(fn);
  }

  protected getRepository(manager?: EntityManager): Repository<R> {
    return manager?.getRepository(this.repositoryClass) || this.repository;
  }
}
