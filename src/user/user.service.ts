import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: Prisma.UserCreateInput) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return await this.prisma.user.create({ data: user });
  }

  async findAll(): Promise<Partial<User>[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        rol: true,
      },
    });
  }

  async findOne(id: number): Promise<Partial<User>> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        rol: true,
      },
    });
  }

  async loginFind(username: string) {
    return await this.prisma.user.findUnique({ where: { username: username } });
  }

  async update(id: number, user: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data: user });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
