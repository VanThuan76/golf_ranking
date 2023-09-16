import { useEffect } from 'react';

function RedirectFacebook() {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/auth/facebook`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.href = data.url;
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return null;
}

export default RedirectFacebook;
