interface IPaginationProps {
  page: number | null;
  onNext?: (page: number) => void;
  onPrev?: (page: number) => void;
  onApplyPage: (page: number | null) => void;
  onApplyPerPage: (page: number) => void;
  perPage: number | null;
  totalData: number;
  position?: 'left' | 'center' | 'right';
}
