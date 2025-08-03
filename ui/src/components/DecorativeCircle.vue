<template>
  <div
    :style="{
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      backgroundColor: color,
      borderRadius: '50%',
      top,
      left,
      right,
      bottom,
      zIndex: 0,
      opacity
    }"
  ></div>
</template>

<script>
export default {
  name: "DecorativeCircle",
  props: {
    size: { type: [Number, String], default: 120 },
    color: { type: String, default: 'red' },
    top: { type: String, default: null },
    left: { type: String, default: null },
    right: { type: String, default: null },
    bottom: { type: String, default: null },
    opacity: { type: Number, default: 1 }
  }
}
</script>
