import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import jwt from 'jsonwebtoken';
import { UsersService } from '../modules/users/users.service';
import config from '../config';

const { auth } = config;

export class AuthorizationMiddleware {
  static async authorizationChecker(action: Action): Promise<boolean> {
    const usersService = Container.get(UsersService);
    const bearerToken = action.request.headers['authorization'];
    const token = bearerToken.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, auth.jwtSecret) as { id: number };
      if (!decoded.id) {
        return false;
      }
      const user = await usersService.findOneSafe({ id: decoded.id });
      if (!user) {
        return false;
      }
      action.request.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}
