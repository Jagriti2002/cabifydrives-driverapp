// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Order, Car, User } = initSchema(schema);

export {
  Order,
  Car,
  User
};