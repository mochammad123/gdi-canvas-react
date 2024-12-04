import { useOnClickOutside, useSensorKeyboard } from '@/lib/hooks/hooks';
import clsx from 'clsx';
import { forwardRef, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import Checkbox from '../checkbox';
import Spinner from '../icon/spinner';
import { IDropdownItemProps, ISelectedOption, ISelectionDropdownProps, ISelectionInputProps, ISelectionOption, ISelectionProps } from './types';
import CloseIcon from '../icon/close';
import CaretIcon from '../icon/caret';
import InputSearch from '../inputs/input-search';

type ActionReducer =
  | { type: 'ON_CLICK_SELECTION' }
  | { type: 'ON_FOCUSED_IN' }
  | { type: 'ON_CLEAR_VALUES' }
  | { type: 'ON_SELECT_ALL' }
  | { type: 'ON_FOCUSED_OUT' }
  | { type: 'ON_PRESS_ARROW_UP'; cb: (index: number) => void }
  | { type: 'ON_PRESS_ARROW_DOWN'; payload: string[]; cb: (index: number) => void }
  | {
      type: 'ON_SELECT_ITEM';
      payload: {
        selected: ISelectedOption;
        options: ISelectionOption;
        multiple?: boolean;
      };
    };

export const initialValues = {
  activeIndex: -1,
  arrowIndex: -1,
  opened: false,
  focused: false,
};

function reducerFn(state: typeof initialValues, action: ActionReducer): typeof initialValues {
  if (action.type === 'ON_CLICK_SELECTION') {
    return {
      ...state,
      opened: !state.opened,
      arrowIndex: -1,
    };
  }
  if (action.type === 'ON_SELECT_ITEM') {
    const { selected, options, multiple = false } = action.payload;
    const activeIndex = Object.keys(options).findIndex((key) => key === selected.key);
    return {
      ...state,
      opened: multiple,
      activeIndex,
    };
  }
  if (action.type === 'ON_PRESS_ARROW_UP') {
    const updatedIndex = state.arrowIndex <= 0 ? 0 : state.arrowIndex - 1;
    action.cb(updatedIndex);
    return {
      ...state,
      arrowIndex: updatedIndex,
    };
  }
  if (action.type === 'ON_PRESS_ARROW_DOWN') {
    const updatedIndex = state.arrowIndex < 0 ? 0 : state.arrowIndex + 1;
    const filtered = action.payload;
    if (filtered.length <= updatedIndex) return state;
    action.cb(updatedIndex);
    return {
      ...state,
      arrowIndex: updatedIndex,
    };
  }

  if (action.type === 'ON_FOCUSED_IN') {
    if (state.opened) return state;
    return {
      ...state,
      focused: true,
    };
  }

  if (action.type === 'ON_FOCUSED_OUT') {
    if (!state.opened) return state;
    return {
      ...state,
      opened: false,
    };
  }

  if (action.type === 'ON_CLEAR_VALUES') {
    return {
      ...state,
      activeIndex: -1,
      opened: false,
    };
  }

  return state;
}

const Selection = forwardRef<HTMLInputElement, ISelectionProps>(
  (
    {
      customDisplayValue,
      classNameInput = '',
      values,
      multiple,
      isLoading,
      value = '',
      options,
      enableSearch,
      placeholder,
      onClear,
      onSelect,
      onClickSelectAll,
      required,
    },
    ref
  ) => {
    const [state, dispatch] = useReducer(reducerFn, initialValues);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const hideDropdown = () => {
      dispatch({ type: 'ON_FOCUSED_OUT' });
    };

    const onClickSelection = () => {
      dispatch({ type: 'ON_CLICK_SELECTION' });
    };

    const onFocusedIn = () => {
      dispatch({ type: 'ON_FOCUSED_IN' });
    };

    const onPressArrowUp = () => {
      dispatch({ type: 'ON_PRESS_ARROW_UP', cb: scrollToActiveItem });
    };
    const onPressArrowDown = (filtered: string[]) => {
      dispatch({ type: 'ON_PRESS_ARROW_DOWN', payload: filtered, cb: scrollToActiveItem });
    };

    const onSelectItem = (selected: ISelectedOption) => {
      onSelect(selected);
      dispatch({
        type: 'ON_SELECT_ITEM',
        payload: {
          selected,
          options,
          multiple,
        },
      });
    };

    const handleClickSelectAll = () => {
      if (!onClickSelectAll) return;
      dispatch({ type: 'ON_SELECT_ALL' });
      onClickSelectAll();
    };

    const scrollToActiveItem = (index: number) => {
      if (!wrapperRef.current) return;
      const activeItem = wrapperRef.current?.querySelectorAll(`.dropdown-item`);
      if (!activeItem) return;
      activeItem?.[index]?.scrollIntoView({ block: 'end', behavior: 'instant' });
    };

    const onClickButtonClear = () => {
      if (!onClear) return;
      dispatch({ type: 'ON_CLEAR_VALUES' });
      onClear();
    };

    return (
      <div ref={wrapperRef} className="relative selection focus:outline-navy-80" onFocus={onFocusedIn} tabIndex={0}>
        <SelectionInput
          required={required}
          classNameInput={classNameInput}
          onClear={onClickButtonClear}
          customDisplayValue={customDisplayValue}
          options={options}
          multiple={multiple}
          onClickSelection={onClickSelection}
          value={value}
          values={values}
          state={state}
          placeholder={placeholder}
        />
        {state.opened && (
          <SelectionDropdown
            isLoading={isLoading}
            values={values}
            state={state}
            enableSearch={enableSearch}
            options={options}
            hideDropdown={hideDropdown}
            onPressArrowUp={onPressArrowUp}
            onPressArrowDown={onPressArrowDown}
            onSelect={onSelectItem}
            onClickSelectAll={handleClickSelectAll}
            multiple={multiple}
          />
        )}
      </div>
    );
  }
);

function SelectionInput({
  required,
  classNameInput,
  options,
  multiple,
  customDisplayValue,
  onClear,
  onClickSelection,
  state,
  value,
  values,
  placeholder,
}: ISelectionInputProps) {
  const getValues = () => {
    if (customDisplayValue) {
      return customDisplayValue(value || values || '');
    }

    if (multiple) {
      const optionValues = values?.map((value) => {
        return options[value];
      });
      return optionValues?.toString();
    }
    return value;
  };

  const getPlaceholder = () => {
    if (multiple) {
      return placeholder && !values?.length ? placeholder : '';
    }

    return placeholder && !value ? placeholder : '';
  };
  return (
    <div className="relative" onClick={onClickSelection} title={getValues()}>
      <input className="hidden" required={required} value={multiple ? values?.toString() : value || ''} onChange={() => ''} />
      <div
        data-placeholder={getPlaceholder()}
        className={clsx(
          [
            'element-input__placeholder input-div relative',
            'relative border border-black-40 global-paragraph h-10',
            'rounded-[4px] cursor-pointer flex items-center pl-2 pr-6',
          ],
          classNameInput
        )}
      >
        <div className="w-full line-clamp-1">{getValues() || ''}</div>
        <ButtonCaret opened={state.opened} />
      </div>
      {(values?.length || 0) > 0 && onClear && <ButtonClear onClick={onClear} />}
    </div>
  );
}

function ButtonClear({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute right-[1.875rem] top-1/2 -translate-y-1/2"
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      <div className="hover:bg-gray-200 rounded-full z-50 w-5 h-5 flex justify-center items-center cursor-pointer">
        <CloseIcon className="w-4 h-4" />
      </div>
    </div>
  );
}

function ButtonCaret({ opened }: { opened: boolean }) {
  return (
    <div className="absolute right-[.625rem] top-1/2 -translate-y-1/2">
      <CaretIcon rotate={opened ? 'top' : 'bottom'} className="w-[.8125rem]" />
    </div>
  );
}

const tolerance = 40;
function SelectionDropdown({
  multiple,
  state,
  options,
  enableSearch,
  onSelect,
  hideDropdown,
  onPressArrowUp,
  onPressArrowDown,
  values,
  onClickSelectAll,
  isLoading,
}: ISelectionDropdownProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<'top' | 'bottom'>();
  const [search, setSearch] = useState<string>('');
  const filtered = useMemo(() => {
    return Object.keys(options).filter((key) => options[key].toString().toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  useSensorKeyboard(['ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Escape'], (key, e) => {
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      e?.preventDefault();
    }
    switch (key) {
      case 'ArrowUp':
        onPressArrowUp();
        break;
      case 'ArrowDown':
        onPressArrowDown(filtered);
        break;
      case 'Enter':
        onSelect({
          key: filtered[state.arrowIndex],
          value: options[filtered[state.arrowIndex]],
        });
        break;
      case 'Tab':
        hideDropdown();
        break;
      case 'Escape':
        hideDropdown();
        break;
    }
  });

  useOnClickOutside(wrapperRef, (currentTarget, el) => {
    if (currentTarget?.closest('.selection')?.contains(wrapperRef.current)) return;
    hideDropdown();
  });

  useEffect(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current?.getBoundingClientRect();
    const wrapperPositionY = rect.top;
    const wrapperHeight = rect.height;

    if (wrapperPositionY + wrapperHeight + tolerance > window.innerHeight) {
      setPosition('top');
      return;
    }
    setPosition('bottom');
  }, [wrapperRef.current]);

  const selectionInputHeight = wrapperRef.current?.previousElementSibling?.getBoundingClientRect().height || 0;
  const wrapperHeight = wrapperRef.current?.getBoundingClientRect().height || 0;
  const top = position === 'top' ? { top: -(selectionInputHeight + wrapperHeight) + tolerance } : {};
  return (
    <div
      style={top}
      ref={wrapperRef}
      className={clsx(['bg-white rounded-[4px] absolute shadow-md', 'left-0 right-0 overflow-auto max-h-[17.5rem] z-[999]'], {
        hidden: !position,
      })}
    >
      {enableSearch && (
        <div className="bg-white px-3 pb-3 py-3.5 sticky top-0 translate-y-[-1px]">
          <InputSearch
            tabIndex={-1}
            value={search}
            onChangeValue={(value) => {
              setSearch(value);
            }}
            placeholder="Cari"
            className=""
            classNameInput="!text-black-60"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          />
        </div>
      )}

      {multiple && !isLoading && (
        <div className="text-knitto-blue-100 global-paragraph px-2 cursor-pointer mb-1" onClick={onClickSelectAll}>
          Pilih Semua
        </div>
      )}

      <div>
        {isLoading ? (
          <div className="h-[6.25rem]  flex justify-center items-center flex-col">
            <Spinner color="text-black-80" />
            <div className="text-black-40 text-sm">Sedang memuat...</div>
          </div>
        ) : filtered?.length > 0 ? (
          filtered.map((key, index) => (
            <DropdownItem
              values={values}
              state={state}
              index={index}
              key={index}
              item={{ key: key, value: options[key] }}
              onClick={() => onSelect({ key, value: options[key] })}
              multiple={multiple}
            />
          ))
        ) : (
          <EmptyData search={search} />
        )}
      </div>
    </div>
  );
}

function DropdownItem({ state, index, item, values, onClick, multiple }: IDropdownItemProps) {
  const isSelectedItems = values?.includes(item.key.toString());
  const getArrowIndexActive = () => {
    if (multiple) {
      return index === state.arrowIndex;
    }
    return index === state.arrowIndex && index !== state.activeIndex;
  };
  return (
    <div
      className={clsx(['dropdown-item', 'hover:bg-navy-100 hover:text-white hover:cursor-pointer hover:font-medium', 'px-3 py-2'], {
        'bg-black-40 font-medium text-white': getArrowIndexActive(),
        'bg-navy-100 font-medium text-white': multiple ? isSelectedItems : index === state.activeIndex,
        'flex items-center gap-x-2': multiple,
      })}
      onMouseDown={() => onClick()}
    >
      {multiple && <Checkbox checked={isSelectedItems} onChecked={() => ''} />}
      {item.value}
    </div>
  );
}

function EmptyData({ search }: { search?: string }) {
  const limitChar = 30;
  return (
    <div className="min-h-[6.25rem] px-4 flex justify-center items-center flex-col">
      <div className="text-black-40 text-sm break-words">
        {search ? (
          <>
            Pencarian <span className="font-semibold">'{search.length > limitChar ? `${search.substring(0, limitChar)}...` : search}'</span> tidak
            ditemukan
          </>
        ) : (
          'Data tidak ditemukan'
        )}
      </div>
    </div>
  );
}

export default Selection;
