import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';

@Module({
  providers: [DrizzleService],
  exports: [DrizzleService], // As we want to share an instance of the 'DrizzleService' between several other modules, we need to export the 'DrizzleService' provider.
})
export class DrizzleModule {}
