import axios from "axios";
import Cookies from 'js-cookie';
import {GoogleOAuthProvider, GoogleLogin} from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginGoogle = () => {
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/api`;
    const [googleBtnWidth, setGoogleBtnWidth] = useState()
    const history = useNavigate()


      const onSuccess = async (res) => {
        const user = {
              "grant_type":"convert_token",
              "client_id":process.env.REACT_APP_GOOGLE_CLIENT_ID_API,
              "client_secret":process.env.REACT_APP_GOOGLE_CLIENT_SECRET_API,
              "backend":"google-identity",
              "token": res.credential
            };

            try {
              const {data} = await axios.post(`${API_ENDPOINT}/auth/social_login`, user ,{headers: {
                  'Content-Type': 'application/json'
              }}, {withCredentials: true});

              Cookies.set('access_token', data.access_token);
              Cookies.set('logedIn', true);
    
              // =============> Save User Info to Local Storage <=============
              localStorage.setItem("user", JSON.stringify(data.user))

              window.location.pathname = '/'

            } catch (error) {
              console.log(error.response)
            }

      }

      const onFailure = (err) => {
        console.log('failed:', err);
      };

    useEffect(() => {
        const updateGoogleBtnWidth = () => {
          const googleBtnContainer = document.getElementById("google-btn-container");
    
          if (googleBtnContainer) {
            const width = googleBtnContainer.offsetWidth;
            setGoogleBtnWidth(width);
          }
        };
        window.addEventListener('resize', updateGoogleBtnWidth);
        updateGoogleBtnWidth();
        return () => {
          window.removeEventListener('resize', updateGoogleBtnWidth);
        };
      }, []); 

    return(
      <>
        <div id="google-btn-container" className="flex items-center justify-center">
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              onSuccess={onSuccess}
              onFailure={onFailure}
              useOneTap
              type= "standard" size= "large" shape= "pill" width= {`${googleBtnWidth}`} logo_alignment= "center"
            />
          </GoogleOAuthProvider>
        </div>
        </>

    )
}