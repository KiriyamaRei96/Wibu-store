import { List, Col, Slider, Divider, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { itemSelector } from "../../../store/store";
import style from "./style.module.css";
import OptionsGroup from "./OptionsGroup";
import ProductItem from "./ProductItem";
import SortSelect from "./SortSelect";
import DrawerFilter from "./drawerFilter";

import { v4 as uuid } from "uuid";
import DrawSlider from "./drawerSlider";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ItemNav(props) {
  const itemList = useSelector(itemSelector).listItems;
  const maxPrice = useSelector(itemSelector).maxPrice;

  const [loaded, setLoaded] = useState(false);
  const [list, setList] = useState([]);
  // const [active, setActive] = useState(false);
  const [clear, setClear] = useState(false);
  const [filter, setFilter] = useState({
    movies: [],
    type: [],
    source: [],
    price: [0, maxPrice],
  });
  const [sort, setSort] = useState([]);
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    if (itemList.length > 0) {
      // filter list of items
      setLoaded(true);

      let output;
      params.text
        ? (output = itemList.filter((item) =>
            item.name.toLowerCase().includes(params.text.toLowerCase())
          ))
        : (output = itemList);

      let filed = output.filter((item) => {
        let checker = (arr, target) =>
          target.some((v) => {
            return arr.includes(v);
          });
        let price = item.renting ? item.renting : item.sale ? item.sale : false;

        return (
          (filter.movies.length > 0
            ? filter.movies.includes(item.movie[0])
            : true) &&
          (filter.type.length > 0 ? checker(filter.type, item.type) : true) &&
          (filter.source.length > 0
            ? filter.source.includes(item.source)
            : true) &&
          filter.price[0] <= price &&
          price <= filter.price[1]
        );
      });
      // sorting list of item

      switch (sort) {
        case "date":
          filed = filed.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });

          break;
        case "date reverse":
          filed = filed
            .sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            })
            .reverse();

          break;
        case "price":
          filed = filed.sort((a, b) => {
            const aPrice = a.sale ? a.sale : a.renting;
            const bPrice = b.sale ? b.sale : b.renting;

            return aPrice - bPrice;
          });

          break;
        case "price reverse":
          filed = filed
            .sort((a, b) => {
              const aPrice = a.sale ? a.sale : a.renting;
              const bPrice = b.sale ? b.sale : b.renting;

              return aPrice - bPrice;
            })
            .reverse();

          break;
        case "alphabet":
          filed = filed.sort((a, b) =>
            a.name[0].toLowerCase() > b.name[0].toLowerCase() ? 1 : -1
          );

          break;
        case "alphabet reverse":
          filed = filed
            .sort((a, b) =>
              a.name[0].toLowerCase() > b.name[0].toLowerCase() ? 1 : -1
            )
            .reverse();

          break;

        default:
          break;
      }
      setList(filed);
      // setTransition(() => );
      if (document.title !== "Sản phẩm") {
        document.title = "Sản phẩm";
      }
    }
  }, [itemList, params, filter, sort]);
  const clearHandler = () => {
    {
      setClear(true);
      setFilter({
        movies: [],
        type: [],
        source: [],
        price: [0, maxPrice],
      });
    }
  };

  return (
    <Col className={style.productMain} span={24}>
      <Col className={style.productHeader} span={24}>
        <div className={style.productBanner}></div>
        <h2 className={style.productBannerText}>sản phẩm</h2>
      </Col>
      <Col className={style.productBody} span={24}>
        <Col className={style.productNav} md={6} lg={6} xl={4}>
          <OptionsGroup
            clear={clear}
            setClear={setClear}
            type={"movies"}
            title={"phim"}
            filter={filter}
            setFilter={setFilter}
            setLoaded={setLoaded}
            info={itemList}
          ></OptionsGroup>
          <div>
            <DrawSlider
              style={style}
              setLoaded={setLoaded}
              setFilter={setFilter}
              maxPrice={maxPrice}
              filter={filter}
            />

            <Divider />
          </div>
          <OptionsGroup
            clear={clear}
            setClear={setClear}
            filter={filter}
            type={"type"}
            title={"phân loại"}
            setFilter={setFilter}
            info={itemList}
            setLoaded={setLoaded}
          ></OptionsGroup>
          <OptionsGroup
            clear={clear}
            setClear={setClear}
            filter={filter}
            type={"source"}
            title={"xuất xứ"}
            setFilter={setFilter}
            info={itemList}
            setLoaded={setLoaded}
          ></OptionsGroup>
          <Button
            className={style.ProductCreateButton}
            type="primary"
            size="large "
            onClick={clearHandler}
          >
            bỏ bộ lọc
          </Button>
        </Col>

        <Col md={24} lg={18} xl={20} xxl={20} className={style.productList}>
          <div className={style.productDivider}>
            <div className={style.productListInfo}>
              {params.text !== undefined ? (
                <div>
                  <span>
                    Kết quả tìm kiếm cho "
                    <span style={{ textTransform: "none" }}>{params.text}</span>
                    " ({list.length})
                  </span>
                </div>
              ) : (
                <span> {`Tổng số lượng sản phẩm (${list.length})`}</span>
              )}

              {params.text !== undefined ? (
                <div>
                  <Button
                    className={style.ProducAllbtn}
                    onClick={() => {
                      clearHandler();
                      navigate("/post");
                    }}
                  >
                    xem toàn bộ sản phẩm
                  </Button>
                  <SortSelect setLoaded={setLoaded} setSort={setSort} />
                </div>
              ) : (
                <div>
                  <SortSelect setLoaded={setLoaded} setSort={setSort} />
                </div>
              )}
            </div>
            <Divider style={{ margin: "10px 0" }} />
            <List
              pagination={{ pageSize: 24 }}
              grid={{
                gutter: [4, 5],
                xs: 2,
                sm: 3,
                md: 4,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              loading={!list ? true : false}
              dataSource={list}
              renderItem={(item) => (
                <List.Item key={uuid()}>
                  <ProductItem item={item} />
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Col>

      <DrawerFilter
        clearHandler={clearHandler}
        style={style}
        clear={clear}
        setClear={setClear}
        setFilter={setFilter}
        setLoaded={setLoaded}
        itemList={itemList}
        filter={filter}
        maxPrice={maxPrice}
        list={list}
      />
    </Col>
  );
}
export default memo(ItemNav);
