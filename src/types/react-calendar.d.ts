import 'react-calendar';

declare module 'react-calendar' {
  type ValuePiece = Date | null;
  export type Value = ValuePiece | [ValuePiece, ValuePiece];
  export type View = 'month' | 'year' | 'decade' | 'century';
}
