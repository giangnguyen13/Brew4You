import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import WishListScreen from '../screens/WishListScreen';

describe('LoginScreen', ()=> {
  it('should exsit', () => {
    const result = <WishListScreen/>;
    expect(result).toBeTruthy();
  })

  it('should render', () => {
    render(<Router><WishListScreen /></Router>)
  })
});