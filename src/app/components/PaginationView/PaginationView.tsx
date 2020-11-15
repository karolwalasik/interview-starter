import React, { useState } from "react";

import styles from './PaginationView.module.scss';

interface Meta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: string;
  totalItems: number;
  totalPages: number;
}

interface LinkItem {
  first: string;
  last: string;
  next: string;
  previous: string;
}

interface Props {
  pagesSettings: Meta;
  pagesLinks: LinkItem | {};
  setPageNumber: Function;
  pageNumber: number;
}
let firstHalfCurr: null | number = null;


const PaginationView = ({
  pagesSettings,
  pagesLinks,
  setPageNumber,
  pageNumber,
}: Props) => {
  let paginationNums: number[] = [];
  for (let i = 1; i <= pagesSettings.totalPages; i++) {
    paginationNums.push(i);
  }


  const [currentPageNo, setCurrentPageNumber] = useState(pageNumber);

  const getButtons = (): any[] => {

    if (currentPageNo !== pageNumber) {
      setCurrentPageNumber(pageNumber);
    }

    let firstHalf = paginationNums.filter(
      (num, i) => (i < (paginationNums.length) -3)
    );
    let secondHalf = paginationNums.filter(
      (num, i) => (i >= (paginationNums.length) -3)
    );
   

    let firstHalfButtons: any = [];
    let secondHalfButtons: any = [
      secondHalf[secondHalf.length - 3],
      secondHalf[secondHalf.length - 2],
      secondHalf[secondHalf.length - 1],
    ];
    let initalFirstHalf = [1, 2, 3];

    if (firstHalf.includes(Number(currentPageNo))) {
      if (currentPageNo === 1) {
        firstHalfButtons = initalFirstHalf;
      } else if (currentPageNo >= firstHalf[firstHalf.length - 2]) {
        firstHalfButtons = [
          firstHalf[firstHalf.length - 3],
          firstHalf[firstHalf.length - 2],
          firstHalf[firstHalf.length - 1],
        ];
      } else {
        firstHalfButtons = [
          currentPageNo - 1,
          currentPageNo,
          currentPageNo + 1,
        ];
      }
      firstHalfCurr = currentPageNo;
    } else {
      if (firstHalfCurr) {
        firstHalfButtons = [
          firstHalfCurr - 1,
          firstHalfCurr,
          firstHalfCurr + 1,
        ];
        if (firstHalfCurr == firstHalf[firstHalf.length - 1]) {
          firstHalfButtons = [
            firstHalfCurr - 2,
            firstHalfCurr - 1,
            firstHalfCurr,
          ];
        }
        if (firstHalfCurr == 1) {
          firstHalfButtons = initalFirstHalf;
        }
      }
    }


    if (
      firstHalfButtons[firstHalfButtons.length - 1] - secondHalfButtons[0] !==
      -1
    ) {
      return [...firstHalfButtons, "...", ...secondHalfButtons];
    } else {
      return [...firstHalfButtons, ...secondHalfButtons];
    }
  };

  let pButtons: any =
    pagesSettings.totalPages > 6 ? getButtons() : paginationNums;

  return (
    <div className={styles.PaginationView}>
      <button disabled={currentPageNo===1} onClick={()=>setPageNumber(1)} className={styles.firstLastPageButton}>First</button>
      <div className={styles.pagesSelectors}>
      {pButtons.map((pn: any) => {
        
        if (pn == "...") {
          return <span>{pn}</span>;
        }
        return (
          <button className={pn===currentPageNo ? styles.selected:''}
            onClick={() => {
              setPageNumber(pn);
              setCurrentPageNumber(pn);
            }}
          >
            {pn}
          </button>
        );
      })}</div>
        <button className={styles.firstLastPageButton} disabled={currentPageNo===pagesSettings.totalPages} onClick={()=>setPageNumber(pagesSettings.totalPages)}>Last</button>
    </div>
  );
};

export default PaginationView;
