import { createRxDatabase, RxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';

const DATABASE_NAME = 'constituents';

let dbPromise: Promise<RxDatabase> | null = null;

export const getConstituentsDb = async (): Promise<RxDatabase> => {
  if (!dbPromise) {
    dbPromise = createRxDatabase({
      name: DATABASE_NAME,
      storage: getRxStorageMemory(),
    }).then(async db => {
      const constituentsSchema = {
        version: 0,
        primaryKey: {
          key: 'id',
          fields: ['firstName', 'lastName', 'email', 'address'],
          separator: '|'
        },
        type: 'object',
        properties: {
          id: { type: 'string', maxLength: 100 },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          address: { type: 'string' },
          email: { type: 'string' }
        },
        required: ['id', 'firstName', 'lastName', 'address', 'email']
      };

      await db.addCollections({
        constituents: {
          schema: constituentsSchema
        }
      });

      return db;
    });
  }
  return dbPromise;
};