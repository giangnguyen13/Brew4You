import formatDate from "../services/utils/formatDate";

describe('formatDate', ()=> {
  it('should get formatDate', () => {
    const result = formatDate('2021-10-03T15:34:39.678Z');
    expect(result).toBe('10/03/2021 11:34 am');
  })
});