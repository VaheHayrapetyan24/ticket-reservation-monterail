import { EntityManager, Repository } from 'typeorm';

export abstract class BaseEntityService<R> {
  protected repository: Repository<R>;
  protected repositoryClass: new () => R;

  protected transaction(manager?: EntityManager, fn?: (EntityManager) => any) {
    if (manager) {
      return fn(manager);
    }
    return this.repository.manager.transaction(fn);
  }

  protected getRepository(manager?: EntityManager): Repository<R> {
    return manager?.getRepository(this.repositoryClass) || this.repository;
  };
}
