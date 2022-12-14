import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MonthlyCalendar from "../../components/calendar/MonthlyCalendar";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

const Calendar = () => {

  const navigate = useNavigate();
  const familyId = useAppSelector(state => state.family.id);

  useEffect(() => {
    if (familyId < 0) {
      navigate("/");
    }
  }, [])

  // 날짜 지정
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  const setYearAndMonth = (y, m) => {
    setDate({ year: y, month: m, day: date.day });
  };

  const setNewDate = (y, m, d) => {
    setDate({ year: y, month: m, day: d });
  };

  const token = useAppSelector((state) => state.token.access)
  const [monthSchedule, setMonthSchedule] = useState([]); // 이번 달 일정 채우기
  const [emit, setEmit] = useState(false);

  const remonth = (data) => {
    setEmit(data);
  }

    // 월별 일정 조회 api 요청
    const getMonthSchedule = () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACK_HOST}/calendar/schedule/${date.year}-${date.month}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        setMonthSchedule(res.data);
      });
    };
    useEffect(() => {
      getMonthSchedule();
    }, [date.month, emit])

  return(
    <>
      <MonthlyCalendar
        year={date.year}
        month={date.month}
        day={date.day}
        setYearAndMonth={setYearAndMonth}
        monthSchedules={monthSchedule}
        remonth={remonth}
        emit={emit}
      />
    </>
  )
};

export default Calendar;