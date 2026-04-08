interface Result<T> {
  data: T;
  map<U>(callback: (item: T) => U): Result<U>;
}

enum RequestState {
  Idle = 'idle',
  Loading = 'loading',
}

type Transform<TInput, TOutput> = (input: TInput) => TOutput;

abstract class BaseService<TItem> {
  protected cache: Map<string, TItem> = new Map();

  constructor(protected readonly endpoint: string) {}

  protected abstract serialize(item: TItem): string;
}

class UserService extends BaseService<string> implements Result<string> {
  data: string = '';
  static version: number = 1;
  loader = async (id: string): Promise<string> => {
    if (!id) {
      throw new Error('missing id');
    }

    return id;
  };

  constructor(endpoint: string) {
    super(endpoint);
  }

  map<U>(callback: (item: string) => U): Result<U> {
    return {
      data: callback(this.data),
      map(next) {
        return { data: next(callback('')), map: this.map };
      },
    };
  }

  protected serialize(item: string): string {
    return item.trim();
  }
}
