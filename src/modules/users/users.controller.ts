import { Body, JsonController, Post } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';

@Service()
@JsonController('/users')
export class UsersController {
  @Inject()
  private usersService: UsersService;

  @Post('/signup')
  public async signup(
    @Body({ validate: true }) body: SignupDto,
  ): Promise<boolean> {
    await this.usersService.signup(body.email, body.password);
    return true;
  }

  @Post('/login')
  public async login(
    @Body({ validate: true }) body: SignupDto,
  ): Promise<{ token: string }> {
    return this.usersService.login(body.email, body.password);
  }
}
