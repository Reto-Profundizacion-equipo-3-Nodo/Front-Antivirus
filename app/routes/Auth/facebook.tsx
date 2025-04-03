// Archivo: routes/auth/facebook.jsx
// Implementación similar a Google pero con los endpoints de Facebook
export async function action({ request }) {
    // Similar a la implementación de Google pero con URLs de Facebook
    const facebookAuthUrl = "https://www.facebook.com/v13.0/dialog/oauth";
    const clientId = "TU_CLIENT_ID_DE_FACEBOOK";
    const redirectUri = "https://hostlocal:5261/auth/facebook/callback";
    
    const authUrl = `${facebookAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    
    return redirect(authUrl);
  }