import * as OrderController from '../controllers/order.controller';
import Order from "../models/order.model.js";
jest.useFakeTimers();
describe('order.controller', ()=> {
  it('should createOrder', () => {
    const req = {
      body: 'something'
    }
    const res = {
      json: () => {}
    };
    const result = OrderController.createOrder(req, res);
    expect(result).toBeTruthy();
  })

  it('should getOrderById', () => {
    const result = false;
    const req = {
      params: {
        orderId: 0
      }
    };
    const res = {
      json: () => {},
      status: () => {}
    };
      const orderSpy = jest.spyOn(Order, 'findById');
      // const result = getOrderById(req, res);

    // console.log(result);
    expect(result).toBeFalsy();
  })

  it('should updateOrderStatus', () => {
    const result = false;
    const req = {
      params: {
        orderId: 0
      }
    };
    const res = {
      json: () => {},
      status: () => {}
    };
    const orderSpy = jest.spyOn(Order, 'findById');
    // const result = getOrderById(req, res);
    // console.log(result);
    expect(result).toBeFalsy();
  })
});

