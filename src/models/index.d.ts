import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt: string;
  readonly userID: string;
  readonly carID: string;
  readonly type: string;
  readonly status?: string | null;
  readonly originLatitude: number;
  readonly oreiginLongitude: number;
  readonly destLatitude: number;
  readonly destLongitude: number;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt: string;
  readonly userID: string;
  readonly carID: string;
  readonly type: string;
  readonly status?: string | null;
  readonly originLatitude: number;
  readonly oreiginLongitude: number;
  readonly destLatitude: number;
  readonly destLongitude: number;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerCar = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Car, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly heading?: number | null;
  readonly isActive?: boolean | null;
  readonly Orders?: (Order | null)[] | null;
  readonly user?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly carUserId?: string | null;
}

type LazyCar = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Car, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly heading?: number | null;
  readonly isActive?: boolean | null;
  readonly Orders: AsyncCollection<Order>;
  readonly user: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly carUserId?: string | null;
}

export declare type Car = LazyLoading extends LazyLoadingDisabled ? EagerCar : LazyCar

export declare const Car: (new (init: ModelInit<Car>) => Car) & {
  copyOf(source: Car, mutator: (draft: MutableModel<Car>) => MutableModel<Car> | void): Car;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly Orders?: (Order | null)[] | null;
  readonly car?: Car | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userCarId?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly Orders: AsyncCollection<Order>;
  readonly car: AsyncItem<Car | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userCarId?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}