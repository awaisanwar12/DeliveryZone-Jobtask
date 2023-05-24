
import Link from 'next/link';
import styles from './Layout.module.css';
export default function Layout({ children }) {
  return (
    <>
      <nav className={styles.nav}>
        {/* <Link href="/">
          <a>Home</a>
        </Link>{'   '}
           |{'   '}  */}
        <Link href="/">
          <a>Entries</a>
        </Link> |{"  "}
        <Link href="/hipolabs">
          <a>Hipolabs</a>
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
