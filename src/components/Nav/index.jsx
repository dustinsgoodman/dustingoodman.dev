import { DevToIcon, GithubIcon, TwitterIcon } from '../Icons';
import Styles from './styles.module.scss';

function Nav() {
  return (
    <nav className={Styles.nav}>
      <a className={Styles.logolink} href="/">
        <div className={Styles.monogram}>DG</div>
      </a>
      <a className={Styles.link} href="/projects">
        Portfolio
      </a>
      <a className={Styles.link} href="/about">
        About
      </a>
      <a className={Styles.social} href="https://twitter.com/dustinsgoodman" target="_blank">
        <TwitterIcon />
      </a>
      <a className={Styles.social} href="https://github.com/dustinsgoodman" target="_blank">
        <GithubIcon />
      </a>
      <a className={Styles.social} href="https://dev.to/dustinsgoodman" target="_blank">
        <DevToIcon />
      </a>
    </nav>
  );
}
export default Nav;
