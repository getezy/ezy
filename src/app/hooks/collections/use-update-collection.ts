import { notification } from '@components';
import { Collection, CollectionType, useCollectionsStore } from '@storage';

export function useUpdateCollection() {
  const updateCollection = useCollectionsStore((store) => store.updateCollection);

  const update = async (id: string, collection: Collection<CollectionType>) => {
    try {
      await updateCollection(id, collection);

      notification(
        {
          title: `${collection.name}`,
          description: 'Collection successfully updated',
        },
        { type: 'success', position: 'top-right' }
      );
    } catch (error: any) {
      notification(
        {
          title: `${collection.name} sync error`,
          description: error?.message,
        },
        { type: 'error', position: 'top-right' }
      );
    }
  };

  return { update };
}
