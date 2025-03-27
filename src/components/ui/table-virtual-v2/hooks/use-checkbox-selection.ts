import { useCallback, useEffect, useState } from 'react';

interface ISelectionData<TDataSource> {
  data: TDataSource[];
  keyExtractor: (item: TDataSource) => string;
  onChangeCheckBoxSelection?: (selectedCheckBoxes: string[]) => void;
}

export default function useCheckboxSelection<TDataSource>(props: ISelectionData<TDataSource>) {
  const { data, keyExtractor, onChangeCheckBoxSelection } = props;

  const [selectedCheckBoxes, setSelectedCheckBoxes] = useState<Set<string>>(new Set());
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  useEffect(() => {
    onChangeCheckBoxSelection?.([...selectedCheckBoxes]);
  }, [selectedCheckBoxes]);

  const handleSelectCheckboxRow = useCallback((value: string) => {
    setSelectedCheckBoxes((prevSelectedRows) => {
      const newSelection = new Set(prevSelectedRows);

      if (prevSelectedRows.size !== data.length) {
        setIsCheckedAll(false);
      }

      if (newSelection.has(value)) {
        newSelection.delete(value);
      } else {
        newSelection.add(value);
      }

      return newSelection;
    });
  }, []);

  const handleSelectAllCheckbox = useCallback(() => {
    setSelectedCheckBoxes(() => {
      if (isCheckedAll) {
        return new Set(); // Jika semua sudah terpilih, maka kosongkan
      } else {
        return new Set(data.map(keyExtractor)); // Jika belum semua terpilih, pilih semua
      }
    });

    setIsCheckedAll((prev) => !prev);
  }, [data, keyExtractor, isCheckedAll]);

  return { selectedCheckBoxes, handleSelectCheckboxRow, handleSelectAllCheckbox, isCheckedAll };
}
