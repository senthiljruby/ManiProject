import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [CustomerService],
  controllers: [CustomerController],
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
  ],
})
export class CustomerModule {}
