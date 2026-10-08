import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

describe('Accordion', () => {
  it('renders all accordion items', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText('Trigger 1')).toBeInTheDocument();
    expect(screen.getByText('Trigger 2')).toBeInTheDocument();
  });

  it('expands item on click', async () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByText('Trigger 1');
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses item on second click', async () => {
    render(
      <Accordion defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByText('Trigger 1');
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('only one item open at a time in single mode', async () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    fireEvent.click(screen.getByText('Trigger 1'));
    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Trigger 2'));
    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('multiple items can be open in multiple mode', async () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    fireEvent.click(screen.getByText('Trigger 1'));
    fireEvent.click(screen.getByText('Trigger 2'));

    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  it('supports default value', () => {
    render(
      <Accordion defaultValue="item-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('calls onValueChange when items are toggled', () => {
    const onValueChange = vi.fn();
    render(
      <Accordion onValueChange={onValueChange}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    fireEvent.click(screen.getByText('Trigger 1'));
    expect(onValueChange).toHaveBeenCalledWith(['item-1']);

    fireEvent.click(screen.getByText('Trigger 1'));
    expect(onValueChange).toHaveBeenCalledWith([]);
  });

  it('works as a controlled component', async () => {
    const { rerender } = render(
      <Accordion value={['item-1']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    rerender(
      <Accordion value={['item-2']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Accordion className="custom-accordion">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(container.firstChild).toHaveClass('custom-accordion');
  });
});
