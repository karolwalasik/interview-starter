import React, { useContext } from "react";
import { AppContext } from "providers/AppProviders";
import Checkbox from "../Checkbox/Checkbox";
import { Link } from "react-router-dom";
import { AppRoute } from "routing/AppRoute.enum";
import SearchInput from "../SearchInput/SearchInput";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.scss";

const Header = (props) => {
  const { isUserLoggedIn, handleSetIsUserLoggedIn, userInfo } = useContext(
    AppContext
  );

  // const userInfoRef = useRef<HTMLDivElement | null>(null);
  // const logoutButtonRef = useRef<HTMLButtonElement | null>(null);
  // useEffect(() => {
  //   if (!userInfoRef.current || !logoutButtonRef.current) return;
  //   console.log(userInfoRef);
  //   userInfoRef.current.addEventListener("focusin", () => {
  //     if (logoutButtonRef.current) {
  //       console.log(1);
  //       logoutButtonRef.current.style.display = "flex";
  //     }
  //   });
  //   userInfoRef.current.addEventListener("mousenter", () => {
  //     console.log(1);
  //   });
  // }, [userInfoRef]);

  // const showLogoutOnHover = (element) => {
  //   // element.styles.display = flex;
  // };

  return (
    <header className={styles.Header}>
      <div className={styles.LoginLogoSection}>
        <img src={logo} />
        <div>
          {isUserLoggedIn ? (
            <div className={styles.UserInfo}>
              <img src={userInfo.avatar} />
              <button
                className={styles.LogoutButton}
                onClick={() => handleSetIsUserLoggedIn(false)}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={AppRoute.login}> Login </Link>
          )}
        </div>
      </div>
      <div className={styles.InputsSection}>
        <SearchInput
          searchParam={props.searchParam}
          setSearchParam={props.handlers.setSearchParam}
          setPageNumber={props.handlers.setPageNumber}
        />
        <Checkbox
          id="active"
          name="active"
          handler={props.handlers.setActiveStatus}
          labelText="Active"
        />
        <Checkbox
          id="promo"
          name="promo"
          handler={props.handlers.setPromoStatus}
          labelText="Promo"
        />
      </div>
    </header>
  );
};

export default Header;
