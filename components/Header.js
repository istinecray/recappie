import Link from "next/link";
import UserContext from "contexts/user";
import styles from "styles/Home.module.css";
import { useContext } from "react";

export default function Header() {
  const {
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
              <Link href="/logout">
                <a>Logout</a>
              </Link>
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
}
