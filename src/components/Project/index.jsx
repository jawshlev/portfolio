import React from 'react'
import styles from './style.module.css'

export default function index({ index, title, href, setModal }) {
    return (
        <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectLinkWrapper}
      >
        <div
          className={styles.project}
          onMouseEnter={() => setModal({ active: true, index })}
          onMouseLeave={() => setModal({ active: false, index })}
        >
          <h2>{title}</h2>
          <span className={styles.subtext}>Design & Development</span>
        </div>
      </a>
);
}
