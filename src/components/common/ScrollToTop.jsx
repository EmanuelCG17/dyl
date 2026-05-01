import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top of the page on every route change.
 * Placed inside BrowserRouter so it has access to useLocation.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(
    function scrollTopOnRouteChange() {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    },
    [pathname]
  );

  return null;
}

export default ScrollToTop;
