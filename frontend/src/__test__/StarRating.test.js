import StarRating from "../components/StarRating";

describe('StarRating', ()=> {

  it('should exsit', () => {
    const result = <StarRating/>;
    expect(result).toBeTruthy();
  });

  it('should get rating', () => {
    const component = <StarRating rating={4}/>;
    expect(component.props.rating).toBe(4);
  })
});
