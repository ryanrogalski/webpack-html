// reverse strings
const test = "Ryan"

function revStr(str) {
  var newStr = '';

  for (let i = str.length-1;i>=0;i--){
    console.log(i);
    newStr += str[i]
  }

  return newStr
}

String.prototype.reverse = function() {
  return this.split('').reverse().join('');
}


function reverseString(str) {
  return str.split('').reverse().join('')
}

console.log(reverseString(name));


// fisher-yates
function FYshuffle(array) {
  var copy = [...array];
  var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = copy[m];
    copy[m] = copy[i];
    copy[i] = t;
  }

  return copy;
}

const myArray = [12, 24, 45, 67, 34]

console.log(
  `original array [${myArray}] shuffled array [${FYshuffle(myArray)}]`
)

// shuffle
const test = [1,2,3,4,5,6,7,8,9,10]

function shuffle(a) {
  for (let i in a){
    const r = Math.floor(Math.random()*i)
    const item = a[r]
    a[r] = a[i]
    a[i] = item;
  }
  return a;
}

// fizzbuzz
function fb(n) {
  for (let i = 1; i <= n; i++) { 
    let result = ''; 
    if (i % 3 === 0) { result += 'Fizz'; } 
    if (i % 5 === 0) { result += 'Buzz'; } 
    console.log(result || i); 
  }
}

// reverse digits of integer
var reverse = function(x) {
  var neg = false;
  
  if (x < 0) {
    x = Math.abs(x)
    neg = true;
  }

  var a = x.toString();
  var b = a.split('').reverse().join('');
  var c = Number(b)
  
  return neg ? -c : c;
  
};

console.log(reverse(-2092394823234231));

// intersection of arrays
const ar1 = [1,2,3,4,5,6,7]
const ar2 = [2,8,12,24,4]


function intersect(a, b) {
  const set = new Set(a)
  return [...new Set(b.filter(n => set.has(n)))]
}
console.log(intersect(ar1, ar2));

function intersect(a, b) {
  var out = []
  for (const i of a){
    for (const j of b){
      if (i === j) {
        out.push(i)
      }
    }
  }
  return out;
}


function intersect(a,b) {
  return a.filter(i => {
    return b.indexOf(i) !== -1;
  })
}

// find Single
function findSingle(nums) {
  nums.sort();

  for (var i = 0; i < nums.length; i += 2) {
    if (nums[i] != nums[i + 1]) {
      return nums[i];
    }
  }
}

const arr = [1, 2, 3, 4, 1, 2, 3]
console.log(findSingle(arr));


String.prototype.rev = function() {
  if (!this || this.length < 2) { return this; }

  return this.split('').reverse().join('');
}

function reverseWords(str) {
  return str.split(' ').reverse().join(' ')
}

function revInPlace(str) {
  return str.split(' ').reverse().join(' ').split('').reverse().join('');
}

const a = ' a   b'

function rev(str) {
  return str.split(' ').reverse().filter(v => v).join(' ');
}


function firstRepeat(str) {
  var len = str.length,
      char,
      charCount = {};

  for (var i = 0; i < len; i++) {
    char = str[i];

    if (charCount[char]) 
      charCount[char]++;
    else 
      charCount[char] = 1;
  }

  for (var j in charCount) {
    if (charCount[j] === 1)
      return j;
  }
}

function checkPalindrome(str) {
  return str === str.split('').reverse().join('');
}

// two sum
const test = [2,5,6,8]

function findSum(arr, sum) {
  for (const i of arr){
    for (const j of arr){
      if (i + j === sum) {
        console.log(`${i} + ${j} = ${sum}`);
        return true
      }
    }
  }
  return false;
}

// merge arrays
var arrays = [["$6"], ["$12"], ["$25"], ["$25"], ["$18"], ["$22"], ["$10"]];

// es5
var merged = [].concat.apply([], arrays);

// es6
const merged2 = [].concat(...arrays)

// swap array position by index array
const a = ["one", "two", "three", "four"]
const b = [3,1,2,4]

function arrIndex(a, b) {
  const temp = a.slice()
  
  for (let i=0;i<b.length;i++){
    a[i] = temp[b[i] - 1]
  }

  return a
}

function swap(arr, indexes) {
  return indexes.map(i => arr[i-1])
}


// flatten multi array
// recursive
const test = [1, [2, [ [3, 4], 5], 6]]

function flatten(arr) {
  const newArr = []

  arr.forEach(function loopArray(i){    
    // if (Array.isArray(i)) {
    if (i instanceof Array) {
      i.forEach(loopArray)
    } else {
      newArr.push(i)
    }
  })
  return newArr;
}

