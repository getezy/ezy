import React from 'react';

export function useRefs<RefType>(): [
  (key: React.Key) => React.RefObject<RefType>,
  (key: React.Key) => void
] {
  const cacheRefs = React.useRef(new Map<React.Key, React.RefObject<RefType>>());

  function getRef(key: React.Key) {
    if (!cacheRefs.current.has(key)) {
      cacheRefs.current.set(key, React.createRef<RefType>());
    }

    return cacheRefs.current.get(key)!;
  }

  function removeRef(key: React.Key) {
    cacheRefs.current.delete(key);
  }

  return [getRef, removeRef];
}
