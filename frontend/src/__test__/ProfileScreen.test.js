import { shallow } from 'enzyme';
import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
const UserAction = require("../actions/userActions");
jest.useFakeTimers();

jest.mock('axios');
describe('ProfileScreen', ()=> {
  let profileScreen; 

  beforeEach(() =>{
    
    jest.spyOn(UserAction, 'getLoggedUserProfile').mockReturnValue(() => mockProfileData)
    jest.spyOn(React, 'useEffect').mockReturnValue(f => f())
    
    profileScreen = shallow(<ProfileScreen/>);
  });
  
  it('should exsit', () => {
    expect(profileScreen).toBeTruthy();
  });

  it('should exsit2', () => {
    const getLoggedUserProfile = jest.spyOn(UserAction, 'getLoggedUserProfile').mockReturnValueOnce(mockProfileData);
    const tempProfile = shallow(<ProfileScreen/>);
    tempProfile.update();
    tempProfile.find('Form.Control');
    expect(getLoggedUserProfile).toBeTruthy();
  });
})

const mockProfileData = {
  firstName: 'Johnny',
  lastName: 'Shin',
  street: '931 Progress Ave ',
  postalCode: 'M2J 0B3',
  city: 'Toronto',
  province: 'ON',
  country: 'Canada',
};
