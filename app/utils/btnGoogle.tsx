import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function BtnGoogle() {
    //TODO: pasar a variable de entorno (Auth con Google)
    const clienteID =
        "97095162816-lu3019h98mm3s5pmkpaujhlfd5nb606c.apps.googleusercontent.com";
    return (
        <GoogleOAuthProvider clientId={clienteID}>
            <GoogleLogin
                onSuccess={(response) => console.log(response)}
                onFailure={(response) => console.log(response)}
                useOneTap
                shape="pill"
                theme="filled_blue"
                logo_alignment="center"
            />

        </GoogleOAuthProvider>
    )
}