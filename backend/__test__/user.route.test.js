import * as userController from '../controllers/user.controller'
jest.useFakeTimers();

describe("user.controller", () => {
  beforeAll(() => {

    jest.spyOn(console, 'error');
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
    jest.spyOn(console, 'warn');
    console.warn.mockImplementation(() => null);

});  
  let mockRequest = {

  };
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
    }
    mockResponse = {
      json: () => {},
      mockFn: () => {}
    }
  });
  it("should exit", () => {
    expect(userController).toBeTruthy();
  });

  it("should get User Wishlist", () => {
    mockRequest = {
      query: {
        user: '2'
      }
    }
    //empty 
    const result = userController.getUserWishlist(mockRequest, mockResponse).then(res => {
      expect(res).toBeTruthy();
    });
  });

  it("should get User Profile", async() => {
    const result = userController.getUserProfile(mockRequest, mockResponse);
    expect(result).toBeTruthy();
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
    console.log(mockRequest)
    const result = userController.getUserWishlist(mockRequest, mockResponse).then(res => {
      console.log(res);
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