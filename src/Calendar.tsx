import React, {useState} from 'react';
import styles from './Calendar.module.scss';

type Day = {
    day: number,
    name: string,
    weekday: number,
    today: boolean,
    out?: true,
}

const today = new Date();
const tMonth = today.getMonth();
const tYear = today.getFullYear();

const createDay = (year: number, month: number, date: number, out?: true): Day => {
    const wd = new Date(year, month, date);
    const name = wd.toLocaleDateString(locale, {weekday: 'short'});
    return {day: wd.getDate(), name, weekday: wd.getDay(), today: wd.toDateString() === today.toDateString(), out};
}

const getDaysInMonth = (month: number, year: number) => {
    const days: Day[] = [];
    const date = new Date(year, month);
    const monthName = date.toLocaleDateString(locale, {month: 'long'});
    const endDate = new Date(year, month + 1, 0);
    const daysCount = endDate.getDate();
    let firstDayInMonth = date.getDay();
    if (firstDayInMonth === 0) firstDayInMonth = 6;
    else firstDayInMonth--;
    for (let d = -firstDayInMonth; d < 0; d++) {
        days.push(createDay(year, month, d + 1, true));
    }
    for (let d = 0; d < daysCount; d++) {
        days.push(createDay(year, month, d + 1));
    }
    date.setDate(daysCount);
    const lastDayInMonth = date.getDay();
    for (let d = 0; d < 7 - lastDayInMonth; d++) {
        days.push(createDay(year, month + 1, d + 1, true));
    }
    return {monthName, days};
};

const locale = window.navigator.language;

const Calendar: React.FC = () => {
    const [month, setMonth] = useState(tMonth);
    const [year, setYear] = useState(tYear);
    const {monthName, days} = getDaysInMonth(month, year);

    const changeMY = (m: number) => {
        if (m < 0) {
            setMonth(11);
            setYear(year - 1);
        } else if (m > 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(m);
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.img}/>
            <div className={styles.calendar}>
                <div className={styles.top}>
                    <div className={styles.month}>{monthName}</div>
                    {/*<button onClick={() => changeMY(month - 1)}>M&lt;&lt;</button>*/}
                    {/*<button onClick={() => changeMY(month + 1)}>M&gt;&gt;</button>*/}
                    {/*<button onClick={() => setYear(year - 1)}>Y&lt;&lt;</button>*/}
                    {/*<button onClick={() => setYear(year + 1)}>Y&gt;&gt;</button>*/}
                    <div className={styles.year}>{year}</div>
                </div>

                <div className={styles.days}>
                    {days.map((d, i) => {
                        const classes = [styles.day];
                        if (d.weekday === 0) classes.push(styles.sunday);
                        if (d.today) classes.push(styles.today);
                        if (d.out) classes.push(styles.out);
                        return (<div key={i} className={classes.join(' ')}>
                            <div className={styles.weekday}>{d.name}</div>
                            <div>{d.day}</div>
                        </div>)
                    })}
                </div>
                <blockquote className={styles.quote}>
                    <i>Don’t Let Stupid People Ruin Your Day</i>
                </blockquote>
            </div>
        </div>
    );
}

export default Calendar;