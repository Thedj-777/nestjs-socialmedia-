import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Contact } from '../contact.entity';
import { ContactsService } from './contacts.service';
import * as bcrypt from 'bcrypt';

@Controller('contacts')
export class ContactsController {
  constructor(private contactservice: ContactsService) {}
  @Get()
  index(): Promise<Contact[]> {
    return this.contactservice.findAll();
  }

  @Post('create')
  async create(@Body() contactdata: Contact): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    contactdata.password = await bcrypt.hash(contactdata.password, salt);

    return this.contactservice.create(contactdata);
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() contactdata: Contact): Promise<any> {
    contactdata.id = Number(id);
    return this.contactservice.update(contactdata);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.contactservice.delete(id);
  }

  //  @Post('login')
  //   async login(@Body() contactdata: Contact, @Req() req): Promise<any> {
  //     const bodypassword = req.body;
  //     const user = await contactdata;
  //     if (user) {
  //       const validatepass = await bcrypt.compare(
  //         bodypassword.password,
  //         contactdata.password,
  //       );
  //       if (validatepass) {
  //         return { msg: 'valid user' };
  //       } else {
  //         return { msg: 'unvalid user' };
  //       }
  //     } else {
  //       return { msg: 'user not found' };
  //     }
  //   }
}
