// import { Navigate, Outlet } from "react-router-dom";
// import { auth } from "../firebase";
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";

// const PrivateRoute = () => {
//   const [user, setUser] = useState("");
//   console.log(user);
//   const location = user;

//   const getAuth = async () => {
//     await onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.uid;
//         setUser({ uid: uid });
//         console.log(user.uid);
//         // ...
//       } else {
//         // User is signed out
//         // ...
//       }
//     });
//   };

//   useEffect(() => {
//     getAuth();
//   }, []);
//   return user && user?.uid ? (
//     <Outlet />
//   ) : user && user?.uid ? (
//     <Navigate to="/" state={{ from: location }} replace />
//   ) : (
//     <Navigate to="/signin" state={{ from: location }} replace />
//   );
// };

// export default PrivateRoute;

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { auth } from "../firebase";

const PrivateRoute = () => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLocation(user);
      setLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    // If still loading the user state, you can return a loading indicator
    return <Spinner />;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
