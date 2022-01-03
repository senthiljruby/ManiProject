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
    if (phonenumber && phonenumber != 'all') {
      return await this.model
        .find({
          $or: [
            {
              phone: { $regex: phonenumber, $options: 'i' },
            },
            {
              mfid: { $regex: phonenumber, $options: 'i' },
            },
            {
              firstname: { $regex: phonenumber, $options: 'i' },
            },
          ],
        })
        .exec();
    } else {
      return await this.model.find().exec();
    }
  }

  async getCustomerStats() {
    // return await this.model.find().exec();
    const customerCount = await this.model.countDocuments({});
    const imageUploads = await this.model.find({ image: { $ne: null } }).exec();
    const _imageCountArray = imageUploads.map((image) => image.image.length);
    const imageCount = _imageCountArray.reduce((a, b) => a + b, 0);
    // db.col.aggregate(
    //   { $group: { _id: { $dayOfYear: "$date"},
    //               click: { $sum: 1 } } }
    //   )

    const customerAggregate = await this.model.find({}).exec();

    const dates = [new Date(), new Date()];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const sortedDates: Array<{
      name: string;
      dates: Array<Date>;
      count: number;
    }> = [];

    customerAggregate.map((customer) => {
      const month = months[customer.createdAt.getMonth()];
      const count = 1;
      const monthObj = sortedDates.find(
        (datesByMonth) => datesByMonth.name === month,
      );

      if (monthObj === undefined) {
        sortedDates.push({
          name: month,
          dates: [customer.createdAt],
          count: count,
        });
        return;
      }

      monthObj.dates.push(customer.createdAt);
      monthObj.count += count;
    });
    return {
      customerCount: customerCount,
      imageCount: imageCount,
      stats: sortedDates,
    };
  }
}
