import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "item list",
  initialState: {
    listItems: [],
    maxPrice: 1000000000,
  },
  reducers: {
    addItem: (state, action) => {
      const outPut = action.payload.map((item) => {
        const obj = {};
        obj.name = item.name;

        obj.type = item["type"];
        obj.id = item.id;
        obj.movie = item["phim"];
        obj.source = item["xuất xứ"];
        obj.renting = item["giá cho thuê"];
        obj.sale = item["giá bán"];
        obj.date = item["ngày nhập"];
        obj.info = item["mô tả"];

        obj.img = [];
        obj.img.push(item["ảnh"][0].name);
        obj.img.push(item["ảnh 1"][0].name);
        obj.img.push(item["ảnh2"][0].name);
        obj.img.push(item["ảnh3"][0].name);
        obj.img.push(item["ảnh4"][0].name);
        return obj;
      });
      state.maxPrice = Math.max(
        ...outPut.map((item) => (item.sale ? item.sale : item.renting))
      );

      state.listItems = outPut;
    },
  },
});
export const { addItem } = itemSlice.actions;
