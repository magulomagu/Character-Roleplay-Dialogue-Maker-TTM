import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../services/geminiService', () => ({
  initializeAPI: jest.fn(),
}));

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);
    const title = screen.getByText('キャラクターなりきり対話メーカー');
    expect(title).toBeInTheDocument();
  });

  it('renders the character setup component initially', () => {
    render(<App />);
    const setupTitle = screen.getByText('1. キャラクター設定');
    expect(setupTitle).toBeInTheDocument();
  });
});