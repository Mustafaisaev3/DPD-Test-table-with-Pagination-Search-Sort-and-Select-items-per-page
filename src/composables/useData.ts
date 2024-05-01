

export interface IQuery {
  page?: number,
  perPage?: number,
  q?: string;
  sortedCol?: string;
  sorted?: string;
}

export enum SORTING_TYPE {
  'ASC',
  'DSC'
}

export function useData (data: any[], query: IQuery) {
  let page = 1
  let perPage = 20
  let q = ''
  let sortedCol = ''
  let sorted = ''

  if (query && query.page) {
    page = query.page
  }

  if (query && query.perPage) {
    perPage = query.perPage
  }

  if (query && query.q) {
    q = query.q
  }

  if (query && (query.sortedCol && query.sorted)) {
    sortedCol = query.sortedCol
    sorted = query.sorted
  }

  // Функционал поиска
  function search(arr: any, searchTerm: string, excludedFields: string[] = []) {
    return arr.filter((item: any) => searchInObject(item, searchTerm, excludedFields));
  }

  function searchInObject(obj: any, searchTerm: string, excludedFields: string[] = []) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    for (let key in obj) {
      // Пропускаем исключенные поля
      if (excludedFields.includes(key)) {
        continue;
      }
      if (typeof obj[key] === 'object') {
        // Рекурсивно обходим вложенные свойства
        if (searchInObject(obj[key], searchTerm, excludedFields)) {
          return true;
        }
      } else if (typeof obj[key] === 'string' && obj[key].toLowerCase().includes(lowerCaseSearchTerm)) {
        // Нашли искомую строку
        return true;
      }
    }
    // Искомая строка не найдена
    return false;
  }

  if (q.length > 0) {
    data = search(data, q, ['picture', 'registered', 'dob', 'login', 'nat'])
  }


  // Функционал сортировки

  function sorting(col: string, order = 'ASC') {
    return data.sort((a, b) => {
      const aValue = getValueByPath(a, col);
      const bValue = getValueByPath(b, col);
  
      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue) * (order === 'ASC' ? 1 : -1);
      }
  
      return (aValue - bValue) * (order === 'ASC' ? 1 : -1);
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



