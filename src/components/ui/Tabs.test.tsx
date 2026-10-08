import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

describe('Tabs', () => {
  it('renders all tab triggers', () => {
    render(
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('displays default active tab content', () => {
    render(
      <Tabs defaultValue="tab-2">
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('switches content when clicking a different tab', async () => {
    render(
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Tab 2'));

    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  it('handles keyboard navigation (ArrowRight/ArrowLeft)', () => {
    render(
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2">Content 2</TabsContent>
        <TabsContent value="tab-3">Content 3</TabsContent>
      </Tabs>,
    );

    const trigger1 = screen.getByText('Tab 1').closest('button')!;
    const trigger2 = screen.getByText('Tab 2').closest('button')!;

    trigger1.focus();
    fireEvent.keyDown(trigger1, { key: 'ArrowRight' });

    expect(trigger2).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(trigger2);

    fireEvent.keyDown(trigger2, { key: 'ArrowLeft' });
    expect(trigger1).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(trigger1);
  });

  it('handles Home and End keys', () => {
    render(
      <Tabs defaultValue="tab-2">
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2">Content 2</TabsContent>
        <TabsContent value="tab-3">Content 3</TabsContent>
      </Tabs>,
    );

    const trigger1 = screen.getByText('Tab 1').closest('button')!;
    const trigger2 = screen.getByText('Tab 2').closest('button')!;
    const trigger3 = screen.getByText('Tab 3').closest('button')!;

    trigger2.focus();
    fireEvent.keyDown(trigger2, { key: 'Home' });
    expect(trigger1).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(trigger1, { key: 'End' });
    expect(trigger3).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onValueChange when tab is switched', () => {
    const onValueChange = vi.fn();
    render(
      <Tabs defaultValue="tab-1" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    fireEvent.click(screen.getByText('Tab 2'));
    expect(onValueChange).toHaveBeenCalledWith('tab-2');
  });

  it('works as a controlled component', async () => {
    const { rerender } = render(
      <Tabs value="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText('Content 1')).toBeInTheDocument();

    rerender(
      <Tabs value="tab-2">
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2">Content 2</TabsContent>
      </Tabs>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <Tabs className="custom-tabs">
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    expect(container.firstChild).toHaveClass('custom-tabs');
  });
});
