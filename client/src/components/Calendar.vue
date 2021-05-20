<template>
  <v-row>
    <v-col>
      <div class="month">{{ grassInfo.title }}</div>
      <v-sheet height="450">
        <v-calendar :now="today" :value="grassInfo.today" color="#ffe497">
          <template v-slot:day="{ past, date }">
            <v-row class="fill-height">
              <template v-if="past">
                <v-sheet
                  v-for="val in grassInfo.info[date]"
                  :key="val"
                  :color="val"
                  width="100%"
                  height="100%"
                  tile
                ></v-sheet>
              </template>
            </v-row>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Calendar",
  props: {
    grassInfo: Object,
  },
  data() {
    return {
      today: "2021-05-19",
      Month: {
        "2021-03": [
          100,
          100,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
        ],
      },
      tracked: {
        "2021-05-28": ["#1867c0"],
        "2021-05-08": ["#fb8c00"],
        "2021-05-07": ["#000000"],
      },
      colors: ["#1867c0", "#fb8c00", "#000000"],
    };
  },
};
</script>

<style scoped>
.month {
  font-size: 100%;
  font-weight: 600;
  margin: 2% 0 2% 0;
}
</style>