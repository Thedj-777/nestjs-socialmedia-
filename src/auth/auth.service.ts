import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { Contact } from 'src/contacts/contact.entity';
import { ContactsService } from 'src/contacts/contacts/contacts.service';
import { AuthLoginDto } from './auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private contactservices: ContactsService,
    private Jwtservices: JwtService,
  ) {}

  async login(AuthLoginDto: AuthLoginDto) {
    const user = await this.validateUser(AuthLoginDto);
    const payload = {
      userId: user.id,
    };
    return {
      access_token: this.Jwtservices.sign(payload),
    };
  }
  async validateUser(AuthLoginDto: AuthLoginDto): Promise<Contact> {
    const { email, password } = AuthLoginDto;
    const user = await this.contactservices.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
