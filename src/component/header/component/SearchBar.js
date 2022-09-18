import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import SuggetItem from "../SuggestItem";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function SearchBar({
  suggets,
  style,
  searchHandler,
  search,
  movieLogos,
  movieColor,
  isPc = true,
}) {
  const navigate = useNavigate();
  return (
    <div className={`flex NavSearch__Group ${style.searchInput}`}>
      <div className={`NavSearch__input-group ${style.InputGroup} `}>
        <Input
          value={search}
          onChange={(e) => searchHandler(e)}
          allowClear
          onPressEnter={() => navigate(`/post/find=${search}`)}
        ></Input>
        {suggets.length > 0 ? (
          <div className={`${style.NavSuggest} flex`}>
            {!isPc
              ? suggets
                  .slice(0, 3)
                  .map((item) => (
                    <SuggetItem
                      key={uuid()}
                      item={item}
                      movieColor={movieColor}
                      logo={
                        movieLogos[item.movie[0]]
                          ? movieLogos[item.movie[0]].logo
                          : false
                      }
                    />
                  ))
              : suggets
                  .slice(0, 4)
                  .map((item) => (
                    <SuggetItem
                      key={uuid()}
                      item={item}
                      movieColor={movieColor}
                      logo={
                        movieLogos[item.movie[0]]
                          ? movieLogos[item.movie[0]].logo
                          : false
                      }
                    />
                  ))}

            {suggets.length > 4 ? (
              <div className={style.NavFotter}>
                <Link className={style.NavMorebtn} to={`/post/find=${search}`}>
                  xem thêm
                </Link>
                <Button> đóng</Button>
              </div>
            ) : (
              false
            )}
          </div>
        ) : (
          false
        )}
      </div>

      <Link
        className={style.NavSearchbtn}
        to={search !== "" ? `/post/find=${search}` : "/post/"}
      >
        <SearchOutlined />
      </Link>
    </div>
  );
}
export default SearchBar;
