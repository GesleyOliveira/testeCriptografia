import styles from './styles.module.css';



export function Footer() {
  return (
  <footer className={styles.footer}>
    <a href="">Entenda a Criptografia de César</a>
    <a href="">Criptografia de César &copy; {new Date().getFullYear()} - Feito por Gesley & João</a>
  </footer>
  )
}
