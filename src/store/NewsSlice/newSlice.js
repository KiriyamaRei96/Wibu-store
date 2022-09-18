import { createSlice } from "@reduxjs/toolkit";

export const newSlice = createSlice({
  name: "news list",
  initialState: {
    newList: [],
  },
  reducers: {
    addNews: (state, action) => {
      state.newList = action.payload.map((obj) => {
        const outPut = {
          id: obj.id,
          Name: obj.Name,
          banner: obj.banner.map((img) => img.name),
          source: obj["nguồn"],
        };
        if (obj["ảnh"]) {
          outPut.img = obj["ảnh"].map((img) => img.name);
        }
        if (obj.link) {
          outPut.link = obj.link;
        }
        outPut.content = [];
        if (obj["nội dung 1"]) {
          outPut.content.push(obj["nội dung 1"]);
        }
        if (obj["nội dung 2"]) {
          outPut.content.push(obj["nội dung 2"]);
        }
        if (obj["nội dung 3"]) {
          outPut.content.push(obj["nội dung 3"]);
        }
        if (obj["nội dung 4"]) {
          outPut.content.push(obj["nội dung 4"]);
        }
        if (obj["nội dung 5"]) {
          outPut.content.push(obj["nội dung 5"]);
        }
        if (obj["thời gian"]) {
          outPut.time = obj["thời gian"];
        }
        return outPut;
      });
    },
  },
});
export const { addNews } = newSlice.actions;
