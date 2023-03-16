import {test, expect} from '@jest/globals'
import {formatTitle} from '../title'

const example1 = {
  format: '[ticket]: description',
  ticket: 'xxx-123',
  description: 'This is a description'
}

const example2 = {
  format: 'prefix(ticket): description',
  prefix: 'feat',
  ticket: 'xxx-123',
  description: 'This is a description'
}

const example3 = {
  format: 'ticket - prefix - description',
  prefix: 'feat',
  ticket: 'xxx-123',
  description: 'This is a description'
}

const example4 = {
  format: 'prefix -- ticket - description',
  prefix: 'feat',
  ticket: 'xxx-123',
  description: 'This is a description'
}

test('should format a title given a specific format', () => {
  expect(formatTitle(example1)).toBe('[xxx-123]: This is a description')
  expect(formatTitle(example2)).toBe('feat(xxx-123): This is a description')
  expect(formatTitle(example3)).toBe('xxx-123 - feat - This is a description')
  expect(formatTitle(example4)).toBe('feat -- xxx-123 - This is a description')
})
