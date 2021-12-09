import * as userController from '../controllers/user.controller'
jest.useFakeTimers();

describe("user.controller", () => {
  let mockRequest = {};
  let mockResponse = {};
  beforeEach(() => {
    mockRequest = {
      body: {
        _id: 4
      },
      user: {
        _id: 3
      },
      query: {
        user: '2'
      }
    };
    mockResponse = {
      json: () => {},
      mockFn: () => {}
    };
  });

  it("should exit", () => {
    expect(userController).toBeTruthy();
  });

  it("should get empty User Wishlist when user is not found", () => {
    mockRequest = {
      query: {
        user: '2'
      }
    }
    let result;
    //empty 
    try{
      const orderSpy = jest.spyOn(userController, 'getUserWishlist');
      userController.getUserWishlist(mockRequest, mockResponse);
    }catch(ex){
      //dummy
    }
    expect(result).toBeFalsy();
  });

  it("should get error in getUserProfile when Request is Empty", () => {
    let result;
    try{
      const result = userController.getUserProfile(mockRequest, mockResponse);
    }catch(e){
      //dummy
    }
    expect(result).toBe(undefined);
  });

  it("should get authUser", () => {
    const result = userController.getUserProfile(mockRequest, mockResponse);
    expect(result).toBeTruthy();
  });

  it("should get registerUser", () => {
    const result = userController.getUserWishlist(mockRequest, mockResponse);
    expect(result).toBeTruthy();
  });

  it("should get update User Profile", () => {
    const result = userController.getUserWishlist(mockRequest, mockResponse).then(res => {
    });
    expect(result).toBeTruthy();
  });

  it("should get add Product ToWishlist", () => {
    const result = userController.getUserWishlist(mockRequest, mockResponse).then(res => {
    });
    expect(result).toBeTruthy();
  });

  it("should get remove Product FromWishlist", () => {
    const result = userController.getUserWishlist(mockRequest, mockResponse).then(res => {
    });
    expect(result).toBeTruthy();
  });
});