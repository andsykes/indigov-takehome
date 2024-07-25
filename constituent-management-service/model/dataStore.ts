import { createRxDatabase, RxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';

const createDatabase = async (): Promise<RxDatabase> => {
  const db = await createRxDatabase({
    name: 'constituents',
    storage: getRxStorageMemory()
  });

  const constituentsSchema = {
    version: 0,
    primaryKey: {
      key: 'id',
      fields: ['firstName', 'lastName', 'email', 'address'],
      separator: '|'
    },
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100
      },
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      },
      address: {
        type: 'string'
      },
      email: {
        type: 'string'
      }
    },
    required: ['id', 'firstName', 'lastName', 'address', 'email']
  };

  await db.addCollections({
    constituents: {
      schema: constituentsSchema
    }
  });

  return db;
};

export const getConstituentsDb = createDatabase;
