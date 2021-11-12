import * as ProductController from '../controllers/product.controller';
jest.useFakeTimers();

describe('product.controller', ()=> {
  let mockReq = {};
  let mockRequest = {};
  let mockResponse = {};
  beforeEach(() => {
    mockRequest = {
      body : 'something'
    }
    mockResponse = {
      json: () => {},
      mockFn: () => {}
    }
  });

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    done()
  })

  test('should get Products', async() => {
    mockRequest = {
    }
    //empty 
    const result = ProductController.getProducts(mockRequest, mockResponse).then(res => {
      // console.log(res);
    });
    expect(result).toBeTruthy();
  });


  it('should get Products by id', async() => {
    mockRequest = {
      params: {
        productId: 1
      }
    }
    //empty 
    const result = ProductController.getProductById(mockRequest, mockResponse).then(res => {
      console.log(res);
      return res;
    });
    expect(result).toBeTruthy();
  })

  it('should get Products by id', async() => {
    mockRequest = {
      params: {
        productId: 1
      }
    }
    //empty 
    const result = ProductController.getProductById(mockRequest, mockResponse).then(res => {
      console.log(res);
      return res;
    });
    expect(result).toBeTruthy();
  })


  it('should update Product', async() => {
    mockRequest = {
      params: {
        productId: 1
      },
      user: {
        _id: 2
      }
    }
    //empty 
    const result = ProductController.getProductById(mockRequest, mockResponse).then(res => {
      console.log(res);
      return res;
    });
    expect(result).toBeTruthy();
  })

  it('should delete Product', async() => {
    mockRequest = {
      params: {
        productId: 1
      },
      user: {
        _id: 2
      }
    }
    //empty 
    const result = ProductController.getProductById(mockRequest, mockResponse).then(res => {
      console.log(res);
      return res;
    });
    expect(result).toBeTruthy();
  })

});