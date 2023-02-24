import React from 'react'
import { ActiveLink } from './ActiveLink';

import styles from './navbar.module.css';

export const NavBar = () => {
  return (
    <nav className={styles['menu-container']}>
      <ActiveLink text='Home' href="/" />
      <ActiveLink text='About' href="/about" />
      <ActiveLink text='Contact' href="/contact" />
    </nav>
  )
}
