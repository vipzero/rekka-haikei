import { range } from './index'

describe('range function', () => {
	it('should generate a range of numbers from start to end', () => {
		expect(range(5)).toEqual([0, 1, 2, 3, 4])
	})

	it('should return an empty array if start is less than end and step is negative', () => {
		expect(range(-1)).toEqual([])
	})
})
