/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('render home screen', () => {
  it('renders a title', () => {
    render(<App />);
    const title = screen.getByRole('heading', { name: /Ebytr Lista de Tarefas/i });

    expect(title).toBeInTheDocument();
  });
});
