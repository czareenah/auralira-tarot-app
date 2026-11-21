import { render, screen } from '@testing-library/react-native';

import { WelcomeScreen } from '@/screens/WelcomeScreen';

describe('welcome screen', () => {
  it('introduces Auralira with an accessible heading and welcome message', async () => {
    await render(<WelcomeScreen />);

    expect(screen.getByRole('header', { name: 'Auralira' })).toBeOnTheScreen();
    expect(screen.getByText('Make space for what comes next.')).toBeOnTheScreen();
  });
});
