import React from 'react';
import styles from './index.module.scss';
import search from '../../assets/svgs/search.svg';
import cat from '../../assets/svgs/logo-cat.svg';


function TopBar(props:any) {
    let userAvatar = props.avatar
    // alert(userAvatar)
    return (
        <div className={styles.topBar}>
            <img src={search} className={styles.search} alt="logo-earc"/>
            <img src={cat} className={styles.cat} alt="logo-cat"/>
            {/*<div></div>*/}
            <img src={userAvatar} className={styles.avatar} alt=""/>
        </div>
    );
}

export default TopBar;
