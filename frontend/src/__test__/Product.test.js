import Product from "../components/Product";

describe('Product', ()=> {

  it('should exsit', () => {
    const result = <Product/>;
    expect(result).toBeTruthy();
  });

  it('should get product', () => {
    const component = <Product product='something' />;
    expect(component.props.product).toBe('something');
  })
});