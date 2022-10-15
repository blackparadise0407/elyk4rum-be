type BlockToolData<T extends object = any> = T;

type BlockTuneData = any;

export interface OutputBlockData<
  Type extends string = string,
  Data extends object = any,
> {
  id?: string;

  type: Type;

  data: BlockToolData<Data>;

  tunes?: { [name: string]: BlockTuneData };
}
