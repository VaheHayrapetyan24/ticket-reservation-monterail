import { Service } from 'typedi';
import bcrypt from 'bcrypt';

@Service()
export class CryptoService {
  public async generatePasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }

  public async arePasswordsEqual(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
