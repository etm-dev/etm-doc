<template>
  <div>
    <sui-modal open="open">
      <sui-modal-header>{{ title }}</sui-modal-header>
      <sui-modal-content >
        <p v-html="content"></p>
      </sui-modal-content >
      <sui-modal-actions>
        <sui-button @click="$close(yes)">{{ yes }}</sui-button>
        <sui-button @click="$close(no)">{{ no }}</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
export default {
  date: function () {
    return { open: true }
  },
  props: {
    title: String,
    content: String,
    yes: {
      type: String,
      default: 'Yes'
    },
    no: {
      type: String,
      default: 'No'
    }
  }
}
</script>

<style scoped>
.modal {
  min-width: 50%;
  max-width: 80%;
  min-height: 50%;
  max-width: 70%;
}
</style>
