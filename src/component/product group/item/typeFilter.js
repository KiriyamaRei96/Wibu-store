function typeFilter(info) {
  if (
    info.type.includes("đồ hóa trang", "trang phục") &&
    !info.type.includes("vũ khí") &&
    info.renting
  ) {
    return "costume";
  }
  if (info.type.includes("quà lưu niệm")) {
    return "souvenir";
  }
  if (info.type.includes("figure")) {
    return "figure";
  }
  if (info.type.includes("vũ khí")) {
    return "weapons";
  }
  if (info.type.includes("phụ kiện")) {
    return "accessories";
  }
  if (info.type.includes("đồ chơi")) {
    return "toy";
  }
}
export default typeFilter;
