import Link from "next/link";
import styles from "styles/Home.module.css";

export default function Header() {
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
          <li>
            <Link href="/recipes">
              <a>Recipes</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
