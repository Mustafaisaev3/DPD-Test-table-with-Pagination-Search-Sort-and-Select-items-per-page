<template>
  <button
    :class="[
      'button',
      `button__${variant}`,
      { 'button__disabled': disabled },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
      <slot name="left-icon"></slot>
      <slot></slot>
      <slot name="right-icon"></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
      ].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  // Базовые стили для button
  font-size: 14px;
  padding: 10px 15px;
  height: 35px;
  border-radius: 5px;
  font-family: MyriadPro;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 5px;
  letter-spacing: normal;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  gap: 7px;

  &__disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  // Определяем стили для каждого варианта button
  &__primary {
    background-color: #2f8cff;
    color: #fff;

    &:hover {
      background-color: darken(#2f8cff, 10%);
    }
  }

  &__secondary {
    background-color: #FFA000;
    color: #fff;

    &:hover {
      background-color: darken(#FFA000, 10%);
    }
  }

  &__primary-transparent {
    background-color: rgba(#2196F3, 8%);
    color: #2196F3;

    &:hover {
      background-color: rgba(#2196F3, 20%);
    }
  }

  &__secondary-transparent {
    background-color: rgba(#FFA000, 8%);
    color: #FFA000;

    &:hover {
      background-color: rgba(#FFA000, 20%);
    }
  }

  &__success {
    background-color: #4caf50;
    color: #fff;

    &:hover {
      background-color: darken(#4caf50, 10%);
    }
  }

  &__danger {
    background-color: #f44336;
    color: #fff;

    &:hover {
      background-color: darken(#f44336, 10%);
    }
  }

  &__warning {
    background-color: #ffeb3b;
    color: #000;

    &:hover {
      background-color: darken(#ffeb3b, 10%);
    }
  }
}
</style>