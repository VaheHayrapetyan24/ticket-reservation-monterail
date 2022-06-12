import { Inject, Service } from 'typedi';
import { DeepPartial, EntityManager, getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { CryptoService } from './crypto.service';
import { Users } from './users.entity';
import { UserWithEmailAlreadyExistsError } from './errors/userWithEmailAlreadyExists.error';
import { UserNotFoundError } from './errors/userNotFound.error';
import { InvalidPasswordError } from './errors/invalidPassword.error';
import { BaseEntityService } from '../base/baseEntity.service';
import config from '../../config';

const { auth } = config;

@Service()
export class UsersService extends BaseEntityService<Users> {
  @Inject()
  private cryptoService: CryptoService;
  constructor() {
    super();
    this.repository = getRepository(Users);
    this.repositoryClass = Users;
  }

  public async signup(email: string, password: string): Promise<void> {
    await this.transaction(null, async manager => {
      const existingUser = await this.findOneSafe({ email }, manager);
      if (existingUser) {
        throw new UserWithEmailAlreadyExistsError(email);
      }
      const passwordHash = await this.cryptoService.generatePasswordHash(password);
      await this.create({ email, passwordHash }, manager);
    });
  }

  public async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.findOneUnsafe({ email });
    this.checkPassword(password, user.passwordHash);
    return { token: this.signToken(user) };
  }

  public async findOneSafe(params: DeepPartial<Users>, manager?: EntityManager): Promise<Users> {
    return this.getRepository(manager).findOne({ where: params });
  }

  private signToken(user: Users): string {
    return 'Bearer ' + jwt.sign({ id: user.id }, auth.jwtSecret);
  }

  private async create(user: DeepPartial<Users>, manager?: EntityManager) {
    return this.getRepository(manager).createQueryBuilder().insert().values(user).execute();
  }

  private async findOneUnsafe(params: DeepPartial<Users>, manager?: EntityManager): Promise<Users> {
    const user = await this.findOneSafe(params, manager);
    if (!user) {
      throw new UserNotFoundError(params.email);
    }
    return user;
  }

  private checkPassword(password: string, passwordHash: string) {
    if (!this.cryptoService.arePasswordsEqual(password, passwordHash)) {
      throw new InvalidPasswordError();
    }
  }
}