// iterative
function flatten(arr) {
  const res = []
  const todo = [arr]
  
  while (todo.length){
    let current = todo.shift();
    if (current instanceof Array) {
      todo.unshift.apply(todo, current)
    } else {
      res.push(current);
    }
  }

  return res;
}

function flatReduce(arr) {
  return arr.reduce((a, b) => {
    return a.concat(b instanceof Array ? flatReduce(b) : b);
  }, [])
}

// input timer
const input = document.querySelector('input')

let timeout = null

function inputTimer() {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    if (input.value) {
      console.log(`query api for "${input.value}"`)
    }
  }, 400)
}

input.addEventListener('keydown', () => inputTimer())

// add functions
const add = (a, b) => a + b;

console.log(add(2, 5));

const add2 = a => b => a + b;

console.log(add2(2)(5));

// fibonacci


function fib(n) {
  return (n <= 2) ? 1 : fib(n-1) + fib(n-2);
}


// memoization
function fib(n, m) {
  m = m || {};
  if (m[n]) return m[n]
  if (n <= 2) return 1
  return m[n] = fib(n - 1, m) + fib(n - 2, m);
}

// fancy 
function fib(n,a=1,b=0) {
 return (n===0) ? b : fib(n-1, a+b, a);
}


function printFib(n){
  const arr = [];
  
  for (let i=0;i<=n;i++){
    const n = fib(i)
    arr.push(n)
  }
  return arr;
}

console.log(printFib(20));

// es6 classes
class Friend {
  constructor(name, city) {
    this.name = name;
    this.city = city;
  }

  info(){
    return `${this.name} is from ${this.city}`
  }
}

class DevFriend extends Friend {
  constructor(name, city, lang) {
    super(name, city)
    this.lang = lang;
  }

  info(){
    return `${super.info()} and loves coding with ${this.lang}`
  }
}


const ryan = new Friend('Ryan', 'Hanover')
console.log(ryan.info());

const tim = new DevFriend('Tim', 'Northhampton', 'ruby')
console.log(tim.info());

// check prime number
function isPrime(n) {
  for (let i=2;i<n;i++){
    if (n % i === 0) {
      return false
    }
  }
  return n > 1;
}

console.log(isPrime(47));

// binary add
const a = 6..toString(2)
const b = 10..toString(2)

function addBinary(a, b) {
  const x = parseInt(a, 2);
  const y = parseInt(b, 2);
  const z = x + y;
  const res = z.toString(2)
  console.log(z, res);
  return res;
}

addBinary(a, b)

// find different char b/w two strings
var findTheDifference = function(s, t) {
  var result = t.charCodeAt(s.length);

  for (let i=0;i<s.length;i++){
    result ^= s.charCodeAt(i) ^ t.charCodeAt(i);
  }

  return String.fromCharCode(result);
};

console.log(findDiff('abcd','abcde'));


// find which items appear only once
const nums = [1, 2, 1, 3, 2, 5];

function singleNum(nums) {
  const map = {};
  for (const i of nums){
    if(!map[i]){
      map[i] = true;
    } else {
      delete map[i]
    }
  }

  const out = [];
  for (const j in map){
    out.push(+j)
  }
  return out;
}

singleNum(nums)


// dom traversal
<div>
  <div id="dom1">
    <div></div>
    <div></div>
    <div>
      <div>
        <div></div>
      </div>
      <div>
        <div id="node1">this is the node</div>
        <div></div>
      </div>
    </div>
    <div>
      <div></div>
    </div>
  </div>
  <div id="dom2">
    <div></div>
    <div></div>
    <div>
      <div>
        <div></div>
      </div>
      <div>
        <div>this is the other node</div>
        <div></div>
      </div>
    </div>
    <div>
      <div></div>
    </div>
  </div>
</div>

var tree1 = document.getElementById("dom1");
    tree2 = document.getElementById("dom2"),
    node = document.getElementById("node1");


NodeList.prototype.indexOf = function(item) {
  return Array.prototype.indexOf.call(this, item);
}

function getPath(node, root, arr) {
  const res = arr || [];

  if (node !== root) {
    const parent = node.parentNode;
    if (parent) {
      const index = parent.childNodes.indexOf(node);
      res.push(index);
      getPath(parent, root, res)
    }
  }
  return res;
}

// fancy reduce
// function getChild(root, path) {
//   return path.reduce((a, i) => root.childNodes[i]);
// }

function getChild(root, path) {
  let index = path.pop()
  let child = root.childNodes[index];

  return (path.length > 0) ? getChild(child, path) : child;
}


const paths = getPath(node, tree1)
const result = getChild(tree2, paths)
console.log(result);

// reverse singly linked NodeList
var test = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3
    }
  }
}

function revList(head) {
  let prev = null;
  let curr = head;
  while (curr){
    const temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }
  return prev;
}

console.log(revList(test));

// tiny clock 
const out = document.querySelector('.time')

