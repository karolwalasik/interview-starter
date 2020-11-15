import React, { FormEvent, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AppContext } from "../../../providers/AppProviders";
import axios from "axios";
import styles from "./Login.module.scss";
import { AppRoute } from "routing/AppRoute.enum";
import logo from "../../assets/images/logo.png";

export const Login = () => {
  const {
    isUserLoggedIn,
    handleSetIsUserLoggedIn,
    userInfo,
    handleAddUserInfo,
  } = useContext(AppContext);
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .get("https://join-tsh-api-staging.herokuapp.com/users/2")
      .then((response) => {
        handleSetIsUserLoggedIn(true);
        handleAddUserInfo(response.data);
      });
  };

  if (isUserLoggedIn) return <Redirect to={AppRoute.home} />;

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.leftSection}>a</div>
      <div className={styles.rightSection}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.formContainer}>
        <h2 className={styles.heading}>Login</h2>
        <form
          className={styles.loginForm}
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <label htmlFor="username">Username:</label>
          <input placeholder="Enter username" name="username" id="username" />
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Enter password"
            name="password"
            type="password"
            id="password"
          />
          <button type="submit">Log in</button>
        </form>
        <a className={styles.passwordResetLink} href="#">
          Forgot password?
        </a>
        </div>
      </div>
    </div>
  );
};
