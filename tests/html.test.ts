import { describe, expect, it } from 'vitest'
import templateMeta from './fixtures/templateMeta'
import { generateSvg } from '~/server/core/render/template/svg'

describe('template', () => {
  it('template', async () => {
    expect(generateSvg(templateMeta)).toMatchSnapshot()
  })
})
