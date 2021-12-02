class Page<T> {
  constructor(public items: T[] = [], public totalCount: number = 0) {}
}

export default Page;
