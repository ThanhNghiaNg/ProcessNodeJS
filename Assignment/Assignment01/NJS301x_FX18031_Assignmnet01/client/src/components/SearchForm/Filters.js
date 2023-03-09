import classes from "./Filters.module.css";
import React, { useImperativeHandle } from "react";
import useInput from "../../hooks/use-input";

// Generate years function
const generateYears = (yearstart, yearEnd) => {
  const years = [];
  for (let i = yearEnd; i >= yearstart; i--) {
    years.push(i);
  }
  return years;
};

const Filters = React.forwardRef((props, ref) => {
  // generate years from 1990 - current year
  const years = generateYears(1990, new Date().getFullYear());
  const {
    value: genre,
    onChangeValue: onChangeGenre,
    onReset: onResetGenre,
  } = useInput();
  const {
    value: mediaType,
    onChangeValue: onChangeMediaType,
    onReset: onResetMediaType,
  } = useInput();
  const {
    value: language,
    onChangeValue: onChangeLanguage,
    onReset: onResetLanguage,
  } = useInput();
  const {
    value: year,
    onChangeValue: onChangeYear,
    onReset: onResetYear,
  } = useInput();
  const getFilterValues = () => {
    return {
      genre,
      mediaType,
      language,
      year,
    };
  };
  const resetFilters = () => {
    onResetGenre();
    onResetMediaType();
    onResetLanguage();
    onResetYear();
  };
  useImperativeHandle(ref, () => {
    return {
      getFilterValues,
      resetFilters,
    };
  });
  return (
    <div className={classes.filter} ref={ref}>
      <div className={classes.select}>
        <label>Genre</label>
        <select name="genre" onChange={onChangeGenre}>
          <option value={""}>all</option>
          <option value={"Action"}>Action</option>
          <option value={"Romance"}>Romance</option>
        </select>
      </div>
      <div className={classes.select}>
        <label>Media type</label>
        <select name="media-type" onChange={onChangeMediaType}>
          <option value={""}>all</option>
          <option value={"movie"}>movie</option>
          <option value={"tv"}>tv</option>
          <option value={"person"}>person</option>
        </select>
      </div>
      <div className={classes.select}>
        <label>Langugue</label>
        <select name="language" onChange={onChangeLanguage}>
          <option value={""}>all</option>
          <option value={"en"}>English - United State</option>
          <option value={"ja"}>Japanese</option>
          <option value={"ko"}>Korean</option>
        </select>
      </div>
      <div className={classes.select}>
        <label>Year</label>
        <select name="year" onChange={onChangeYear}>
          <option value={""}>all</option>
          {years.map((year) => (
            <option value={`${year}`}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default Filters;
