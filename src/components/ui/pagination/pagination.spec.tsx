import { describe, expect, it, vi } from 'vitest';
import Pagination from './pagination';
import { render, renderHook } from 'vitest-browser-react';
import { formatRupiah } from '../../../lib/utils/utils';
import { userEvent } from 'vitest/browser';
import usePaginationRange from './hooks';

const defaultProps = {
  page: 1,
  perPage: 10,
  totalData: 100,
  onNext: () => {},
  onPrev: () => {},
  onApplyPage: () => {},
  onApplyPerPage: () => {},
};

function HookProbe({ page, perPage, totalData }: { page: number; perPage: number; totalData: number }) {
  const { getters } = usePaginationRange({ page, perPage, totalData });

  return (
    <div>
      <div data-testid="from">{String(getters.getFrom())}</div>
      <div data-testid="to">{String(getters.getTo())}</div>
    </div>
  );
}

describe('Test getter hooks usePaginationRange', () => {
  it('page 1 perPage 10 total 100 => from 1 to 10', async () => {
    const screen = await render(<HookProbe page={1} perPage={10} totalData={100} />);
    await expect.element(screen.getByTestId('from')).toHaveTextContent('1');
    await expect.element(screen.getByTestId('to')).toHaveTextContent('10');
  });

  it('page 2 perPage 10 total 100 => from 10 to 20', async () => {
    const screen = await render(<HookProbe page={2} perPage={10} totalData={100} />);
    await expect.element(screen.getByTestId('from')).toHaveTextContent('10');
    await expect.element(screen.getByTestId('to')).toHaveTextContent('20');
  });

  it('to tidak boleh lebih dari totalData', async () => {
    const screen = await render(<HookProbe page={5} perPage={25} totalData={100} />);
    await expect.element(screen.getByTestId('from')).toHaveTextContent('100');
    await expect.element(screen.getByTestId('to')).toHaveTextContent('100');
  });
});

