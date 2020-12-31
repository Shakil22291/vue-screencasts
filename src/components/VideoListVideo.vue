<template>
  <v-card
    width="340px"
    min-height="350px"
    class="ma-2"
    hover
    :to="{ name: 'video-watch', params: { id: video.id } }"
  >
    <v-img height="200" :src="video.thumbnail" :alt="video.name"></v-img>
    <div>
      <v-card-title>{{ video.name }}</v-card-title>
      <v-card-actions>
        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn
            color="primary lighten-1"
            class="mr-2"
            small
            @mousedown.stop
            :to="{ name: 'tag', params: { id: tag_id } }"
          >
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getTag"])
  }
};
</script>

<style scoped lang="scss">
// .video-box {
//   border: 1px solid black;
//   border-radius: 10px;
//   margin: 10px;
//   padding: 10px;
//   text-align: left;
//   display: flex;
//   justify-content: flex-start;
//   img {
//     width: 200px;
//     padding: 10px;
//   }
// }
</style>
