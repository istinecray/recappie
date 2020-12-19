import Link from "next/link";
import styles from "styles/Page.module.css";

const Header = () => (
  <>
    <header>
      <h1 className={styles.title}>
        <Link href="/">
          <a>Recappie</a>
        </Link>
      </h1>
    </header>
  </>
);

export default Header;
