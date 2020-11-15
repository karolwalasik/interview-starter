import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AppContext } from "../../../providers/AppProviders";

import { rootAPI } from "../../../api";

import PaginationView from "../../components/PaginationView/PaginationView";
import Popup from "app/components/Popup/Popup";
import Header from "app/components/Header/Header";
import Product from "app/components/Product/Product";
import styles from "./Products.module.scss";
import EmptyList from '../../components/EmptyList/EmptyList';

interface ServerResponse {
  data: ServerData;
}

interface Item {
  active: boolean;
  description: string;
  id: number;
  image: string;
  name: string;
  promo: boolean;
  rating: number;
}

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

interface ServerData {
  items: Array<Item>;
  meta: Meta;
  links: LinkItem;
}

export const Products = () => {
  const { isUserLoggedIn, handleSetIsUserLoggedIn, userInfo,isPopupActive,handleSetPopupActive } = useContext(
    AppContext
  );
  const [searchParam, setSearchParam] = useState("");
  const [isPromo, setPromoStatus] = useState(false);
  const [isActive, setActiveStatus] = useState(false);
  const [productsList, setProductsList] = useState<Item[]>([]);
  const [url, setUrl] = useState(
    "https://join-tsh-api-staging.herokuapp.com/product"
  );
  const [pagesSettings, setPagesSettings] = useState<Meta | any>({});
  const [hasDataLoaded, setDataLoaded] = useState(false);
  const [pageLinks, setPagesLinks] = useState<LinkItem | {}>({});
  const [pageNumber, setPageNumber] = useState(1);
  const [popupData, setPopupData] = useState<Item | {}>({});
  const [errors, setErrors] = useState(false);

  const fetchData = async (errorSetter) => {
    try {
      errorSetter(false);
      const { data } = await axios.get<ServerData>(rootAPI, {
        params: {
          limit: 12,
          page: pageNumber,
          search: searchParam,
          promo: isPromo,
          active: isActive,
        },
      });
      setProductsList(data.items);
      setPagesSettings(data.meta);
      setPagesLinks(data.links);
      setDataLoaded(true);
    } catch (err) {
      errorSetter(true);
    }
  };

  useEffect(() => {
    fetchData(setErrors);
  }, [searchParam, isPromo, isActive, pageNumber]);

  return (
    <div className={isPopupActive ? `${styles.activePopup} ${styles.Products} ` : styles.Products}>
      <Header
        searchParam={searchParam}
        handlers={{
          setSearchParam,
          setPageNumber,
          setActiveStatus,
          setPromoStatus,
        }}
      />
      <div className={styles.ProductsWrapper}>
      {errors && (
        <p>There's an error with the server, please come back later</p>
      )}
      {!hasDataLoaded ? <div className={styles.loader}>loading</div> :productsList.map((product) => {
        return (
          <Product
            product={product}
            handlers={{ handleSetPopupActive, setPopupData }}
          />
        );
      })}
      {!!hasDataLoaded && !productsList.length ? <EmptyList /> : null}
      {isPopupActive ? (
        <Popup popupData={popupData} setPopupActive={handleSetPopupActive} />
      ) : null}

      {(!!hasDataLoaded && pagesSettings.totalPages > 1) ? (
        <PaginationView
          pagesSettings={pagesSettings}
          pagesLinks={pageLinks}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
      ) : null}
    </div></div>
  );
};
