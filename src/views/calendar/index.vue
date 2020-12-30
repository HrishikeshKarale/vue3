// https://github.com/jsbroks/vuex-typescript-calendar
<template>
  <div class="calendar">
    <div class="month">
      <span class="fas fa-angle-left" @click="pager(0)" />
      <b
        >{{ monthNames[month] }}
        <div>
          <span
            v-for="(m, index) in monthNames"
            :key="m"
            v-text="m"
            :class="{ selected: index === month }"
            @click="month = index"
          />
        </div>
      </b>
      <span class="fas fa-angle-right" @click="pager(1)" />
    </div>
    <div class="year">
      <span class="fas fa-angle-left" @click="year--" />
      <b>
        {{ year }}
        <div>
          <span
            v-for="y in 12"
            :key="year + y - 5"
            v-text="year + y - 5"
            :class="{ selected: year + y - 5 === year }"
            @click="year = year + y - 5"
          />
        </div>
      </b>
      <span class="fas fa-angle-right" @click="year++" />
    </div>
    <div class="week">
      <b v-for="d in week" :key="d" v-text="d" />
    </div>
    <div class="days">
      <div
        v-for="(d, index) in Math.ceil(
          (daysInMonth(month, year) + startDay(month, year)) / 7
        ) * 7"
        :key="d"
        :class="{
          day: true,
          pre: index < startDay(month, year),
          nxt: index >= daysInMonth(month, year) + startDay(month, year),
          today:
            today.month == month &&
            today.year == year &&
            index == startDay(month, year) - 1 + day
        }"
      >
        {{
          d - startDay(month, year) > 0 // date > current month?
            ? d - startDay(month, year) - daysInMonth(month, year) > 0 //date > month
              ? d - startDay(month, year) - daysInMonth(month, year) //print next month date
              : d - startDay(month, year) //print current month date
            : daysInMonth(month - 1) -
              startDay(month, year) +
              d /*previous month dates*/
        }}
        <!-- {{ daysInMonth(month + 1) }} -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

interface Date {
  day: number;
  month: number;
  year: number;
}

export default defineComponent({
  name: "calendar",

  setup() {
    //something here
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const today = computed(() => {
      return {
        date: new Date(),
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
      };
    });

    const day = ref(today.value.day);
    const month = ref(today.value.month);
    const year = ref(today.value.year);

    const pager = (next: boolean) => {
      if (next) {
        if (month.value != 11) {
          month.value++;
        } else {
          month.value = 0;
          year.value++;
        }
      } else {
        if (month.value != 0) {
          month.value--;
        } else {
          month.value = 11;
          year.value--;
        }
      }
    };

    const daysInMonth = (mm = month.value, yyyy = year.value, start = 0) => {
      //return last date since start = 0; returns first date if start = 1
      return new Date(yyyy, mm + 1, start).getDate();
    };

    const startDay = (mm = month.value, yyyy = year.value, start = 0) => {
      //return start day
      //add 1 to convert index to days
      return new Date(yyyy, mm, start).getDay() + 1 == 7
        ? 0
        : new Date(yyyy, mm, start).getDay() + 1;
    };

    return {
      week,
      monthNames,
      daysInMonth,
      startDay,
      today,
      month,
      year,
      day,
      pager
    };
  }
});
</script>
<style lang="less">
@import (reference) "../../less/customVariables.less";
@import (reference) "../../less/customMixins.less";
.calendar {
  display: grid;
  & > div {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(1fr);
    gap: 8px;
    &.month,
    &.year {
      & > span,
      & > b {
        cursor: pointer;
      }
      & > b {
        position: relative;
        & > div {
          display: none;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: 4px;
          background-color: #ccc;
          border-radius: 4px;
          padding: 16px;
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 100;
          & > span {
            padding: 4px 8px;
            &.selected {
              background-color: @secondaryColor;
            }
          }
        }
        &:hover {
          & > div {
            display: grid;
          }
        }
      }
    }
    &.week {
      background-color: #eee;
    }
    & > b {
      padding: 16px;
    }
    &.days {
      & > div {
        display: grid;
        place-items: center;
        &.day {
          height: 80px;
          width: 100%;
          background-color: #aaa;
          &.pre,
          &.nxt {
            opacity: 0.2;
          }
          &.today {
            background-color: @secondaryColor;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
