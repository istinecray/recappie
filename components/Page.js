import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import Link from "next/link";
import UserContext from "contexts/user";
import styles from "styles/Page.module.css";
import { useContext } from "react";

const Page = ({ children, title }) => {
  const {
    logout,
    user: { loggedIn },
  } = useContext(UserContext);

  return (
    <section className={styles.container}>
      <Head>
        <title>Recappie{title && `| ${title}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>

      <aside className={styles.aside}>
        <Header />

        <nav className={styles.nav}>
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

                  <ul>
                    <li>
                      <Link href="/families/add">
                        <a>Add a Family</a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link href="/recipes">
                    <a>Recipes</a>
                  </Link>

                  <ul>
                    <li>
                      <Link href="/recipes/add">
                        <a>Add a Recipe</a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Footer />
      </aside>

      <main className={styles.main}>{children}</main>
    </section>
  );
};

export default Page;
