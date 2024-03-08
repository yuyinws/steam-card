import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { describe, expect, it } from 'vitest'
import { crawler } from 'server/core/logic/crawler'

describe('crawler', () => {
  it('crawler', async () => {
    const html = await readFile(join(cwd(), 'tests', 'fixtures', 'profile.html'), 'utf-8')

    expect(crawler(html)).toMatchSnapshot()
  })
})
