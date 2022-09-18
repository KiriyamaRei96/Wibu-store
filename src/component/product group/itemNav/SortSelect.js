import { Select } from "antd";
import { v4 as uuid } from "uuid";
import style from "./style.module.css";

function SortSelect({ setSort, setLoaded }) {
  return (
    <Select
      onChange={(value) => {
        setLoaded(false);
        setSort(value);
      }}
      className={style.SortSelect}
      placeholder="Sắp Xếp"
    >
      <Select.Option value="date" className={style.SortOption} key={uuid()}>
        mới tới cũ
      </Select.Option>
      <Select.Option
        value="date reverse"
        className={style.SortOption}
        key={uuid()}
      >
        cũ tới mới
      </Select.Option>
      <Select.Option value="price" className={style.SortOption} key={uuid()}>
        giá: tăng dần
      </Select.Option>
      <Select.Option
        value="price reverse"
        className={style.SortOption}
        key={uuid()}
      >
        giá: giảm dần
      </Select.Option>
      <Select.Option value="alphabet" className={style.SortOption} key={uuid()}>
        tên: a-z
      </Select.Option>
      <Select.Option
        value="alphabet reverse"
        className={style.SortOption}
        key={uuid()}
      >
        tên: z-a
      </Select.Option>
    </Select>
  );
}
export default SortSelect;
