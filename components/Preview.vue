<script setup lang="ts">
import { POSITION, useToast } from 'vue-toastification'
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

const toast = useToast()
const { t } = useI18n()

const referenceList = computed(() => {
  return [
    {
      type: 'BBCode',
      url: `[img]${window.location.origin}${props.steamcardUrl}[/img]`,
    },
    {
      type: 'Html',
      url: `<img width="400" height="140" src="${window.location.origin}${props.steamcardUrl}">`,
    },
    {
      type: 'Markdown',
      url: `![Steam Card](${window.location.origin}${props.steamcardUrl})`,
    },
  ]
})

async function copyUrl(url: string) {
  try {
    await navigator.clipboard.writeText(url)
    toast.success(t('copy-success'),
      {
        timeout: 2000,
        position: POSITION.TOP_CENTER,
      })
  }
  catch (error) {
    toast.error(t('copy-failed'),
      {
        timeout: 2000,
        position: POSITION.TOP_CENTER,
      })
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
      <div v-for="(item, index) in referenceList" :key="index" cursor-pointer relative pt-20px pb-10px px-10px rounded shadow-sm b-1 w-full>
        <div text-gray-300 text-sm absolute top-3px right-5px>
          {{ item.type }}
        </div>
        <div text-center break-all text-sm @click="copyUrl(item.url)">
          {{ item.url }}
        </div>
      </div>
    </div>
  </div>
</template>
