<template>
  <v-form v-model="valid">
    <v-text-field
      label="Name"
      v-model="video.name"
      hint="Video title"
      counter="255"
      :rules="[required('name'), minLength('Name', 5), maxLenght('Name', 255)]"
    ></v-text-field>
    <v-textarea
      label="Description"
      v-model="video.description"
      rows="2"
      auto-grow
      counter="1000"
      hint="Description can be long"
      :rules="[required('Description'), minLength('Description', 10)]"
    ></v-textarea>
    <v-text-field
      label="Thumbnail Url"
      v-model="video.thumbnail"
      hint="Url of the video thumbnail"
      :rules="[required('Video Thumbnail')]"
    ></v-text-field>
    <v-text-field
      label="Video Url"
      v-model="video.video_url"
      hint="Url of the video"
      :rules="[required('Video Url')]"
    ></v-text-field>
    <v-btn
      type="submit"
      color="primary"
      @click.prevent="saveVideo"
      :disabled="!valid"
      >{{buttonText}}</v-btn
    >
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      required(propertyType) {
        return (v) =>
          (v && v.length > 0) || `This ${propertyType} field is required`;
      },
      minLength(propertyType, length) {
        return (v) =>
          (v && v.length >= length) ||
          `${propertyType} must be at least ${length} Characters`;
      },
      maxLenght(propertyType, length) {
        return (v) =>
          (v && v.length <= length) ||
          `${propertyType} must be less than ${length} Characters`;
      }
    };
  },
  props: {
    video: {
      type: Object,
      required: true
    },
    buttonText: {
      type: String,
      required: false,
      default: "Submit"
    },
    saveVideo: {
      required: true
    }
  }
};
</script>

<style></style>