function time() {
  const t = new Date();
  const h = t.getHours();
  const m = digits(t.getMinutes());
  const s = digits(t.getSeconds());
  out.innerHTML = `${h}:${m}:${s}`
  setInterval(() => time(), 500)
}

function digits(n) {
  if (n.toString().length < 2) {
    n = `0${n}`
  }
  return n;
}

const date = new Date()
console.info(date);

time()

// reverse vowels of a string 
function revVowels(s) {
  const vowels = 'aeiouAEIOU'
  const result = []
  const stripped = []

  for (const ch of s) {
    if (vowels.indexOf(ch) !== -1) {
      stripped.push(ch)
    }
  }

  let index = stripped.length - 1
  for (const ch of s) {
    if (vowels.indexOf(ch) !== -1) {
      result.push(stripped[index])
      index--
    } else {
      result.push(ch)
    }
  }

  return result.join('')
}

console.log(revVowels('hello'));

// pascal's triangle
function pasc(n, a = [[1]]) {  
  if (n < 2) return a

  let prev = a[a.length - 1]
  let cur = [1]

  for (let i=1; i < prev.length; i++){
    cur[i] = prev[i] + prev[i - 1]
  }

  cur.push(1)
  a.push(cur)

  return pasc(n - 1, a)

}

const tri = pasc(15)

function printTri(tri) {
  let str = ''

  for (i of tri) {
    str += `${i}</br>`
  }

  document.body.style.textAlign = 'center'
  document.body.innerHTML = str

}

printTri(tri)

// pascals triangle single array 
function pascalsTriangle(n) {
  const result = []
  let count = 0

  for (let i = 0; i < n; i++) {
    count = result.length - i;
    
    for (let j = 0; j < i + 1; j++) {
      (j === 0 || j === i) 
        ? result.push(1)
        : result.push(result[count + j] + result[count + j - 1])
    }
  }

  return result
}

// find duplicates in array 
const a = [1, 2, 3, 4, 8, 5, 6, 9, 1, 7, 8, 9]

function findDupes(a) {
  const dupes = [];
  const arr = a.sort()

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == arr[i + 1]) {
      dupes.push(arr[i])
    }
  }

  return dupes;
}

console.log(findDupes(a), a);

// add underscores to string
function addUnderscore(s) {
  const out = []

  for (const i of s){
    out.push(i,'_')
  }

  return out.slice(0, -1).join('')
}

console.log(addUnderscore('javascript'));

}


// add even numbers from array
const arr = [1,2,3,4,5,6]

function sumEven(n) {
  let res = 0;

  for (i of n){
    if (i%2===0) {
      res += i;
    }
  }

  return res;
}

sumEven(arr)


// sum of even numbers to target
function sum(n) {
  let res = 0;
  let out = [];

  for (let i=1;i<=n;i++){
    if (i%2===0){
      res += i;
      out.push(i)
    }
  }
  let result = out.join(' + ')
  result += ` = ${res}`

  console.log(result);
}

sum(10)


// remove elements of 2nd array from first array 
const arr1 = ['A', 'B', 'C', 'D', 'E', 'F'];
const arr2 = ['C', 'E', 'F']

function filterArr(a, b) {
  return a.filter(i => b.indexOf(i) === -1);
}

console.log(filterArr(arr1, arr2));

// invert tree 

const tree = {
  val: 4,
  left: {
    val: 2,
    left: {
      val: 1
    },
    right: {
      val: 3
    }
  },
  right: {
    val: 7,
    left: {
      val: 6
    },
    right: {
      val: 9
    }
  }
}


function invertTree(root) {
  if (root){
    const temp = root.left;
    root.left = invertTree(root.right)
    root.right = invertTree(temp)
  }

  return root;
};

const res = invertTree(tree)

console.log(res);

// return index of first non repeating char
const s = 'poiop'
function findChar(s) {
  for (var i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    if (s.indexOf(c) == i && s.indexOf(c, i+1) == -1) {
      return i;
    }
  }
  return -1;
}

console.log(findChar(s));

// return first non repeating char
const s = 'posooxosop'
function findChar(s) {
  const str = s.split('');
  for (i of s){
    const c = str.pop()
    if (str.indexOf(c) == -1) {
      return c;
    }
  }
}

// add digits in number once
function addDigits(number) {
  let res = 0;
  const num = number.toString().split('').map(i => Number(i))
  
  for (i of num) {
    res += i
  }
  return res;
}

console.log(addDigits(222));

// add digits in number until 1
function addDigits(num) {
  return ((num - 1) % 9 + 1);
}

console.log(addDigits(88));


// max depth of tree
const tree = {
  val: 4,
  left: {
    val: 2,
    left: {
      val: 1
    },
    right: {
      val: 3
    }
  },
  right: {
    val: 7,
    left: {
      val: 6
    },
    right: {
      val: 9
    }
  }
}

