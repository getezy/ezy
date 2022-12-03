import { notification } from '@components';
import { Collection, CollectionType, useCollectionsStore } from '@storage';

export function useCreateCollection() {
  const createCollection = useCollectionsStore((store) => store.createCollection);

  const create = async (payload: Collection<CollectionType>) => {
    try {
      await createCollection({
        ...payload,
        type: CollectionType.GRPC,
      });

      notification(
        {
          title: `${payload.name}`,
          description: 'Collection successfully created',
        },
        { type: 'success' }
      );
    } catch (error: any) {
      notification(
        {
          title: `Create collection error`,
          description: error?.message,
        },
        { type: 'error' }
      );
    }
  };

  return { create };
}
