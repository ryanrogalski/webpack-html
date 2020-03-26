function removeDuplicates(nums) {
  if (nums.length === 0) return 0

  let i = 0

  for (j = 0; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      console.log(nums[j], nums[i], i, j)

      i++
      nums[i] = nums[j]
    }
  }

  // return i + 1
  return nums
}

console.log(
  removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]),
)