function maxDepth(root) {
  if (root === undefined || root === null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

console.log(maxDepth(tree));

// strip duplicates from array 
const arr = [1,2,3,4,3,2,1,5]

function stripDupes(a) {
  const out = [];
  for (i of a){
    if (out.indexOf(i) == -1) {
      out.push(i)
    }
  }
  return out;
}

stripDupes(arr)

// check different characters between a string
function palindromeScore(str) {
  let score = 0;
  let index = str.length;

  for (i of str){
    index--
    if (str[index] !== i){
      score++
    }
  }
  console.log(score);
  return score
}


palindromeScore('abba')
palindromeScore('abcdcaa') 
palindromeScore('abxlohhisouyba')


// find longest consecutive strings 
const s = ["it","wkppv","ixoyx", "3452", "zzzzzzzzzzzz"]

function longestConsec(strarr, k) {
  if( strarr.length==0 || k> strarr.length || k <1 ) return "";

  let lens = strarr.map( (_,i,arr) => arr.slice(i,i+k).join('').length )
  const i = lens.indexOf( Math.max(...lens) );

  return strarr.slice(i,i+k).join('')
}

longestConsec(s, 3)

// multiplicative persistence - returns # of 
// loops to multiply digits to finish
function persistence(num) {
  let count = 0;
  
  num = num.toString()

  while (num.length > 1){
    count++
    num = num.split('').reduce((a, b) => a*b).toString()
  }

  return count;
}

persistence(39)


// direction reduction
function dirReduc(arr){
  arr.forEach((_, i) => {
    if (arr[i] == 'NORTH' && arr[i+1] == 'SOUTH' || arr[i] == 'SOUTH' && arr[i+1] == 'NORTH') {
      arr.splice(i, 2)
      dirReduc(arr)
    }
    if (arr[i] == 'EAST' && arr[i+1] == 'WEST' || arr[i] == 'WEST' && arr[i+1] == 'EAST') {
      arr.splice(i, 2)
      dirReduc(arr)
    }
  })

  return arr;
}


// sudoku validator
const test = [
  [8, 2, 6,  3, 4, 7,  5, 9, 1],
  [7, 3, 5,  8, 1, 9,  6, 4, 2],
  [1, 9, 4,  2, 6, 5,  8, 7, 3],

  [3, 1, 7,  5, 8, 4,  2, 6, 9],
  [6, 5, 9,  1, 7, 2,  4, 3, 8],
  [4, 8, 2,  9, 3, 6,  7, 1, 5],

  [9, 4, 8,  7, 5, 1,  3, 2, 6],
  [5, 6, 1,  4, 2, 3,  9, 8, 7],
  [2, 7, 3,  6, 9, 8,  1, 5, 4]
]

function validArr(arr) {
  let ar = arr.slice()
  const numTest = ar.sort((a, b) => a - b).join('') === '123456789'
  const addTest = ar.reduce((a, b) => a + b, 0) == 45
  return numTest && addTest
}

function validateSudoku(board) {
  const row = [[],[],[],[],[],[],[],[],[]]
  const col = [[],[],[],[],[],[],[],[],[]]
  const grid = [[[],[],[]],[[],[],[]],[[],[],[]]]

  const len = board[0].length

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      row[i].push(board[i][j])
      col[j].push(board[i][j])
      grid[Math.floor(i/3)][Math.floor(j/3)].push(board[i][j])      
    }
  }

  for (const arr of grid){
    if (!arr.every(validArr)) return false
  }

  return (row.every(validArr) && col.every(validArr))  
}

console.log(validateSudoku(test));

// sum pairs 
function sumPairs(ints, s){
  var seen = {}
  for (i of ints) {
    if (seen[s - i]) {
      return [s - i, i];
    }
    seen[i] = true
  }
}

sumPairs([10,5,2,3,7,5], 10)

// max subarray kadane's algorithm
function maxSequence(arr) {
  let cur = 0;
  let max = 0;
  
  for (i of arr) {
    cur = Math.max(0, cur + i);
    max = Math.max(max, cur);
  }

  return max;
}

console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

// event delegation
div {
  border: 1px solid #ddd;
  padding: 20px;  
}

.wrap .color {
  background: #BBFCFF;
}

<div class="wrap">
  <div data-id="1">1</div>
  <div data-id="2">2</div>
  <div data-id="3">3</div>
</div>

const divs = [...document.querySelectorAll('div')]
const wrap = document.querySelector('.wrap')

wrap.addEventListener('click', e => clickWrap(e))

function clickWrap(e) {
  const el = e.srcElement
  if (el.parentNode == wrap) {
    el.classList.toggle('color')
  }
}