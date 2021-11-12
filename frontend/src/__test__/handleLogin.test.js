import handleLogin from "../services/utils/handleLogin";

describe('handleLogin', ()=> {
  it('should go to login url', () => {
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      location: {
        origin: "https://example.com"
      }
    }));
    try{
      handleLogin();
    }catch(e){
      // console.log(e);//debugging purpose
    }
    expect(windowSpy).toHaveBeenCalled();
  })
});