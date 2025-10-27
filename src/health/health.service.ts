import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async check() {
    const startedAt = process.uptime();
    const uptimeMinutes = Math.floor(startedAt / 60);
    // ping db using a lightweight query
    const dbOk = await this.prisma.$queryRaw`SELECT 1`
      .then(() => true)
      .catch(() => false);

    return {
      status: dbOk ? 'ok' : 'degraded',
      uptimeSeconds: Math.floor(startedAt),
      uptimeMinutes,
      timestamp: new Date().toISOString(),
      checks: {
        database: dbOk ? 'up' : 'down',
      },
    };
  }
}
