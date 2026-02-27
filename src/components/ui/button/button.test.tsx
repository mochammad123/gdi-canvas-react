import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import Button from './button';

describe('Button Test Browser', () => {
  it('seharusnya merender button dengan children', async () => {
    const buttonText = 'Click Me';
    const screen = await render(<Button>{buttonText}</Button>);
    const button = screen.getByRole('button', { name: buttonText });

    await expect.element(button).toBeInTheDocument();
  });

  it('seharusnya merender button dengan props default', async () => {
    const screen = await render(<Button>Default Button</Button>);
    const button = screen.getByRole('button', { name: 'Default Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).not.toBeDisabled();
  });

  it('seharusnya menangani event click', async () => {
    const handleClick = vi.fn();
    const screen = await render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });

    await button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('seharusnya disabled ketika prop disabled adalah true', async () => {
    const screen = await render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });

    await expect.element(button).toBeDisabled();
  });

  it('seharusnya menampilkan loading spinner ketika loading adalah true', async () => {
    const screen = await render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button', { name: 'Loading Button' });

    const svg = button.element().querySelector('svg');
    expect(svg).toBeVisible();
  });

  it('seharusnya merender dengan variant contain', async () => {
    const screen = await render(<Button variant="contain">Contain Button</Button>);
    const button = screen.getByRole('button', { name: 'Contain Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('text-white');
    await expect.element(button).toHaveClass('bg-navy-100');
  });

  it('seharusnya merender dengan variant outline', async () => {
    const screen = await render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole('button', { name: 'Outline Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('text-navy-100');
    await expect.element(button).toHaveClass('bg-transparent');
    await expect.element(button).toHaveClass('border-navy-100');
  });

  it('seharusnya merender dengan variant text', async () => {
    const screen = await render(<Button variant="text">Text Button</Button>);
    const button = screen.getByRole('button', { name: 'Text Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('bg-transparent');
    await expect.element(button).toHaveClass('border-none');
  });

  it('seharusnya merender dengan color navy', async () => {
    const screen = await render(<Button color="navy">Navy Button</Button>);
    const button = screen.getByRole('button', { name: 'Navy Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('bg-navy-100');
  });

  it('seharusnya merender dengan color steel-blue', async () => {
    const screen = await render(<Button color="steel-blue">Steel Blue Button</Button>);
    const button = screen.getByRole('button', { name: 'Steel Blue Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('bg-steel-blue-100');
  });

  it('seharusnya merender dengan color burnt-orange', async () => {
    const screen = await render(<Button color="burnt-orange">Burnt Orange Button</Button>);
    const button = screen.getByRole('button', { name: 'Burnt Orange Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('bg-burnt-orange-100');
  });

  it('seharusnya merender dengan color white', async () => {
    const screen = await render(<Button color="white">White Button</Button>);
    const button = screen.getByRole('button', { name: 'White Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('border-white');
  });

  it('seharusnya merender dengan size sm', async () => {
    const screen = await render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button', { name: 'Small Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('px-2 py-[4.5px]');
  });

  it('seharusnya merender dengan size lg', async () => {
    const screen = await render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button', { name: 'Large Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('px-4 py-2');
  });

  it('seharusnya merender dengan prop rounded', async () => {
    const screen = await render(<Button rounded>Rounded Button</Button>);
    const button = screen.getByRole('button', { name: 'Rounded Button' });

    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('rounded');
  });

  it('seharusnya merender LeftIcon ketika diberikan', async () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    const screen = await render(<Button LeftIcon={LeftIcon}>With Left Icon</Button>);

    await expect.element(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('seharusnya merender RightIcon ketika diberikan', async () => {
    const RightIcon = () => <span data-testid="right-icon">→</span>;
    const screen = await render(<Button RightIcon={RightIcon}>With Right Icon</Button>);

    await expect.element(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('seharusnya merender badge ketika diberikan dan lebih besar dari 0', async () => {
    const screen = await render(<Button badge={5}>Button with Badge</Button>);
    const badge = screen.getByLabelText('button-span-badge');

    await expect.element(badge).toBeInTheDocument();
    await expect.element(badge).toHaveTextContent('5');
  });

  it('seharusnya merender badge sebagai "+9" ketika badge lebih besar dari 9', async () => {
    const screen = await render(<Button badge={15}>Button with Badge</Button>);
    const badge = screen.getByLabelText('button-span-badge');

    await expect.element(badge).toBeInTheDocument();
    await expect.element(badge).toHaveTextContent('+9');
  });

  it('seharusnya tidak merender badge ketika badge adalah 0', async () => {
    const screen = await render(<Button badge={0}>Button without Badge</Button>);
    const badge = screen.container.querySelector('[aria-label="button-span-badge"]');

    expect(badge).toBeNull();
  });

  it('seharusnya menerapkan custom className', async () => {
    const screen = await render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole('button', { name: 'Custom Button' });

    await expect.element(button).toHaveClass('custom-class');
  });

  it('seharusnya menereruskan props button lainnya', async () => {
    const screen = await render(
      <Button type="submit" aria-label="Submit form">
        Submit
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Submit' });

    await expect.element(button).toHaveAttribute('type', 'submit');
    await expect.element(button).toHaveAttribute('aria-label', 'Submit form');
  });

  it('seharusnya tidak memanggil onClick ketika disabled', async () => {
    const handleClick = vi.fn();
    const screen = await render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Disabled Button' });

    await button.click({ force: true });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('seharusnya tidak memanggil onClick ketika loading', async () => {
    const handleClick = vi.fn();
    const screen = await render(
      <Button onClick={handleClick} loading>
        Loading Button
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Loading Button' });

    await button.click({ force: true });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('seharusnya merender button dengan LeftIcon dan RightIcon', async () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    const RightIcon = () => <span data-testid="right-icon">→</span>;
    const screen = await render(
      <Button LeftIcon={LeftIcon} RightIcon={RightIcon}>
        Both Icons
      </Button>
    );

    await expect.element(screen.getByTestId('left-icon')).toBeInTheDocument();
    await expect.element(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
