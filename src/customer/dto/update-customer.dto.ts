// Customer/dto/update-Customer.dto.ts
import { BaseCustomerDto } from './customer.dto';

export class UpdateCustomerDto extends BaseCustomerDto {
  completedAt?: Date;
}