describe('Pagination Test Browser', () => {
  it('seharusnya merender semua elemen pagination', async () => {
    const screen = await render(<Pagination {...defaultProps} />);

    await expect.element(screen.getByLabelText('Previous')).toBeInTheDocument();
    await expect.element(screen.getByLabelText('Next')).toBeInTheDocument();
    await expect.element(screen.getByText('Halaman', { exact: true })).toBeInTheDocument();
    await expect.element(screen.getByRole('spinbutton', { name: 'Page', exact: true })).toBeInTheDocument();
    await expect.element(screen.getByRole('spinbutton', { name: 'Per Page', exact: true })).toBeInTheDocument();
    expect(screen.getByText('dari').length).toBe(2);
    await expect.element(screen.getByText('Hasil per Halaman')).toBeInTheDocument();
    await expect.element(screen.getByRole('button', { name: 'Terapkan' })).toBeInTheDocument();
    await expect.element(screen.getByLabelText('Range tampilan data')).toBeInTheDocument();
  });

  it('seharusnya menampilkan nilai halaman saat ini di input halaman sesuai prop page', async () => {
    const screen = await render(<Pagination {...defaultProps} />);
    const pageInput = screen.getByRole('spinbutton', { name: 'Page', exact: true });
    await expect.element(pageInput).toHaveValue(defaultProps.page);
  });

  it('seharusnya menampilkan total halaman yang benar (dari totalData dan perPage)', async () => {
    const screen = await render(<Pagination {...defaultProps} />);
    const totalPage = Math.ceil(defaultProps.totalData / defaultProps.perPage);
    const firstFrom = screen.getByText('dari').first().element();
    const nextSibling = firstFrom.nextElementSibling;
    await expect.element(nextSibling as HTMLElement).toHaveTextContent(formatRupiah(totalPage, true));
  });

  it('seharusnya menampilkan range "form - to dari total" yang benar', async () => {
    const screen = await render(<Pagination {...defaultProps} />);
    const rangeContainer = screen.getByLabelText('Range tampilan data');

    await expect.element(rangeContainer).toHaveTextContent(formatRupiah(1, true));
    await expect.element(rangeContainer).toHaveTextContent(formatRupiah(10, true));
    await expect.element(rangeContainer).toHaveTextContent(formatRupiah(defaultProps.totalData, true));
  });

  it('seharusnya menampilkan range sesuai page, perPage, dan totalData', async () => {
    const props = {
      ...defaultProps,
      page: 1,
      perPage: 50,
      totalData: 100,
    };

    const screen = await render(<Pagination {...props} />);
    const rangeContainer = screen.getByLabelText('Range tampilan data');

    await expect.element(rangeContainer).toHaveTextContent(formatRupiah(1, true));
    await expect.element(rangeContainer).toHaveTextContent(formatRupiah(50, true));
    await expect.element(rangeContainer).toHaveTextContent(formatRupiah(100, true));
  });

  it('seharusnya mengubah tampilan range ketika perPage di-apply', async () => {
    const props = {
      ...defaultProps,
      page: 1,
      perPage: 50,
      totalData: 100,
    };

    const screen = await render(<Pagination {...props} />);
    const rangeBefore = screen.getByLabelText('Range tampilan data');

    await expect.element(rangeBefore).toHaveTextContent(formatRupiah(1, true));

    const user = userEvent.setup();
    const inputPerPage = screen.getByRole('spinbutton', { name: 'Per Page', exact: true });
    const buttonApply = screen.getByRole('button', { name: 'Terapkan' });

    await user.clear(inputPerPage);
    await user.type(inputPerPage, '100');
    await buttonApply.click();

    const rangeAfter = screen.getByLabelText('Range tampilan data');

    await expect.element(rangeAfter).toHaveTextContent(formatRupiah(100, true));
    await expect.element(rangeAfter).toHaveTextContent(formatRupiah(1, true));
  });

  it('seharusnya memanggil onPrev ketika tombol previous diklik', async () => {
    const { result } = await renderHook(() => usePaginationRange({ page: 2, perPage: 10, totalData: 100 }));

    const onPrev = vi.fn((delta: number) => {
      const current = result.current.state.page ?? 1;
      result.current.setters.setPage(Math.max(1, current + delta));
    });

    const props = {
      ...defaultProps,
      page: result.current.state.page,
      onPrev,
    };

    const screen = await render(<Pagination {...props} />);
    const buttonPrev = screen.getByLabelText('Previous');
    const pageInput = screen.getByRole('spinbutton', { name: 'Page', exact: true });

    await buttonPrev.click();
    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onPrev).toHaveBeenCalledWith(-1);

    await screen.rerender(<Pagination {...props} page={result.current.state.page} />);
    await expect.element(pageInput).toHaveValue(1);
  });

  it('seharusnya memanggil onNext ketika tombol next diklik', async () => {
    const { result } = await renderHook(() => usePaginationRange({ page: 1, perPage: 10, totalData: 100 }));

    const onNext = vi.fn((delta: number) => {
      const current = result.current.state.page ?? 1;
      result.current.setters.setPage(Math.max(1, current + delta));
    });

    const props = {
      ...defaultProps,
      page: result.current.state.page,
      onNext,
    };

    const screen = await render(<Pagination {...props} />);
    const buttonNext = screen.getByLabelText('Next');
    const pageInput = screen.getByRole('spinbutton', { name: 'Page', exact: true });

    await buttonNext.click();
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledWith(1);

    await screen.rerender(<Pagination {...props} page={result.current.state.page} />);
    await expect.element(pageInput).toHaveValue(2);
  });

  it('seharusnya button prev ter-disabled ketika halaman saat ini = 1', async () => {
    const props = {
      ...defaultProps,
      page: 1,
    };

    const screen = await render(<Pagination {...props} />);
    const buttonPrev = screen.getByLabelText('Previous');
    const buttonNext = screen.getByLabelText('Next');

    await expect.element(buttonPrev).toBeDisabled();
    await expect.element(buttonNext).not.toBeDisabled();
  });

  it('seharusnya button next ter-disabled ketika halaman saat ini = halaman terakhir', async () => {
    const props = {
      ...defaultProps,
      page: 10,
    };

    const screen = await render(<Pagination {...props} />);
    const buttonPrev = screen.getByLabelText('Previous');
    const buttonNext = screen.getByLabelText('Next');

    await expect.element(buttonNext).toBeDisabled();
    await expect.element(buttonPrev).not.toBeDisabled();
  });

  it('seharusnya tidak memanggil onPrev ketika tombol prev disabled', async () => {
    const onPrev = vi.fn();
    const props = {
      ...defaultProps,
      page: 1,
      onPrev,
    };

    const screen = await render(<Pagination {...props} />);
    const buttonPrev = screen.getByLabelText('Previous');

    await buttonPrev.click({ force: true });
    expect(onPrev).not.toHaveBeenCalled();
  });

  it('seharusnya tidak memanggil onNext ketika tombol next disabled', async () => {
    const onNext = vi.fn();
    const props = {
      ...defaultProps,
      page: 10,
      onNext,
    };
    const screen = await render(<Pagination {...props} />);
    const buttonNext = screen.getByLabelText('Next');

    await buttonNext.click({ force: true });
    expect(onNext).not.toHaveBeenCalled();
  });

  it('seharusnya memanggil onApplyPage ketika input page ditekan enter', async () => {
    const { result } = await renderHook(() => usePaginationRange({ page: 1, perPage: 10, totalData: 100 }));

    const onApplyPage = vi.fn((page: number | null) => {
      result.current.setters.setPage(page);
    });

    const props = {
      ...defaultProps,
      onApplyPage,
    };
    const screen = await render(<Pagination {...props} />);
    const user = userEvent.setup();
    const inputPage = screen.getByRole('spinbutton', { name: 'Page', exact: true });
    const rangeContainer = screen.getByLabelText('Range tampilan data');

    await user.clear(inputPage);
    await user.type(inputPage, '2');
    await user.keyboard('{Enter}');

    expect(onApplyPage).toHaveBeenCalledTimes(1);
    expect(onApplyPage).toHaveBeenCalledWith(2);

    await screen.rerender(<Pagination {...props} page={result.current.state.page} />);
    await expect.element(inputPage).toHaveValue(2);
    await expect.element(rangeContainer).toHaveTextContent(formatRupiah(2, true));
  });

  it('seharusnya memanggil onApplyPerPage ketika button terapkan ditekan', async () => {
    const { result } = await renderHook(() => usePaginationRange({ page: 1, perPage: 10, totalData: 100 }));

    const onApplyPerPage = vi.fn((perPage: number) => {
      result.current.setters.setPerPage(perPage);
    });

    const props = {
      ...defaultProps,
      onApplyPerPage,
    };

    const screen = await render(<Pagination {...props} />);
    const buttonApplyPerPage = screen.getByRole('button', { name: 'Terapkan' });
    const inputPerPage = screen.getByRole('spinbutton', { name: 'Per Page', exact: true });
    const rangeContainer = screen.getByLabelText('Range tampilan data');
    const user = userEvent.setup();

    await user.clear(inputPerPage);
    await user.type(inputPerPage, '20');
    await buttonApplyPerPage.click();

    expect(onApplyPerPage).toHaveBeenCalledTimes(1);
    expect(onApplyPerPage).toHaveBeenCalledWith(20);

    await screen.rerender(<Pagination {...props} perPage={result.current.state.perPage} />);
    await expect.element(inputPerPage).toHaveValue(20);
    await expect.element(rangeContainer).toHaveTextContent(formatRupiah(1, true));
    await expect.element(rangeContainer).toHaveTextContent(formatRupiah(20, true));
    await expect.element(rangeContainer).toHaveTextContent(formatRupiah(100, true));
  });
});
