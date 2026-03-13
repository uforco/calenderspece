export type PostgresError = {
  length: number;
  severity: string;
  code: string; // e.g. '23505'
  detail?: string;
  hint?: string;
  position?: string;
  internalPosition?: string;
  internalQuery?: string;
  where?: string;
  schema?: string;
  table?: string;
  column?: string;
  dataType?: string;
  constraint?: string;
  file?: string;
  line?: string;
  routine?: string;
};

export enum PostgresErrorField {
  LENGTH = 'length',
  SEVERITY = 'severity',
  CODE = 'code',
  DETAIL = 'detail',
  HINT = 'hint',
  POSITION = 'position',
  INTERNAL_POSITION = 'internalPosition',
  INTERNAL_QUERY = 'internalQuery',
  WHERE = 'where',
  SCHEMA = 'schema',
  TABLE = 'table',
  COLUMN = 'column',
  DATA_TYPE = 'dataType',
  CONSTRAINT = 'constraint',
  FILE = 'file',
  LINE = 'line',
  ROUTINE = 'routine',
}

export default function postgrasErrorObjectReturner(
  e: Error,
): PostgresError | Error {
  const errorType = {};
  if (e && typeof e === 'object') {
    const errorFields: string[] = Object.values(PostgresErrorField);
    for (const key in e) {
      if (errorFields.includes(key)) {
        errorType[key] = e[key];
      }
    }
  }
  if (Object.keys(errorType).length === 0) {
    return e;
  }
  return errorType as PostgresError;
}
