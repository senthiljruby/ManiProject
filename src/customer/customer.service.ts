import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable, switchMap } from 'rxjs';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly model: Model<CustomerDocument>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    return await this.model.findById(id).exec();
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return await new this.model({
      ...createCustomerDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return await this.model.findByIdAndUpdate(id, updateCustomerDto).exec();
  }

  async delete(id: string): Promise<Customer> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async updateOne(id: string, customer_file: any) {
    let customer: Customer = await this.model.findById(id).exec();
    customer.image = customer_file.image;
    return from(this.update(id, customer)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  async getfirstname(firstname) {
    return await this.model.findOne({ firstname: firstname }).exec();
  }

  async getByPhonenumber(phonenumber) {
    console.log(phonenumber);
    if (phonenumber && phonenumber != 'all') {
      return await this.model.find({ phone: phonenumber }).exec();
    } else {
      return await this.model.find().exec();
    }
  }
}
