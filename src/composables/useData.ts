export interface IQuery {
  page?: number,
  perPage?: number,
  q?: string,
  sortedCol?: string,
  sorted?: SORTING_TYPE,
}

export enum SORTING_TYPE {
  ASC = 'ASC',
  DSC = 'DSC',
}

export function useData (data: any[], { page, perPage, q, sortedCol, sorted }: IQuery) {
  page = page || 1;
  perPage = perPage || 20;
  q = q || '';
  sortedCol = sortedCol || '';
  sorted = sorted || SORTING_TYPE.ASC;


  // Функционал поиска
  function search(arr: any, searchTerm: string, excludedFields: string[] = []) {
    return arr.filter((item: any) => searchInObject(item, searchTerm, excludedFields));
  }

  function searchInObject(obj: any, searchTerm: string, excludedFields: string[] = []): boolean {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return Object.keys(obj).some((key) => {
      if (excludedFields.includes(key)) return false;
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        return searchInObject(value, searchTerm, excludedFields);
      }
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerCaseSearchTerm);
      }
      return false;
    });
  }

  if (q.length > 0) {
    data = search(data, q, ['picture', 'registered', 'dob', 'login', 'nat'])
  }


  // Функционал сортировки

  function sorting(col: string, order: SORTING_TYPE) {
    return data.sort((a, b) => {
      const aValue = getValueByPath(a, col);
      const bValue = getValueByPath(b, col);

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * (order === SORTING_TYPE.ASC ? 1 : -1);
      }

      return (aValue - bValue) * (order === SORTING_TYPE.ASC ? 1 : -1);
    });
  }

  function getValueByPath(obj: any, path: any) {
    const keys = path.split('.');
    let value = obj;
  
    for (let i = 0; i < keys.length; i++) {
      value = value[keys[i]];
    }
  
    return value;
  }

  if (sortedCol.length & sorted.length) {
    const sortedArr = sorting(sortedCol, sorted)
    console.log(sortedArr, 'sorted')
  }

  
  const start = (Number(page) - 1) * Number(perPage) // 0, 5, 10 ...
  const end = start + Number(perPage) // 5, 10, 15 ...   
  const hasNextPage = end < data.length
  const hasPrevPage = start > 0
  const pageCount = Math.round(data.length / perPage)
  const currentPage = parseInt(`${page}`) > pageCount ? 1 : parseInt(`${page}`)

  data = data.slice(start, end)
    
  return { 
    data,
    pagination: {
      hasPrevPage,
      hasNextPage,
      pageCount,
      currentPage,
    }
  }
}



