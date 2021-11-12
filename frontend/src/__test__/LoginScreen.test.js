import LoginScreen from '../screens/WishListScreen'
import { render, fireEvent, screen, waitForElement } from '@testing-library/react';

describe('LoginScreen', ()=> {
  it('should exsit', () => {
    const result = <LoginScreen/>;
    expect(result).toBeTruthy();
  })
});