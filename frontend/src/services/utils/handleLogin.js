const handleLogin = () => {
  const currentPage = window.location.pathname;
  window.location.href = `/login?redirectUrl=${encodeURIComponent(
    currentPage
  )}`;
};

export default handleLogin;
