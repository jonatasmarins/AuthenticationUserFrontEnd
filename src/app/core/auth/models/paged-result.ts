import { ResultResponseObject } from './result-response';

export class PagedResult extends ResultResponseObject {
  pageNumber: number;
  pageSize: number;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  results: Array<any>;
}
