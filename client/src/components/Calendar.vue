<template>
  <v-row>
    <v-col>
      <div>5월</div>
      <v-sheet height="450">
        <v-calendar :now="today" :value="today" color="#FFFAEC">
          <template v-slot:day="{ date }">
            <v-row class="fill-height">
              <template>
                <v-sheet
                  v-for="i in tracked[date]"
                  :key="i"
                  :color="i"
                  width="100%"
                  height="100%"
                  tile
                  >{{ i }}</v-sheet
                >
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

<style>
</style>