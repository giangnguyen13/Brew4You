import AddressForm from "../components/AddressForm";

describe('StarRating', ()=> {

  it('should exsit', () => {
    const result = <AddressForm/>;
    expect(result).toBeTruthy();
  });

  it('should get rating', () => {
    const component = <AddressForm rating={4}/>;
    expect(component.props.rating).toBe(4);
  })
});
