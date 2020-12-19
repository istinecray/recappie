import Link from "next/link";
import UserContext from "contexts/user";
import styles from "styles/Page.module.css";
import { useContext } from "react";

const Header = () => {
  const {
    logout,
    user: { loggedIn },
  } = useContext(UserContext);

  return (
    <>
      <header>
        <h1 className={styles.title}>
          <Link href="/">
            <a>Recappie</a>
          </Link>
        </h1>
      </header>

      <nav>
        <ul>
          {!loggedIn && (
            <li>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </li>
          )}

          <li>
            {loggedIn ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link href="/login">
                <a>Login</a>
              </Link>
            )}
          </li>

          {loggedIn && (
            <>
              <li>
                <Link href="/families">
                  <a>Families</a>
                </Link>
              </li>

              <li>
                <Link href="/recipes">
                  <a>Recipes</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
