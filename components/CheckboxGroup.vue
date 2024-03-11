<script setup lang="ts">
const props = defineProps<{
  options: {
    label: string
    value: string
  }[]
  value: string[]
}>()

const emits = defineEmits(['update:value'])

const selected = ref<Record<string, boolean>>({})

props.options.forEach((item) => {
  selected.value[item.value] = false
})

watch(() => props.value, (val) => {
  val.forEach((item) => {
    selected.value[item] = true
  })
}, {
  immediate: true,
})

watch(selected, (val) => {
  emits('update:value', Object.entries(val).filter(item => item[1]).map(item => item[0]))
}, {
  deep: true,
})
</script>

<template>
  <div>
    <UCheckbox v-for="option in options" :key="option.value" v-model="selected[option.value]" :disabled="!value.includes(option.value) && value.length >= 3" :label="option.label">
      <template #label>
        <span class="text-gray-500 font-[400]">{{ option.label }}</span>
      </template>
    </UCheckbox>
  </div>
</template>
