import { createRxDatabase, RxDatabase, RxCollection, RxCollectionCreator } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';

const DATABASE_NAME = 'constituents';

let dbPromise: Promise<RxDatabase> | null = null;

export const getConstituentsDb = async (): Promise<RxDatabase> => {
  if (!dbPromise) {
    dbPromise = createRxDatabase({
      name: DATABASE_NAME,
      storage: getRxStorageMemory(),
    }).then(async (db) => {
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
          email: { type: 'string' },
          signupTime: {
            type: 'string',
            format: 'date-time'
          }
        },
        required: ['id', 'firstName', 'lastName', 'address', 'email']
      };

      const collections = await db.addCollections({
        constituents: {
          schema: constituentsSchema,
          methods: {
            async setSignupTime() {
              // Explicitly type `this` as any to avoid TypeScript issues
              (this as any).signupTime = new Date().toISOString();
            }
          }
        }
      });

      // Attach the preInsert hook correctly
      collections.constituents.preInsert((doc: any) => {
        doc.signupTime = new Date().toISOString();
        return doc; // Return the updated document
      }, false); // 'false' for non-parallel execution

      return db;
    });
  }
  return dbPromise;
};
