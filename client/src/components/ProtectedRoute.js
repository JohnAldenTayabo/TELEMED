import React, { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // We wrap getUser in useCallback to prevent it from being recreated on every render.
  // This is crucial for preventing an infinite loop in the useEffect hook.
  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {}, // The body is empty because the token is sent in the header
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        // If the server says the token is invalid, clear storage to log the user out.
        localStorage.clear();
      }
    } catch (error) {
      // If the API call fails for any reason, also clear storage.
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    // If we don't have a user in our Redux state, we need to fetch them.
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  // Main rendering logic
  if (localStorage.getItem("token")) {
    // If a token exists, we wait until the user object is confirmed via the API call.
    // While `user` is null, the API call is in progress. We render `null` to show nothing,
    // allowing the global spinner from App.js to be the only thing on screen.
    return user ? children : null;
  } else {
    // If there is no token at all, redirect to the login page immediately.
    return <Navigate to="/login" />;
  }
}
