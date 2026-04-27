import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';

export type ApiResponse<T> = { success: true; data: T } | { success: false; issues: unknown };

// App types
export type BbkRecordMapType = Map<BbkRootRecordType[number]['id'], BbkRootRecordType[number]>;
export type BbkChildrenRecordMapType = Map<BbkRootRecordType[number]['id'], BbkRecordMapType>;

export type BreadcrumbType = { anchorId: string; label: string };
