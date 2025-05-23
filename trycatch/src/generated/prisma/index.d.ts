
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Skill
 * 
 */
export type Skill = $Result.DefaultSelection<Prisma.$SkillPayload>
/**
 * Model Stack
 * 
 */
export type Stack = $Result.DefaultSelection<Prisma.$StackPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectStack
 * 
 */
export type ProjectStack = $Result.DefaultSelection<Prisma.$ProjectStackPayload>
/**
 * Model StackTaken
 * 
 */
export type StackTaken = $Result.DefaultSelection<Prisma.$StackTakenPayload>
/**
 * Model UserSkill
 * 
 */
export type UserSkill = $Result.DefaultSelection<Prisma.$UserSkillPayload>
/**
 * Model ProjectSkill
 * 
 */
export type ProjectSkill = $Result.DefaultSelection<Prisma.$ProjectSkillPayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProjectStatus: {
  BUSCANDO: 'BUSCANDO',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
  COMPLETO: 'COMPLETO'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]

}

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skill`: Exposes CRUD operations for the **Skill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skills
    * const skills = await prisma.skill.findMany()
    * ```
    */
  get skill(): Prisma.SkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stack`: Exposes CRUD operations for the **Stack** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stacks
    * const stacks = await prisma.stack.findMany()
    * ```
    */
  get stack(): Prisma.StackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectStack`: Exposes CRUD operations for the **ProjectStack** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectStacks
    * const projectStacks = await prisma.projectStack.findMany()
    * ```
    */
  get projectStack(): Prisma.ProjectStackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stackTaken`: Exposes CRUD operations for the **StackTaken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StackTakens
    * const stackTakens = await prisma.stackTaken.findMany()
    * ```
    */
  get stackTaken(): Prisma.StackTakenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSkill`: Exposes CRUD operations for the **UserSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSkills
    * const userSkills = await prisma.userSkill.findMany()
    * ```
    */
  get userSkill(): Prisma.UserSkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectSkill`: Exposes CRUD operations for the **ProjectSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectSkills
    * const projectSkills = await prisma.projectSkill.findMany()
    * ```
    */
  get projectSkill(): Prisma.ProjectSkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Skill: 'Skill',
    Stack: 'Stack',
    Project: 'Project',
    ProjectStack: 'ProjectStack',
    StackTaken: 'StackTaken',
    UserSkill: 'UserSkill',
    ProjectSkill: 'ProjectSkill',
    Feedback: 'Feedback'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "skill" | "stack" | "project" | "projectStack" | "stackTaken" | "userSkill" | "projectSkill" | "feedback"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Skill: {
        payload: Prisma.$SkillPayload<ExtArgs>
        fields: Prisma.SkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findFirst: {
            args: Prisma.SkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findMany: {
            args: Prisma.SkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          create: {
            args: Prisma.SkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          createMany: {
            args: Prisma.SkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          delete: {
            args: Prisma.SkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          update: {
            args: Prisma.SkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          deleteMany: {
            args: Prisma.SkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SkillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          upsert: {
            args: Prisma.SkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          aggregate: {
            args: Prisma.SkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkill>
          }
          groupBy: {
            args: Prisma.SkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkillCountArgs<ExtArgs>
            result: $Utils.Optional<SkillCountAggregateOutputType> | number
          }
        }
      }
      Stack: {
        payload: Prisma.$StackPayload<ExtArgs>
        fields: Prisma.StackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload>
          }
          findFirst: {
            args: Prisma.StackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload>
          }
          findMany: {
            args: Prisma.StackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload>[]
          }
          create: {
            args: Prisma.StackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload>
          }
          createMany: {
            args: Prisma.StackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload>[]
          }
          delete: {
            args: Prisma.StackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload>
          }
          update: {
            args: Prisma.StackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload>
          }
          deleteMany: {
            args: Prisma.StackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload>[]
          }
          upsert: {
            args: Prisma.StackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackPayload>
          }
          aggregate: {
            args: Prisma.StackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStack>
          }
          groupBy: {
            args: Prisma.StackGroupByArgs<ExtArgs>
            result: $Utils.Optional<StackGroupByOutputType>[]
          }
          count: {
            args: Prisma.StackCountArgs<ExtArgs>
            result: $Utils.Optional<StackCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectStack: {
        payload: Prisma.$ProjectStackPayload<ExtArgs>
        fields: Prisma.ProjectStackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectStackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectStackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload>
          }
          findFirst: {
            args: Prisma.ProjectStackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectStackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload>
          }
          findMany: {
            args: Prisma.ProjectStackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload>[]
          }
          create: {
            args: Prisma.ProjectStackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload>
          }
          createMany: {
            args: Prisma.ProjectStackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectStackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload>[]
          }
          delete: {
            args: Prisma.ProjectStackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload>
          }
          update: {
            args: Prisma.ProjectStackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload>
          }
          deleteMany: {
            args: Prisma.ProjectStackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectStackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectStackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload>[]
          }
          upsert: {
            args: Prisma.ProjectStackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStackPayload>
          }
          aggregate: {
            args: Prisma.ProjectStackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectStack>
          }
          groupBy: {
            args: Prisma.ProjectStackGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectStackGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectStackCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectStackCountAggregateOutputType> | number
          }
        }
      }
      StackTaken: {
        payload: Prisma.$StackTakenPayload<ExtArgs>
        fields: Prisma.StackTakenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StackTakenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StackTakenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload>
          }
          findFirst: {
            args: Prisma.StackTakenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StackTakenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload>
          }
          findMany: {
            args: Prisma.StackTakenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload>[]
          }
          create: {
            args: Prisma.StackTakenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload>
          }
          createMany: {
            args: Prisma.StackTakenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StackTakenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload>[]
          }
          delete: {
            args: Prisma.StackTakenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload>
          }
          update: {
            args: Prisma.StackTakenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload>
          }
          deleteMany: {
            args: Prisma.StackTakenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StackTakenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StackTakenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload>[]
          }
          upsert: {
            args: Prisma.StackTakenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StackTakenPayload>
          }
          aggregate: {
            args: Prisma.StackTakenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStackTaken>
          }
          groupBy: {
            args: Prisma.StackTakenGroupByArgs<ExtArgs>
            result: $Utils.Optional<StackTakenGroupByOutputType>[]
          }
          count: {
            args: Prisma.StackTakenCountArgs<ExtArgs>
            result: $Utils.Optional<StackTakenCountAggregateOutputType> | number
          }
        }
      }
      UserSkill: {
        payload: Prisma.$UserSkillPayload<ExtArgs>
        fields: Prisma.UserSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload>
          }
          findFirst: {
            args: Prisma.UserSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload>
          }
          findMany: {
            args: Prisma.UserSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload>[]
          }
          create: {
            args: Prisma.UserSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload>
          }
          createMany: {
            args: Prisma.UserSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload>[]
          }
          delete: {
            args: Prisma.UserSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload>
          }
          update: {
            args: Prisma.UserSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload>
          }
          deleteMany: {
            args: Prisma.UserSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSkillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload>[]
          }
          upsert: {
            args: Prisma.UserSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSkillPayload>
          }
          aggregate: {
            args: Prisma.UserSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSkill>
          }
          groupBy: {
            args: Prisma.UserSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSkillCountArgs<ExtArgs>
            result: $Utils.Optional<UserSkillCountAggregateOutputType> | number
          }
        }
      }
      ProjectSkill: {
        payload: Prisma.$ProjectSkillPayload<ExtArgs>
        fields: Prisma.ProjectSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload>
          }
          findFirst: {
            args: Prisma.ProjectSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload>
          }
          findMany: {
            args: Prisma.ProjectSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload>[]
          }
          create: {
            args: Prisma.ProjectSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload>
          }
          createMany: {
            args: Prisma.ProjectSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectSkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload>[]
          }
          delete: {
            args: Prisma.ProjectSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload>
          }
          update: {
            args: Prisma.ProjectSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload>
          }
          deleteMany: {
            args: Prisma.ProjectSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectSkillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload>[]
          }
          upsert: {
            args: Prisma.ProjectSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectSkillPayload>
          }
          aggregate: {
            args: Prisma.ProjectSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectSkill>
          }
          groupBy: {
            args: Prisma.ProjectSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectSkillCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectSkillCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    skill?: SkillOmit
    stack?: StackOmit
    project?: ProjectOmit
    projectStack?: ProjectStackOmit
    stackTaken?: StackTakenOmit
    userSkill?: UserSkillOmit
    projectSkill?: ProjectSkillOmit
    feedback?: FeedbackOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    skills: number
    projects: number
    stacksTaken: number
    feedbacksReceived: number
    feedbacksGiven: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skills?: boolean | UserCountOutputTypeCountSkillsArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    stacksTaken?: boolean | UserCountOutputTypeCountStacksTakenArgs
    feedbacksReceived?: boolean | UserCountOutputTypeCountFeedbacksReceivedArgs
    feedbacksGiven?: boolean | UserCountOutputTypeCountFeedbacksGivenArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSkillWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStacksTakenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StackTakenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedbacksReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedbacksGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }


  /**
   * Count Type SkillCountOutputType
   */

  export type SkillCountOutputType = {
    users: number
    projects: number
  }

  export type SkillCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | SkillCountOutputTypeCountUsersArgs
    projects?: boolean | SkillCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillCountOutputType
     */
    select?: SkillCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSkillWhereInput
  }

  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectSkillWhereInput
  }


  /**
   * Count Type StackCountOutputType
   */

  export type StackCountOutputType = {
    projects: number
    stacksTaken: number
  }

  export type StackCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | StackCountOutputTypeCountProjectsArgs
    stacksTaken?: boolean | StackCountOutputTypeCountStacksTakenArgs
  }

  // Custom InputTypes
  /**
   * StackCountOutputType without action
   */
  export type StackCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackCountOutputType
     */
    select?: StackCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StackCountOutputType without action
   */
  export type StackCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectStackWhereInput
  }

  /**
   * StackCountOutputType without action
   */
  export type StackCountOutputTypeCountStacksTakenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StackTakenWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    stacks: number
    skills: number
    stacksTaken: number
    feedbacks: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stacks?: boolean | ProjectCountOutputTypeCountStacksArgs
    skills?: boolean | ProjectCountOutputTypeCountSkillsArgs
    stacksTaken?: boolean | ProjectCountOutputTypeCountStacksTakenArgs
    feedbacks?: boolean | ProjectCountOutputTypeCountFeedbacksArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountStacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectStackWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectSkillWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountStacksTakenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StackTakenWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }


  /**
   * Count Type ProjectStackCountOutputType
   */

  export type ProjectStackCountOutputType = {
    StackTaken: number
  }

  export type ProjectStackCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    StackTaken?: boolean | ProjectStackCountOutputTypeCountStackTakenArgs
  }

  // Custom InputTypes
  /**
   * ProjectStackCountOutputType without action
   */
  export type ProjectStackCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStackCountOutputType
     */
    select?: ProjectStackCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectStackCountOutputType without action
   */
  export type ProjectStackCountOutputTypeCountStackTakenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StackTakenWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    avatar: string | null
    linkedin: string | null
    github: string | null
    summary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    avatar: string | null
    linkedin: string | null
    github: string | null
    summary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    avatar: number
    linkedin: number
    github: number
    summary: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatar?: true
    linkedin?: true
    github?: true
    summary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatar?: true
    linkedin?: true
    github?: true
    summary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatar?: true
    linkedin?: true
    github?: true
    summary?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    avatar: string | null
    linkedin: string | null
    github: string | null
    summary: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    linkedin?: boolean
    github?: boolean
    summary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    skills?: boolean | User$skillsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    stacksTaken?: boolean | User$stacksTakenArgs<ExtArgs>
    feedbacksReceived?: boolean | User$feedbacksReceivedArgs<ExtArgs>
    feedbacksGiven?: boolean | User$feedbacksGivenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    linkedin?: boolean
    github?: boolean
    summary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    linkedin?: boolean
    github?: boolean
    summary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    linkedin?: boolean
    github?: boolean
    summary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "avatar" | "linkedin" | "github" | "summary" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skills?: boolean | User$skillsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    stacksTaken?: boolean | User$stacksTakenArgs<ExtArgs>
    feedbacksReceived?: boolean | User$feedbacksReceivedArgs<ExtArgs>
    feedbacksGiven?: boolean | User$feedbacksGivenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      skills: Prisma.$UserSkillPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      stacksTaken: Prisma.$StackTakenPayload<ExtArgs>[]
      feedbacksReceived: Prisma.$FeedbackPayload<ExtArgs>[]
      feedbacksGiven: Prisma.$FeedbackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      avatar: string | null
      linkedin: string | null
      github: string | null
      summary: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    skills<T extends User$skillsArgs<ExtArgs> = {}>(args?: Subset<T, User$skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stacksTaken<T extends User$stacksTakenArgs<ExtArgs> = {}>(args?: Subset<T, User$stacksTakenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedbacksReceived<T extends User$feedbacksReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$feedbacksReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedbacksGiven<T extends User$feedbacksGivenArgs<ExtArgs> = {}>(args?: Subset<T, User$feedbacksGivenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly linkedin: FieldRef<"User", 'String'>
    readonly github: FieldRef<"User", 'String'>
    readonly summary: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.skills
   */
  export type User$skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    where?: UserSkillWhereInput
    orderBy?: UserSkillOrderByWithRelationInput | UserSkillOrderByWithRelationInput[]
    cursor?: UserSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSkillScalarFieldEnum | UserSkillScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.stacksTaken
   */
  export type User$stacksTakenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    where?: StackTakenWhereInput
    orderBy?: StackTakenOrderByWithRelationInput | StackTakenOrderByWithRelationInput[]
    cursor?: StackTakenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StackTakenScalarFieldEnum | StackTakenScalarFieldEnum[]
  }

  /**
   * User.feedbacksReceived
   */
  export type User$feedbacksReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * User.feedbacksGiven
   */
  export type User$feedbacksGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Skill
   */

  export type AggregateSkill = {
    _count: SkillCountAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  export type SkillMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SkillMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SkillCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SkillMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SkillMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SkillCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skill to aggregate.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Skills
    **/
    _count?: true | SkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillMaxAggregateInputType
  }

  export type GetSkillAggregateType<T extends SkillAggregateArgs> = {
        [P in keyof T & keyof AggregateSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkill[P]>
      : GetScalarType<T[P], AggregateSkill[P]>
  }




  export type SkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillWhereInput
    orderBy?: SkillOrderByWithAggregationInput | SkillOrderByWithAggregationInput[]
    by: SkillScalarFieldEnum[] | SkillScalarFieldEnum
    having?: SkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillCountAggregateInputType | true
    _min?: SkillMinAggregateInputType
    _max?: SkillMaxAggregateInputType
  }

  export type SkillGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: SkillCountAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  type GetSkillGroupByPayload<T extends SkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillGroupByOutputType[P]>
            : GetScalarType<T[P], SkillGroupByOutputType[P]>
        }
      >
    >


  export type SkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Skill$usersArgs<ExtArgs>
    projects?: boolean | Skill$projectsArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["skill"]>
  export type SkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Skill$usersArgs<ExtArgs>
    projects?: boolean | Skill$projectsArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SkillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SkillIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Skill"
    objects: {
      users: Prisma.$UserSkillPayload<ExtArgs>[]
      projects: Prisma.$ProjectSkillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["skill"]>
    composites: {}
  }

  type SkillGetPayload<S extends boolean | null | undefined | SkillDefaultArgs> = $Result.GetResult<Prisma.$SkillPayload, S>

  type SkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillCountAggregateInputType | true
    }

  export interface SkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Skill'], meta: { name: 'Skill' } }
    /**
     * Find zero or one Skill that matches the filter.
     * @param {SkillFindUniqueArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillFindUniqueArgs>(args: SelectSubset<T, SkillFindUniqueArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Skill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillFindUniqueOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillFindFirstArgs>(args?: SelectSubset<T, SkillFindFirstArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skills
     * const skills = await prisma.skill.findMany()
     * 
     * // Get first 10 Skills
     * const skills = await prisma.skill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillWithIdOnly = await prisma.skill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkillFindManyArgs>(args?: SelectSubset<T, SkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Skill.
     * @param {SkillCreateArgs} args - Arguments to create a Skill.
     * @example
     * // Create one Skill
     * const Skill = await prisma.skill.create({
     *   data: {
     *     // ... data to create a Skill
     *   }
     * })
     * 
     */
    create<T extends SkillCreateArgs>(args: SelectSubset<T, SkillCreateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Skills.
     * @param {SkillCreateManyArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillCreateManyArgs>(args?: SelectSubset<T, SkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Skills and returns the data saved in the database.
     * @param {SkillCreateManyAndReturnArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Skills and only return the `id`
     * const skillWithIdOnly = await prisma.skill.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SkillCreateManyAndReturnArgs>(args?: SelectSubset<T, SkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Skill.
     * @param {SkillDeleteArgs} args - Arguments to delete one Skill.
     * @example
     * // Delete one Skill
     * const Skill = await prisma.skill.delete({
     *   where: {
     *     // ... filter to delete one Skill
     *   }
     * })
     * 
     */
    delete<T extends SkillDeleteArgs>(args: SelectSubset<T, SkillDeleteArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Skill.
     * @param {SkillUpdateArgs} args - Arguments to update one Skill.
     * @example
     * // Update one Skill
     * const skill = await prisma.skill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillUpdateArgs>(args: SelectSubset<T, SkillUpdateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Skills.
     * @param {SkillDeleteManyArgs} args - Arguments to filter Skills to delete.
     * @example
     * // Delete a few Skills
     * const { count } = await prisma.skill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillDeleteManyArgs>(args?: SelectSubset<T, SkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillUpdateManyArgs>(args: SelectSubset<T, SkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills and returns the data updated in the database.
     * @param {SkillUpdateManyAndReturnArgs} args - Arguments to update many Skills.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Skills and only return the `id`
     * const skillWithIdOnly = await prisma.skill.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SkillUpdateManyAndReturnArgs>(args: SelectSubset<T, SkillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Skill.
     * @param {SkillUpsertArgs} args - Arguments to update or create a Skill.
     * @example
     * // Update or create a Skill
     * const skill = await prisma.skill.upsert({
     *   create: {
     *     // ... data to create a Skill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skill we want to update
     *   }
     * })
     */
    upsert<T extends SkillUpsertArgs>(args: SelectSubset<T, SkillUpsertArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillCountArgs} args - Arguments to filter Skills to count.
     * @example
     * // Count the number of Skills
     * const count = await prisma.skill.count({
     *   where: {
     *     // ... the filter for the Skills we want to count
     *   }
     * })
    **/
    count<T extends SkillCountArgs>(
      args?: Subset<T, SkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillAggregateArgs>(args: Subset<T, SkillAggregateArgs>): Prisma.PrismaPromise<GetSkillAggregateType<T>>

    /**
     * Group by Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillGroupByArgs['orderBy'] }
        : { orderBy?: SkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Skill model
   */
  readonly fields: SkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Skill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Skill$usersArgs<ExtArgs> = {}>(args?: Subset<T, Skill$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends Skill$projectsArgs<ExtArgs> = {}>(args?: Subset<T, Skill$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Skill model
   */
  interface SkillFieldRefs {
    readonly id: FieldRef<"Skill", 'String'>
    readonly name: FieldRef<"Skill", 'String'>
    readonly createdAt: FieldRef<"Skill", 'DateTime'>
    readonly updatedAt: FieldRef<"Skill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Skill findUnique
   */
  export type SkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findUniqueOrThrow
   */
  export type SkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findFirst
   */
  export type SkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findFirstOrThrow
   */
  export type SkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findMany
   */
  export type SkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skills to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill create
   */
  export type SkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The data needed to create a Skill.
     */
    data: XOR<SkillCreateInput, SkillUncheckedCreateInput>
  }

  /**
   * Skill createMany
   */
  export type SkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Skill createManyAndReturn
   */
  export type SkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Skill update
   */
  export type SkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The data needed to update a Skill.
     */
    data: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
    /**
     * Choose, which Skill to update.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill updateMany
   */
  export type SkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to update.
     */
    limit?: number
  }

  /**
   * Skill updateManyAndReturn
   */
  export type SkillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to update.
     */
    limit?: number
  }

  /**
   * Skill upsert
   */
  export type SkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The filter to search for the Skill to update in case it exists.
     */
    where: SkillWhereUniqueInput
    /**
     * In case the Skill found by the `where` argument doesn't exist, create a new Skill with this data.
     */
    create: XOR<SkillCreateInput, SkillUncheckedCreateInput>
    /**
     * In case the Skill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
  }

  /**
   * Skill delete
   */
  export type SkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter which Skill to delete.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill deleteMany
   */
  export type SkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skills to delete
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to delete.
     */
    limit?: number
  }

  /**
   * Skill.users
   */
  export type Skill$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    where?: UserSkillWhereInput
    orderBy?: UserSkillOrderByWithRelationInput | UserSkillOrderByWithRelationInput[]
    cursor?: UserSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSkillScalarFieldEnum | UserSkillScalarFieldEnum[]
  }

  /**
   * Skill.projects
   */
  export type Skill$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    where?: ProjectSkillWhereInput
    orderBy?: ProjectSkillOrderByWithRelationInput | ProjectSkillOrderByWithRelationInput[]
    cursor?: ProjectSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectSkillScalarFieldEnum | ProjectSkillScalarFieldEnum[]
  }

  /**
   * Skill without action
   */
  export type SkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
  }


  /**
   * Model Stack
   */

  export type AggregateStack = {
    _count: StackCountAggregateOutputType | null
    _min: StackMinAggregateOutputType | null
    _max: StackMaxAggregateOutputType | null
  }

  export type StackMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StackMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StackCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StackMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StackMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StackCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stack to aggregate.
     */
    where?: StackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stacks to fetch.
     */
    orderBy?: StackOrderByWithRelationInput | StackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stacks
    **/
    _count?: true | StackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StackMaxAggregateInputType
  }

  export type GetStackAggregateType<T extends StackAggregateArgs> = {
        [P in keyof T & keyof AggregateStack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStack[P]>
      : GetScalarType<T[P], AggregateStack[P]>
  }




  export type StackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StackWhereInput
    orderBy?: StackOrderByWithAggregationInput | StackOrderByWithAggregationInput[]
    by: StackScalarFieldEnum[] | StackScalarFieldEnum
    having?: StackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StackCountAggregateInputType | true
    _min?: StackMinAggregateInputType
    _max?: StackMaxAggregateInputType
  }

  export type StackGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: StackCountAggregateOutputType | null
    _min: StackMinAggregateOutputType | null
    _max: StackMaxAggregateOutputType | null
  }

  type GetStackGroupByPayload<T extends StackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StackGroupByOutputType[P]>
            : GetScalarType<T[P], StackGroupByOutputType[P]>
        }
      >
    >


  export type StackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects?: boolean | Stack$projectsArgs<ExtArgs>
    stacksTaken?: boolean | Stack$stacksTakenArgs<ExtArgs>
    _count?: boolean | StackCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stack"]>

  export type StackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stack"]>

  export type StackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stack"]>

  export type StackSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["stack"]>
  export type StackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | Stack$projectsArgs<ExtArgs>
    stacksTaken?: boolean | Stack$stacksTakenArgs<ExtArgs>
    _count?: boolean | StackCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stack"
    objects: {
      projects: Prisma.$ProjectStackPayload<ExtArgs>[]
      stacksTaken: Prisma.$StackTakenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stack"]>
    composites: {}
  }

  type StackGetPayload<S extends boolean | null | undefined | StackDefaultArgs> = $Result.GetResult<Prisma.$StackPayload, S>

  type StackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StackCountAggregateInputType | true
    }

  export interface StackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stack'], meta: { name: 'Stack' } }
    /**
     * Find zero or one Stack that matches the filter.
     * @param {StackFindUniqueArgs} args - Arguments to find a Stack
     * @example
     * // Get one Stack
     * const stack = await prisma.stack.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StackFindUniqueArgs>(args: SelectSubset<T, StackFindUniqueArgs<ExtArgs>>): Prisma__StackClient<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stack that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StackFindUniqueOrThrowArgs} args - Arguments to find a Stack
     * @example
     * // Get one Stack
     * const stack = await prisma.stack.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StackFindUniqueOrThrowArgs>(args: SelectSubset<T, StackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StackClient<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stack that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackFindFirstArgs} args - Arguments to find a Stack
     * @example
     * // Get one Stack
     * const stack = await prisma.stack.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StackFindFirstArgs>(args?: SelectSubset<T, StackFindFirstArgs<ExtArgs>>): Prisma__StackClient<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stack that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackFindFirstOrThrowArgs} args - Arguments to find a Stack
     * @example
     * // Get one Stack
     * const stack = await prisma.stack.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StackFindFirstOrThrowArgs>(args?: SelectSubset<T, StackFindFirstOrThrowArgs<ExtArgs>>): Prisma__StackClient<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stacks
     * const stacks = await prisma.stack.findMany()
     * 
     * // Get first 10 Stacks
     * const stacks = await prisma.stack.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stackWithIdOnly = await prisma.stack.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StackFindManyArgs>(args?: SelectSubset<T, StackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stack.
     * @param {StackCreateArgs} args - Arguments to create a Stack.
     * @example
     * // Create one Stack
     * const Stack = await prisma.stack.create({
     *   data: {
     *     // ... data to create a Stack
     *   }
     * })
     * 
     */
    create<T extends StackCreateArgs>(args: SelectSubset<T, StackCreateArgs<ExtArgs>>): Prisma__StackClient<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stacks.
     * @param {StackCreateManyArgs} args - Arguments to create many Stacks.
     * @example
     * // Create many Stacks
     * const stack = await prisma.stack.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StackCreateManyArgs>(args?: SelectSubset<T, StackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stacks and returns the data saved in the database.
     * @param {StackCreateManyAndReturnArgs} args - Arguments to create many Stacks.
     * @example
     * // Create many Stacks
     * const stack = await prisma.stack.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stacks and only return the `id`
     * const stackWithIdOnly = await prisma.stack.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StackCreateManyAndReturnArgs>(args?: SelectSubset<T, StackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stack.
     * @param {StackDeleteArgs} args - Arguments to delete one Stack.
     * @example
     * // Delete one Stack
     * const Stack = await prisma.stack.delete({
     *   where: {
     *     // ... filter to delete one Stack
     *   }
     * })
     * 
     */
    delete<T extends StackDeleteArgs>(args: SelectSubset<T, StackDeleteArgs<ExtArgs>>): Prisma__StackClient<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stack.
     * @param {StackUpdateArgs} args - Arguments to update one Stack.
     * @example
     * // Update one Stack
     * const stack = await prisma.stack.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StackUpdateArgs>(args: SelectSubset<T, StackUpdateArgs<ExtArgs>>): Prisma__StackClient<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stacks.
     * @param {StackDeleteManyArgs} args - Arguments to filter Stacks to delete.
     * @example
     * // Delete a few Stacks
     * const { count } = await prisma.stack.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StackDeleteManyArgs>(args?: SelectSubset<T, StackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stacks
     * const stack = await prisma.stack.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StackUpdateManyArgs>(args: SelectSubset<T, StackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stacks and returns the data updated in the database.
     * @param {StackUpdateManyAndReturnArgs} args - Arguments to update many Stacks.
     * @example
     * // Update many Stacks
     * const stack = await prisma.stack.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stacks and only return the `id`
     * const stackWithIdOnly = await prisma.stack.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StackUpdateManyAndReturnArgs>(args: SelectSubset<T, StackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stack.
     * @param {StackUpsertArgs} args - Arguments to update or create a Stack.
     * @example
     * // Update or create a Stack
     * const stack = await prisma.stack.upsert({
     *   create: {
     *     // ... data to create a Stack
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stack we want to update
     *   }
     * })
     */
    upsert<T extends StackUpsertArgs>(args: SelectSubset<T, StackUpsertArgs<ExtArgs>>): Prisma__StackClient<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackCountArgs} args - Arguments to filter Stacks to count.
     * @example
     * // Count the number of Stacks
     * const count = await prisma.stack.count({
     *   where: {
     *     // ... the filter for the Stacks we want to count
     *   }
     * })
    **/
    count<T extends StackCountArgs>(
      args?: Subset<T, StackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StackAggregateArgs>(args: Subset<T, StackAggregateArgs>): Prisma.PrismaPromise<GetStackAggregateType<T>>

    /**
     * Group by Stack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StackGroupByArgs['orderBy'] }
        : { orderBy?: StackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stack model
   */
  readonly fields: StackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stack.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends Stack$projectsArgs<ExtArgs> = {}>(args?: Subset<T, Stack$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stacksTaken<T extends Stack$stacksTakenArgs<ExtArgs> = {}>(args?: Subset<T, Stack$stacksTakenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stack model
   */
  interface StackFieldRefs {
    readonly id: FieldRef<"Stack", 'String'>
    readonly name: FieldRef<"Stack", 'String'>
    readonly createdAt: FieldRef<"Stack", 'DateTime'>
    readonly updatedAt: FieldRef<"Stack", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stack findUnique
   */
  export type StackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackInclude<ExtArgs> | null
    /**
     * Filter, which Stack to fetch.
     */
    where: StackWhereUniqueInput
  }

  /**
   * Stack findUniqueOrThrow
   */
  export type StackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackInclude<ExtArgs> | null
    /**
     * Filter, which Stack to fetch.
     */
    where: StackWhereUniqueInput
  }

  /**
   * Stack findFirst
   */
  export type StackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackInclude<ExtArgs> | null
    /**
     * Filter, which Stack to fetch.
     */
    where?: StackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stacks to fetch.
     */
    orderBy?: StackOrderByWithRelationInput | StackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stacks.
     */
    cursor?: StackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stacks.
     */
    distinct?: StackScalarFieldEnum | StackScalarFieldEnum[]
  }

  /**
   * Stack findFirstOrThrow
   */
  export type StackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackInclude<ExtArgs> | null
    /**
     * Filter, which Stack to fetch.
     */
    where?: StackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stacks to fetch.
     */
    orderBy?: StackOrderByWithRelationInput | StackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stacks.
     */
    cursor?: StackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stacks.
     */
    distinct?: StackScalarFieldEnum | StackScalarFieldEnum[]
  }

  /**
   * Stack findMany
   */
  export type StackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackInclude<ExtArgs> | null
    /**
     * Filter, which Stacks to fetch.
     */
    where?: StackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stacks to fetch.
     */
    orderBy?: StackOrderByWithRelationInput | StackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stacks.
     */
    cursor?: StackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stacks.
     */
    skip?: number
    distinct?: StackScalarFieldEnum | StackScalarFieldEnum[]
  }

  /**
   * Stack create
   */
  export type StackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackInclude<ExtArgs> | null
    /**
     * The data needed to create a Stack.
     */
    data: XOR<StackCreateInput, StackUncheckedCreateInput>
  }

  /**
   * Stack createMany
   */
  export type StackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stacks.
     */
    data: StackCreateManyInput | StackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stack createManyAndReturn
   */
  export type StackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * The data used to create many Stacks.
     */
    data: StackCreateManyInput | StackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stack update
   */
  export type StackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackInclude<ExtArgs> | null
    /**
     * The data needed to update a Stack.
     */
    data: XOR<StackUpdateInput, StackUncheckedUpdateInput>
    /**
     * Choose, which Stack to update.
     */
    where: StackWhereUniqueInput
  }

  /**
   * Stack updateMany
   */
  export type StackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stacks.
     */
    data: XOR<StackUpdateManyMutationInput, StackUncheckedUpdateManyInput>
    /**
     * Filter which Stacks to update
     */
    where?: StackWhereInput
    /**
     * Limit how many Stacks to update.
     */
    limit?: number
  }

  /**
   * Stack updateManyAndReturn
   */
  export type StackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * The data used to update Stacks.
     */
    data: XOR<StackUpdateManyMutationInput, StackUncheckedUpdateManyInput>
    /**
     * Filter which Stacks to update
     */
    where?: StackWhereInput
    /**
     * Limit how many Stacks to update.
     */
    limit?: number
  }

  /**
   * Stack upsert
   */
  export type StackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackInclude<ExtArgs> | null
    /**
     * The filter to search for the Stack to update in case it exists.
     */
    where: StackWhereUniqueInput
    /**
     * In case the Stack found by the `where` argument doesn't exist, create a new Stack with this data.
     */
    create: XOR<StackCreateInput, StackUncheckedCreateInput>
    /**
     * In case the Stack was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StackUpdateInput, StackUncheckedUpdateInput>
  }

  /**
   * Stack delete
   */
  export type StackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackInclude<ExtArgs> | null
    /**
     * Filter which Stack to delete.
     */
    where: StackWhereUniqueInput
  }

  /**
   * Stack deleteMany
   */
  export type StackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stacks to delete
     */
    where?: StackWhereInput
    /**
     * Limit how many Stacks to delete.
     */
    limit?: number
  }

  /**
   * Stack.projects
   */
  export type Stack$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    where?: ProjectStackWhereInput
    orderBy?: ProjectStackOrderByWithRelationInput | ProjectStackOrderByWithRelationInput[]
    cursor?: ProjectStackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectStackScalarFieldEnum | ProjectStackScalarFieldEnum[]
  }

  /**
   * Stack.stacksTaken
   */
  export type Stack$stacksTakenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    where?: StackTakenWhereInput
    orderBy?: StackTakenOrderByWithRelationInput | StackTakenOrderByWithRelationInput[]
    cursor?: StackTakenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StackTakenScalarFieldEnum | StackTakenScalarFieldEnum[]
  }

  /**
   * Stack without action
   */
  export type StackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stack
     */
    select?: StackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stack
     */
    omit?: StackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    totalValue: number | null
  }

  export type ProjectSumAggregateOutputType = {
    totalValue: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    description: string | null
    deadline: Date | null
    totalValue: number | null
    status: $Enums.ProjectStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    description: string | null
    deadline: Date | null
    totalValue: number | null
    status: $Enums.ProjectStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    ownerId: number
    name: number
    description: number
    deadline: number
    totalValue: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    totalValue?: true
  }

  export type ProjectSumAggregateInputType = {
    totalValue?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    description?: true
    deadline?: true
    totalValue?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    description?: true
    deadline?: true
    totalValue?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    description?: true
    deadline?: true
    totalValue?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    ownerId: string
    name: string
    description: string
    deadline: Date
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    description?: boolean
    deadline?: boolean
    totalValue?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    stacks?: boolean | Project$stacksArgs<ExtArgs>
    skills?: boolean | Project$skillsArgs<ExtArgs>
    stacksTaken?: boolean | Project$stacksTakenArgs<ExtArgs>
    feedbacks?: boolean | Project$feedbacksArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    description?: boolean
    deadline?: boolean
    totalValue?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    description?: boolean
    deadline?: boolean
    totalValue?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    ownerId?: boolean
    name?: boolean
    description?: boolean
    deadline?: boolean
    totalValue?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerId" | "name" | "description" | "deadline" | "totalValue" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    stacks?: boolean | Project$stacksArgs<ExtArgs>
    skills?: boolean | Project$skillsArgs<ExtArgs>
    stacksTaken?: boolean | Project$stacksTakenArgs<ExtArgs>
    feedbacks?: boolean | Project$feedbacksArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      stacks: Prisma.$ProjectStackPayload<ExtArgs>[]
      skills: Prisma.$ProjectSkillPayload<ExtArgs>[]
      stacksTaken: Prisma.$StackTakenPayload<ExtArgs>[]
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string
      name: string
      description: string
      deadline: Date
      totalValue: number
      status: $Enums.ProjectStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stacks<T extends Project$stacksArgs<ExtArgs> = {}>(args?: Subset<T, Project$stacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    skills<T extends Project$skillsArgs<ExtArgs> = {}>(args?: Subset<T, Project$skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stacksTaken<T extends Project$stacksTakenArgs<ExtArgs> = {}>(args?: Subset<T, Project$stacksTakenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedbacks<T extends Project$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, Project$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly ownerId: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly deadline: FieldRef<"Project", 'DateTime'>
    readonly totalValue: FieldRef<"Project", 'Float'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.stacks
   */
  export type Project$stacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    where?: ProjectStackWhereInput
    orderBy?: ProjectStackOrderByWithRelationInput | ProjectStackOrderByWithRelationInput[]
    cursor?: ProjectStackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectStackScalarFieldEnum | ProjectStackScalarFieldEnum[]
  }

  /**
   * Project.skills
   */
  export type Project$skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    where?: ProjectSkillWhereInput
    orderBy?: ProjectSkillOrderByWithRelationInput | ProjectSkillOrderByWithRelationInput[]
    cursor?: ProjectSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectSkillScalarFieldEnum | ProjectSkillScalarFieldEnum[]
  }

  /**
   * Project.stacksTaken
   */
  export type Project$stacksTakenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    where?: StackTakenWhereInput
    orderBy?: StackTakenOrderByWithRelationInput | StackTakenOrderByWithRelationInput[]
    cursor?: StackTakenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StackTakenScalarFieldEnum | StackTakenScalarFieldEnum[]
  }

  /**
   * Project.feedbacks
   */
  export type Project$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectStack
   */

  export type AggregateProjectStack = {
    _count: ProjectStackCountAggregateOutputType | null
    _avg: ProjectStackAvgAggregateOutputType | null
    _sum: ProjectStackSumAggregateOutputType | null
    _min: ProjectStackMinAggregateOutputType | null
    _max: ProjectStackMaxAggregateOutputType | null
  }

  export type ProjectStackAvgAggregateOutputType = {
    percentage: number | null
  }

  export type ProjectStackSumAggregateOutputType = {
    percentage: number | null
  }

  export type ProjectStackMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    stackId: string | null
    percentage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectStackMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    stackId: string | null
    percentage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectStackCountAggregateOutputType = {
    id: number
    projectId: number
    stackId: number
    percentage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectStackAvgAggregateInputType = {
    percentage?: true
  }

  export type ProjectStackSumAggregateInputType = {
    percentage?: true
  }

  export type ProjectStackMinAggregateInputType = {
    id?: true
    projectId?: true
    stackId?: true
    percentage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectStackMaxAggregateInputType = {
    id?: true
    projectId?: true
    stackId?: true
    percentage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectStackCountAggregateInputType = {
    id?: true
    projectId?: true
    stackId?: true
    percentage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectStackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectStack to aggregate.
     */
    where?: ProjectStackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStacks to fetch.
     */
    orderBy?: ProjectStackOrderByWithRelationInput | ProjectStackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectStackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectStacks
    **/
    _count?: true | ProjectStackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectStackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectStackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectStackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectStackMaxAggregateInputType
  }

  export type GetProjectStackAggregateType<T extends ProjectStackAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectStack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectStack[P]>
      : GetScalarType<T[P], AggregateProjectStack[P]>
  }




  export type ProjectStackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectStackWhereInput
    orderBy?: ProjectStackOrderByWithAggregationInput | ProjectStackOrderByWithAggregationInput[]
    by: ProjectStackScalarFieldEnum[] | ProjectStackScalarFieldEnum
    having?: ProjectStackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectStackCountAggregateInputType | true
    _avg?: ProjectStackAvgAggregateInputType
    _sum?: ProjectStackSumAggregateInputType
    _min?: ProjectStackMinAggregateInputType
    _max?: ProjectStackMaxAggregateInputType
  }

  export type ProjectStackGroupByOutputType = {
    id: string
    projectId: string
    stackId: string
    percentage: number
    createdAt: Date
    updatedAt: Date
    _count: ProjectStackCountAggregateOutputType | null
    _avg: ProjectStackAvgAggregateOutputType | null
    _sum: ProjectStackSumAggregateOutputType | null
    _min: ProjectStackMinAggregateOutputType | null
    _max: ProjectStackMaxAggregateOutputType | null
  }

  type GetProjectStackGroupByPayload<T extends ProjectStackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectStackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectStackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectStackGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectStackGroupByOutputType[P]>
        }
      >
    >


  export type ProjectStackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    stackId?: boolean
    percentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
    StackTaken?: boolean | ProjectStack$StackTakenArgs<ExtArgs>
    _count?: boolean | ProjectStackCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectStack"]>

  export type ProjectStackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    stackId?: boolean
    percentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectStack"]>

  export type ProjectStackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    stackId?: boolean
    percentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectStack"]>

  export type ProjectStackSelectScalar = {
    id?: boolean
    projectId?: boolean
    stackId?: boolean
    percentage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectStackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "stackId" | "percentage" | "createdAt" | "updatedAt", ExtArgs["result"]["projectStack"]>
  export type ProjectStackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
    StackTaken?: boolean | ProjectStack$StackTakenArgs<ExtArgs>
    _count?: boolean | ProjectStackCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectStackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
  }
  export type ProjectStackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
  }

  export type $ProjectStackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectStack"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      stack: Prisma.$StackPayload<ExtArgs>
      StackTaken: Prisma.$StackTakenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      stackId: string
      percentage: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectStack"]>
    composites: {}
  }

  type ProjectStackGetPayload<S extends boolean | null | undefined | ProjectStackDefaultArgs> = $Result.GetResult<Prisma.$ProjectStackPayload, S>

  type ProjectStackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectStackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectStackCountAggregateInputType | true
    }

  export interface ProjectStackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectStack'], meta: { name: 'ProjectStack' } }
    /**
     * Find zero or one ProjectStack that matches the filter.
     * @param {ProjectStackFindUniqueArgs} args - Arguments to find a ProjectStack
     * @example
     * // Get one ProjectStack
     * const projectStack = await prisma.projectStack.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectStackFindUniqueArgs>(args: SelectSubset<T, ProjectStackFindUniqueArgs<ExtArgs>>): Prisma__ProjectStackClient<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectStack that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectStackFindUniqueOrThrowArgs} args - Arguments to find a ProjectStack
     * @example
     * // Get one ProjectStack
     * const projectStack = await prisma.projectStack.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectStackFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectStackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectStackClient<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectStack that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStackFindFirstArgs} args - Arguments to find a ProjectStack
     * @example
     * // Get one ProjectStack
     * const projectStack = await prisma.projectStack.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectStackFindFirstArgs>(args?: SelectSubset<T, ProjectStackFindFirstArgs<ExtArgs>>): Prisma__ProjectStackClient<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectStack that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStackFindFirstOrThrowArgs} args - Arguments to find a ProjectStack
     * @example
     * // Get one ProjectStack
     * const projectStack = await prisma.projectStack.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectStackFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectStackFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectStackClient<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectStacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectStacks
     * const projectStacks = await prisma.projectStack.findMany()
     * 
     * // Get first 10 ProjectStacks
     * const projectStacks = await prisma.projectStack.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectStackWithIdOnly = await prisma.projectStack.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectStackFindManyArgs>(args?: SelectSubset<T, ProjectStackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectStack.
     * @param {ProjectStackCreateArgs} args - Arguments to create a ProjectStack.
     * @example
     * // Create one ProjectStack
     * const ProjectStack = await prisma.projectStack.create({
     *   data: {
     *     // ... data to create a ProjectStack
     *   }
     * })
     * 
     */
    create<T extends ProjectStackCreateArgs>(args: SelectSubset<T, ProjectStackCreateArgs<ExtArgs>>): Prisma__ProjectStackClient<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectStacks.
     * @param {ProjectStackCreateManyArgs} args - Arguments to create many ProjectStacks.
     * @example
     * // Create many ProjectStacks
     * const projectStack = await prisma.projectStack.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectStackCreateManyArgs>(args?: SelectSubset<T, ProjectStackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectStacks and returns the data saved in the database.
     * @param {ProjectStackCreateManyAndReturnArgs} args - Arguments to create many ProjectStacks.
     * @example
     * // Create many ProjectStacks
     * const projectStack = await prisma.projectStack.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectStacks and only return the `id`
     * const projectStackWithIdOnly = await prisma.projectStack.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectStackCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectStackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectStack.
     * @param {ProjectStackDeleteArgs} args - Arguments to delete one ProjectStack.
     * @example
     * // Delete one ProjectStack
     * const ProjectStack = await prisma.projectStack.delete({
     *   where: {
     *     // ... filter to delete one ProjectStack
     *   }
     * })
     * 
     */
    delete<T extends ProjectStackDeleteArgs>(args: SelectSubset<T, ProjectStackDeleteArgs<ExtArgs>>): Prisma__ProjectStackClient<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectStack.
     * @param {ProjectStackUpdateArgs} args - Arguments to update one ProjectStack.
     * @example
     * // Update one ProjectStack
     * const projectStack = await prisma.projectStack.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectStackUpdateArgs>(args: SelectSubset<T, ProjectStackUpdateArgs<ExtArgs>>): Prisma__ProjectStackClient<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectStacks.
     * @param {ProjectStackDeleteManyArgs} args - Arguments to filter ProjectStacks to delete.
     * @example
     * // Delete a few ProjectStacks
     * const { count } = await prisma.projectStack.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectStackDeleteManyArgs>(args?: SelectSubset<T, ProjectStackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectStacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectStacks
     * const projectStack = await prisma.projectStack.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectStackUpdateManyArgs>(args: SelectSubset<T, ProjectStackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectStacks and returns the data updated in the database.
     * @param {ProjectStackUpdateManyAndReturnArgs} args - Arguments to update many ProjectStacks.
     * @example
     * // Update many ProjectStacks
     * const projectStack = await prisma.projectStack.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectStacks and only return the `id`
     * const projectStackWithIdOnly = await prisma.projectStack.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectStackUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectStackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectStack.
     * @param {ProjectStackUpsertArgs} args - Arguments to update or create a ProjectStack.
     * @example
     * // Update or create a ProjectStack
     * const projectStack = await prisma.projectStack.upsert({
     *   create: {
     *     // ... data to create a ProjectStack
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectStack we want to update
     *   }
     * })
     */
    upsert<T extends ProjectStackUpsertArgs>(args: SelectSubset<T, ProjectStackUpsertArgs<ExtArgs>>): Prisma__ProjectStackClient<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectStacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStackCountArgs} args - Arguments to filter ProjectStacks to count.
     * @example
     * // Count the number of ProjectStacks
     * const count = await prisma.projectStack.count({
     *   where: {
     *     // ... the filter for the ProjectStacks we want to count
     *   }
     * })
    **/
    count<T extends ProjectStackCountArgs>(
      args?: Subset<T, ProjectStackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectStackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectStack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectStackAggregateArgs>(args: Subset<T, ProjectStackAggregateArgs>): Prisma.PrismaPromise<GetProjectStackAggregateType<T>>

    /**
     * Group by ProjectStack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectStackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectStackGroupByArgs['orderBy'] }
        : { orderBy?: ProjectStackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectStackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectStackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectStack model
   */
  readonly fields: ProjectStackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectStack.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectStackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stack<T extends StackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StackDefaultArgs<ExtArgs>>): Prisma__StackClient<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    StackTaken<T extends ProjectStack$StackTakenArgs<ExtArgs> = {}>(args?: Subset<T, ProjectStack$StackTakenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectStack model
   */
  interface ProjectStackFieldRefs {
    readonly id: FieldRef<"ProjectStack", 'String'>
    readonly projectId: FieldRef<"ProjectStack", 'String'>
    readonly stackId: FieldRef<"ProjectStack", 'String'>
    readonly percentage: FieldRef<"ProjectStack", 'Float'>
    readonly createdAt: FieldRef<"ProjectStack", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectStack", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectStack findUnique
   */
  export type ProjectStackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStack to fetch.
     */
    where: ProjectStackWhereUniqueInput
  }

  /**
   * ProjectStack findUniqueOrThrow
   */
  export type ProjectStackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStack to fetch.
     */
    where: ProjectStackWhereUniqueInput
  }

  /**
   * ProjectStack findFirst
   */
  export type ProjectStackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStack to fetch.
     */
    where?: ProjectStackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStacks to fetch.
     */
    orderBy?: ProjectStackOrderByWithRelationInput | ProjectStackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectStacks.
     */
    cursor?: ProjectStackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectStacks.
     */
    distinct?: ProjectStackScalarFieldEnum | ProjectStackScalarFieldEnum[]
  }

  /**
   * ProjectStack findFirstOrThrow
   */
  export type ProjectStackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStack to fetch.
     */
    where?: ProjectStackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStacks to fetch.
     */
    orderBy?: ProjectStackOrderByWithRelationInput | ProjectStackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectStacks.
     */
    cursor?: ProjectStackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectStacks.
     */
    distinct?: ProjectStackScalarFieldEnum | ProjectStackScalarFieldEnum[]
  }

  /**
   * ProjectStack findMany
   */
  export type ProjectStackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStacks to fetch.
     */
    where?: ProjectStackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStacks to fetch.
     */
    orderBy?: ProjectStackOrderByWithRelationInput | ProjectStackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectStacks.
     */
    cursor?: ProjectStackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStacks.
     */
    skip?: number
    distinct?: ProjectStackScalarFieldEnum | ProjectStackScalarFieldEnum[]
  }

  /**
   * ProjectStack create
   */
  export type ProjectStackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectStack.
     */
    data: XOR<ProjectStackCreateInput, ProjectStackUncheckedCreateInput>
  }

  /**
   * ProjectStack createMany
   */
  export type ProjectStackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectStacks.
     */
    data: ProjectStackCreateManyInput | ProjectStackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectStack createManyAndReturn
   */
  export type ProjectStackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectStacks.
     */
    data: ProjectStackCreateManyInput | ProjectStackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectStack update
   */
  export type ProjectStackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectStack.
     */
    data: XOR<ProjectStackUpdateInput, ProjectStackUncheckedUpdateInput>
    /**
     * Choose, which ProjectStack to update.
     */
    where: ProjectStackWhereUniqueInput
  }

  /**
   * ProjectStack updateMany
   */
  export type ProjectStackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectStacks.
     */
    data: XOR<ProjectStackUpdateManyMutationInput, ProjectStackUncheckedUpdateManyInput>
    /**
     * Filter which ProjectStacks to update
     */
    where?: ProjectStackWhereInput
    /**
     * Limit how many ProjectStacks to update.
     */
    limit?: number
  }

  /**
   * ProjectStack updateManyAndReturn
   */
  export type ProjectStackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * The data used to update ProjectStacks.
     */
    data: XOR<ProjectStackUpdateManyMutationInput, ProjectStackUncheckedUpdateManyInput>
    /**
     * Filter which ProjectStacks to update
     */
    where?: ProjectStackWhereInput
    /**
     * Limit how many ProjectStacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectStack upsert
   */
  export type ProjectStackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectStack to update in case it exists.
     */
    where: ProjectStackWhereUniqueInput
    /**
     * In case the ProjectStack found by the `where` argument doesn't exist, create a new ProjectStack with this data.
     */
    create: XOR<ProjectStackCreateInput, ProjectStackUncheckedCreateInput>
    /**
     * In case the ProjectStack was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectStackUpdateInput, ProjectStackUncheckedUpdateInput>
  }

  /**
   * ProjectStack delete
   */
  export type ProjectStackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
    /**
     * Filter which ProjectStack to delete.
     */
    where: ProjectStackWhereUniqueInput
  }

  /**
   * ProjectStack deleteMany
   */
  export type ProjectStackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectStacks to delete
     */
    where?: ProjectStackWhereInput
    /**
     * Limit how many ProjectStacks to delete.
     */
    limit?: number
  }

  /**
   * ProjectStack.StackTaken
   */
  export type ProjectStack$StackTakenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    where?: StackTakenWhereInput
    orderBy?: StackTakenOrderByWithRelationInput | StackTakenOrderByWithRelationInput[]
    cursor?: StackTakenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StackTakenScalarFieldEnum | StackTakenScalarFieldEnum[]
  }

  /**
   * ProjectStack without action
   */
  export type ProjectStackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStack
     */
    select?: ProjectStackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStack
     */
    omit?: ProjectStackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStackInclude<ExtArgs> | null
  }


  /**
   * Model StackTaken
   */

  export type AggregateStackTaken = {
    _count: StackTakenCountAggregateOutputType | null
    _min: StackTakenMinAggregateOutputType | null
    _max: StackTakenMaxAggregateOutputType | null
  }

  export type StackTakenMinAggregateOutputType = {
    id: string | null
    projectStackId: string | null
    userId: string | null
    stackId: string | null
    projectId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StackTakenMaxAggregateOutputType = {
    id: string | null
    projectStackId: string | null
    userId: string | null
    stackId: string | null
    projectId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StackTakenCountAggregateOutputType = {
    id: number
    projectStackId: number
    userId: number
    stackId: number
    projectId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StackTakenMinAggregateInputType = {
    id?: true
    projectStackId?: true
    userId?: true
    stackId?: true
    projectId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StackTakenMaxAggregateInputType = {
    id?: true
    projectStackId?: true
    userId?: true
    stackId?: true
    projectId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StackTakenCountAggregateInputType = {
    id?: true
    projectStackId?: true
    userId?: true
    stackId?: true
    projectId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StackTakenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StackTaken to aggregate.
     */
    where?: StackTakenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StackTakens to fetch.
     */
    orderBy?: StackTakenOrderByWithRelationInput | StackTakenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StackTakenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StackTakens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StackTakens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StackTakens
    **/
    _count?: true | StackTakenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StackTakenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StackTakenMaxAggregateInputType
  }

  export type GetStackTakenAggregateType<T extends StackTakenAggregateArgs> = {
        [P in keyof T & keyof AggregateStackTaken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStackTaken[P]>
      : GetScalarType<T[P], AggregateStackTaken[P]>
  }




  export type StackTakenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StackTakenWhereInput
    orderBy?: StackTakenOrderByWithAggregationInput | StackTakenOrderByWithAggregationInput[]
    by: StackTakenScalarFieldEnum[] | StackTakenScalarFieldEnum
    having?: StackTakenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StackTakenCountAggregateInputType | true
    _min?: StackTakenMinAggregateInputType
    _max?: StackTakenMaxAggregateInputType
  }

  export type StackTakenGroupByOutputType = {
    id: string
    projectStackId: string
    userId: string
    stackId: string
    projectId: string
    createdAt: Date
    updatedAt: Date
    _count: StackTakenCountAggregateOutputType | null
    _min: StackTakenMinAggregateOutputType | null
    _max: StackTakenMaxAggregateOutputType | null
  }

  type GetStackTakenGroupByPayload<T extends StackTakenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StackTakenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StackTakenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StackTakenGroupByOutputType[P]>
            : GetScalarType<T[P], StackTakenGroupByOutputType[P]>
        }
      >
    >


  export type StackTakenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectStackId?: boolean
    userId?: boolean
    stackId?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectStack?: boolean | ProjectStackDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stackTaken"]>

  export type StackTakenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectStackId?: boolean
    userId?: boolean
    stackId?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectStack?: boolean | ProjectStackDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stackTaken"]>

  export type StackTakenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectStackId?: boolean
    userId?: boolean
    stackId?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectStack?: boolean | ProjectStackDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stackTaken"]>

  export type StackTakenSelectScalar = {
    id?: boolean
    projectStackId?: boolean
    userId?: boolean
    stackId?: boolean
    projectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StackTakenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectStackId" | "userId" | "stackId" | "projectId" | "createdAt" | "updatedAt", ExtArgs["result"]["stackTaken"]>
  export type StackTakenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectStack?: boolean | ProjectStackDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type StackTakenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectStack?: boolean | ProjectStackDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type StackTakenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projectStack?: boolean | ProjectStackDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    stack?: boolean | StackDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $StackTakenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StackTaken"
    objects: {
      projectStack: Prisma.$ProjectStackPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      stack: Prisma.$StackPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectStackId: string
      userId: string
      stackId: string
      projectId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stackTaken"]>
    composites: {}
  }

  type StackTakenGetPayload<S extends boolean | null | undefined | StackTakenDefaultArgs> = $Result.GetResult<Prisma.$StackTakenPayload, S>

  type StackTakenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StackTakenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StackTakenCountAggregateInputType | true
    }

  export interface StackTakenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StackTaken'], meta: { name: 'StackTaken' } }
    /**
     * Find zero or one StackTaken that matches the filter.
     * @param {StackTakenFindUniqueArgs} args - Arguments to find a StackTaken
     * @example
     * // Get one StackTaken
     * const stackTaken = await prisma.stackTaken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StackTakenFindUniqueArgs>(args: SelectSubset<T, StackTakenFindUniqueArgs<ExtArgs>>): Prisma__StackTakenClient<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StackTaken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StackTakenFindUniqueOrThrowArgs} args - Arguments to find a StackTaken
     * @example
     * // Get one StackTaken
     * const stackTaken = await prisma.stackTaken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StackTakenFindUniqueOrThrowArgs>(args: SelectSubset<T, StackTakenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StackTakenClient<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StackTaken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackTakenFindFirstArgs} args - Arguments to find a StackTaken
     * @example
     * // Get one StackTaken
     * const stackTaken = await prisma.stackTaken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StackTakenFindFirstArgs>(args?: SelectSubset<T, StackTakenFindFirstArgs<ExtArgs>>): Prisma__StackTakenClient<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StackTaken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackTakenFindFirstOrThrowArgs} args - Arguments to find a StackTaken
     * @example
     * // Get one StackTaken
     * const stackTaken = await prisma.stackTaken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StackTakenFindFirstOrThrowArgs>(args?: SelectSubset<T, StackTakenFindFirstOrThrowArgs<ExtArgs>>): Prisma__StackTakenClient<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StackTakens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackTakenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StackTakens
     * const stackTakens = await prisma.stackTaken.findMany()
     * 
     * // Get first 10 StackTakens
     * const stackTakens = await prisma.stackTaken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stackTakenWithIdOnly = await prisma.stackTaken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StackTakenFindManyArgs>(args?: SelectSubset<T, StackTakenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StackTaken.
     * @param {StackTakenCreateArgs} args - Arguments to create a StackTaken.
     * @example
     * // Create one StackTaken
     * const StackTaken = await prisma.stackTaken.create({
     *   data: {
     *     // ... data to create a StackTaken
     *   }
     * })
     * 
     */
    create<T extends StackTakenCreateArgs>(args: SelectSubset<T, StackTakenCreateArgs<ExtArgs>>): Prisma__StackTakenClient<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StackTakens.
     * @param {StackTakenCreateManyArgs} args - Arguments to create many StackTakens.
     * @example
     * // Create many StackTakens
     * const stackTaken = await prisma.stackTaken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StackTakenCreateManyArgs>(args?: SelectSubset<T, StackTakenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StackTakens and returns the data saved in the database.
     * @param {StackTakenCreateManyAndReturnArgs} args - Arguments to create many StackTakens.
     * @example
     * // Create many StackTakens
     * const stackTaken = await prisma.stackTaken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StackTakens and only return the `id`
     * const stackTakenWithIdOnly = await prisma.stackTaken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StackTakenCreateManyAndReturnArgs>(args?: SelectSubset<T, StackTakenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StackTaken.
     * @param {StackTakenDeleteArgs} args - Arguments to delete one StackTaken.
     * @example
     * // Delete one StackTaken
     * const StackTaken = await prisma.stackTaken.delete({
     *   where: {
     *     // ... filter to delete one StackTaken
     *   }
     * })
     * 
     */
    delete<T extends StackTakenDeleteArgs>(args: SelectSubset<T, StackTakenDeleteArgs<ExtArgs>>): Prisma__StackTakenClient<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StackTaken.
     * @param {StackTakenUpdateArgs} args - Arguments to update one StackTaken.
     * @example
     * // Update one StackTaken
     * const stackTaken = await prisma.stackTaken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StackTakenUpdateArgs>(args: SelectSubset<T, StackTakenUpdateArgs<ExtArgs>>): Prisma__StackTakenClient<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StackTakens.
     * @param {StackTakenDeleteManyArgs} args - Arguments to filter StackTakens to delete.
     * @example
     * // Delete a few StackTakens
     * const { count } = await prisma.stackTaken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StackTakenDeleteManyArgs>(args?: SelectSubset<T, StackTakenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StackTakens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackTakenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StackTakens
     * const stackTaken = await prisma.stackTaken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StackTakenUpdateManyArgs>(args: SelectSubset<T, StackTakenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StackTakens and returns the data updated in the database.
     * @param {StackTakenUpdateManyAndReturnArgs} args - Arguments to update many StackTakens.
     * @example
     * // Update many StackTakens
     * const stackTaken = await prisma.stackTaken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StackTakens and only return the `id`
     * const stackTakenWithIdOnly = await prisma.stackTaken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StackTakenUpdateManyAndReturnArgs>(args: SelectSubset<T, StackTakenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StackTaken.
     * @param {StackTakenUpsertArgs} args - Arguments to update or create a StackTaken.
     * @example
     * // Update or create a StackTaken
     * const stackTaken = await prisma.stackTaken.upsert({
     *   create: {
     *     // ... data to create a StackTaken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StackTaken we want to update
     *   }
     * })
     */
    upsert<T extends StackTakenUpsertArgs>(args: SelectSubset<T, StackTakenUpsertArgs<ExtArgs>>): Prisma__StackTakenClient<$Result.GetResult<Prisma.$StackTakenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StackTakens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackTakenCountArgs} args - Arguments to filter StackTakens to count.
     * @example
     * // Count the number of StackTakens
     * const count = await prisma.stackTaken.count({
     *   where: {
     *     // ... the filter for the StackTakens we want to count
     *   }
     * })
    **/
    count<T extends StackTakenCountArgs>(
      args?: Subset<T, StackTakenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StackTakenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StackTaken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackTakenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StackTakenAggregateArgs>(args: Subset<T, StackTakenAggregateArgs>): Prisma.PrismaPromise<GetStackTakenAggregateType<T>>

    /**
     * Group by StackTaken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StackTakenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StackTakenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StackTakenGroupByArgs['orderBy'] }
        : { orderBy?: StackTakenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StackTakenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStackTakenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StackTaken model
   */
  readonly fields: StackTakenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StackTaken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StackTakenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projectStack<T extends ProjectStackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectStackDefaultArgs<ExtArgs>>): Prisma__ProjectStackClient<$Result.GetResult<Prisma.$ProjectStackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stack<T extends StackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StackDefaultArgs<ExtArgs>>): Prisma__StackClient<$Result.GetResult<Prisma.$StackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StackTaken model
   */
  interface StackTakenFieldRefs {
    readonly id: FieldRef<"StackTaken", 'String'>
    readonly projectStackId: FieldRef<"StackTaken", 'String'>
    readonly userId: FieldRef<"StackTaken", 'String'>
    readonly stackId: FieldRef<"StackTaken", 'String'>
    readonly projectId: FieldRef<"StackTaken", 'String'>
    readonly createdAt: FieldRef<"StackTaken", 'DateTime'>
    readonly updatedAt: FieldRef<"StackTaken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StackTaken findUnique
   */
  export type StackTakenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    /**
     * Filter, which StackTaken to fetch.
     */
    where: StackTakenWhereUniqueInput
  }

  /**
   * StackTaken findUniqueOrThrow
   */
  export type StackTakenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    /**
     * Filter, which StackTaken to fetch.
     */
    where: StackTakenWhereUniqueInput
  }

  /**
   * StackTaken findFirst
   */
  export type StackTakenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    /**
     * Filter, which StackTaken to fetch.
     */
    where?: StackTakenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StackTakens to fetch.
     */
    orderBy?: StackTakenOrderByWithRelationInput | StackTakenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StackTakens.
     */
    cursor?: StackTakenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StackTakens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StackTakens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StackTakens.
     */
    distinct?: StackTakenScalarFieldEnum | StackTakenScalarFieldEnum[]
  }

  /**
   * StackTaken findFirstOrThrow
   */
  export type StackTakenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    /**
     * Filter, which StackTaken to fetch.
     */
    where?: StackTakenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StackTakens to fetch.
     */
    orderBy?: StackTakenOrderByWithRelationInput | StackTakenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StackTakens.
     */
    cursor?: StackTakenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StackTakens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StackTakens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StackTakens.
     */
    distinct?: StackTakenScalarFieldEnum | StackTakenScalarFieldEnum[]
  }

  /**
   * StackTaken findMany
   */
  export type StackTakenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    /**
     * Filter, which StackTakens to fetch.
     */
    where?: StackTakenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StackTakens to fetch.
     */
    orderBy?: StackTakenOrderByWithRelationInput | StackTakenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StackTakens.
     */
    cursor?: StackTakenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StackTakens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StackTakens.
     */
    skip?: number
    distinct?: StackTakenScalarFieldEnum | StackTakenScalarFieldEnum[]
  }

  /**
   * StackTaken create
   */
  export type StackTakenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    /**
     * The data needed to create a StackTaken.
     */
    data: XOR<StackTakenCreateInput, StackTakenUncheckedCreateInput>
  }

  /**
   * StackTaken createMany
   */
  export type StackTakenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StackTakens.
     */
    data: StackTakenCreateManyInput | StackTakenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StackTaken createManyAndReturn
   */
  export type StackTakenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * The data used to create many StackTakens.
     */
    data: StackTakenCreateManyInput | StackTakenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StackTaken update
   */
  export type StackTakenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    /**
     * The data needed to update a StackTaken.
     */
    data: XOR<StackTakenUpdateInput, StackTakenUncheckedUpdateInput>
    /**
     * Choose, which StackTaken to update.
     */
    where: StackTakenWhereUniqueInput
  }

  /**
   * StackTaken updateMany
   */
  export type StackTakenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StackTakens.
     */
    data: XOR<StackTakenUpdateManyMutationInput, StackTakenUncheckedUpdateManyInput>
    /**
     * Filter which StackTakens to update
     */
    where?: StackTakenWhereInput
    /**
     * Limit how many StackTakens to update.
     */
    limit?: number
  }

  /**
   * StackTaken updateManyAndReturn
   */
  export type StackTakenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * The data used to update StackTakens.
     */
    data: XOR<StackTakenUpdateManyMutationInput, StackTakenUncheckedUpdateManyInput>
    /**
     * Filter which StackTakens to update
     */
    where?: StackTakenWhereInput
    /**
     * Limit how many StackTakens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StackTaken upsert
   */
  export type StackTakenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    /**
     * The filter to search for the StackTaken to update in case it exists.
     */
    where: StackTakenWhereUniqueInput
    /**
     * In case the StackTaken found by the `where` argument doesn't exist, create a new StackTaken with this data.
     */
    create: XOR<StackTakenCreateInput, StackTakenUncheckedCreateInput>
    /**
     * In case the StackTaken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StackTakenUpdateInput, StackTakenUncheckedUpdateInput>
  }

  /**
   * StackTaken delete
   */
  export type StackTakenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
    /**
     * Filter which StackTaken to delete.
     */
    where: StackTakenWhereUniqueInput
  }

  /**
   * StackTaken deleteMany
   */
  export type StackTakenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StackTakens to delete
     */
    where?: StackTakenWhereInput
    /**
     * Limit how many StackTakens to delete.
     */
    limit?: number
  }

  /**
   * StackTaken without action
   */
  export type StackTakenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StackTaken
     */
    select?: StackTakenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StackTaken
     */
    omit?: StackTakenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StackTakenInclude<ExtArgs> | null
  }


  /**
   * Model UserSkill
   */

  export type AggregateUserSkill = {
    _count: UserSkillCountAggregateOutputType | null
    _min: UserSkillMinAggregateOutputType | null
    _max: UserSkillMaxAggregateOutputType | null
  }

  export type UserSkillMinAggregateOutputType = {
    id: string | null
    userId: string | null
    skillId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSkillMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    skillId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSkillCountAggregateOutputType = {
    id: number
    userId: number
    skillId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserSkillMinAggregateInputType = {
    id?: true
    userId?: true
    skillId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSkillMaxAggregateInputType = {
    id?: true
    userId?: true
    skillId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSkillCountAggregateInputType = {
    id?: true
    userId?: true
    skillId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSkill to aggregate.
     */
    where?: UserSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSkills to fetch.
     */
    orderBy?: UserSkillOrderByWithRelationInput | UserSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSkills
    **/
    _count?: true | UserSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSkillMaxAggregateInputType
  }

  export type GetUserSkillAggregateType<T extends UserSkillAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSkill[P]>
      : GetScalarType<T[P], AggregateUserSkill[P]>
  }




  export type UserSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSkillWhereInput
    orderBy?: UserSkillOrderByWithAggregationInput | UserSkillOrderByWithAggregationInput[]
    by: UserSkillScalarFieldEnum[] | UserSkillScalarFieldEnum
    having?: UserSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSkillCountAggregateInputType | true
    _min?: UserSkillMinAggregateInputType
    _max?: UserSkillMaxAggregateInputType
  }

  export type UserSkillGroupByOutputType = {
    id: string
    userId: string
    skillId: string
    createdAt: Date
    updatedAt: Date
    _count: UserSkillCountAggregateOutputType | null
    _min: UserSkillMinAggregateOutputType | null
    _max: UserSkillMaxAggregateOutputType | null
  }

  type GetUserSkillGroupByPayload<T extends UserSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSkillGroupByOutputType[P]>
            : GetScalarType<T[P], UserSkillGroupByOutputType[P]>
        }
      >
    >


  export type UserSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    skillId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSkill"]>

  export type UserSkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    skillId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSkill"]>

  export type UserSkillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    skillId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSkill"]>

  export type UserSkillSelectScalar = {
    id?: boolean
    userId?: boolean
    skillId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserSkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "skillId" | "createdAt" | "updatedAt", ExtArgs["result"]["userSkill"]>
  export type UserSkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }
  export type UserSkillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }
  export type UserSkillIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }

  export type $UserSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSkill"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      skill: Prisma.$SkillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      skillId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userSkill"]>
    composites: {}
  }

  type UserSkillGetPayload<S extends boolean | null | undefined | UserSkillDefaultArgs> = $Result.GetResult<Prisma.$UserSkillPayload, S>

  type UserSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSkillCountAggregateInputType | true
    }

  export interface UserSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSkill'], meta: { name: 'UserSkill' } }
    /**
     * Find zero or one UserSkill that matches the filter.
     * @param {UserSkillFindUniqueArgs} args - Arguments to find a UserSkill
     * @example
     * // Get one UserSkill
     * const userSkill = await prisma.userSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSkillFindUniqueArgs>(args: SelectSubset<T, UserSkillFindUniqueArgs<ExtArgs>>): Prisma__UserSkillClient<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSkill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSkillFindUniqueOrThrowArgs} args - Arguments to find a UserSkill
     * @example
     * // Get one UserSkill
     * const userSkill = await prisma.userSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSkillClient<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSkillFindFirstArgs} args - Arguments to find a UserSkill
     * @example
     * // Get one UserSkill
     * const userSkill = await prisma.userSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSkillFindFirstArgs>(args?: SelectSubset<T, UserSkillFindFirstArgs<ExtArgs>>): Prisma__UserSkillClient<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSkillFindFirstOrThrowArgs} args - Arguments to find a UserSkill
     * @example
     * // Get one UserSkill
     * const userSkill = await prisma.userSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSkillClient<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSkills
     * const userSkills = await prisma.userSkill.findMany()
     * 
     * // Get first 10 UserSkills
     * const userSkills = await prisma.userSkill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSkillWithIdOnly = await prisma.userSkill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSkillFindManyArgs>(args?: SelectSubset<T, UserSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSkill.
     * @param {UserSkillCreateArgs} args - Arguments to create a UserSkill.
     * @example
     * // Create one UserSkill
     * const UserSkill = await prisma.userSkill.create({
     *   data: {
     *     // ... data to create a UserSkill
     *   }
     * })
     * 
     */
    create<T extends UserSkillCreateArgs>(args: SelectSubset<T, UserSkillCreateArgs<ExtArgs>>): Prisma__UserSkillClient<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSkills.
     * @param {UserSkillCreateManyArgs} args - Arguments to create many UserSkills.
     * @example
     * // Create many UserSkills
     * const userSkill = await prisma.userSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSkillCreateManyArgs>(args?: SelectSubset<T, UserSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSkills and returns the data saved in the database.
     * @param {UserSkillCreateManyAndReturnArgs} args - Arguments to create many UserSkills.
     * @example
     * // Create many UserSkills
     * const userSkill = await prisma.userSkill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSkills and only return the `id`
     * const userSkillWithIdOnly = await prisma.userSkill.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSkillCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSkill.
     * @param {UserSkillDeleteArgs} args - Arguments to delete one UserSkill.
     * @example
     * // Delete one UserSkill
     * const UserSkill = await prisma.userSkill.delete({
     *   where: {
     *     // ... filter to delete one UserSkill
     *   }
     * })
     * 
     */
    delete<T extends UserSkillDeleteArgs>(args: SelectSubset<T, UserSkillDeleteArgs<ExtArgs>>): Prisma__UserSkillClient<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSkill.
     * @param {UserSkillUpdateArgs} args - Arguments to update one UserSkill.
     * @example
     * // Update one UserSkill
     * const userSkill = await prisma.userSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSkillUpdateArgs>(args: SelectSubset<T, UserSkillUpdateArgs<ExtArgs>>): Prisma__UserSkillClient<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSkills.
     * @param {UserSkillDeleteManyArgs} args - Arguments to filter UserSkills to delete.
     * @example
     * // Delete a few UserSkills
     * const { count } = await prisma.userSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSkillDeleteManyArgs>(args?: SelectSubset<T, UserSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSkills
     * const userSkill = await prisma.userSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSkillUpdateManyArgs>(args: SelectSubset<T, UserSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSkills and returns the data updated in the database.
     * @param {UserSkillUpdateManyAndReturnArgs} args - Arguments to update many UserSkills.
     * @example
     * // Update many UserSkills
     * const userSkill = await prisma.userSkill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSkills and only return the `id`
     * const userSkillWithIdOnly = await prisma.userSkill.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSkillUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSkillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSkill.
     * @param {UserSkillUpsertArgs} args - Arguments to update or create a UserSkill.
     * @example
     * // Update or create a UserSkill
     * const userSkill = await prisma.userSkill.upsert({
     *   create: {
     *     // ... data to create a UserSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSkill we want to update
     *   }
     * })
     */
    upsert<T extends UserSkillUpsertArgs>(args: SelectSubset<T, UserSkillUpsertArgs<ExtArgs>>): Prisma__UserSkillClient<$Result.GetResult<Prisma.$UserSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSkillCountArgs} args - Arguments to filter UserSkills to count.
     * @example
     * // Count the number of UserSkills
     * const count = await prisma.userSkill.count({
     *   where: {
     *     // ... the filter for the UserSkills we want to count
     *   }
     * })
    **/
    count<T extends UserSkillCountArgs>(
      args?: Subset<T, UserSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSkillAggregateArgs>(args: Subset<T, UserSkillAggregateArgs>): Prisma.PrismaPromise<GetUserSkillAggregateType<T>>

    /**
     * Group by UserSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSkillGroupByArgs['orderBy'] }
        : { orderBy?: UserSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSkill model
   */
  readonly fields: UserSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skill<T extends SkillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillDefaultArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSkill model
   */
  interface UserSkillFieldRefs {
    readonly id: FieldRef<"UserSkill", 'String'>
    readonly userId: FieldRef<"UserSkill", 'String'>
    readonly skillId: FieldRef<"UserSkill", 'String'>
    readonly createdAt: FieldRef<"UserSkill", 'DateTime'>
    readonly updatedAt: FieldRef<"UserSkill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSkill findUnique
   */
  export type UserSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    /**
     * Filter, which UserSkill to fetch.
     */
    where: UserSkillWhereUniqueInput
  }

  /**
   * UserSkill findUniqueOrThrow
   */
  export type UserSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    /**
     * Filter, which UserSkill to fetch.
     */
    where: UserSkillWhereUniqueInput
  }

  /**
   * UserSkill findFirst
   */
  export type UserSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    /**
     * Filter, which UserSkill to fetch.
     */
    where?: UserSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSkills to fetch.
     */
    orderBy?: UserSkillOrderByWithRelationInput | UserSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSkills.
     */
    cursor?: UserSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSkills.
     */
    distinct?: UserSkillScalarFieldEnum | UserSkillScalarFieldEnum[]
  }

  /**
   * UserSkill findFirstOrThrow
   */
  export type UserSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    /**
     * Filter, which UserSkill to fetch.
     */
    where?: UserSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSkills to fetch.
     */
    orderBy?: UserSkillOrderByWithRelationInput | UserSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSkills.
     */
    cursor?: UserSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSkills.
     */
    distinct?: UserSkillScalarFieldEnum | UserSkillScalarFieldEnum[]
  }

  /**
   * UserSkill findMany
   */
  export type UserSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    /**
     * Filter, which UserSkills to fetch.
     */
    where?: UserSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSkills to fetch.
     */
    orderBy?: UserSkillOrderByWithRelationInput | UserSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSkills.
     */
    cursor?: UserSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSkills.
     */
    skip?: number
    distinct?: UserSkillScalarFieldEnum | UserSkillScalarFieldEnum[]
  }

  /**
   * UserSkill create
   */
  export type UserSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSkill.
     */
    data: XOR<UserSkillCreateInput, UserSkillUncheckedCreateInput>
  }

  /**
   * UserSkill createMany
   */
  export type UserSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSkills.
     */
    data: UserSkillCreateManyInput | UserSkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSkill createManyAndReturn
   */
  export type UserSkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * The data used to create many UserSkills.
     */
    data: UserSkillCreateManyInput | UserSkillCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSkill update
   */
  export type UserSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSkill.
     */
    data: XOR<UserSkillUpdateInput, UserSkillUncheckedUpdateInput>
    /**
     * Choose, which UserSkill to update.
     */
    where: UserSkillWhereUniqueInput
  }

  /**
   * UserSkill updateMany
   */
  export type UserSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSkills.
     */
    data: XOR<UserSkillUpdateManyMutationInput, UserSkillUncheckedUpdateManyInput>
    /**
     * Filter which UserSkills to update
     */
    where?: UserSkillWhereInput
    /**
     * Limit how many UserSkills to update.
     */
    limit?: number
  }

  /**
   * UserSkill updateManyAndReturn
   */
  export type UserSkillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * The data used to update UserSkills.
     */
    data: XOR<UserSkillUpdateManyMutationInput, UserSkillUncheckedUpdateManyInput>
    /**
     * Filter which UserSkills to update
     */
    where?: UserSkillWhereInput
    /**
     * Limit how many UserSkills to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSkill upsert
   */
  export type UserSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSkill to update in case it exists.
     */
    where: UserSkillWhereUniqueInput
    /**
     * In case the UserSkill found by the `where` argument doesn't exist, create a new UserSkill with this data.
     */
    create: XOR<UserSkillCreateInput, UserSkillUncheckedCreateInput>
    /**
     * In case the UserSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSkillUpdateInput, UserSkillUncheckedUpdateInput>
  }

  /**
   * UserSkill delete
   */
  export type UserSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
    /**
     * Filter which UserSkill to delete.
     */
    where: UserSkillWhereUniqueInput
  }

  /**
   * UserSkill deleteMany
   */
  export type UserSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSkills to delete
     */
    where?: UserSkillWhereInput
    /**
     * Limit how many UserSkills to delete.
     */
    limit?: number
  }

  /**
   * UserSkill without action
   */
  export type UserSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSkill
     */
    select?: UserSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSkill
     */
    omit?: UserSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSkillInclude<ExtArgs> | null
  }


  /**
   * Model ProjectSkill
   */

  export type AggregateProjectSkill = {
    _count: ProjectSkillCountAggregateOutputType | null
    _min: ProjectSkillMinAggregateOutputType | null
    _max: ProjectSkillMaxAggregateOutputType | null
  }

  export type ProjectSkillMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    skillId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectSkillMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    skillId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectSkillCountAggregateOutputType = {
    id: number
    projectId: number
    skillId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectSkillMinAggregateInputType = {
    id?: true
    projectId?: true
    skillId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectSkillMaxAggregateInputType = {
    id?: true
    projectId?: true
    skillId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectSkillCountAggregateInputType = {
    id?: true
    projectId?: true
    skillId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectSkill to aggregate.
     */
    where?: ProjectSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectSkills to fetch.
     */
    orderBy?: ProjectSkillOrderByWithRelationInput | ProjectSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectSkills
    **/
    _count?: true | ProjectSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectSkillMaxAggregateInputType
  }

  export type GetProjectSkillAggregateType<T extends ProjectSkillAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectSkill[P]>
      : GetScalarType<T[P], AggregateProjectSkill[P]>
  }




  export type ProjectSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectSkillWhereInput
    orderBy?: ProjectSkillOrderByWithAggregationInput | ProjectSkillOrderByWithAggregationInput[]
    by: ProjectSkillScalarFieldEnum[] | ProjectSkillScalarFieldEnum
    having?: ProjectSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectSkillCountAggregateInputType | true
    _min?: ProjectSkillMinAggregateInputType
    _max?: ProjectSkillMaxAggregateInputType
  }

  export type ProjectSkillGroupByOutputType = {
    id: string
    projectId: string
    skillId: string
    createdAt: Date
    updatedAt: Date
    _count: ProjectSkillCountAggregateOutputType | null
    _min: ProjectSkillMinAggregateOutputType | null
    _max: ProjectSkillMaxAggregateOutputType | null
  }

  type GetProjectSkillGroupByPayload<T extends ProjectSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectSkillGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectSkillGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    skillId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectSkill"]>

  export type ProjectSkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    skillId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectSkill"]>

  export type ProjectSkillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    skillId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectSkill"]>

  export type ProjectSkillSelectScalar = {
    id?: boolean
    projectId?: boolean
    skillId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectSkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "skillId" | "createdAt" | "updatedAt", ExtArgs["result"]["projectSkill"]>
  export type ProjectSkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }
  export type ProjectSkillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }
  export type ProjectSkillIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }

  export type $ProjectSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectSkill"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      skill: Prisma.$SkillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      skillId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectSkill"]>
    composites: {}
  }

  type ProjectSkillGetPayload<S extends boolean | null | undefined | ProjectSkillDefaultArgs> = $Result.GetResult<Prisma.$ProjectSkillPayload, S>

  type ProjectSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectSkillCountAggregateInputType | true
    }

  export interface ProjectSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectSkill'], meta: { name: 'ProjectSkill' } }
    /**
     * Find zero or one ProjectSkill that matches the filter.
     * @param {ProjectSkillFindUniqueArgs} args - Arguments to find a ProjectSkill
     * @example
     * // Get one ProjectSkill
     * const projectSkill = await prisma.projectSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectSkillFindUniqueArgs>(args: SelectSubset<T, ProjectSkillFindUniqueArgs<ExtArgs>>): Prisma__ProjectSkillClient<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectSkill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectSkillFindUniqueOrThrowArgs} args - Arguments to find a ProjectSkill
     * @example
     * // Get one ProjectSkill
     * const projectSkill = await prisma.projectSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectSkillClient<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSkillFindFirstArgs} args - Arguments to find a ProjectSkill
     * @example
     * // Get one ProjectSkill
     * const projectSkill = await prisma.projectSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectSkillFindFirstArgs>(args?: SelectSubset<T, ProjectSkillFindFirstArgs<ExtArgs>>): Prisma__ProjectSkillClient<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSkillFindFirstOrThrowArgs} args - Arguments to find a ProjectSkill
     * @example
     * // Get one ProjectSkill
     * const projectSkill = await prisma.projectSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectSkillClient<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectSkills
     * const projectSkills = await prisma.projectSkill.findMany()
     * 
     * // Get first 10 ProjectSkills
     * const projectSkills = await prisma.projectSkill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectSkillWithIdOnly = await prisma.projectSkill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectSkillFindManyArgs>(args?: SelectSubset<T, ProjectSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectSkill.
     * @param {ProjectSkillCreateArgs} args - Arguments to create a ProjectSkill.
     * @example
     * // Create one ProjectSkill
     * const ProjectSkill = await prisma.projectSkill.create({
     *   data: {
     *     // ... data to create a ProjectSkill
     *   }
     * })
     * 
     */
    create<T extends ProjectSkillCreateArgs>(args: SelectSubset<T, ProjectSkillCreateArgs<ExtArgs>>): Prisma__ProjectSkillClient<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectSkills.
     * @param {ProjectSkillCreateManyArgs} args - Arguments to create many ProjectSkills.
     * @example
     * // Create many ProjectSkills
     * const projectSkill = await prisma.projectSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectSkillCreateManyArgs>(args?: SelectSubset<T, ProjectSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectSkills and returns the data saved in the database.
     * @param {ProjectSkillCreateManyAndReturnArgs} args - Arguments to create many ProjectSkills.
     * @example
     * // Create many ProjectSkills
     * const projectSkill = await prisma.projectSkill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectSkills and only return the `id`
     * const projectSkillWithIdOnly = await prisma.projectSkill.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectSkillCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectSkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectSkill.
     * @param {ProjectSkillDeleteArgs} args - Arguments to delete one ProjectSkill.
     * @example
     * // Delete one ProjectSkill
     * const ProjectSkill = await prisma.projectSkill.delete({
     *   where: {
     *     // ... filter to delete one ProjectSkill
     *   }
     * })
     * 
     */
    delete<T extends ProjectSkillDeleteArgs>(args: SelectSubset<T, ProjectSkillDeleteArgs<ExtArgs>>): Prisma__ProjectSkillClient<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectSkill.
     * @param {ProjectSkillUpdateArgs} args - Arguments to update one ProjectSkill.
     * @example
     * // Update one ProjectSkill
     * const projectSkill = await prisma.projectSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectSkillUpdateArgs>(args: SelectSubset<T, ProjectSkillUpdateArgs<ExtArgs>>): Prisma__ProjectSkillClient<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectSkills.
     * @param {ProjectSkillDeleteManyArgs} args - Arguments to filter ProjectSkills to delete.
     * @example
     * // Delete a few ProjectSkills
     * const { count } = await prisma.projectSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectSkillDeleteManyArgs>(args?: SelectSubset<T, ProjectSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectSkills
     * const projectSkill = await prisma.projectSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectSkillUpdateManyArgs>(args: SelectSubset<T, ProjectSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectSkills and returns the data updated in the database.
     * @param {ProjectSkillUpdateManyAndReturnArgs} args - Arguments to update many ProjectSkills.
     * @example
     * // Update many ProjectSkills
     * const projectSkill = await prisma.projectSkill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectSkills and only return the `id`
     * const projectSkillWithIdOnly = await prisma.projectSkill.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectSkillUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectSkillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectSkill.
     * @param {ProjectSkillUpsertArgs} args - Arguments to update or create a ProjectSkill.
     * @example
     * // Update or create a ProjectSkill
     * const projectSkill = await prisma.projectSkill.upsert({
     *   create: {
     *     // ... data to create a ProjectSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectSkill we want to update
     *   }
     * })
     */
    upsert<T extends ProjectSkillUpsertArgs>(args: SelectSubset<T, ProjectSkillUpsertArgs<ExtArgs>>): Prisma__ProjectSkillClient<$Result.GetResult<Prisma.$ProjectSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSkillCountArgs} args - Arguments to filter ProjectSkills to count.
     * @example
     * // Count the number of ProjectSkills
     * const count = await prisma.projectSkill.count({
     *   where: {
     *     // ... the filter for the ProjectSkills we want to count
     *   }
     * })
    **/
    count<T extends ProjectSkillCountArgs>(
      args?: Subset<T, ProjectSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectSkillAggregateArgs>(args: Subset<T, ProjectSkillAggregateArgs>): Prisma.PrismaPromise<GetProjectSkillAggregateType<T>>

    /**
     * Group by ProjectSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectSkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectSkillGroupByArgs['orderBy'] }
        : { orderBy?: ProjectSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectSkill model
   */
  readonly fields: ProjectSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skill<T extends SkillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillDefaultArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectSkill model
   */
  interface ProjectSkillFieldRefs {
    readonly id: FieldRef<"ProjectSkill", 'String'>
    readonly projectId: FieldRef<"ProjectSkill", 'String'>
    readonly skillId: FieldRef<"ProjectSkill", 'String'>
    readonly createdAt: FieldRef<"ProjectSkill", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectSkill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectSkill findUnique
   */
  export type ProjectSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    /**
     * Filter, which ProjectSkill to fetch.
     */
    where: ProjectSkillWhereUniqueInput
  }

  /**
   * ProjectSkill findUniqueOrThrow
   */
  export type ProjectSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    /**
     * Filter, which ProjectSkill to fetch.
     */
    where: ProjectSkillWhereUniqueInput
  }

  /**
   * ProjectSkill findFirst
   */
  export type ProjectSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    /**
     * Filter, which ProjectSkill to fetch.
     */
    where?: ProjectSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectSkills to fetch.
     */
    orderBy?: ProjectSkillOrderByWithRelationInput | ProjectSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectSkills.
     */
    cursor?: ProjectSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectSkills.
     */
    distinct?: ProjectSkillScalarFieldEnum | ProjectSkillScalarFieldEnum[]
  }

  /**
   * ProjectSkill findFirstOrThrow
   */
  export type ProjectSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    /**
     * Filter, which ProjectSkill to fetch.
     */
    where?: ProjectSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectSkills to fetch.
     */
    orderBy?: ProjectSkillOrderByWithRelationInput | ProjectSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectSkills.
     */
    cursor?: ProjectSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectSkills.
     */
    distinct?: ProjectSkillScalarFieldEnum | ProjectSkillScalarFieldEnum[]
  }

  /**
   * ProjectSkill findMany
   */
  export type ProjectSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    /**
     * Filter, which ProjectSkills to fetch.
     */
    where?: ProjectSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectSkills to fetch.
     */
    orderBy?: ProjectSkillOrderByWithRelationInput | ProjectSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectSkills.
     */
    cursor?: ProjectSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectSkills.
     */
    skip?: number
    distinct?: ProjectSkillScalarFieldEnum | ProjectSkillScalarFieldEnum[]
  }

  /**
   * ProjectSkill create
   */
  export type ProjectSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectSkill.
     */
    data: XOR<ProjectSkillCreateInput, ProjectSkillUncheckedCreateInput>
  }

  /**
   * ProjectSkill createMany
   */
  export type ProjectSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectSkills.
     */
    data: ProjectSkillCreateManyInput | ProjectSkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectSkill createManyAndReturn
   */
  export type ProjectSkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectSkills.
     */
    data: ProjectSkillCreateManyInput | ProjectSkillCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectSkill update
   */
  export type ProjectSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectSkill.
     */
    data: XOR<ProjectSkillUpdateInput, ProjectSkillUncheckedUpdateInput>
    /**
     * Choose, which ProjectSkill to update.
     */
    where: ProjectSkillWhereUniqueInput
  }

  /**
   * ProjectSkill updateMany
   */
  export type ProjectSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectSkills.
     */
    data: XOR<ProjectSkillUpdateManyMutationInput, ProjectSkillUncheckedUpdateManyInput>
    /**
     * Filter which ProjectSkills to update
     */
    where?: ProjectSkillWhereInput
    /**
     * Limit how many ProjectSkills to update.
     */
    limit?: number
  }

  /**
   * ProjectSkill updateManyAndReturn
   */
  export type ProjectSkillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * The data used to update ProjectSkills.
     */
    data: XOR<ProjectSkillUpdateManyMutationInput, ProjectSkillUncheckedUpdateManyInput>
    /**
     * Filter which ProjectSkills to update
     */
    where?: ProjectSkillWhereInput
    /**
     * Limit how many ProjectSkills to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectSkill upsert
   */
  export type ProjectSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectSkill to update in case it exists.
     */
    where: ProjectSkillWhereUniqueInput
    /**
     * In case the ProjectSkill found by the `where` argument doesn't exist, create a new ProjectSkill with this data.
     */
    create: XOR<ProjectSkillCreateInput, ProjectSkillUncheckedCreateInput>
    /**
     * In case the ProjectSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectSkillUpdateInput, ProjectSkillUncheckedUpdateInput>
  }

  /**
   * ProjectSkill delete
   */
  export type ProjectSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
    /**
     * Filter which ProjectSkill to delete.
     */
    where: ProjectSkillWhereUniqueInput
  }

  /**
   * ProjectSkill deleteMany
   */
  export type ProjectSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectSkills to delete
     */
    where?: ProjectSkillWhereInput
    /**
     * Limit how many ProjectSkills to delete.
     */
    limit?: number
  }

  /**
   * ProjectSkill without action
   */
  export type ProjectSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectSkill
     */
    select?: ProjectSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectSkill
     */
    omit?: ProjectSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectSkillInclude<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackAvgAggregateOutputType = {
    rating: number | null
  }

  export type FeedbackSumAggregateOutputType = {
    rating: number | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    fromUserId: string | null
    toUserId: string | null
    rating: number | null
    comment: string | null
    anonymous: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    fromUserId: string | null
    toUserId: string | null
    rating: number | null
    comment: string | null
    anonymous: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    projectId: number
    fromUserId: number
    toUserId: number
    rating: number
    comment: number
    anonymous: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeedbackAvgAggregateInputType = {
    rating?: true
  }

  export type FeedbackSumAggregateInputType = {
    rating?: true
  }

  export type FeedbackMinAggregateInputType = {
    id?: true
    projectId?: true
    fromUserId?: true
    toUserId?: true
    rating?: true
    comment?: true
    anonymous?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    projectId?: true
    fromUserId?: true
    toUserId?: true
    rating?: true
    comment?: true
    anonymous?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    projectId?: true
    fromUserId?: true
    toUserId?: true
    rating?: true
    comment?: true
    anonymous?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _avg?: FeedbackAvgAggregateInputType
    _sum?: FeedbackSumAggregateInputType
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: string
    projectId: string
    fromUserId: string
    toUserId: string
    rating: number
    comment: string | null
    anonymous: boolean
    createdAt: Date
    updatedAt: Date
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    rating?: boolean
    comment?: boolean
    anonymous?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    rating?: boolean
    comment?: boolean
    anonymous?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    rating?: boolean
    comment?: boolean
    anonymous?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    projectId?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    rating?: boolean
    comment?: boolean
    anonymous?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "fromUserId" | "toUserId" | "rating" | "comment" | "anonymous" | "createdAt" | "updatedAt", ExtArgs["result"]["feedback"]>
  export type FeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeedbackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      fromUser: Prisma.$UserPayload<ExtArgs>
      toUser: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      fromUserId: string
      toUserId: string
      rating: number
      comment: string | null
      anonymous: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks and returns the data updated in the database.
     * @param {FeedbackUpdateManyAndReturnArgs} args - Arguments to update many Feedbacks.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fromUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feedback model
   */
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'String'>
    readonly projectId: FieldRef<"Feedback", 'String'>
    readonly fromUserId: FieldRef<"Feedback", 'String'>
    readonly toUserId: FieldRef<"Feedback", 'String'>
    readonly rating: FieldRef<"Feedback", 'Int'>
    readonly comment: FieldRef<"Feedback", 'String'>
    readonly anonymous: FieldRef<"Feedback", 'Boolean'>
    readonly createdAt: FieldRef<"Feedback", 'DateTime'>
    readonly updatedAt: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback updateManyAndReturn
   */
  export type FeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to delete.
     */
    limit?: number
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    avatar: 'avatar',
    linkedin: 'linkedin',
    github: 'github',
    summary: 'summary',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SkillScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SkillScalarFieldEnum = (typeof SkillScalarFieldEnum)[keyof typeof SkillScalarFieldEnum]


  export const StackScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StackScalarFieldEnum = (typeof StackScalarFieldEnum)[keyof typeof StackScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    name: 'name',
    description: 'description',
    deadline: 'deadline',
    totalValue: 'totalValue',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectStackScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    stackId: 'stackId',
    percentage: 'percentage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectStackScalarFieldEnum = (typeof ProjectStackScalarFieldEnum)[keyof typeof ProjectStackScalarFieldEnum]


  export const StackTakenScalarFieldEnum: {
    id: 'id',
    projectStackId: 'projectStackId',
    userId: 'userId',
    stackId: 'stackId',
    projectId: 'projectId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StackTakenScalarFieldEnum = (typeof StackTakenScalarFieldEnum)[keyof typeof StackTakenScalarFieldEnum]


  export const UserSkillScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    skillId: 'skillId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserSkillScalarFieldEnum = (typeof UserSkillScalarFieldEnum)[keyof typeof UserSkillScalarFieldEnum]


  export const ProjectSkillScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    skillId: 'skillId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectSkillScalarFieldEnum = (typeof ProjectSkillScalarFieldEnum)[keyof typeof ProjectSkillScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    fromUserId: 'fromUserId',
    toUserId: 'toUserId',
    rating: 'rating',
    comment: 'comment',
    anonymous: 'anonymous',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    linkedin?: StringNullableFilter<"User"> | string | null
    github?: StringNullableFilter<"User"> | string | null
    summary?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    skills?: UserSkillListRelationFilter
    projects?: ProjectListRelationFilter
    stacksTaken?: StackTakenListRelationFilter
    feedbacksReceived?: FeedbackListRelationFilter
    feedbacksGiven?: FeedbackListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    linkedin?: SortOrderInput | SortOrder
    github?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    skills?: UserSkillOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    stacksTaken?: StackTakenOrderByRelationAggregateInput
    feedbacksReceived?: FeedbackOrderByRelationAggregateInput
    feedbacksGiven?: FeedbackOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    linkedin?: StringNullableFilter<"User"> | string | null
    github?: StringNullableFilter<"User"> | string | null
    summary?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    skills?: UserSkillListRelationFilter
    projects?: ProjectListRelationFilter
    stacksTaken?: StackTakenListRelationFilter
    feedbacksReceived?: FeedbackListRelationFilter
    feedbacksGiven?: FeedbackListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    linkedin?: SortOrderInput | SortOrder
    github?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    linkedin?: StringNullableWithAggregatesFilter<"User"> | string | null
    github?: StringNullableWithAggregatesFilter<"User"> | string | null
    summary?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SkillWhereInput = {
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    id?: StringFilter<"Skill"> | string
    name?: StringFilter<"Skill"> | string
    createdAt?: DateTimeFilter<"Skill"> | Date | string
    updatedAt?: DateTimeFilter<"Skill"> | Date | string
    users?: UserSkillListRelationFilter
    projects?: ProjectSkillListRelationFilter
  }

  export type SkillOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserSkillOrderByRelationAggregateInput
    projects?: ProjectSkillOrderByRelationAggregateInput
  }

  export type SkillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    createdAt?: DateTimeFilter<"Skill"> | Date | string
    updatedAt?: DateTimeFilter<"Skill"> | Date | string
    users?: UserSkillListRelationFilter
    projects?: ProjectSkillListRelationFilter
  }, "id" | "name">

  export type SkillOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SkillCountOrderByAggregateInput
    _max?: SkillMaxOrderByAggregateInput
    _min?: SkillMinOrderByAggregateInput
  }

  export type SkillScalarWhereWithAggregatesInput = {
    AND?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    OR?: SkillScalarWhereWithAggregatesInput[]
    NOT?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Skill"> | string
    name?: StringWithAggregatesFilter<"Skill"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Skill"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Skill"> | Date | string
  }

  export type StackWhereInput = {
    AND?: StackWhereInput | StackWhereInput[]
    OR?: StackWhereInput[]
    NOT?: StackWhereInput | StackWhereInput[]
    id?: StringFilter<"Stack"> | string
    name?: StringFilter<"Stack"> | string
    createdAt?: DateTimeFilter<"Stack"> | Date | string
    updatedAt?: DateTimeFilter<"Stack"> | Date | string
    projects?: ProjectStackListRelationFilter
    stacksTaken?: StackTakenListRelationFilter
  }

  export type StackOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projects?: ProjectStackOrderByRelationAggregateInput
    stacksTaken?: StackTakenOrderByRelationAggregateInput
  }

  export type StackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: StackWhereInput | StackWhereInput[]
    OR?: StackWhereInput[]
    NOT?: StackWhereInput | StackWhereInput[]
    createdAt?: DateTimeFilter<"Stack"> | Date | string
    updatedAt?: DateTimeFilter<"Stack"> | Date | string
    projects?: ProjectStackListRelationFilter
    stacksTaken?: StackTakenListRelationFilter
  }, "id" | "name">

  export type StackOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StackCountOrderByAggregateInput
    _max?: StackMaxOrderByAggregateInput
    _min?: StackMinOrderByAggregateInput
  }

  export type StackScalarWhereWithAggregatesInput = {
    AND?: StackScalarWhereWithAggregatesInput | StackScalarWhereWithAggregatesInput[]
    OR?: StackScalarWhereWithAggregatesInput[]
    NOT?: StackScalarWhereWithAggregatesInput | StackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stack"> | string
    name?: StringWithAggregatesFilter<"Stack"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Stack"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Stack"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    ownerId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    deadline?: DateTimeFilter<"Project"> | Date | string
    totalValue?: FloatFilter<"Project"> | number
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    stacks?: ProjectStackListRelationFilter
    skills?: ProjectSkillListRelationFilter
    stacksTaken?: StackTakenListRelationFilter
    feedbacks?: FeedbackListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    deadline?: SortOrder
    totalValue?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    stacks?: ProjectStackOrderByRelationAggregateInput
    skills?: ProjectSkillOrderByRelationAggregateInput
    stacksTaken?: StackTakenOrderByRelationAggregateInput
    feedbacks?: FeedbackOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    ownerId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    deadline?: DateTimeFilter<"Project"> | Date | string
    totalValue?: FloatFilter<"Project"> | number
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    stacks?: ProjectStackListRelationFilter
    skills?: ProjectSkillListRelationFilter
    stacksTaken?: StackTakenListRelationFilter
    feedbacks?: FeedbackListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    deadline?: SortOrder
    totalValue?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    ownerId?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringWithAggregatesFilter<"Project"> | string
    deadline?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    totalValue?: FloatWithAggregatesFilter<"Project"> | number
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ProjectStackWhereInput = {
    AND?: ProjectStackWhereInput | ProjectStackWhereInput[]
    OR?: ProjectStackWhereInput[]
    NOT?: ProjectStackWhereInput | ProjectStackWhereInput[]
    id?: StringFilter<"ProjectStack"> | string
    projectId?: StringFilter<"ProjectStack"> | string
    stackId?: StringFilter<"ProjectStack"> | string
    percentage?: FloatFilter<"ProjectStack"> | number
    createdAt?: DateTimeFilter<"ProjectStack"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectStack"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    stack?: XOR<StackScalarRelationFilter, StackWhereInput>
    StackTaken?: StackTakenListRelationFilter
  }

  export type ProjectStackOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    stackId?: SortOrder
    percentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    stack?: StackOrderByWithRelationInput
    StackTaken?: StackTakenOrderByRelationAggregateInput
  }

  export type ProjectStackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectStackWhereInput | ProjectStackWhereInput[]
    OR?: ProjectStackWhereInput[]
    NOT?: ProjectStackWhereInput | ProjectStackWhereInput[]
    projectId?: StringFilter<"ProjectStack"> | string
    stackId?: StringFilter<"ProjectStack"> | string
    percentage?: FloatFilter<"ProjectStack"> | number
    createdAt?: DateTimeFilter<"ProjectStack"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectStack"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    stack?: XOR<StackScalarRelationFilter, StackWhereInput>
    StackTaken?: StackTakenListRelationFilter
  }, "id">

  export type ProjectStackOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    stackId?: SortOrder
    percentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectStackCountOrderByAggregateInput
    _avg?: ProjectStackAvgOrderByAggregateInput
    _max?: ProjectStackMaxOrderByAggregateInput
    _min?: ProjectStackMinOrderByAggregateInput
    _sum?: ProjectStackSumOrderByAggregateInput
  }

  export type ProjectStackScalarWhereWithAggregatesInput = {
    AND?: ProjectStackScalarWhereWithAggregatesInput | ProjectStackScalarWhereWithAggregatesInput[]
    OR?: ProjectStackScalarWhereWithAggregatesInput[]
    NOT?: ProjectStackScalarWhereWithAggregatesInput | ProjectStackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectStack"> | string
    projectId?: StringWithAggregatesFilter<"ProjectStack"> | string
    stackId?: StringWithAggregatesFilter<"ProjectStack"> | string
    percentage?: FloatWithAggregatesFilter<"ProjectStack"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProjectStack"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectStack"> | Date | string
  }

  export type StackTakenWhereInput = {
    AND?: StackTakenWhereInput | StackTakenWhereInput[]
    OR?: StackTakenWhereInput[]
    NOT?: StackTakenWhereInput | StackTakenWhereInput[]
    id?: StringFilter<"StackTaken"> | string
    projectStackId?: StringFilter<"StackTaken"> | string
    userId?: StringFilter<"StackTaken"> | string
    stackId?: StringFilter<"StackTaken"> | string
    projectId?: StringFilter<"StackTaken"> | string
    createdAt?: DateTimeFilter<"StackTaken"> | Date | string
    updatedAt?: DateTimeFilter<"StackTaken"> | Date | string
    projectStack?: XOR<ProjectStackScalarRelationFilter, ProjectStackWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stack?: XOR<StackScalarRelationFilter, StackWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type StackTakenOrderByWithRelationInput = {
    id?: SortOrder
    projectStackId?: SortOrder
    userId?: SortOrder
    stackId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectStack?: ProjectStackOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    stack?: StackOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
  }

  export type StackTakenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StackTakenWhereInput | StackTakenWhereInput[]
    OR?: StackTakenWhereInput[]
    NOT?: StackTakenWhereInput | StackTakenWhereInput[]
    projectStackId?: StringFilter<"StackTaken"> | string
    userId?: StringFilter<"StackTaken"> | string
    stackId?: StringFilter<"StackTaken"> | string
    projectId?: StringFilter<"StackTaken"> | string
    createdAt?: DateTimeFilter<"StackTaken"> | Date | string
    updatedAt?: DateTimeFilter<"StackTaken"> | Date | string
    projectStack?: XOR<ProjectStackScalarRelationFilter, ProjectStackWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stack?: XOR<StackScalarRelationFilter, StackWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type StackTakenOrderByWithAggregationInput = {
    id?: SortOrder
    projectStackId?: SortOrder
    userId?: SortOrder
    stackId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StackTakenCountOrderByAggregateInput
    _max?: StackTakenMaxOrderByAggregateInput
    _min?: StackTakenMinOrderByAggregateInput
  }

  export type StackTakenScalarWhereWithAggregatesInput = {
    AND?: StackTakenScalarWhereWithAggregatesInput | StackTakenScalarWhereWithAggregatesInput[]
    OR?: StackTakenScalarWhereWithAggregatesInput[]
    NOT?: StackTakenScalarWhereWithAggregatesInput | StackTakenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StackTaken"> | string
    projectStackId?: StringWithAggregatesFilter<"StackTaken"> | string
    userId?: StringWithAggregatesFilter<"StackTaken"> | string
    stackId?: StringWithAggregatesFilter<"StackTaken"> | string
    projectId?: StringWithAggregatesFilter<"StackTaken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StackTaken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StackTaken"> | Date | string
  }

  export type UserSkillWhereInput = {
    AND?: UserSkillWhereInput | UserSkillWhereInput[]
    OR?: UserSkillWhereInput[]
    NOT?: UserSkillWhereInput | UserSkillWhereInput[]
    id?: StringFilter<"UserSkill"> | string
    userId?: StringFilter<"UserSkill"> | string
    skillId?: StringFilter<"UserSkill"> | string
    createdAt?: DateTimeFilter<"UserSkill"> | Date | string
    updatedAt?: DateTimeFilter<"UserSkill"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }

  export type UserSkillOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    skillId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    skill?: SkillOrderByWithRelationInput
  }

  export type UserSkillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserSkillWhereInput | UserSkillWhereInput[]
    OR?: UserSkillWhereInput[]
    NOT?: UserSkillWhereInput | UserSkillWhereInput[]
    userId?: StringFilter<"UserSkill"> | string
    skillId?: StringFilter<"UserSkill"> | string
    createdAt?: DateTimeFilter<"UserSkill"> | Date | string
    updatedAt?: DateTimeFilter<"UserSkill"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }, "id">

  export type UserSkillOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    skillId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserSkillCountOrderByAggregateInput
    _max?: UserSkillMaxOrderByAggregateInput
    _min?: UserSkillMinOrderByAggregateInput
  }

  export type UserSkillScalarWhereWithAggregatesInput = {
    AND?: UserSkillScalarWhereWithAggregatesInput | UserSkillScalarWhereWithAggregatesInput[]
    OR?: UserSkillScalarWhereWithAggregatesInput[]
    NOT?: UserSkillScalarWhereWithAggregatesInput | UserSkillScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSkill"> | string
    userId?: StringWithAggregatesFilter<"UserSkill"> | string
    skillId?: StringWithAggregatesFilter<"UserSkill"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserSkill"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserSkill"> | Date | string
  }

  export type ProjectSkillWhereInput = {
    AND?: ProjectSkillWhereInput | ProjectSkillWhereInput[]
    OR?: ProjectSkillWhereInput[]
    NOT?: ProjectSkillWhereInput | ProjectSkillWhereInput[]
    id?: StringFilter<"ProjectSkill"> | string
    projectId?: StringFilter<"ProjectSkill"> | string
    skillId?: StringFilter<"ProjectSkill"> | string
    createdAt?: DateTimeFilter<"ProjectSkill"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectSkill"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }

  export type ProjectSkillOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    skillId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    skill?: SkillOrderByWithRelationInput
  }

  export type ProjectSkillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectSkillWhereInput | ProjectSkillWhereInput[]
    OR?: ProjectSkillWhereInput[]
    NOT?: ProjectSkillWhereInput | ProjectSkillWhereInput[]
    projectId?: StringFilter<"ProjectSkill"> | string
    skillId?: StringFilter<"ProjectSkill"> | string
    createdAt?: DateTimeFilter<"ProjectSkill"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectSkill"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }, "id">

  export type ProjectSkillOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    skillId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectSkillCountOrderByAggregateInput
    _max?: ProjectSkillMaxOrderByAggregateInput
    _min?: ProjectSkillMinOrderByAggregateInput
  }

  export type ProjectSkillScalarWhereWithAggregatesInput = {
    AND?: ProjectSkillScalarWhereWithAggregatesInput | ProjectSkillScalarWhereWithAggregatesInput[]
    OR?: ProjectSkillScalarWhereWithAggregatesInput[]
    NOT?: ProjectSkillScalarWhereWithAggregatesInput | ProjectSkillScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectSkill"> | string
    projectId?: StringWithAggregatesFilter<"ProjectSkill"> | string
    skillId?: StringWithAggregatesFilter<"ProjectSkill"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProjectSkill"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectSkill"> | Date | string
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: StringFilter<"Feedback"> | string
    projectId?: StringFilter<"Feedback"> | string
    fromUserId?: StringFilter<"Feedback"> | string
    toUserId?: StringFilter<"Feedback"> | string
    rating?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    anonymous?: BoolFilter<"Feedback"> | boolean
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeFilter<"Feedback"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    fromUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    toUser?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    anonymous?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    fromUser?: UserOrderByWithRelationInput
    toUser?: UserOrderByWithRelationInput
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    projectId?: StringFilter<"Feedback"> | string
    fromUserId?: StringFilter<"Feedback"> | string
    toUserId?: StringFilter<"Feedback"> | string
    rating?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    anonymous?: BoolFilter<"Feedback"> | boolean
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeFilter<"Feedback"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    fromUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    toUser?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    anonymous?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _avg?: FeedbackAvgOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
    _sum?: FeedbackSumOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Feedback"> | string
    projectId?: StringWithAggregatesFilter<"Feedback"> | string
    fromUserId?: StringWithAggregatesFilter<"Feedback"> | string
    toUserId?: StringWithAggregatesFilter<"Feedback"> | string
    rating?: IntWithAggregatesFilter<"Feedback"> | number
    comment?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    anonymous?: BoolWithAggregatesFilter<"Feedback"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: UserSkillCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutOwnerInput
    stacksTaken?: StackTakenCreateNestedManyWithoutUserInput
    feedbacksReceived?: FeedbackCreateNestedManyWithoutToUserInput
    feedbacksGiven?: FeedbackCreateNestedManyWithoutFromUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: UserSkillUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutUserInput
    feedbacksReceived?: FeedbackUncheckedCreateNestedManyWithoutToUserInput
    feedbacksGiven?: FeedbackUncheckedCreateNestedManyWithoutFromUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: UserSkillUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutOwnerNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutUserNestedInput
    feedbacksReceived?: FeedbackUpdateManyWithoutToUserNestedInput
    feedbacksGiven?: FeedbackUpdateManyWithoutFromUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: UserSkillUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutUserNestedInput
    feedbacksReceived?: FeedbackUncheckedUpdateManyWithoutToUserNestedInput
    feedbacksGiven?: FeedbackUncheckedUpdateManyWithoutFromUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserSkillCreateNestedManyWithoutSkillInput
    projects?: ProjectSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserSkillUncheckedCreateNestedManyWithoutSkillInput
    projects?: ProjectSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserSkillUpdateManyWithoutSkillNestedInput
    projects?: ProjectSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserSkillUncheckedUpdateManyWithoutSkillNestedInput
    projects?: ProjectSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type SkillCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SkillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectStackCreateNestedManyWithoutStackInput
    stacksTaken?: StackTakenCreateNestedManyWithoutStackInput
  }

  export type StackUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectStackUncheckedCreateNestedManyWithoutStackInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutStackInput
  }

  export type StackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectStackUpdateManyWithoutStackNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutStackNestedInput
  }

  export type StackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectStackUncheckedUpdateManyWithoutStackNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutStackNestedInput
  }

  export type StackCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutProjectsInput
    stacks?: ProjectStackCreateNestedManyWithoutProjectInput
    skills?: ProjectSkillCreateNestedManyWithoutProjectInput
    stacksTaken?: StackTakenCreateNestedManyWithoutProjectInput
    feedbacks?: FeedbackCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    ownerId: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    stacks?: ProjectStackUncheckedCreateNestedManyWithoutProjectInput
    skills?: ProjectSkillUncheckedCreateNestedManyWithoutProjectInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutProjectInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutProjectsNestedInput
    stacks?: ProjectStackUpdateManyWithoutProjectNestedInput
    skills?: ProjectSkillUpdateManyWithoutProjectNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutProjectNestedInput
    feedbacks?: FeedbackUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stacks?: ProjectStackUncheckedUpdateManyWithoutProjectNestedInput
    skills?: ProjectSkillUncheckedUpdateManyWithoutProjectNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutProjectNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    ownerId: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStackCreateInput = {
    id?: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutStacksInput
    stack: StackCreateNestedOneWithoutProjectsInput
    StackTaken?: StackTakenCreateNestedManyWithoutProjectStackInput
  }

  export type ProjectStackUncheckedCreateInput = {
    id?: string
    projectId: string
    stackId: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
    StackTaken?: StackTakenUncheckedCreateNestedManyWithoutProjectStackInput
  }

  export type ProjectStackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutStacksNestedInput
    stack?: StackUpdateOneRequiredWithoutProjectsNestedInput
    StackTaken?: StackTakenUpdateManyWithoutProjectStackNestedInput
  }

  export type ProjectStackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StackTaken?: StackTakenUncheckedUpdateManyWithoutProjectStackNestedInput
  }

  export type ProjectStackCreateManyInput = {
    id?: string
    projectId: string
    stackId: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectStackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projectStack: ProjectStackCreateNestedOneWithoutStackTakenInput
    user: UserCreateNestedOneWithoutStacksTakenInput
    stack: StackCreateNestedOneWithoutStacksTakenInput
    project: ProjectCreateNestedOneWithoutStacksTakenInput
  }

  export type StackTakenUncheckedCreateInput = {
    id?: string
    projectStackId: string
    userId: string
    stackId: string
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackTakenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectStack?: ProjectStackUpdateOneRequiredWithoutStackTakenNestedInput
    user?: UserUpdateOneRequiredWithoutStacksTakenNestedInput
    stack?: StackUpdateOneRequiredWithoutStacksTakenNestedInput
    project?: ProjectUpdateOneRequiredWithoutStacksTakenNestedInput
  }

  export type StackTakenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectStackId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenCreateManyInput = {
    id?: string
    projectStackId: string
    userId: string
    stackId: string
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackTakenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectStackId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSkillCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSkillsInput
    skill: SkillCreateNestedOneWithoutUsersInput
  }

  export type UserSkillUncheckedCreateInput = {
    id?: string
    userId: string
    skillId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSkillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSkillsNestedInput
    skill?: SkillUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserSkillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSkillCreateManyInput = {
    id?: string
    userId: string
    skillId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSkillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSkillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSkillCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutSkillsInput
    skill: SkillCreateNestedOneWithoutProjectsInput
  }

  export type ProjectSkillUncheckedCreateInput = {
    id?: string
    projectId: string
    skillId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectSkillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutSkillsNestedInput
    skill?: SkillUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectSkillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSkillCreateManyInput = {
    id?: string
    projectId: string
    skillId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectSkillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSkillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutFeedbacksInput
    fromUser: UserCreateNestedOneWithoutFeedbacksGivenInput
    toUser: UserCreateNestedOneWithoutFeedbacksReceivedInput
  }

  export type FeedbackUncheckedCreateInput = {
    id?: string
    projectId: string
    fromUserId: string
    toUserId: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutFeedbacksNestedInput
    fromUser?: UserUpdateOneRequiredWithoutFeedbacksGivenNestedInput
    toUser?: UserUpdateOneRequiredWithoutFeedbacksReceivedNestedInput
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyInput = {
    id?: string
    projectId: string
    fromUserId: string
    toUserId: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserSkillListRelationFilter = {
    every?: UserSkillWhereInput
    some?: UserSkillWhereInput
    none?: UserSkillWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type StackTakenListRelationFilter = {
    every?: StackTakenWhereInput
    some?: StackTakenWhereInput
    none?: StackTakenWhereInput
  }

  export type FeedbackListRelationFilter = {
    every?: FeedbackWhereInput
    some?: FeedbackWhereInput
    none?: FeedbackWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserSkillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StackTakenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    linkedin?: SortOrder
    github?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    linkedin?: SortOrder
    github?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    linkedin?: SortOrder
    github?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProjectSkillListRelationFilter = {
    every?: ProjectSkillWhereInput
    some?: ProjectSkillWhereInput
    none?: ProjectSkillWhereInput
  }

  export type ProjectSkillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SkillCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkillMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkillMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectStackListRelationFilter = {
    every?: ProjectStackWhereInput
    some?: ProjectStackWhereInput
    none?: ProjectStackWhereInput
  }

  export type ProjectStackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StackCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StackMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StackMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    deadline?: SortOrder
    totalValue?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    totalValue?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    deadline?: SortOrder
    totalValue?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    deadline?: SortOrder
    totalValue?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    totalValue?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type StackScalarRelationFilter = {
    is?: StackWhereInput
    isNot?: StackWhereInput
  }

  export type ProjectStackCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    stackId?: SortOrder
    percentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectStackAvgOrderByAggregateInput = {
    percentage?: SortOrder
  }

  export type ProjectStackMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    stackId?: SortOrder
    percentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectStackMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    stackId?: SortOrder
    percentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectStackSumOrderByAggregateInput = {
    percentage?: SortOrder
  }

  export type ProjectStackScalarRelationFilter = {
    is?: ProjectStackWhereInput
    isNot?: ProjectStackWhereInput
  }

  export type StackTakenCountOrderByAggregateInput = {
    id?: SortOrder
    projectStackId?: SortOrder
    userId?: SortOrder
    stackId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StackTakenMaxOrderByAggregateInput = {
    id?: SortOrder
    projectStackId?: SortOrder
    userId?: SortOrder
    stackId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StackTakenMinOrderByAggregateInput = {
    id?: SortOrder
    projectStackId?: SortOrder
    userId?: SortOrder
    stackId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SkillScalarRelationFilter = {
    is?: SkillWhereInput
    isNot?: SkillWhereInput
  }

  export type UserSkillCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    skillId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSkillMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    skillId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSkillMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    skillId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSkillCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    skillId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSkillMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    skillId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSkillMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    skillId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    anonymous?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    anonymous?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    anonymous?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserSkillCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSkillCreateWithoutUserInput, UserSkillUncheckedCreateWithoutUserInput> | UserSkillCreateWithoutUserInput[] | UserSkillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSkillCreateOrConnectWithoutUserInput | UserSkillCreateOrConnectWithoutUserInput[]
    createMany?: UserSkillCreateManyUserInputEnvelope
    connect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput> | ProjectCreateWithoutOwnerInput[] | ProjectUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnerInput | ProjectCreateOrConnectWithoutOwnerInput[]
    createMany?: ProjectCreateManyOwnerInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type StackTakenCreateNestedManyWithoutUserInput = {
    create?: XOR<StackTakenCreateWithoutUserInput, StackTakenUncheckedCreateWithoutUserInput> | StackTakenCreateWithoutUserInput[] | StackTakenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutUserInput | StackTakenCreateOrConnectWithoutUserInput[]
    createMany?: StackTakenCreateManyUserInputEnvelope
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutToUserInput = {
    create?: XOR<FeedbackCreateWithoutToUserInput, FeedbackUncheckedCreateWithoutToUserInput> | FeedbackCreateWithoutToUserInput[] | FeedbackUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutToUserInput | FeedbackCreateOrConnectWithoutToUserInput[]
    createMany?: FeedbackCreateManyToUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutFromUserInput = {
    create?: XOR<FeedbackCreateWithoutFromUserInput, FeedbackUncheckedCreateWithoutFromUserInput> | FeedbackCreateWithoutFromUserInput[] | FeedbackUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutFromUserInput | FeedbackCreateOrConnectWithoutFromUserInput[]
    createMany?: FeedbackCreateManyFromUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type UserSkillUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSkillCreateWithoutUserInput, UserSkillUncheckedCreateWithoutUserInput> | UserSkillCreateWithoutUserInput[] | UserSkillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSkillCreateOrConnectWithoutUserInput | UserSkillCreateOrConnectWithoutUserInput[]
    createMany?: UserSkillCreateManyUserInputEnvelope
    connect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput> | ProjectCreateWithoutOwnerInput[] | ProjectUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnerInput | ProjectCreateOrConnectWithoutOwnerInput[]
    createMany?: ProjectCreateManyOwnerInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type StackTakenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StackTakenCreateWithoutUserInput, StackTakenUncheckedCreateWithoutUserInput> | StackTakenCreateWithoutUserInput[] | StackTakenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutUserInput | StackTakenCreateOrConnectWithoutUserInput[]
    createMany?: StackTakenCreateManyUserInputEnvelope
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutToUserInput = {
    create?: XOR<FeedbackCreateWithoutToUserInput, FeedbackUncheckedCreateWithoutToUserInput> | FeedbackCreateWithoutToUserInput[] | FeedbackUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutToUserInput | FeedbackCreateOrConnectWithoutToUserInput[]
    createMany?: FeedbackCreateManyToUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutFromUserInput = {
    create?: XOR<FeedbackCreateWithoutFromUserInput, FeedbackUncheckedCreateWithoutFromUserInput> | FeedbackCreateWithoutFromUserInput[] | FeedbackUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutFromUserInput | FeedbackCreateOrConnectWithoutFromUserInput[]
    createMany?: FeedbackCreateManyFromUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserSkillUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSkillCreateWithoutUserInput, UserSkillUncheckedCreateWithoutUserInput> | UserSkillCreateWithoutUserInput[] | UserSkillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSkillCreateOrConnectWithoutUserInput | UserSkillCreateOrConnectWithoutUserInput[]
    upsert?: UserSkillUpsertWithWhereUniqueWithoutUserInput | UserSkillUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSkillCreateManyUserInputEnvelope
    set?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    disconnect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    delete?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    connect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    update?: UserSkillUpdateWithWhereUniqueWithoutUserInput | UserSkillUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSkillUpdateManyWithWhereWithoutUserInput | UserSkillUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSkillScalarWhereInput | UserSkillScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput> | ProjectCreateWithoutOwnerInput[] | ProjectUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnerInput | ProjectCreateOrConnectWithoutOwnerInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutOwnerInput | ProjectUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ProjectCreateManyOwnerInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutOwnerInput | ProjectUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutOwnerInput | ProjectUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type StackTakenUpdateManyWithoutUserNestedInput = {
    create?: XOR<StackTakenCreateWithoutUserInput, StackTakenUncheckedCreateWithoutUserInput> | StackTakenCreateWithoutUserInput[] | StackTakenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutUserInput | StackTakenCreateOrConnectWithoutUserInput[]
    upsert?: StackTakenUpsertWithWhereUniqueWithoutUserInput | StackTakenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StackTakenCreateManyUserInputEnvelope
    set?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    disconnect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    delete?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    update?: StackTakenUpdateWithWhereUniqueWithoutUserInput | StackTakenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StackTakenUpdateManyWithWhereWithoutUserInput | StackTakenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StackTakenScalarWhereInput | StackTakenScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutToUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutToUserInput, FeedbackUncheckedCreateWithoutToUserInput> | FeedbackCreateWithoutToUserInput[] | FeedbackUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutToUserInput | FeedbackCreateOrConnectWithoutToUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutToUserInput | FeedbackUpsertWithWhereUniqueWithoutToUserInput[]
    createMany?: FeedbackCreateManyToUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutToUserInput | FeedbackUpdateWithWhereUniqueWithoutToUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutToUserInput | FeedbackUpdateManyWithWhereWithoutToUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutFromUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutFromUserInput, FeedbackUncheckedCreateWithoutFromUserInput> | FeedbackCreateWithoutFromUserInput[] | FeedbackUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutFromUserInput | FeedbackCreateOrConnectWithoutFromUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutFromUserInput | FeedbackUpsertWithWhereUniqueWithoutFromUserInput[]
    createMany?: FeedbackCreateManyFromUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutFromUserInput | FeedbackUpdateWithWhereUniqueWithoutFromUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutFromUserInput | FeedbackUpdateManyWithWhereWithoutFromUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type UserSkillUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSkillCreateWithoutUserInput, UserSkillUncheckedCreateWithoutUserInput> | UserSkillCreateWithoutUserInput[] | UserSkillUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSkillCreateOrConnectWithoutUserInput | UserSkillCreateOrConnectWithoutUserInput[]
    upsert?: UserSkillUpsertWithWhereUniqueWithoutUserInput | UserSkillUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSkillCreateManyUserInputEnvelope
    set?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    disconnect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    delete?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    connect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    update?: UserSkillUpdateWithWhereUniqueWithoutUserInput | UserSkillUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSkillUpdateManyWithWhereWithoutUserInput | UserSkillUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSkillScalarWhereInput | UserSkillScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput> | ProjectCreateWithoutOwnerInput[] | ProjectUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnerInput | ProjectCreateOrConnectWithoutOwnerInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutOwnerInput | ProjectUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ProjectCreateManyOwnerInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutOwnerInput | ProjectUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutOwnerInput | ProjectUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type StackTakenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StackTakenCreateWithoutUserInput, StackTakenUncheckedCreateWithoutUserInput> | StackTakenCreateWithoutUserInput[] | StackTakenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutUserInput | StackTakenCreateOrConnectWithoutUserInput[]
    upsert?: StackTakenUpsertWithWhereUniqueWithoutUserInput | StackTakenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StackTakenCreateManyUserInputEnvelope
    set?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    disconnect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    delete?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    update?: StackTakenUpdateWithWhereUniqueWithoutUserInput | StackTakenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StackTakenUpdateManyWithWhereWithoutUserInput | StackTakenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StackTakenScalarWhereInput | StackTakenScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutToUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutToUserInput, FeedbackUncheckedCreateWithoutToUserInput> | FeedbackCreateWithoutToUserInput[] | FeedbackUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutToUserInput | FeedbackCreateOrConnectWithoutToUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutToUserInput | FeedbackUpsertWithWhereUniqueWithoutToUserInput[]
    createMany?: FeedbackCreateManyToUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutToUserInput | FeedbackUpdateWithWhereUniqueWithoutToUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutToUserInput | FeedbackUpdateManyWithWhereWithoutToUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutFromUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutFromUserInput, FeedbackUncheckedCreateWithoutFromUserInput> | FeedbackCreateWithoutFromUserInput[] | FeedbackUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutFromUserInput | FeedbackCreateOrConnectWithoutFromUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutFromUserInput | FeedbackUpsertWithWhereUniqueWithoutFromUserInput[]
    createMany?: FeedbackCreateManyFromUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutFromUserInput | FeedbackUpdateWithWhereUniqueWithoutFromUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutFromUserInput | FeedbackUpdateManyWithWhereWithoutFromUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type UserSkillCreateNestedManyWithoutSkillInput = {
    create?: XOR<UserSkillCreateWithoutSkillInput, UserSkillUncheckedCreateWithoutSkillInput> | UserSkillCreateWithoutSkillInput[] | UserSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: UserSkillCreateOrConnectWithoutSkillInput | UserSkillCreateOrConnectWithoutSkillInput[]
    createMany?: UserSkillCreateManySkillInputEnvelope
    connect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
  }

  export type ProjectSkillCreateNestedManyWithoutSkillInput = {
    create?: XOR<ProjectSkillCreateWithoutSkillInput, ProjectSkillUncheckedCreateWithoutSkillInput> | ProjectSkillCreateWithoutSkillInput[] | ProjectSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: ProjectSkillCreateOrConnectWithoutSkillInput | ProjectSkillCreateOrConnectWithoutSkillInput[]
    createMany?: ProjectSkillCreateManySkillInputEnvelope
    connect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
  }

  export type UserSkillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: XOR<UserSkillCreateWithoutSkillInput, UserSkillUncheckedCreateWithoutSkillInput> | UserSkillCreateWithoutSkillInput[] | UserSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: UserSkillCreateOrConnectWithoutSkillInput | UserSkillCreateOrConnectWithoutSkillInput[]
    createMany?: UserSkillCreateManySkillInputEnvelope
    connect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
  }

  export type ProjectSkillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: XOR<ProjectSkillCreateWithoutSkillInput, ProjectSkillUncheckedCreateWithoutSkillInput> | ProjectSkillCreateWithoutSkillInput[] | ProjectSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: ProjectSkillCreateOrConnectWithoutSkillInput | ProjectSkillCreateOrConnectWithoutSkillInput[]
    createMany?: ProjectSkillCreateManySkillInputEnvelope
    connect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
  }

  export type UserSkillUpdateManyWithoutSkillNestedInput = {
    create?: XOR<UserSkillCreateWithoutSkillInput, UserSkillUncheckedCreateWithoutSkillInput> | UserSkillCreateWithoutSkillInput[] | UserSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: UserSkillCreateOrConnectWithoutSkillInput | UserSkillCreateOrConnectWithoutSkillInput[]
    upsert?: UserSkillUpsertWithWhereUniqueWithoutSkillInput | UserSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: UserSkillCreateManySkillInputEnvelope
    set?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    disconnect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    delete?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    connect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    update?: UserSkillUpdateWithWhereUniqueWithoutSkillInput | UserSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: UserSkillUpdateManyWithWhereWithoutSkillInput | UserSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: UserSkillScalarWhereInput | UserSkillScalarWhereInput[]
  }

  export type ProjectSkillUpdateManyWithoutSkillNestedInput = {
    create?: XOR<ProjectSkillCreateWithoutSkillInput, ProjectSkillUncheckedCreateWithoutSkillInput> | ProjectSkillCreateWithoutSkillInput[] | ProjectSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: ProjectSkillCreateOrConnectWithoutSkillInput | ProjectSkillCreateOrConnectWithoutSkillInput[]
    upsert?: ProjectSkillUpsertWithWhereUniqueWithoutSkillInput | ProjectSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: ProjectSkillCreateManySkillInputEnvelope
    set?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    disconnect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    delete?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    connect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    update?: ProjectSkillUpdateWithWhereUniqueWithoutSkillInput | ProjectSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: ProjectSkillUpdateManyWithWhereWithoutSkillInput | ProjectSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: ProjectSkillScalarWhereInput | ProjectSkillScalarWhereInput[]
  }

  export type UserSkillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: XOR<UserSkillCreateWithoutSkillInput, UserSkillUncheckedCreateWithoutSkillInput> | UserSkillCreateWithoutSkillInput[] | UserSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: UserSkillCreateOrConnectWithoutSkillInput | UserSkillCreateOrConnectWithoutSkillInput[]
    upsert?: UserSkillUpsertWithWhereUniqueWithoutSkillInput | UserSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: UserSkillCreateManySkillInputEnvelope
    set?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    disconnect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    delete?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    connect?: UserSkillWhereUniqueInput | UserSkillWhereUniqueInput[]
    update?: UserSkillUpdateWithWhereUniqueWithoutSkillInput | UserSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: UserSkillUpdateManyWithWhereWithoutSkillInput | UserSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: UserSkillScalarWhereInput | UserSkillScalarWhereInput[]
  }

  export type ProjectSkillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: XOR<ProjectSkillCreateWithoutSkillInput, ProjectSkillUncheckedCreateWithoutSkillInput> | ProjectSkillCreateWithoutSkillInput[] | ProjectSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: ProjectSkillCreateOrConnectWithoutSkillInput | ProjectSkillCreateOrConnectWithoutSkillInput[]
    upsert?: ProjectSkillUpsertWithWhereUniqueWithoutSkillInput | ProjectSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: ProjectSkillCreateManySkillInputEnvelope
    set?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    disconnect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    delete?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    connect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    update?: ProjectSkillUpdateWithWhereUniqueWithoutSkillInput | ProjectSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: ProjectSkillUpdateManyWithWhereWithoutSkillInput | ProjectSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: ProjectSkillScalarWhereInput | ProjectSkillScalarWhereInput[]
  }

  export type ProjectStackCreateNestedManyWithoutStackInput = {
    create?: XOR<ProjectStackCreateWithoutStackInput, ProjectStackUncheckedCreateWithoutStackInput> | ProjectStackCreateWithoutStackInput[] | ProjectStackUncheckedCreateWithoutStackInput[]
    connectOrCreate?: ProjectStackCreateOrConnectWithoutStackInput | ProjectStackCreateOrConnectWithoutStackInput[]
    createMany?: ProjectStackCreateManyStackInputEnvelope
    connect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
  }

  export type StackTakenCreateNestedManyWithoutStackInput = {
    create?: XOR<StackTakenCreateWithoutStackInput, StackTakenUncheckedCreateWithoutStackInput> | StackTakenCreateWithoutStackInput[] | StackTakenUncheckedCreateWithoutStackInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutStackInput | StackTakenCreateOrConnectWithoutStackInput[]
    createMany?: StackTakenCreateManyStackInputEnvelope
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
  }

  export type ProjectStackUncheckedCreateNestedManyWithoutStackInput = {
    create?: XOR<ProjectStackCreateWithoutStackInput, ProjectStackUncheckedCreateWithoutStackInput> | ProjectStackCreateWithoutStackInput[] | ProjectStackUncheckedCreateWithoutStackInput[]
    connectOrCreate?: ProjectStackCreateOrConnectWithoutStackInput | ProjectStackCreateOrConnectWithoutStackInput[]
    createMany?: ProjectStackCreateManyStackInputEnvelope
    connect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
  }

  export type StackTakenUncheckedCreateNestedManyWithoutStackInput = {
    create?: XOR<StackTakenCreateWithoutStackInput, StackTakenUncheckedCreateWithoutStackInput> | StackTakenCreateWithoutStackInput[] | StackTakenUncheckedCreateWithoutStackInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutStackInput | StackTakenCreateOrConnectWithoutStackInput[]
    createMany?: StackTakenCreateManyStackInputEnvelope
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
  }

  export type ProjectStackUpdateManyWithoutStackNestedInput = {
    create?: XOR<ProjectStackCreateWithoutStackInput, ProjectStackUncheckedCreateWithoutStackInput> | ProjectStackCreateWithoutStackInput[] | ProjectStackUncheckedCreateWithoutStackInput[]
    connectOrCreate?: ProjectStackCreateOrConnectWithoutStackInput | ProjectStackCreateOrConnectWithoutStackInput[]
    upsert?: ProjectStackUpsertWithWhereUniqueWithoutStackInput | ProjectStackUpsertWithWhereUniqueWithoutStackInput[]
    createMany?: ProjectStackCreateManyStackInputEnvelope
    set?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    disconnect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    delete?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    connect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    update?: ProjectStackUpdateWithWhereUniqueWithoutStackInput | ProjectStackUpdateWithWhereUniqueWithoutStackInput[]
    updateMany?: ProjectStackUpdateManyWithWhereWithoutStackInput | ProjectStackUpdateManyWithWhereWithoutStackInput[]
    deleteMany?: ProjectStackScalarWhereInput | ProjectStackScalarWhereInput[]
  }

  export type StackTakenUpdateManyWithoutStackNestedInput = {
    create?: XOR<StackTakenCreateWithoutStackInput, StackTakenUncheckedCreateWithoutStackInput> | StackTakenCreateWithoutStackInput[] | StackTakenUncheckedCreateWithoutStackInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutStackInput | StackTakenCreateOrConnectWithoutStackInput[]
    upsert?: StackTakenUpsertWithWhereUniqueWithoutStackInput | StackTakenUpsertWithWhereUniqueWithoutStackInput[]
    createMany?: StackTakenCreateManyStackInputEnvelope
    set?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    disconnect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    delete?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    update?: StackTakenUpdateWithWhereUniqueWithoutStackInput | StackTakenUpdateWithWhereUniqueWithoutStackInput[]
    updateMany?: StackTakenUpdateManyWithWhereWithoutStackInput | StackTakenUpdateManyWithWhereWithoutStackInput[]
    deleteMany?: StackTakenScalarWhereInput | StackTakenScalarWhereInput[]
  }

  export type ProjectStackUncheckedUpdateManyWithoutStackNestedInput = {
    create?: XOR<ProjectStackCreateWithoutStackInput, ProjectStackUncheckedCreateWithoutStackInput> | ProjectStackCreateWithoutStackInput[] | ProjectStackUncheckedCreateWithoutStackInput[]
    connectOrCreate?: ProjectStackCreateOrConnectWithoutStackInput | ProjectStackCreateOrConnectWithoutStackInput[]
    upsert?: ProjectStackUpsertWithWhereUniqueWithoutStackInput | ProjectStackUpsertWithWhereUniqueWithoutStackInput[]
    createMany?: ProjectStackCreateManyStackInputEnvelope
    set?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    disconnect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    delete?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    connect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    update?: ProjectStackUpdateWithWhereUniqueWithoutStackInput | ProjectStackUpdateWithWhereUniqueWithoutStackInput[]
    updateMany?: ProjectStackUpdateManyWithWhereWithoutStackInput | ProjectStackUpdateManyWithWhereWithoutStackInput[]
    deleteMany?: ProjectStackScalarWhereInput | ProjectStackScalarWhereInput[]
  }

  export type StackTakenUncheckedUpdateManyWithoutStackNestedInput = {
    create?: XOR<StackTakenCreateWithoutStackInput, StackTakenUncheckedCreateWithoutStackInput> | StackTakenCreateWithoutStackInput[] | StackTakenUncheckedCreateWithoutStackInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutStackInput | StackTakenCreateOrConnectWithoutStackInput[]
    upsert?: StackTakenUpsertWithWhereUniqueWithoutStackInput | StackTakenUpsertWithWhereUniqueWithoutStackInput[]
    createMany?: StackTakenCreateManyStackInputEnvelope
    set?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    disconnect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    delete?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    update?: StackTakenUpdateWithWhereUniqueWithoutStackInput | StackTakenUpdateWithWhereUniqueWithoutStackInput[]
    updateMany?: StackTakenUpdateManyWithWhereWithoutStackInput | StackTakenUpdateManyWithWhereWithoutStackInput[]
    deleteMany?: StackTakenScalarWhereInput | StackTakenScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectStackCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectStackCreateWithoutProjectInput, ProjectStackUncheckedCreateWithoutProjectInput> | ProjectStackCreateWithoutProjectInput[] | ProjectStackUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStackCreateOrConnectWithoutProjectInput | ProjectStackCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectStackCreateManyProjectInputEnvelope
    connect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
  }

  export type ProjectSkillCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectSkillCreateWithoutProjectInput, ProjectSkillUncheckedCreateWithoutProjectInput> | ProjectSkillCreateWithoutProjectInput[] | ProjectSkillUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectSkillCreateOrConnectWithoutProjectInput | ProjectSkillCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectSkillCreateManyProjectInputEnvelope
    connect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
  }

  export type StackTakenCreateNestedManyWithoutProjectInput = {
    create?: XOR<StackTakenCreateWithoutProjectInput, StackTakenUncheckedCreateWithoutProjectInput> | StackTakenCreateWithoutProjectInput[] | StackTakenUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutProjectInput | StackTakenCreateOrConnectWithoutProjectInput[]
    createMany?: StackTakenCreateManyProjectInputEnvelope
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutProjectInput = {
    create?: XOR<FeedbackCreateWithoutProjectInput, FeedbackUncheckedCreateWithoutProjectInput> | FeedbackCreateWithoutProjectInput[] | FeedbackUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutProjectInput | FeedbackCreateOrConnectWithoutProjectInput[]
    createMany?: FeedbackCreateManyProjectInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type ProjectStackUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectStackCreateWithoutProjectInput, ProjectStackUncheckedCreateWithoutProjectInput> | ProjectStackCreateWithoutProjectInput[] | ProjectStackUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStackCreateOrConnectWithoutProjectInput | ProjectStackCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectStackCreateManyProjectInputEnvelope
    connect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
  }

  export type ProjectSkillUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectSkillCreateWithoutProjectInput, ProjectSkillUncheckedCreateWithoutProjectInput> | ProjectSkillCreateWithoutProjectInput[] | ProjectSkillUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectSkillCreateOrConnectWithoutProjectInput | ProjectSkillCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectSkillCreateManyProjectInputEnvelope
    connect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
  }

  export type StackTakenUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<StackTakenCreateWithoutProjectInput, StackTakenUncheckedCreateWithoutProjectInput> | StackTakenCreateWithoutProjectInput[] | StackTakenUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutProjectInput | StackTakenCreateOrConnectWithoutProjectInput[]
    createMany?: StackTakenCreateManyProjectInputEnvelope
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<FeedbackCreateWithoutProjectInput, FeedbackUncheckedCreateWithoutProjectInput> | FeedbackCreateWithoutProjectInput[] | FeedbackUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutProjectInput | FeedbackCreateOrConnectWithoutProjectInput[]
    createMany?: FeedbackCreateManyProjectInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ProjectStackUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectStackCreateWithoutProjectInput, ProjectStackUncheckedCreateWithoutProjectInput> | ProjectStackCreateWithoutProjectInput[] | ProjectStackUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStackCreateOrConnectWithoutProjectInput | ProjectStackCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectStackUpsertWithWhereUniqueWithoutProjectInput | ProjectStackUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectStackCreateManyProjectInputEnvelope
    set?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    disconnect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    delete?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    connect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    update?: ProjectStackUpdateWithWhereUniqueWithoutProjectInput | ProjectStackUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectStackUpdateManyWithWhereWithoutProjectInput | ProjectStackUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectStackScalarWhereInput | ProjectStackScalarWhereInput[]
  }

  export type ProjectSkillUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectSkillCreateWithoutProjectInput, ProjectSkillUncheckedCreateWithoutProjectInput> | ProjectSkillCreateWithoutProjectInput[] | ProjectSkillUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectSkillCreateOrConnectWithoutProjectInput | ProjectSkillCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectSkillUpsertWithWhereUniqueWithoutProjectInput | ProjectSkillUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectSkillCreateManyProjectInputEnvelope
    set?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    disconnect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    delete?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    connect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    update?: ProjectSkillUpdateWithWhereUniqueWithoutProjectInput | ProjectSkillUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectSkillUpdateManyWithWhereWithoutProjectInput | ProjectSkillUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectSkillScalarWhereInput | ProjectSkillScalarWhereInput[]
  }

  export type StackTakenUpdateManyWithoutProjectNestedInput = {
    create?: XOR<StackTakenCreateWithoutProjectInput, StackTakenUncheckedCreateWithoutProjectInput> | StackTakenCreateWithoutProjectInput[] | StackTakenUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutProjectInput | StackTakenCreateOrConnectWithoutProjectInput[]
    upsert?: StackTakenUpsertWithWhereUniqueWithoutProjectInput | StackTakenUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: StackTakenCreateManyProjectInputEnvelope
    set?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    disconnect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    delete?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    update?: StackTakenUpdateWithWhereUniqueWithoutProjectInput | StackTakenUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: StackTakenUpdateManyWithWhereWithoutProjectInput | StackTakenUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: StackTakenScalarWhereInput | StackTakenScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutProjectNestedInput = {
    create?: XOR<FeedbackCreateWithoutProjectInput, FeedbackUncheckedCreateWithoutProjectInput> | FeedbackCreateWithoutProjectInput[] | FeedbackUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutProjectInput | FeedbackCreateOrConnectWithoutProjectInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutProjectInput | FeedbackUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: FeedbackCreateManyProjectInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutProjectInput | FeedbackUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutProjectInput | FeedbackUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type ProjectStackUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectStackCreateWithoutProjectInput, ProjectStackUncheckedCreateWithoutProjectInput> | ProjectStackCreateWithoutProjectInput[] | ProjectStackUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStackCreateOrConnectWithoutProjectInput | ProjectStackCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectStackUpsertWithWhereUniqueWithoutProjectInput | ProjectStackUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectStackCreateManyProjectInputEnvelope
    set?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    disconnect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    delete?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    connect?: ProjectStackWhereUniqueInput | ProjectStackWhereUniqueInput[]
    update?: ProjectStackUpdateWithWhereUniqueWithoutProjectInput | ProjectStackUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectStackUpdateManyWithWhereWithoutProjectInput | ProjectStackUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectStackScalarWhereInput | ProjectStackScalarWhereInput[]
  }

  export type ProjectSkillUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectSkillCreateWithoutProjectInput, ProjectSkillUncheckedCreateWithoutProjectInput> | ProjectSkillCreateWithoutProjectInput[] | ProjectSkillUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectSkillCreateOrConnectWithoutProjectInput | ProjectSkillCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectSkillUpsertWithWhereUniqueWithoutProjectInput | ProjectSkillUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectSkillCreateManyProjectInputEnvelope
    set?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    disconnect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    delete?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    connect?: ProjectSkillWhereUniqueInput | ProjectSkillWhereUniqueInput[]
    update?: ProjectSkillUpdateWithWhereUniqueWithoutProjectInput | ProjectSkillUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectSkillUpdateManyWithWhereWithoutProjectInput | ProjectSkillUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectSkillScalarWhereInput | ProjectSkillScalarWhereInput[]
  }

  export type StackTakenUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<StackTakenCreateWithoutProjectInput, StackTakenUncheckedCreateWithoutProjectInput> | StackTakenCreateWithoutProjectInput[] | StackTakenUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutProjectInput | StackTakenCreateOrConnectWithoutProjectInput[]
    upsert?: StackTakenUpsertWithWhereUniqueWithoutProjectInput | StackTakenUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: StackTakenCreateManyProjectInputEnvelope
    set?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    disconnect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    delete?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    update?: StackTakenUpdateWithWhereUniqueWithoutProjectInput | StackTakenUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: StackTakenUpdateManyWithWhereWithoutProjectInput | StackTakenUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: StackTakenScalarWhereInput | StackTakenScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<FeedbackCreateWithoutProjectInput, FeedbackUncheckedCreateWithoutProjectInput> | FeedbackCreateWithoutProjectInput[] | FeedbackUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutProjectInput | FeedbackCreateOrConnectWithoutProjectInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutProjectInput | FeedbackUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: FeedbackCreateManyProjectInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutProjectInput | FeedbackUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutProjectInput | FeedbackUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutStacksInput = {
    create?: XOR<ProjectCreateWithoutStacksInput, ProjectUncheckedCreateWithoutStacksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutStacksInput
    connect?: ProjectWhereUniqueInput
  }

  export type StackCreateNestedOneWithoutProjectsInput = {
    create?: XOR<StackCreateWithoutProjectsInput, StackUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: StackCreateOrConnectWithoutProjectsInput
    connect?: StackWhereUniqueInput
  }

  export type StackTakenCreateNestedManyWithoutProjectStackInput = {
    create?: XOR<StackTakenCreateWithoutProjectStackInput, StackTakenUncheckedCreateWithoutProjectStackInput> | StackTakenCreateWithoutProjectStackInput[] | StackTakenUncheckedCreateWithoutProjectStackInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutProjectStackInput | StackTakenCreateOrConnectWithoutProjectStackInput[]
    createMany?: StackTakenCreateManyProjectStackInputEnvelope
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
  }

  export type StackTakenUncheckedCreateNestedManyWithoutProjectStackInput = {
    create?: XOR<StackTakenCreateWithoutProjectStackInput, StackTakenUncheckedCreateWithoutProjectStackInput> | StackTakenCreateWithoutProjectStackInput[] | StackTakenUncheckedCreateWithoutProjectStackInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutProjectStackInput | StackTakenCreateOrConnectWithoutProjectStackInput[]
    createMany?: StackTakenCreateManyProjectStackInputEnvelope
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
  }

  export type ProjectUpdateOneRequiredWithoutStacksNestedInput = {
    create?: XOR<ProjectCreateWithoutStacksInput, ProjectUncheckedCreateWithoutStacksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutStacksInput
    upsert?: ProjectUpsertWithoutStacksInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutStacksInput, ProjectUpdateWithoutStacksInput>, ProjectUncheckedUpdateWithoutStacksInput>
  }

  export type StackUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<StackCreateWithoutProjectsInput, StackUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: StackCreateOrConnectWithoutProjectsInput
    upsert?: StackUpsertWithoutProjectsInput
    connect?: StackWhereUniqueInput
    update?: XOR<XOR<StackUpdateToOneWithWhereWithoutProjectsInput, StackUpdateWithoutProjectsInput>, StackUncheckedUpdateWithoutProjectsInput>
  }

  export type StackTakenUpdateManyWithoutProjectStackNestedInput = {
    create?: XOR<StackTakenCreateWithoutProjectStackInput, StackTakenUncheckedCreateWithoutProjectStackInput> | StackTakenCreateWithoutProjectStackInput[] | StackTakenUncheckedCreateWithoutProjectStackInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutProjectStackInput | StackTakenCreateOrConnectWithoutProjectStackInput[]
    upsert?: StackTakenUpsertWithWhereUniqueWithoutProjectStackInput | StackTakenUpsertWithWhereUniqueWithoutProjectStackInput[]
    createMany?: StackTakenCreateManyProjectStackInputEnvelope
    set?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    disconnect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    delete?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    update?: StackTakenUpdateWithWhereUniqueWithoutProjectStackInput | StackTakenUpdateWithWhereUniqueWithoutProjectStackInput[]
    updateMany?: StackTakenUpdateManyWithWhereWithoutProjectStackInput | StackTakenUpdateManyWithWhereWithoutProjectStackInput[]
    deleteMany?: StackTakenScalarWhereInput | StackTakenScalarWhereInput[]
  }

  export type StackTakenUncheckedUpdateManyWithoutProjectStackNestedInput = {
    create?: XOR<StackTakenCreateWithoutProjectStackInput, StackTakenUncheckedCreateWithoutProjectStackInput> | StackTakenCreateWithoutProjectStackInput[] | StackTakenUncheckedCreateWithoutProjectStackInput[]
    connectOrCreate?: StackTakenCreateOrConnectWithoutProjectStackInput | StackTakenCreateOrConnectWithoutProjectStackInput[]
    upsert?: StackTakenUpsertWithWhereUniqueWithoutProjectStackInput | StackTakenUpsertWithWhereUniqueWithoutProjectStackInput[]
    createMany?: StackTakenCreateManyProjectStackInputEnvelope
    set?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    disconnect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    delete?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    connect?: StackTakenWhereUniqueInput | StackTakenWhereUniqueInput[]
    update?: StackTakenUpdateWithWhereUniqueWithoutProjectStackInput | StackTakenUpdateWithWhereUniqueWithoutProjectStackInput[]
    updateMany?: StackTakenUpdateManyWithWhereWithoutProjectStackInput | StackTakenUpdateManyWithWhereWithoutProjectStackInput[]
    deleteMany?: StackTakenScalarWhereInput | StackTakenScalarWhereInput[]
  }

  export type ProjectStackCreateNestedOneWithoutStackTakenInput = {
    create?: XOR<ProjectStackCreateWithoutStackTakenInput, ProjectStackUncheckedCreateWithoutStackTakenInput>
    connectOrCreate?: ProjectStackCreateOrConnectWithoutStackTakenInput
    connect?: ProjectStackWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStacksTakenInput = {
    create?: XOR<UserCreateWithoutStacksTakenInput, UserUncheckedCreateWithoutStacksTakenInput>
    connectOrCreate?: UserCreateOrConnectWithoutStacksTakenInput
    connect?: UserWhereUniqueInput
  }

  export type StackCreateNestedOneWithoutStacksTakenInput = {
    create?: XOR<StackCreateWithoutStacksTakenInput, StackUncheckedCreateWithoutStacksTakenInput>
    connectOrCreate?: StackCreateOrConnectWithoutStacksTakenInput
    connect?: StackWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutStacksTakenInput = {
    create?: XOR<ProjectCreateWithoutStacksTakenInput, ProjectUncheckedCreateWithoutStacksTakenInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutStacksTakenInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectStackUpdateOneRequiredWithoutStackTakenNestedInput = {
    create?: XOR<ProjectStackCreateWithoutStackTakenInput, ProjectStackUncheckedCreateWithoutStackTakenInput>
    connectOrCreate?: ProjectStackCreateOrConnectWithoutStackTakenInput
    upsert?: ProjectStackUpsertWithoutStackTakenInput
    connect?: ProjectStackWhereUniqueInput
    update?: XOR<XOR<ProjectStackUpdateToOneWithWhereWithoutStackTakenInput, ProjectStackUpdateWithoutStackTakenInput>, ProjectStackUncheckedUpdateWithoutStackTakenInput>
  }

  export type UserUpdateOneRequiredWithoutStacksTakenNestedInput = {
    create?: XOR<UserCreateWithoutStacksTakenInput, UserUncheckedCreateWithoutStacksTakenInput>
    connectOrCreate?: UserCreateOrConnectWithoutStacksTakenInput
    upsert?: UserUpsertWithoutStacksTakenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStacksTakenInput, UserUpdateWithoutStacksTakenInput>, UserUncheckedUpdateWithoutStacksTakenInput>
  }

  export type StackUpdateOneRequiredWithoutStacksTakenNestedInput = {
    create?: XOR<StackCreateWithoutStacksTakenInput, StackUncheckedCreateWithoutStacksTakenInput>
    connectOrCreate?: StackCreateOrConnectWithoutStacksTakenInput
    upsert?: StackUpsertWithoutStacksTakenInput
    connect?: StackWhereUniqueInput
    update?: XOR<XOR<StackUpdateToOneWithWhereWithoutStacksTakenInput, StackUpdateWithoutStacksTakenInput>, StackUncheckedUpdateWithoutStacksTakenInput>
  }

  export type ProjectUpdateOneRequiredWithoutStacksTakenNestedInput = {
    create?: XOR<ProjectCreateWithoutStacksTakenInput, ProjectUncheckedCreateWithoutStacksTakenInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutStacksTakenInput
    upsert?: ProjectUpsertWithoutStacksTakenInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutStacksTakenInput, ProjectUpdateWithoutStacksTakenInput>, ProjectUncheckedUpdateWithoutStacksTakenInput>
  }

  export type UserCreateNestedOneWithoutSkillsInput = {
    create?: XOR<UserCreateWithoutSkillsInput, UserUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkillsInput
    connect?: UserWhereUniqueInput
  }

  export type SkillCreateNestedOneWithoutUsersInput = {
    create?: XOR<SkillCreateWithoutUsersInput, SkillUncheckedCreateWithoutUsersInput>
    connectOrCreate?: SkillCreateOrConnectWithoutUsersInput
    connect?: SkillWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSkillsNestedInput = {
    create?: XOR<UserCreateWithoutSkillsInput, UserUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkillsInput
    upsert?: UserUpsertWithoutSkillsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSkillsInput, UserUpdateWithoutSkillsInput>, UserUncheckedUpdateWithoutSkillsInput>
  }

  export type SkillUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<SkillCreateWithoutUsersInput, SkillUncheckedCreateWithoutUsersInput>
    connectOrCreate?: SkillCreateOrConnectWithoutUsersInput
    upsert?: SkillUpsertWithoutUsersInput
    connect?: SkillWhereUniqueInput
    update?: XOR<XOR<SkillUpdateToOneWithWhereWithoutUsersInput, SkillUpdateWithoutUsersInput>, SkillUncheckedUpdateWithoutUsersInput>
  }

  export type ProjectCreateNestedOneWithoutSkillsInput = {
    create?: XOR<ProjectCreateWithoutSkillsInput, ProjectUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSkillsInput
    connect?: ProjectWhereUniqueInput
  }

  export type SkillCreateNestedOneWithoutProjectsInput = {
    create?: XOR<SkillCreateWithoutProjectsInput, SkillUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutProjectsInput
    connect?: SkillWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutSkillsNestedInput = {
    create?: XOR<ProjectCreateWithoutSkillsInput, ProjectUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSkillsInput
    upsert?: ProjectUpsertWithoutSkillsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutSkillsInput, ProjectUpdateWithoutSkillsInput>, ProjectUncheckedUpdateWithoutSkillsInput>
  }

  export type SkillUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<SkillCreateWithoutProjectsInput, SkillUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutProjectsInput
    upsert?: SkillUpsertWithoutProjectsInput
    connect?: SkillWhereUniqueInput
    update?: XOR<XOR<SkillUpdateToOneWithWhereWithoutProjectsInput, SkillUpdateWithoutProjectsInput>, SkillUncheckedUpdateWithoutProjectsInput>
  }

  export type ProjectCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<ProjectCreateWithoutFeedbacksInput, ProjectUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFeedbacksInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFeedbacksGivenInput = {
    create?: XOR<UserCreateWithoutFeedbacksGivenInput, UserUncheckedCreateWithoutFeedbacksGivenInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksGivenInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFeedbacksReceivedInput = {
    create?: XOR<UserCreateWithoutFeedbacksReceivedInput, UserUncheckedCreateWithoutFeedbacksReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProjectUpdateOneRequiredWithoutFeedbacksNestedInput = {
    create?: XOR<ProjectCreateWithoutFeedbacksInput, ProjectUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFeedbacksInput
    upsert?: ProjectUpsertWithoutFeedbacksInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutFeedbacksInput, ProjectUpdateWithoutFeedbacksInput>, ProjectUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UserUpdateOneRequiredWithoutFeedbacksGivenNestedInput = {
    create?: XOR<UserCreateWithoutFeedbacksGivenInput, UserUncheckedCreateWithoutFeedbacksGivenInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksGivenInput
    upsert?: UserUpsertWithoutFeedbacksGivenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedbacksGivenInput, UserUpdateWithoutFeedbacksGivenInput>, UserUncheckedUpdateWithoutFeedbacksGivenInput>
  }

  export type UserUpdateOneRequiredWithoutFeedbacksReceivedNestedInput = {
    create?: XOR<UserCreateWithoutFeedbacksReceivedInput, UserUncheckedCreateWithoutFeedbacksReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksReceivedInput
    upsert?: UserUpsertWithoutFeedbacksReceivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedbacksReceivedInput, UserUpdateWithoutFeedbacksReceivedInput>, UserUncheckedUpdateWithoutFeedbacksReceivedInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserSkillCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    skill: SkillCreateNestedOneWithoutUsersInput
  }

  export type UserSkillUncheckedCreateWithoutUserInput = {
    id?: string
    skillId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSkillCreateOrConnectWithoutUserInput = {
    where: UserSkillWhereUniqueInput
    create: XOR<UserSkillCreateWithoutUserInput, UserSkillUncheckedCreateWithoutUserInput>
  }

  export type UserSkillCreateManyUserInputEnvelope = {
    data: UserSkillCreateManyUserInput | UserSkillCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutOwnerInput = {
    id?: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    stacks?: ProjectStackCreateNestedManyWithoutProjectInput
    skills?: ProjectSkillCreateNestedManyWithoutProjectInput
    stacksTaken?: StackTakenCreateNestedManyWithoutProjectInput
    feedbacks?: FeedbackCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    stacks?: ProjectStackUncheckedCreateNestedManyWithoutProjectInput
    skills?: ProjectSkillUncheckedCreateNestedManyWithoutProjectInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutProjectInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutOwnerInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput>
  }

  export type ProjectCreateManyOwnerInputEnvelope = {
    data: ProjectCreateManyOwnerInput | ProjectCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type StackTakenCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projectStack: ProjectStackCreateNestedOneWithoutStackTakenInput
    stack: StackCreateNestedOneWithoutStacksTakenInput
    project: ProjectCreateNestedOneWithoutStacksTakenInput
  }

  export type StackTakenUncheckedCreateWithoutUserInput = {
    id?: string
    projectStackId: string
    stackId: string
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackTakenCreateOrConnectWithoutUserInput = {
    where: StackTakenWhereUniqueInput
    create: XOR<StackTakenCreateWithoutUserInput, StackTakenUncheckedCreateWithoutUserInput>
  }

  export type StackTakenCreateManyUserInputEnvelope = {
    data: StackTakenCreateManyUserInput | StackTakenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutToUserInput = {
    id?: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutFeedbacksInput
    fromUser: UserCreateNestedOneWithoutFeedbacksGivenInput
  }

  export type FeedbackUncheckedCreateWithoutToUserInput = {
    id?: string
    projectId: string
    fromUserId: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutToUserInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutToUserInput, FeedbackUncheckedCreateWithoutToUserInput>
  }

  export type FeedbackCreateManyToUserInputEnvelope = {
    data: FeedbackCreateManyToUserInput | FeedbackCreateManyToUserInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutFromUserInput = {
    id?: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutFeedbacksInput
    toUser: UserCreateNestedOneWithoutFeedbacksReceivedInput
  }

  export type FeedbackUncheckedCreateWithoutFromUserInput = {
    id?: string
    projectId: string
    toUserId: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutFromUserInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutFromUserInput, FeedbackUncheckedCreateWithoutFromUserInput>
  }

  export type FeedbackCreateManyFromUserInputEnvelope = {
    data: FeedbackCreateManyFromUserInput | FeedbackCreateManyFromUserInput[]
    skipDuplicates?: boolean
  }

  export type UserSkillUpsertWithWhereUniqueWithoutUserInput = {
    where: UserSkillWhereUniqueInput
    update: XOR<UserSkillUpdateWithoutUserInput, UserSkillUncheckedUpdateWithoutUserInput>
    create: XOR<UserSkillCreateWithoutUserInput, UserSkillUncheckedCreateWithoutUserInput>
  }

  export type UserSkillUpdateWithWhereUniqueWithoutUserInput = {
    where: UserSkillWhereUniqueInput
    data: XOR<UserSkillUpdateWithoutUserInput, UserSkillUncheckedUpdateWithoutUserInput>
  }

  export type UserSkillUpdateManyWithWhereWithoutUserInput = {
    where: UserSkillScalarWhereInput
    data: XOR<UserSkillUpdateManyMutationInput, UserSkillUncheckedUpdateManyWithoutUserInput>
  }

  export type UserSkillScalarWhereInput = {
    AND?: UserSkillScalarWhereInput | UserSkillScalarWhereInput[]
    OR?: UserSkillScalarWhereInput[]
    NOT?: UserSkillScalarWhereInput | UserSkillScalarWhereInput[]
    id?: StringFilter<"UserSkill"> | string
    userId?: StringFilter<"UserSkill"> | string
    skillId?: StringFilter<"UserSkill"> | string
    createdAt?: DateTimeFilter<"UserSkill"> | Date | string
    updatedAt?: DateTimeFilter<"UserSkill"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutOwnerInput, ProjectUncheckedUpdateWithoutOwnerInput>
    create: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutOwnerInput, ProjectUncheckedUpdateWithoutOwnerInput>
  }

  export type ProjectUpdateManyWithWhereWithoutOwnerInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutOwnerInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    ownerId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    deadline?: DateTimeFilter<"Project"> | Date | string
    totalValue?: FloatFilter<"Project"> | number
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type StackTakenUpsertWithWhereUniqueWithoutUserInput = {
    where: StackTakenWhereUniqueInput
    update: XOR<StackTakenUpdateWithoutUserInput, StackTakenUncheckedUpdateWithoutUserInput>
    create: XOR<StackTakenCreateWithoutUserInput, StackTakenUncheckedCreateWithoutUserInput>
  }

  export type StackTakenUpdateWithWhereUniqueWithoutUserInput = {
    where: StackTakenWhereUniqueInput
    data: XOR<StackTakenUpdateWithoutUserInput, StackTakenUncheckedUpdateWithoutUserInput>
  }

  export type StackTakenUpdateManyWithWhereWithoutUserInput = {
    where: StackTakenScalarWhereInput
    data: XOR<StackTakenUpdateManyMutationInput, StackTakenUncheckedUpdateManyWithoutUserInput>
  }

  export type StackTakenScalarWhereInput = {
    AND?: StackTakenScalarWhereInput | StackTakenScalarWhereInput[]
    OR?: StackTakenScalarWhereInput[]
    NOT?: StackTakenScalarWhereInput | StackTakenScalarWhereInput[]
    id?: StringFilter<"StackTaken"> | string
    projectStackId?: StringFilter<"StackTaken"> | string
    userId?: StringFilter<"StackTaken"> | string
    stackId?: StringFilter<"StackTaken"> | string
    projectId?: StringFilter<"StackTaken"> | string
    createdAt?: DateTimeFilter<"StackTaken"> | Date | string
    updatedAt?: DateTimeFilter<"StackTaken"> | Date | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutToUserInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutToUserInput, FeedbackUncheckedUpdateWithoutToUserInput>
    create: XOR<FeedbackCreateWithoutToUserInput, FeedbackUncheckedCreateWithoutToUserInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutToUserInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutToUserInput, FeedbackUncheckedUpdateWithoutToUserInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutToUserInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutToUserInput>
  }

  export type FeedbackScalarWhereInput = {
    AND?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    OR?: FeedbackScalarWhereInput[]
    NOT?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    id?: StringFilter<"Feedback"> | string
    projectId?: StringFilter<"Feedback"> | string
    fromUserId?: StringFilter<"Feedback"> | string
    toUserId?: StringFilter<"Feedback"> | string
    rating?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    anonymous?: BoolFilter<"Feedback"> | boolean
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeFilter<"Feedback"> | Date | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutFromUserInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutFromUserInput, FeedbackUncheckedUpdateWithoutFromUserInput>
    create: XOR<FeedbackCreateWithoutFromUserInput, FeedbackUncheckedCreateWithoutFromUserInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutFromUserInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutFromUserInput, FeedbackUncheckedUpdateWithoutFromUserInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutFromUserInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutFromUserInput>
  }

  export type UserSkillCreateWithoutSkillInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSkillsInput
  }

  export type UserSkillUncheckedCreateWithoutSkillInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSkillCreateOrConnectWithoutSkillInput = {
    where: UserSkillWhereUniqueInput
    create: XOR<UserSkillCreateWithoutSkillInput, UserSkillUncheckedCreateWithoutSkillInput>
  }

  export type UserSkillCreateManySkillInputEnvelope = {
    data: UserSkillCreateManySkillInput | UserSkillCreateManySkillInput[]
    skipDuplicates?: boolean
  }

  export type ProjectSkillCreateWithoutSkillInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutSkillsInput
  }

  export type ProjectSkillUncheckedCreateWithoutSkillInput = {
    id?: string
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectSkillCreateOrConnectWithoutSkillInput = {
    where: ProjectSkillWhereUniqueInput
    create: XOR<ProjectSkillCreateWithoutSkillInput, ProjectSkillUncheckedCreateWithoutSkillInput>
  }

  export type ProjectSkillCreateManySkillInputEnvelope = {
    data: ProjectSkillCreateManySkillInput | ProjectSkillCreateManySkillInput[]
    skipDuplicates?: boolean
  }

  export type UserSkillUpsertWithWhereUniqueWithoutSkillInput = {
    where: UserSkillWhereUniqueInput
    update: XOR<UserSkillUpdateWithoutSkillInput, UserSkillUncheckedUpdateWithoutSkillInput>
    create: XOR<UserSkillCreateWithoutSkillInput, UserSkillUncheckedCreateWithoutSkillInput>
  }

  export type UserSkillUpdateWithWhereUniqueWithoutSkillInput = {
    where: UserSkillWhereUniqueInput
    data: XOR<UserSkillUpdateWithoutSkillInput, UserSkillUncheckedUpdateWithoutSkillInput>
  }

  export type UserSkillUpdateManyWithWhereWithoutSkillInput = {
    where: UserSkillScalarWhereInput
    data: XOR<UserSkillUpdateManyMutationInput, UserSkillUncheckedUpdateManyWithoutSkillInput>
  }

  export type ProjectSkillUpsertWithWhereUniqueWithoutSkillInput = {
    where: ProjectSkillWhereUniqueInput
    update: XOR<ProjectSkillUpdateWithoutSkillInput, ProjectSkillUncheckedUpdateWithoutSkillInput>
    create: XOR<ProjectSkillCreateWithoutSkillInput, ProjectSkillUncheckedCreateWithoutSkillInput>
  }

  export type ProjectSkillUpdateWithWhereUniqueWithoutSkillInput = {
    where: ProjectSkillWhereUniqueInput
    data: XOR<ProjectSkillUpdateWithoutSkillInput, ProjectSkillUncheckedUpdateWithoutSkillInput>
  }

  export type ProjectSkillUpdateManyWithWhereWithoutSkillInput = {
    where: ProjectSkillScalarWhereInput
    data: XOR<ProjectSkillUpdateManyMutationInput, ProjectSkillUncheckedUpdateManyWithoutSkillInput>
  }

  export type ProjectSkillScalarWhereInput = {
    AND?: ProjectSkillScalarWhereInput | ProjectSkillScalarWhereInput[]
    OR?: ProjectSkillScalarWhereInput[]
    NOT?: ProjectSkillScalarWhereInput | ProjectSkillScalarWhereInput[]
    id?: StringFilter<"ProjectSkill"> | string
    projectId?: StringFilter<"ProjectSkill"> | string
    skillId?: StringFilter<"ProjectSkill"> | string
    createdAt?: DateTimeFilter<"ProjectSkill"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectSkill"> | Date | string
  }

  export type ProjectStackCreateWithoutStackInput = {
    id?: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutStacksInput
    StackTaken?: StackTakenCreateNestedManyWithoutProjectStackInput
  }

  export type ProjectStackUncheckedCreateWithoutStackInput = {
    id?: string
    projectId: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
    StackTaken?: StackTakenUncheckedCreateNestedManyWithoutProjectStackInput
  }

  export type ProjectStackCreateOrConnectWithoutStackInput = {
    where: ProjectStackWhereUniqueInput
    create: XOR<ProjectStackCreateWithoutStackInput, ProjectStackUncheckedCreateWithoutStackInput>
  }

  export type ProjectStackCreateManyStackInputEnvelope = {
    data: ProjectStackCreateManyStackInput | ProjectStackCreateManyStackInput[]
    skipDuplicates?: boolean
  }

  export type StackTakenCreateWithoutStackInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projectStack: ProjectStackCreateNestedOneWithoutStackTakenInput
    user: UserCreateNestedOneWithoutStacksTakenInput
    project: ProjectCreateNestedOneWithoutStacksTakenInput
  }

  export type StackTakenUncheckedCreateWithoutStackInput = {
    id?: string
    projectStackId: string
    userId: string
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackTakenCreateOrConnectWithoutStackInput = {
    where: StackTakenWhereUniqueInput
    create: XOR<StackTakenCreateWithoutStackInput, StackTakenUncheckedCreateWithoutStackInput>
  }

  export type StackTakenCreateManyStackInputEnvelope = {
    data: StackTakenCreateManyStackInput | StackTakenCreateManyStackInput[]
    skipDuplicates?: boolean
  }

  export type ProjectStackUpsertWithWhereUniqueWithoutStackInput = {
    where: ProjectStackWhereUniqueInput
    update: XOR<ProjectStackUpdateWithoutStackInput, ProjectStackUncheckedUpdateWithoutStackInput>
    create: XOR<ProjectStackCreateWithoutStackInput, ProjectStackUncheckedCreateWithoutStackInput>
  }

  export type ProjectStackUpdateWithWhereUniqueWithoutStackInput = {
    where: ProjectStackWhereUniqueInput
    data: XOR<ProjectStackUpdateWithoutStackInput, ProjectStackUncheckedUpdateWithoutStackInput>
  }

  export type ProjectStackUpdateManyWithWhereWithoutStackInput = {
    where: ProjectStackScalarWhereInput
    data: XOR<ProjectStackUpdateManyMutationInput, ProjectStackUncheckedUpdateManyWithoutStackInput>
  }

  export type ProjectStackScalarWhereInput = {
    AND?: ProjectStackScalarWhereInput | ProjectStackScalarWhereInput[]
    OR?: ProjectStackScalarWhereInput[]
    NOT?: ProjectStackScalarWhereInput | ProjectStackScalarWhereInput[]
    id?: StringFilter<"ProjectStack"> | string
    projectId?: StringFilter<"ProjectStack"> | string
    stackId?: StringFilter<"ProjectStack"> | string
    percentage?: FloatFilter<"ProjectStack"> | number
    createdAt?: DateTimeFilter<"ProjectStack"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectStack"> | Date | string
  }

  export type StackTakenUpsertWithWhereUniqueWithoutStackInput = {
    where: StackTakenWhereUniqueInput
    update: XOR<StackTakenUpdateWithoutStackInput, StackTakenUncheckedUpdateWithoutStackInput>
    create: XOR<StackTakenCreateWithoutStackInput, StackTakenUncheckedCreateWithoutStackInput>
  }

  export type StackTakenUpdateWithWhereUniqueWithoutStackInput = {
    where: StackTakenWhereUniqueInput
    data: XOR<StackTakenUpdateWithoutStackInput, StackTakenUncheckedUpdateWithoutStackInput>
  }

  export type StackTakenUpdateManyWithWhereWithoutStackInput = {
    where: StackTakenScalarWhereInput
    data: XOR<StackTakenUpdateManyMutationInput, StackTakenUncheckedUpdateManyWithoutStackInput>
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: UserSkillCreateNestedManyWithoutUserInput
    stacksTaken?: StackTakenCreateNestedManyWithoutUserInput
    feedbacksReceived?: FeedbackCreateNestedManyWithoutToUserInput
    feedbacksGiven?: FeedbackCreateNestedManyWithoutFromUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: UserSkillUncheckedCreateNestedManyWithoutUserInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutUserInput
    feedbacksReceived?: FeedbackUncheckedCreateNestedManyWithoutToUserInput
    feedbacksGiven?: FeedbackUncheckedCreateNestedManyWithoutFromUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ProjectStackCreateWithoutProjectInput = {
    id?: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
    stack: StackCreateNestedOneWithoutProjectsInput
    StackTaken?: StackTakenCreateNestedManyWithoutProjectStackInput
  }

  export type ProjectStackUncheckedCreateWithoutProjectInput = {
    id?: string
    stackId: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
    StackTaken?: StackTakenUncheckedCreateNestedManyWithoutProjectStackInput
  }

  export type ProjectStackCreateOrConnectWithoutProjectInput = {
    where: ProjectStackWhereUniqueInput
    create: XOR<ProjectStackCreateWithoutProjectInput, ProjectStackUncheckedCreateWithoutProjectInput>
  }

  export type ProjectStackCreateManyProjectInputEnvelope = {
    data: ProjectStackCreateManyProjectInput | ProjectStackCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectSkillCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    skill: SkillCreateNestedOneWithoutProjectsInput
  }

  export type ProjectSkillUncheckedCreateWithoutProjectInput = {
    id?: string
    skillId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectSkillCreateOrConnectWithoutProjectInput = {
    where: ProjectSkillWhereUniqueInput
    create: XOR<ProjectSkillCreateWithoutProjectInput, ProjectSkillUncheckedCreateWithoutProjectInput>
  }

  export type ProjectSkillCreateManyProjectInputEnvelope = {
    data: ProjectSkillCreateManyProjectInput | ProjectSkillCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type StackTakenCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projectStack: ProjectStackCreateNestedOneWithoutStackTakenInput
    user: UserCreateNestedOneWithoutStacksTakenInput
    stack: StackCreateNestedOneWithoutStacksTakenInput
  }

  export type StackTakenUncheckedCreateWithoutProjectInput = {
    id?: string
    projectStackId: string
    userId: string
    stackId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackTakenCreateOrConnectWithoutProjectInput = {
    where: StackTakenWhereUniqueInput
    create: XOR<StackTakenCreateWithoutProjectInput, StackTakenUncheckedCreateWithoutProjectInput>
  }

  export type StackTakenCreateManyProjectInputEnvelope = {
    data: StackTakenCreateManyProjectInput | StackTakenCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutProjectInput = {
    id?: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutFeedbacksGivenInput
    toUser: UserCreateNestedOneWithoutFeedbacksReceivedInput
  }

  export type FeedbackUncheckedCreateWithoutProjectInput = {
    id?: string
    fromUserId: string
    toUserId: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutProjectInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutProjectInput, FeedbackUncheckedCreateWithoutProjectInput>
  }

  export type FeedbackCreateManyProjectInputEnvelope = {
    data: FeedbackCreateManyProjectInput | FeedbackCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: UserSkillUpdateManyWithoutUserNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutUserNestedInput
    feedbacksReceived?: FeedbackUpdateManyWithoutToUserNestedInput
    feedbacksGiven?: FeedbackUpdateManyWithoutFromUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: UserSkillUncheckedUpdateManyWithoutUserNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutUserNestedInput
    feedbacksReceived?: FeedbackUncheckedUpdateManyWithoutToUserNestedInput
    feedbacksGiven?: FeedbackUncheckedUpdateManyWithoutFromUserNestedInput
  }

  export type ProjectStackUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectStackWhereUniqueInput
    update: XOR<ProjectStackUpdateWithoutProjectInput, ProjectStackUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectStackCreateWithoutProjectInput, ProjectStackUncheckedCreateWithoutProjectInput>
  }

  export type ProjectStackUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectStackWhereUniqueInput
    data: XOR<ProjectStackUpdateWithoutProjectInput, ProjectStackUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectStackUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectStackScalarWhereInput
    data: XOR<ProjectStackUpdateManyMutationInput, ProjectStackUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectSkillUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectSkillWhereUniqueInput
    update: XOR<ProjectSkillUpdateWithoutProjectInput, ProjectSkillUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectSkillCreateWithoutProjectInput, ProjectSkillUncheckedCreateWithoutProjectInput>
  }

  export type ProjectSkillUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectSkillWhereUniqueInput
    data: XOR<ProjectSkillUpdateWithoutProjectInput, ProjectSkillUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectSkillUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectSkillScalarWhereInput
    data: XOR<ProjectSkillUpdateManyMutationInput, ProjectSkillUncheckedUpdateManyWithoutProjectInput>
  }

  export type StackTakenUpsertWithWhereUniqueWithoutProjectInput = {
    where: StackTakenWhereUniqueInput
    update: XOR<StackTakenUpdateWithoutProjectInput, StackTakenUncheckedUpdateWithoutProjectInput>
    create: XOR<StackTakenCreateWithoutProjectInput, StackTakenUncheckedCreateWithoutProjectInput>
  }

  export type StackTakenUpdateWithWhereUniqueWithoutProjectInput = {
    where: StackTakenWhereUniqueInput
    data: XOR<StackTakenUpdateWithoutProjectInput, StackTakenUncheckedUpdateWithoutProjectInput>
  }

  export type StackTakenUpdateManyWithWhereWithoutProjectInput = {
    where: StackTakenScalarWhereInput
    data: XOR<StackTakenUpdateManyMutationInput, StackTakenUncheckedUpdateManyWithoutProjectInput>
  }

  export type FeedbackUpsertWithWhereUniqueWithoutProjectInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutProjectInput, FeedbackUncheckedUpdateWithoutProjectInput>
    create: XOR<FeedbackCreateWithoutProjectInput, FeedbackUncheckedCreateWithoutProjectInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutProjectInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutProjectInput, FeedbackUncheckedUpdateWithoutProjectInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutProjectInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectCreateWithoutStacksInput = {
    id?: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutProjectsInput
    skills?: ProjectSkillCreateNestedManyWithoutProjectInput
    stacksTaken?: StackTakenCreateNestedManyWithoutProjectInput
    feedbacks?: FeedbackCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutStacksInput = {
    id?: string
    ownerId: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: ProjectSkillUncheckedCreateNestedManyWithoutProjectInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutProjectInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutStacksInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutStacksInput, ProjectUncheckedCreateWithoutStacksInput>
  }

  export type StackCreateWithoutProjectsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    stacksTaken?: StackTakenCreateNestedManyWithoutStackInput
  }

  export type StackUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutStackInput
  }

  export type StackCreateOrConnectWithoutProjectsInput = {
    where: StackWhereUniqueInput
    create: XOR<StackCreateWithoutProjectsInput, StackUncheckedCreateWithoutProjectsInput>
  }

  export type StackTakenCreateWithoutProjectStackInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStacksTakenInput
    stack: StackCreateNestedOneWithoutStacksTakenInput
    project: ProjectCreateNestedOneWithoutStacksTakenInput
  }

  export type StackTakenUncheckedCreateWithoutProjectStackInput = {
    id?: string
    userId: string
    stackId: string
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackTakenCreateOrConnectWithoutProjectStackInput = {
    where: StackTakenWhereUniqueInput
    create: XOR<StackTakenCreateWithoutProjectStackInput, StackTakenUncheckedCreateWithoutProjectStackInput>
  }

  export type StackTakenCreateManyProjectStackInputEnvelope = {
    data: StackTakenCreateManyProjectStackInput | StackTakenCreateManyProjectStackInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutStacksInput = {
    update: XOR<ProjectUpdateWithoutStacksInput, ProjectUncheckedUpdateWithoutStacksInput>
    create: XOR<ProjectCreateWithoutStacksInput, ProjectUncheckedCreateWithoutStacksInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutStacksInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutStacksInput, ProjectUncheckedUpdateWithoutStacksInput>
  }

  export type ProjectUpdateWithoutStacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutProjectsNestedInput
    skills?: ProjectSkillUpdateManyWithoutProjectNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutProjectNestedInput
    feedbacks?: FeedbackUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutStacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: ProjectSkillUncheckedUpdateManyWithoutProjectNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutProjectNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type StackUpsertWithoutProjectsInput = {
    update: XOR<StackUpdateWithoutProjectsInput, StackUncheckedUpdateWithoutProjectsInput>
    create: XOR<StackCreateWithoutProjectsInput, StackUncheckedCreateWithoutProjectsInput>
    where?: StackWhereInput
  }

  export type StackUpdateToOneWithWhereWithoutProjectsInput = {
    where?: StackWhereInput
    data: XOR<StackUpdateWithoutProjectsInput, StackUncheckedUpdateWithoutProjectsInput>
  }

  export type StackUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stacksTaken?: StackTakenUpdateManyWithoutStackNestedInput
  }

  export type StackUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutStackNestedInput
  }

  export type StackTakenUpsertWithWhereUniqueWithoutProjectStackInput = {
    where: StackTakenWhereUniqueInput
    update: XOR<StackTakenUpdateWithoutProjectStackInput, StackTakenUncheckedUpdateWithoutProjectStackInput>
    create: XOR<StackTakenCreateWithoutProjectStackInput, StackTakenUncheckedCreateWithoutProjectStackInput>
  }

  export type StackTakenUpdateWithWhereUniqueWithoutProjectStackInput = {
    where: StackTakenWhereUniqueInput
    data: XOR<StackTakenUpdateWithoutProjectStackInput, StackTakenUncheckedUpdateWithoutProjectStackInput>
  }

  export type StackTakenUpdateManyWithWhereWithoutProjectStackInput = {
    where: StackTakenScalarWhereInput
    data: XOR<StackTakenUpdateManyMutationInput, StackTakenUncheckedUpdateManyWithoutProjectStackInput>
  }

  export type ProjectStackCreateWithoutStackTakenInput = {
    id?: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutStacksInput
    stack: StackCreateNestedOneWithoutProjectsInput
  }

  export type ProjectStackUncheckedCreateWithoutStackTakenInput = {
    id?: string
    projectId: string
    stackId: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectStackCreateOrConnectWithoutStackTakenInput = {
    where: ProjectStackWhereUniqueInput
    create: XOR<ProjectStackCreateWithoutStackTakenInput, ProjectStackUncheckedCreateWithoutStackTakenInput>
  }

  export type UserCreateWithoutStacksTakenInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: UserSkillCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutOwnerInput
    feedbacksReceived?: FeedbackCreateNestedManyWithoutToUserInput
    feedbacksGiven?: FeedbackCreateNestedManyWithoutFromUserInput
  }

  export type UserUncheckedCreateWithoutStacksTakenInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: UserSkillUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    feedbacksReceived?: FeedbackUncheckedCreateNestedManyWithoutToUserInput
    feedbacksGiven?: FeedbackUncheckedCreateNestedManyWithoutFromUserInput
  }

  export type UserCreateOrConnectWithoutStacksTakenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStacksTakenInput, UserUncheckedCreateWithoutStacksTakenInput>
  }

  export type StackCreateWithoutStacksTakenInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectStackCreateNestedManyWithoutStackInput
  }

  export type StackUncheckedCreateWithoutStacksTakenInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectStackUncheckedCreateNestedManyWithoutStackInput
  }

  export type StackCreateOrConnectWithoutStacksTakenInput = {
    where: StackWhereUniqueInput
    create: XOR<StackCreateWithoutStacksTakenInput, StackUncheckedCreateWithoutStacksTakenInput>
  }

  export type ProjectCreateWithoutStacksTakenInput = {
    id?: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutProjectsInput
    stacks?: ProjectStackCreateNestedManyWithoutProjectInput
    skills?: ProjectSkillCreateNestedManyWithoutProjectInput
    feedbacks?: FeedbackCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutStacksTakenInput = {
    id?: string
    ownerId: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    stacks?: ProjectStackUncheckedCreateNestedManyWithoutProjectInput
    skills?: ProjectSkillUncheckedCreateNestedManyWithoutProjectInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutStacksTakenInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutStacksTakenInput, ProjectUncheckedCreateWithoutStacksTakenInput>
  }

  export type ProjectStackUpsertWithoutStackTakenInput = {
    update: XOR<ProjectStackUpdateWithoutStackTakenInput, ProjectStackUncheckedUpdateWithoutStackTakenInput>
    create: XOR<ProjectStackCreateWithoutStackTakenInput, ProjectStackUncheckedCreateWithoutStackTakenInput>
    where?: ProjectStackWhereInput
  }

  export type ProjectStackUpdateToOneWithWhereWithoutStackTakenInput = {
    where?: ProjectStackWhereInput
    data: XOR<ProjectStackUpdateWithoutStackTakenInput, ProjectStackUncheckedUpdateWithoutStackTakenInput>
  }

  export type ProjectStackUpdateWithoutStackTakenInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutStacksNestedInput
    stack?: StackUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectStackUncheckedUpdateWithoutStackTakenInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutStacksTakenInput = {
    update: XOR<UserUpdateWithoutStacksTakenInput, UserUncheckedUpdateWithoutStacksTakenInput>
    create: XOR<UserCreateWithoutStacksTakenInput, UserUncheckedCreateWithoutStacksTakenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStacksTakenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStacksTakenInput, UserUncheckedUpdateWithoutStacksTakenInput>
  }

  export type UserUpdateWithoutStacksTakenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: UserSkillUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutOwnerNestedInput
    feedbacksReceived?: FeedbackUpdateManyWithoutToUserNestedInput
    feedbacksGiven?: FeedbackUpdateManyWithoutFromUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStacksTakenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: UserSkillUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    feedbacksReceived?: FeedbackUncheckedUpdateManyWithoutToUserNestedInput
    feedbacksGiven?: FeedbackUncheckedUpdateManyWithoutFromUserNestedInput
  }

  export type StackUpsertWithoutStacksTakenInput = {
    update: XOR<StackUpdateWithoutStacksTakenInput, StackUncheckedUpdateWithoutStacksTakenInput>
    create: XOR<StackCreateWithoutStacksTakenInput, StackUncheckedCreateWithoutStacksTakenInput>
    where?: StackWhereInput
  }

  export type StackUpdateToOneWithWhereWithoutStacksTakenInput = {
    where?: StackWhereInput
    data: XOR<StackUpdateWithoutStacksTakenInput, StackUncheckedUpdateWithoutStacksTakenInput>
  }

  export type StackUpdateWithoutStacksTakenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectStackUpdateManyWithoutStackNestedInput
  }

  export type StackUncheckedUpdateWithoutStacksTakenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectStackUncheckedUpdateManyWithoutStackNestedInput
  }

  export type ProjectUpsertWithoutStacksTakenInput = {
    update: XOR<ProjectUpdateWithoutStacksTakenInput, ProjectUncheckedUpdateWithoutStacksTakenInput>
    create: XOR<ProjectCreateWithoutStacksTakenInput, ProjectUncheckedCreateWithoutStacksTakenInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutStacksTakenInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutStacksTakenInput, ProjectUncheckedUpdateWithoutStacksTakenInput>
  }

  export type ProjectUpdateWithoutStacksTakenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutProjectsNestedInput
    stacks?: ProjectStackUpdateManyWithoutProjectNestedInput
    skills?: ProjectSkillUpdateManyWithoutProjectNestedInput
    feedbacks?: FeedbackUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutStacksTakenInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stacks?: ProjectStackUncheckedUpdateManyWithoutProjectNestedInput
    skills?: ProjectSkillUncheckedUpdateManyWithoutProjectNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserCreateWithoutSkillsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutOwnerInput
    stacksTaken?: StackTakenCreateNestedManyWithoutUserInput
    feedbacksReceived?: FeedbackCreateNestedManyWithoutToUserInput
    feedbacksGiven?: FeedbackCreateNestedManyWithoutFromUserInput
  }

  export type UserUncheckedCreateWithoutSkillsInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutUserInput
    feedbacksReceived?: FeedbackUncheckedCreateNestedManyWithoutToUserInput
    feedbacksGiven?: FeedbackUncheckedCreateNestedManyWithoutFromUserInput
  }

  export type UserCreateOrConnectWithoutSkillsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSkillsInput, UserUncheckedCreateWithoutSkillsInput>
  }

  export type SkillCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillCreateOrConnectWithoutUsersInput = {
    where: SkillWhereUniqueInput
    create: XOR<SkillCreateWithoutUsersInput, SkillUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutSkillsInput = {
    update: XOR<UserUpdateWithoutSkillsInput, UserUncheckedUpdateWithoutSkillsInput>
    create: XOR<UserCreateWithoutSkillsInput, UserUncheckedCreateWithoutSkillsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSkillsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSkillsInput, UserUncheckedUpdateWithoutSkillsInput>
  }

  export type UserUpdateWithoutSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutOwnerNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutUserNestedInput
    feedbacksReceived?: FeedbackUpdateManyWithoutToUserNestedInput
    feedbacksGiven?: FeedbackUpdateManyWithoutFromUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutUserNestedInput
    feedbacksReceived?: FeedbackUncheckedUpdateManyWithoutToUserNestedInput
    feedbacksGiven?: FeedbackUncheckedUpdateManyWithoutFromUserNestedInput
  }

  export type SkillUpsertWithoutUsersInput = {
    update: XOR<SkillUpdateWithoutUsersInput, SkillUncheckedUpdateWithoutUsersInput>
    create: XOR<SkillCreateWithoutUsersInput, SkillUncheckedCreateWithoutUsersInput>
    where?: SkillWhereInput
  }

  export type SkillUpdateToOneWithWhereWithoutUsersInput = {
    where?: SkillWhereInput
    data: XOR<SkillUpdateWithoutUsersInput, SkillUncheckedUpdateWithoutUsersInput>
  }

  export type SkillUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type ProjectCreateWithoutSkillsInput = {
    id?: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutProjectsInput
    stacks?: ProjectStackCreateNestedManyWithoutProjectInput
    stacksTaken?: StackTakenCreateNestedManyWithoutProjectInput
    feedbacks?: FeedbackCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutSkillsInput = {
    id?: string
    ownerId: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    stacks?: ProjectStackUncheckedCreateNestedManyWithoutProjectInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutProjectInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutSkillsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutSkillsInput, ProjectUncheckedCreateWithoutSkillsInput>
  }

  export type SkillCreateWithoutProjectsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillCreateOrConnectWithoutProjectsInput = {
    where: SkillWhereUniqueInput
    create: XOR<SkillCreateWithoutProjectsInput, SkillUncheckedCreateWithoutProjectsInput>
  }

  export type ProjectUpsertWithoutSkillsInput = {
    update: XOR<ProjectUpdateWithoutSkillsInput, ProjectUncheckedUpdateWithoutSkillsInput>
    create: XOR<ProjectCreateWithoutSkillsInput, ProjectUncheckedCreateWithoutSkillsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutSkillsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutSkillsInput, ProjectUncheckedUpdateWithoutSkillsInput>
  }

  export type ProjectUpdateWithoutSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutProjectsNestedInput
    stacks?: ProjectStackUpdateManyWithoutProjectNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutProjectNestedInput
    feedbacks?: FeedbackUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stacks?: ProjectStackUncheckedUpdateManyWithoutProjectNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutProjectNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type SkillUpsertWithoutProjectsInput = {
    update: XOR<SkillUpdateWithoutProjectsInput, SkillUncheckedUpdateWithoutProjectsInput>
    create: XOR<SkillCreateWithoutProjectsInput, SkillUncheckedCreateWithoutProjectsInput>
    where?: SkillWhereInput
  }

  export type SkillUpdateToOneWithWhereWithoutProjectsInput = {
    where?: SkillWhereInput
    data: XOR<SkillUpdateWithoutProjectsInput, SkillUncheckedUpdateWithoutProjectsInput>
  }

  export type SkillUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type ProjectCreateWithoutFeedbacksInput = {
    id?: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutProjectsInput
    stacks?: ProjectStackCreateNestedManyWithoutProjectInput
    skills?: ProjectSkillCreateNestedManyWithoutProjectInput
    stacksTaken?: StackTakenCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutFeedbacksInput = {
    id?: string
    ownerId: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    stacks?: ProjectStackUncheckedCreateNestedManyWithoutProjectInput
    skills?: ProjectSkillUncheckedCreateNestedManyWithoutProjectInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutFeedbacksInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutFeedbacksInput, ProjectUncheckedCreateWithoutFeedbacksInput>
  }

  export type UserCreateWithoutFeedbacksGivenInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: UserSkillCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutOwnerInput
    stacksTaken?: StackTakenCreateNestedManyWithoutUserInput
    feedbacksReceived?: FeedbackCreateNestedManyWithoutToUserInput
  }

  export type UserUncheckedCreateWithoutFeedbacksGivenInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: UserSkillUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutUserInput
    feedbacksReceived?: FeedbackUncheckedCreateNestedManyWithoutToUserInput
  }

  export type UserCreateOrConnectWithoutFeedbacksGivenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedbacksGivenInput, UserUncheckedCreateWithoutFeedbacksGivenInput>
  }

  export type UserCreateWithoutFeedbacksReceivedInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: UserSkillCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutOwnerInput
    stacksTaken?: StackTakenCreateNestedManyWithoutUserInput
    feedbacksGiven?: FeedbackCreateNestedManyWithoutFromUserInput
  }

  export type UserUncheckedCreateWithoutFeedbacksReceivedInput = {
    id?: string
    name: string
    email: string
    password: string
    avatar?: string | null
    linkedin?: string | null
    github?: string | null
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    skills?: UserSkillUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    stacksTaken?: StackTakenUncheckedCreateNestedManyWithoutUserInput
    feedbacksGiven?: FeedbackUncheckedCreateNestedManyWithoutFromUserInput
  }

  export type UserCreateOrConnectWithoutFeedbacksReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedbacksReceivedInput, UserUncheckedCreateWithoutFeedbacksReceivedInput>
  }

  export type ProjectUpsertWithoutFeedbacksInput = {
    update: XOR<ProjectUpdateWithoutFeedbacksInput, ProjectUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<ProjectCreateWithoutFeedbacksInput, ProjectUncheckedCreateWithoutFeedbacksInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutFeedbacksInput, ProjectUncheckedUpdateWithoutFeedbacksInput>
  }

  export type ProjectUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutProjectsNestedInput
    stacks?: ProjectStackUpdateManyWithoutProjectNestedInput
    skills?: ProjectSkillUpdateManyWithoutProjectNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stacks?: ProjectStackUncheckedUpdateManyWithoutProjectNestedInput
    skills?: ProjectSkillUncheckedUpdateManyWithoutProjectNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutFeedbacksGivenInput = {
    update: XOR<UserUpdateWithoutFeedbacksGivenInput, UserUncheckedUpdateWithoutFeedbacksGivenInput>
    create: XOR<UserCreateWithoutFeedbacksGivenInput, UserUncheckedCreateWithoutFeedbacksGivenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedbacksGivenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedbacksGivenInput, UserUncheckedUpdateWithoutFeedbacksGivenInput>
  }

  export type UserUpdateWithoutFeedbacksGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: UserSkillUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutOwnerNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutUserNestedInput
    feedbacksReceived?: FeedbackUpdateManyWithoutToUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedbacksGivenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: UserSkillUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutUserNestedInput
    feedbacksReceived?: FeedbackUncheckedUpdateManyWithoutToUserNestedInput
  }

  export type UserUpsertWithoutFeedbacksReceivedInput = {
    update: XOR<UserUpdateWithoutFeedbacksReceivedInput, UserUncheckedUpdateWithoutFeedbacksReceivedInput>
    create: XOR<UserCreateWithoutFeedbacksReceivedInput, UserUncheckedCreateWithoutFeedbacksReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedbacksReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedbacksReceivedInput, UserUncheckedUpdateWithoutFeedbacksReceivedInput>
  }

  export type UserUpdateWithoutFeedbacksReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: UserSkillUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutOwnerNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutUserNestedInput
    feedbacksGiven?: FeedbackUpdateManyWithoutFromUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedbacksReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skills?: UserSkillUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutUserNestedInput
    feedbacksGiven?: FeedbackUncheckedUpdateManyWithoutFromUserNestedInput
  }

  export type UserSkillCreateManyUserInput = {
    id?: string
    skillId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateManyOwnerInput = {
    id?: string
    name: string
    description: string
    deadline: Date | string
    totalValue: number
    status: $Enums.ProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackTakenCreateManyUserInput = {
    id?: string
    projectStackId: string
    stackId: string
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackCreateManyToUserInput = {
    id?: string
    projectId: string
    fromUserId: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackCreateManyFromUserInput = {
    id?: string
    projectId: string
    toUserId: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSkillUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skill?: SkillUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserSkillUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSkillUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stacks?: ProjectStackUpdateManyWithoutProjectNestedInput
    skills?: ProjectSkillUpdateManyWithoutProjectNestedInput
    stacksTaken?: StackTakenUpdateManyWithoutProjectNestedInput
    feedbacks?: FeedbackUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stacks?: ProjectStackUncheckedUpdateManyWithoutProjectNestedInput
    skills?: ProjectSkillUncheckedUpdateManyWithoutProjectNestedInput
    stacksTaken?: StackTakenUncheckedUpdateManyWithoutProjectNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    totalValue?: FloatFieldUpdateOperationsInput | number
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectStack?: ProjectStackUpdateOneRequiredWithoutStackTakenNestedInput
    stack?: StackUpdateOneRequiredWithoutStacksTakenNestedInput
    project?: ProjectUpdateOneRequiredWithoutStacksTakenNestedInput
  }

  export type StackTakenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectStackId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectStackId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutFeedbacksNestedInput
    fromUser?: UserUpdateOneRequiredWithoutFeedbacksGivenNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutFeedbacksNestedInput
    toUser?: UserUpdateOneRequiredWithoutFeedbacksReceivedNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSkillCreateManySkillInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectSkillCreateManySkillInput = {
    id?: string
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSkillUpdateWithoutSkillInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSkillsNestedInput
  }

  export type UserSkillUncheckedUpdateWithoutSkillInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSkillUncheckedUpdateManyWithoutSkillInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSkillUpdateWithoutSkillInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutSkillsNestedInput
  }

  export type ProjectSkillUncheckedUpdateWithoutSkillInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSkillUncheckedUpdateManyWithoutSkillInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStackCreateManyStackInput = {
    id?: string
    projectId: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackTakenCreateManyStackInput = {
    id?: string
    projectStackId: string
    userId: string
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectStackUpdateWithoutStackInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutStacksNestedInput
    StackTaken?: StackTakenUpdateManyWithoutProjectStackNestedInput
  }

  export type ProjectStackUncheckedUpdateWithoutStackInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StackTaken?: StackTakenUncheckedUpdateManyWithoutProjectStackNestedInput
  }

  export type ProjectStackUncheckedUpdateManyWithoutStackInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenUpdateWithoutStackInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectStack?: ProjectStackUpdateOneRequiredWithoutStackTakenNestedInput
    user?: UserUpdateOneRequiredWithoutStacksTakenNestedInput
    project?: ProjectUpdateOneRequiredWithoutStacksTakenNestedInput
  }

  export type StackTakenUncheckedUpdateWithoutStackInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectStackId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenUncheckedUpdateManyWithoutStackInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectStackId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStackCreateManyProjectInput = {
    id?: string
    stackId: string
    percentage: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectSkillCreateManyProjectInput = {
    id?: string
    skillId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackTakenCreateManyProjectInput = {
    id?: string
    projectStackId: string
    userId: string
    stackId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackCreateManyProjectInput = {
    id?: string
    fromUserId: string
    toUserId: string
    rating: number
    comment?: string | null
    anonymous: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectStackUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stack?: StackUpdateOneRequiredWithoutProjectsNestedInput
    StackTaken?: StackTakenUpdateManyWithoutProjectStackNestedInput
  }

  export type ProjectStackUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    StackTaken?: StackTakenUncheckedUpdateManyWithoutProjectStackNestedInput
  }

  export type ProjectStackUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    percentage?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSkillUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    skill?: SkillUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectSkillUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectSkillUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectStack?: ProjectStackUpdateOneRequiredWithoutStackTakenNestedInput
    user?: UserUpdateOneRequiredWithoutStacksTakenNestedInput
    stack?: StackUpdateOneRequiredWithoutStacksTakenNestedInput
  }

  export type StackTakenUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectStackId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectStackId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutFeedbacksGivenNestedInput
    toUser?: UserUpdateOneRequiredWithoutFeedbacksReceivedNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenCreateManyProjectStackInput = {
    id?: string
    userId: string
    stackId: string
    projectId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StackTakenUpdateWithoutProjectStackInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStacksTakenNestedInput
    stack?: StackUpdateOneRequiredWithoutStacksTakenNestedInput
    project?: ProjectUpdateOneRequiredWithoutStacksTakenNestedInput
  }

  export type StackTakenUncheckedUpdateWithoutProjectStackInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StackTakenUncheckedUpdateManyWithoutProjectStackInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stackId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}