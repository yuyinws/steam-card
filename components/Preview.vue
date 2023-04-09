<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Atropos from 'atropos/vue'

const props = defineProps({
  steamcardUrl: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:loading'])

const origin = __ORIGIN__ || window.location.origin

const { $toast } = useNuxtApp()
const { t } = useI18n()

const referenceList = computed(() => {
  return [
    {
      type: 'BBCode',
      url: `[img]${origin}${props.steamcardUrl}[/img]`,
    },
    {
      type: 'Html',
      url: `<img width="400" height="140" src="${origin}${props.steamcardUrl}">`,
    },
    {
      type: 'Markdown',
      url: `![Steam Card](${origin}${props.steamcardUrl})`,
    },
  ]
})

async function copyUrl(url: string) {
  try {
    await navigator.clipboard.writeText(url)
    $toast.success(t('copy-success'))
  }
  catch (error) {
    $toast.error(t('copy-failed'))
  }
}

function openImgPage() {
  window.open(props.steamcardUrl, '_blank')
}
</script>

<template>
  <div w="400px" p-10px>
    <div flex="~ col" gap-10px items-center>
      <div text="center xl" font-bold>
        {{ $t('preview') }}
      </div>
      <div v-show="!loading" w-380px shadow-xl>
        <Atropos :shadow="false">
          <img
            cursor-pointer
            :src="steamcardUrl"
            alt="steamCard"
            srcset=""
            @click="openImgPage"
            @load="emits('update:loading', false)"
          >
        </Atropos>
      </div>
      <div v-show="loading" w-380px h-150px b-1 text-center leading-150px b-rd-5px>
        {{ $t('loading') }}
      </div>
      <div v-for="(item, index) in referenceList" :key="index" cursor-pointer relative pt-20px pb-10px px-10px rounded shadow-sm b-1 w-full @click="copyUrl(item.url)">
        <div text-gray-300 text-sm absolute top-3px right-5px>
          {{ item.type }}
        </div>
        <div text-center break-all text-sm>
          {{ item.url }}
        </div>
      </div>
    </div>
  </div>
</template>
