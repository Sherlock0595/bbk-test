import { array, boolean, object, pipe, string, uuid, type InferOutput } from 'valibot';

export const BbkRootValidator = array(
  object({
    id: pipe(string(), uuid()),
    code: string(),
    title: string(),
    hasChildren: boolean(),
  }),
);

export type BbkRootRecordType = InferOutput<typeof BbkRootValidator>;
