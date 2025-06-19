// 1. Two Sum - Easy
const twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};
// const nums = [4, 4];
// const target = 8
// const result = twoSum(nums, target);
// console.log(result); // Output: [0, 1]

// Add Two Numbers - Medium

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

var addTwoNumbers = function (l1, l2) {
  let dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    let val1 = l1 ? l1.val : 0;
    let val2 = l2 ? l2.val : 0;
    let sum = val1 + val2;
    current.next = new ListNode(sum % 10);
    current = current.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummyHead.next;
};

function arrayToLinkedList(arr) {
  let dummyHead = new ListNode(0);
  let current = dummyHead;
  for (let num of arr) {
    current.next = new ListNode(num);
    current = current.next;
  }
  return dummyHead.next;
}

function linkedListToArray(head) {
  let arr = [];
  while (head !== null) {
    arr.push(head.val);
    head = head.next;
  }
  return arr;
}

// const l1 = arrayToLinkedList([1, 2, 5])
// const l2 = arrayToLinkedList([3, 2, 1])

// const result = addTwoNumbers(l1, l2);
// console.log(result);

// 10. Regular Expression Matching
// Hard
// Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

// '.' Matches any single character.​​​​
// '*' Matches zero or more of the preceding element.
// The matching should cover the entire input string (not partial).

// Example 1:

// Input: s = "aa", p = "a"
// Output: false
// Explanation: "a" does not match the entire string "aa".
// Example 2:

// Input: s = "aa", p = "a*"
// Output: true
// Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
// Example 3:

// Input: s = "ab", p = ".*"
// Output: true
// Explanation: ".*" means "zero or more (*) of any character (.)".

// function isMatch (s, p){
// if(s.length <= p.length){
//     let a
//     for(let i = 0; i<p.length; i++){
//         if(s[i] == p[i] || s[i] == '.' || s[i] == '*' ){
//             a = true
//         }
//         else {
//             a = false;
//             break
//         }
//     }
//     return a
// }
// else return false
// }

s = "aaa";
p = "a.*";

function isMatch(s, p) {
  const m = s.length;
  const n = p.length;

  // Initialize dp array
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  dp[0][0] = true; // empty string matches empty pattern

  // Fill dp[0][j] for patterns like a*, a*b*, a*b*c* matching empty string
  for (let j = 2; j <= n; j++) {
    if (p[j - 1] === "*" && dp[0][j - 2]) {
      dp[0][j] = true;
      console.log(dp, "fill")
    }
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        console.log(dp[i][j], ".");
        console.log(dp);
      } else if (p[j - 1] === "*") {
        // zero occurrences of the char before '*'
        dp[i][j] = dp[i][j - 2];
        console.log(dp[i][j], "*");
        console.log(dp);

        // one or more occurrences if preceding char matches
        if (p[j - 2] === "." || p[j - 2] === s[i - 1]) {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
          console.log(dp[i][j], "1");
          console.log(dp);
        }
      }
    }
  }

  return dp[m][n];
}

console.log(isMatch(s, p));
