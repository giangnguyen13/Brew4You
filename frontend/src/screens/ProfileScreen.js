import React, { useState, useEffect } from "react";
import { getLoggedUserProfile } from "../actions/userActions";
import Header from "../components/Header";

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState({});


  useEffect(() => {
    (async () => {
      const profile = await getLoggedUserProfile();
      setUserProfile(profile);
    })()
  }, []);
  return (
    <>
    <Header/>
    <h1>
      Hello {`${userProfile.firstName} ${userProfile.lastName}`}, only logged
      user can see this page
    </h1>
    </>
    
  );
};

export default ProfileScreen;
