import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../contact.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactrepositroy: Repository<Contact>,
  ) {}
  async findAll(): Promise<Contact[]> {
    return await this.contactrepositroy.find();
  }
  async create(contact: Contact): Promise<Contact> {
    return await this.contactrepositroy.save(contact);
  }
  async update(contact: Contact): Promise<UpdateResult> {
    return this.contactrepositroy.update(contact.id, contact);
  }
  async delete(id): Promise<DeleteResult> {
    return await this.contactrepositroy.delete(id);
  }
  async findByEmail(email: string) {
    return await this.contactrepositroy.findOne({
      where: {
        email: email,
      },
    });
  }

  //   async login(@Req() req): Promise<any> {
  //     const body = req.body;
  //     return await this.contactrepositroy.find(body.email);
  //   }
}
