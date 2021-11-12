import handleLogin from "../services/utils/handleLogin";

describe('handleLogin', ()=> {
  it('should go to login url', () => {
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      location: {
        origin: "https://example.com"
      }
    }));
    handleLogin();
    expect(windowSpy).toHaveBeenCalled();
  })
});