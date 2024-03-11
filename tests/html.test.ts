import { describe, expect, it } from 'vitest'
import templateMeta from './fixtures/templateMeta'
import { renderTemplate } from '~/server/core/render/template'

describe('template', () => {
  it('template', async () => {
    expect(await renderTemplate(templateMeta)).toMatchSnapshot()
  })
})
