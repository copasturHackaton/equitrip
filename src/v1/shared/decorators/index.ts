import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { date as dateUtil } from 'utils';

export function IsDateOnlyString(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isDateOnlyString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          if (typeof value !== 'string') {
            return false;
          }

          const regex =
            /^\d{4}-?((((0[13578])|(1[02]))-?(([0-2][0-9])|(3[01])))|(((0[469])|(11))-?(([0-2][0-9])|(30)))|(02-?[0-2][0-9]))/;
          if (!regex.test(value)) {
            return false;
          }

          const date = new Date(value);
          if (isNaN(date.getTime())) {
            return false;
          }

          if (date > dateUtil.todayMinusKYears(18)) {
            return false;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a valid date string in the format YYYY-MM-DD`;
        },
      },
    });
  };
}
