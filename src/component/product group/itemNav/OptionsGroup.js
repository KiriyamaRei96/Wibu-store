import { useEffect, useState, memo } from "react";
import style from "./style.module.css";
import { v4 as uuid } from "uuid";
import { DownOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { useSelector } from "react-redux";

import { displaySelector } from "../../../store/store";
import Title from "antd/lib/skeleton/Title";
function OptionsGroup({
  info,
  type,
  setFilter,
  setLoaded,
  clear,
  setClear,
  filter,
  title,
}) {
  const [options, setOptions] = useState([]);
  const [active, setActive] = useState(false);
  const movieLogos = useSelector(displaySelector).movieLogos;
  const [checked, setCheked] = useState([]);

  useEffect(() => {
    let name = [];
    let optionInfo;
    switch (type) {
      case "movies":
        let movieMap = {};
        info.forEach((item) => {
          if (!movieMap[item.movie[0]]) {
            movieMap[item.movie[0]] = {
              name: item.movie[0],
              number: 1,
            };
          } else {
            movieMap[item.movie[0]].number += 1;
          }
        });

        optionInfo = Object.values(movieMap);

        setOptions(optionInfo);
        break;
      case "source":
        let sourceMap = {};
        info.forEach((item) => {
          if (!sourceMap[item.source]) {
            sourceMap[item.source] = {
              name: item.source,
              number: 1,
            };
          } else {
            sourceMap[item.source].number += 1;
          }
        });

        optionInfo = Object.values(sourceMap);

        setOptions(optionInfo);
        break;
      case "type":
        let typeMap = {};
        info.forEach((item) => {
          item.type.forEach((type) => {
            if (!typeMap[type]) {
              typeMap[type] = {
                name: type,
                number: 1,
              };
            } else {
              typeMap[type].number += 1;
            }
          });
        });

        optionInfo = Object.values(typeMap);

        // info.forEach((item) => {
        //   item.type.forEach((types) => {
        //     if (!name.includes(types)) {
        //       name.push(types);
        //     }
        //   });
        // });
        // optionInfo = name.map((mv) => {
        //   let output = {};
        //   output.name = mv;
        //   output.number = 0;
        //   info.forEach((item) => {
        //     item.type.forEach((types) => {
        //       if (mv === types) {
        //         output.number++;
        //       }
        //     });
        //   });
        //   return output;
        // });

        setOptions(optionInfo);
        break;
    }
  }, [info]);

  useEffect(() => {
    if (clear) {
      setCheked([]);
    }
  }, [clear]);

  const changeHander = (element) => {
    setLoaded(false);

    setCheked((prv) => prv.filter((value) => value !== element.value));

    if (element.checked) {
      setCheked((prv) => [...prv, element.value]);
    }
    setClear(false);

    switch (type) {
      case "movies":
        element.checked
          ? setFilter((prv) => {
              return { ...prv, movies: [...prv.movies, element.value] };
            })
          : setFilter((prv) => {
              return {
                ...prv,
                movies: prv.movies.filter((item) => item !== element.value),
              };
            });
        break;
      case "source":
        element.checked
          ? setFilter((prv) => {
              return { ...prv, source: [...prv.source, element.value] };
            })
          : setFilter((prv) => {
              return {
                ...prv,
                source: prv.source.filter((item) => item !== element.value),
              };
            });
        break;
      case "type":
        element.checked
          ? setFilter((prv) => {
              return { ...prv, type: [...prv.type, element.value] };
            })
          : setFilter((prv) => {
              return {
                ...prv,
                type: prv.type.filter((item) => item !== element.value),
              };
            });
        break;
    }
  };

  return (
    <div className={style.optionsGroup}>
      <span
        className={
          active ? `${style.optionsTitle} ${style.active}` : style.optionsTitle
        }
        onClick={() => setActive(!active)}
      >
        {title}
        <DownOutlined />
      </span>

      <div
        className={
          active ? `${style.optionsBody} ${style.active}` : style.optionsBody
        }
      >
        {options.length > 0
          ? options.map((option) => (
              <label
                className={style.optionsItem}
                key={uuid()}
                htmlFor={option.name}
              >
                <input
                  type="checkbox"
                  id={option.name}
                  value={option.name}
                  checked={filter[type].includes(option.name)}
                  onChange={(e) => changeHander(e.target)}
                />
                {movieLogos[option.name] ? (
                  <div>
                    <img
                      className={style.optionsLogo}
                      src={movieLogos[option.name].logo}
                      alt="logo"
                    />
                    <span>({option.number})</span>
                  </div>
                ) : (
                  <span> {`${option.name}(${option.number})`}</span>
                )}
              </label>
            ))
          : false}
      </div>
      <Divider className={style.optionDivider} />
    </div>
  );
}
export default memo(OptionsGroup);
