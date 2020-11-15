import React from 'react';
import styles from './EmptyList.module.scss';
import list from '../../assets/images/task-list-plain.svg';

const EmptyList = () => {
    return (
        <div className={styles.EmptyList}>
            <img src={list} className={styles.listImage}/>
            <p className={styles.emptyListHeader}>Ooops… It’s empty here</p>
            <p className={styles.emptyListSubheader}>There are no products on the list</p>
        </div>
    )
}

export default EmptyList;