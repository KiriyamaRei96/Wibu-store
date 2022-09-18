import { Button, Drawer, Radio, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
import OptionsGroup from "./OptionsGroup";
import { v4 as uuid } from "uuid";
import DrawSlider from "./drawerSlider";

function DrawerFilter({
  style,
  clear,
  setClear,
  list,
  setFilter,
  setLoaded,
  itemList,
  filter,
  maxPrice,
  clearHandler,
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className={style.productFilterBtnGroup}>
        {list.length < itemList.length ? (
          <span
            onClick={() => clearHandler()}
            className={`${style.fixedBtn} ${style.filterClearBtn}`}
          >
            <div>
              <span className={style.filterClearLine}></span>
              <FilterOutlined />
            </div>
          </span>
        ) : (
          false
        )}

        <span
          onClick={() => setOpen(true)}
          className={`${style.fixedBtn} ${style.filterBtn}`}
        >
          <FilterOutlined />
        </span>
      </div>
      <Drawer
        // extra={
        //   <Space>
        //     <Button onClick={() => setOpen(false)}>Đóng</Button>
        //   </Space>
        // }
        closable={false}
        onClose={() => setOpen(false)}
        height={"45vh"}
        open={open}
        placement={"bottom"}
        title={
          <Radio.Group
            className={style.drawerBtnGroup}
            buttonStyle="solid"
            size="small"
            defaultValue={0}
          >
            <Radio.Button
              className={style.drawerBtn}
              onClick={(e) => setIndex(0)}
              value={0}
            >
              phim
            </Radio.Button>
            <Radio.Button
              className={style.drawerBtn}
              onClick={(e) => setIndex(1)}
              value={1}
            >
              giá
            </Radio.Button>
            <Radio.Button
              className={style.drawerBtn}
              onClick={(e) => setIndex(2)}
              value={2}
            >
              phân loại
            </Radio.Button>
            <Radio.Button
              className={style.drawerBtn}
              onClick={(e) => setIndex(3)}
              value={3}
            >
              xuất xứ
            </Radio.Button>
          </Radio.Group>
        }
        bodyStyle={{ padding: 0 }}
      >
        {index === 0 ? (
          <OptionsGroup
            clear={clear}
            setClear={setClear}
            filter={filter}
            type={"movies"}
            title={"phim"}
            setFilter={setFilter}
            info={itemList}
            setLoaded={setLoaded}
          ></OptionsGroup>
        ) : (
          false
        )}
        {index === 1 ? (
          <DrawSlider
            style={style}
            setLoaded={setLoaded}
            setFilter={setFilter}
            maxPrice={maxPrice}
            filter={filter}
          ></DrawSlider>
        ) : (
          false
        )}
        {index === 2 ? (
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
        ) : (
          false
        )}
        {index === 3 ? (
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
        ) : (
          false
        )}
      </Drawer>
    </>
  );
}
export default DrawerFilter;
