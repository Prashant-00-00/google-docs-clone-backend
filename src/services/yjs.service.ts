import * as Y from 'yjs';
const docs = new Map<string, Y.Doc>();

export function getYDoc(docId: string): Y.Doc {
  if (docs.has(docId)) return docs.get(docId)!;

  const doc = new Y.Doc();
  docs.set(docId, doc);
  return doc;
}
