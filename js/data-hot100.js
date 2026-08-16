'use strict';

/*
 * Source: https://leetcode.cn/studyplan/top-100-liked/
 * Snapshot from the public Chinese-site GraphQL studyPlanV2Detail query.
 * `order` is the global plan position; each section preserves official inner order.
 */
const HOT100_SOURCE={
  name:'LeetCode 热题 100',
  planSlug:'top-100-liked',
  url:'https://leetcode.cn/studyplan/top-100-liked/',
  sections:17,
  questions:100
};

const HOT100_SECTIONS=[
  {id:'top-100-liked-80-r32o',order:1,name:'哈希',questions:[
    {order:1,lc:1,title:'两数之和',slug:'two-sum',difficulty:'EASY'},
    {order:2,lc:49,title:'字母异位词分组',slug:'group-anagrams',difficulty:'MEDIUM'},
    {order:3,lc:128,title:'最长连续序列',slug:'longest-consecutive-sequence',difficulty:'MEDIUM'}
  ]},
  {id:'top-100-liked-81-kor1',order:2,name:'双指针',questions:[
    {order:4,lc:283,title:'移动零',slug:'move-zeroes',difficulty:'EASY'},
    {order:5,lc:11,title:'盛最多水的容器',slug:'container-with-most-water',difficulty:'MEDIUM'},
    {order:6,lc:15,title:'三数之和',slug:'3sum',difficulty:'MEDIUM'},
    {order:7,lc:42,title:'接雨水',slug:'trapping-rain-water',difficulty:'HARD'}
  ]},
  {id:'top-100-liked-82-i464',order:3,name:'滑动窗口',questions:[
    {order:8,lc:3,title:'无重复字符的最长子串',slug:'longest-substring-without-repeating-characters',difficulty:'MEDIUM'},
    {order:9,lc:438,title:'找到字符串中所有字母异位词',slug:'find-all-anagrams-in-a-string',difficulty:'MEDIUM'}
  ]},
  {id:'top-100-liked-83-shuv',order:4,name:'子串',questions:[
    {order:10,lc:560,title:'和为 K 的子数组',slug:'subarray-sum-equals-k',difficulty:'MEDIUM'},
    {order:11,lc:239,title:'滑动窗口最大值',slug:'sliding-window-maximum',difficulty:'HARD'},
    {order:12,lc:76,title:'最小覆盖子串',slug:'minimum-window-substring',difficulty:'HARD'}
  ]},
  {id:'top-100-liked-84-4cqv',order:5,name:'普通数组',questions:[
    {order:13,lc:53,title:'最大子数组和',slug:'maximum-subarray',difficulty:'MEDIUM'},
    {order:14,lc:56,title:'合并区间',slug:'merge-intervals',difficulty:'MEDIUM'},
    {order:15,lc:189,title:'轮转数组',slug:'rotate-array',difficulty:'MEDIUM'},
    {order:16,lc:238,title:'除了自身以外数组的乘积',slug:'product-of-array-except-self',difficulty:'MEDIUM'},
    {order:17,lc:41,title:'缺失的第一个正数',slug:'first-missing-positive',difficulty:'HARD'}
  ]},
  {id:'top-100-liked-85-8wlm',order:6,name:'矩阵',questions:[
    {order:18,lc:73,title:'矩阵置零',slug:'set-matrix-zeroes',difficulty:'MEDIUM'},
    {order:19,lc:54,title:'螺旋矩阵',slug:'spiral-matrix',difficulty:'MEDIUM'},
    {order:20,lc:48,title:'旋转图像',slug:'rotate-image',difficulty:'MEDIUM'},
    {order:21,lc:240,title:'搜索二维矩阵 II',slug:'search-a-2d-matrix-ii',difficulty:'MEDIUM'}
  ]},
  {id:'top-100-liked-86-vpsb',order:7,name:'链表',questions:[
    {order:22,lc:160,title:'相交链表',slug:'intersection-of-two-linked-lists',difficulty:'EASY'},
    {order:23,lc:206,title:'反转链表',slug:'reverse-linked-list',difficulty:'EASY'},
    {order:24,lc:234,title:'回文链表',slug:'palindrome-linked-list',difficulty:'EASY'},
    {order:25,lc:141,title:'环形链表',slug:'linked-list-cycle',difficulty:'EASY'},
    {order:26,lc:142,title:'环形链表 II',slug:'linked-list-cycle-ii',difficulty:'MEDIUM'},
    {order:27,lc:21,title:'合并两个有序链表',slug:'merge-two-sorted-lists',difficulty:'EASY'},
    {order:28,lc:2,title:'两数相加',slug:'add-two-numbers',difficulty:'MEDIUM'},
    {order:29,lc:19,title:'删除链表的倒数第 N 个结点',slug:'remove-nth-node-from-end-of-list',difficulty:'MEDIUM'},
    {order:30,lc:24,title:'两两交换链表中的节点',slug:'swap-nodes-in-pairs',difficulty:'MEDIUM'},
    {order:31,lc:25,title:'K 个一组翻转链表',slug:'reverse-nodes-in-k-group',difficulty:'HARD'},
    {order:32,lc:138,title:'随机链表的复制',slug:'copy-list-with-random-pointer',difficulty:'MEDIUM'},
    {order:33,lc:148,title:'排序链表',slug:'sort-list',difficulty:'MEDIUM'},
    {order:34,lc:23,title:'合并 K 个升序链表',slug:'merge-k-sorted-lists',difficulty:'HARD'},
    {order:35,lc:146,title:'LRU 缓存',slug:'lru-cache',difficulty:'MEDIUM'}
  ]},
  {id:'top-100-liked-87-nx50',order:8,name:'二叉树',questions:[
    {order:36,lc:94,title:'二叉树的中序遍历',slug:'binary-tree-inorder-traversal',difficulty:'EASY'},
    {order:37,lc:104,title:'二叉树的最大深度',slug:'maximum-depth-of-binary-tree',difficulty:'EASY'},
    {order:38,lc:226,title:'翻转二叉树',slug:'invert-binary-tree',difficulty:'EASY'},
    {order:39,lc:101,title:'对称二叉树',slug:'symmetric-tree',difficulty:'EASY'},
    {order:40,lc:543,title:'二叉树的直径',slug:'diameter-of-binary-tree',difficulty:'EASY'},
    {order:41,lc:102,title:'二叉树的层序遍历',slug:'binary-tree-level-order-traversal',difficulty:'MEDIUM'},
    {order:42,lc:108,title:'将有序数组转换为二叉搜索树',slug:'convert-sorted-array-to-binary-search-tree',difficulty:'EASY'},
    {order:43,lc:98,title:'验证二叉搜索树',slug:'validate-binary-search-tree',difficulty:'MEDIUM'},
    {order:44,lc:230,title:'二叉搜索树中第 K 小的元素',slug:'kth-smallest-element-in-a-bst',difficulty:'MEDIUM'},
    {order:45,lc:199,title:'二叉树的右视图',slug:'binary-tree-right-side-view',difficulty:'MEDIUM'},
    {order:46,lc:114,title:'二叉树展开为链表',slug:'flatten-binary-tree-to-linked-list',difficulty:'MEDIUM'},
    {order:47,lc:105,title:'从前序与中序遍历序列构造二叉树',slug:'construct-binary-tree-from-preorder-and-inorder-traversal',difficulty:'MEDIUM'},
    {order:48,lc:437,title:'路径总和 III',slug:'path-sum-iii',difficulty:'MEDIUM'},
    {order:49,lc:236,title:'二叉树的最近公共祖先',slug:'lowest-common-ancestor-of-a-binary-tree',difficulty:'MEDIUM'},
    {order:50,lc:124,title:'二叉树中的最大路径和',slug:'binary-tree-maximum-path-sum',difficulty:'HARD'}
  ]},
  {id:'top-100-liked-88-xwhw',order:9,name:'图论',questions:[
    {order:51,lc:200,title:'岛屿数量',slug:'number-of-islands',difficulty:'MEDIUM'},
    {order:52,lc:994,title:'腐烂的橘子',slug:'rotting-oranges',difficulty:'MEDIUM'},
    {order:53,lc:207,title:'课程表',slug:'course-schedule',difficulty:'MEDIUM'},
    {order:54,lc:208,title:'实现 Trie (前缀树)',slug:'implement-trie-prefix-tree',difficulty:'MEDIUM'}
  ]},
  {id:'top-100-liked-89-8b90',order:10,name:'回溯',questions:[
    {order:55,lc:46,title:'全排列',slug:'permutations',difficulty:'MEDIUM'},
    {order:56,lc:78,title:'子集',slug:'subsets',difficulty:'MEDIUM'},
    {order:57,lc:17,title:'电话号码的字母组合',slug:'letter-combinations-of-a-phone-number',difficulty:'MEDIUM'},
    {order:58,lc:39,title:'组合总和',slug:'combination-sum',difficulty:'MEDIUM'},
    {order:59,lc:22,title:'括号生成',slug:'generate-parentheses',difficulty:'MEDIUM'},
    {order:60,lc:79,title:'单词搜索',slug:'word-search',difficulty:'MEDIUM'},
    {order:61,lc:131,title:'分割回文串',slug:'palindrome-partitioning',difficulty:'MEDIUM'},
    {order:62,lc:51,title:'N 皇后',slug:'n-queens',difficulty:'HARD'}
  ]},
  {id:'top-100-liked-90-eorx',order:11,name:'二分查找',questions:[
    {order:63,lc:35,title:'搜索插入位置',slug:'search-insert-position',difficulty:'EASY'},
    {order:64,lc:74,title:'搜索二维矩阵',slug:'search-a-2d-matrix',difficulty:'MEDIUM'},
    {order:65,lc:34,title:'在排序数组中查找元素的第一个和最后一个位置',slug:'find-first-and-last-position-of-element-in-sorted-array',difficulty:'MEDIUM'},
    {order:66,lc:33,title:'搜索旋转排序数组',slug:'search-in-rotated-sorted-array',difficulty:'MEDIUM'},
    {order:67,lc:153,title:'寻找旋转排序数组中的最小值',slug:'find-minimum-in-rotated-sorted-array',difficulty:'MEDIUM'},
    {order:68,lc:4,title:'寻找两个正序数组的中位数',slug:'median-of-two-sorted-arrays',difficulty:'HARD'}
  ]},
  {id:'top-100-liked-91-0mdi',order:12,name:'栈',questions:[
    {order:69,lc:20,title:'有效的括号',slug:'valid-parentheses',difficulty:'EASY'},
    {order:70,lc:155,title:'最小栈',slug:'min-stack',difficulty:'MEDIUM'},
    {order:71,lc:394,title:'字符串解码',slug:'decode-string',difficulty:'MEDIUM'},
    {order:72,lc:739,title:'每日温度',slug:'daily-temperatures',difficulty:'MEDIUM'},
    {order:73,lc:84,title:'柱状图中最大的矩形',slug:'largest-rectangle-in-histogram',difficulty:'HARD'}
  ]},
  {id:'top-100-liked-92-lutp',order:13,name:'堆',questions:[
    {order:74,lc:215,title:'数组中的第K个最大元素',slug:'kth-largest-element-in-an-array',difficulty:'MEDIUM'},
    {order:75,lc:347,title:'前 K 个高频元素',slug:'top-k-frequent-elements',difficulty:'MEDIUM'},
    {order:76,lc:295,title:'数据流的中位数',slug:'find-median-from-data-stream',difficulty:'HARD'}
  ]},
  {id:'top-100-liked-93-mcze',order:14,name:'贪心算法',questions:[
    {order:77,lc:121,title:'买卖股票的最佳时机',slug:'best-time-to-buy-and-sell-stock',difficulty:'EASY'},
    {order:78,lc:55,title:'跳跃游戏',slug:'jump-game',difficulty:'MEDIUM'},
    {order:79,lc:45,title:'跳跃游戏 II',slug:'jump-game-ii',difficulty:'MEDIUM'},
    {order:80,lc:763,title:'划分字母区间',slug:'partition-labels',difficulty:'MEDIUM'}
  ]},
  {id:'top-100-liked-94-c8ic',order:15,name:'动态规划',questions:[
    {order:81,lc:70,title:'爬楼梯',slug:'climbing-stairs',difficulty:'EASY'},
    {order:82,lc:118,title:'杨辉三角',slug:'pascals-triangle',difficulty:'EASY'},
    {order:83,lc:198,title:'打家劫舍',slug:'house-robber',difficulty:'MEDIUM'},
    {order:84,lc:279,title:'完全平方数',slug:'perfect-squares',difficulty:'MEDIUM'},
    {order:85,lc:322,title:'零钱兑换',slug:'coin-change',difficulty:'MEDIUM'},
    {order:86,lc:139,title:'单词拆分',slug:'word-break',difficulty:'MEDIUM'},
    {order:87,lc:300,title:'最长递增子序列',slug:'longest-increasing-subsequence',difficulty:'MEDIUM'},
    {order:88,lc:152,title:'乘积最大子数组',slug:'maximum-product-subarray',difficulty:'MEDIUM'},
    {order:89,lc:416,title:'分割等和子集',slug:'partition-equal-subset-sum',difficulty:'MEDIUM'},
    {order:90,lc:32,title:'最长有效括号',slug:'longest-valid-parentheses',difficulty:'HARD'}
  ]},
  {id:'top-100-liked-95-u30r',order:16,name:'多维动态规划',questions:[
    {order:91,lc:62,title:'不同路径',slug:'unique-paths',difficulty:'MEDIUM'},
    {order:92,lc:64,title:'最小路径和',slug:'minimum-path-sum',difficulty:'MEDIUM'},
    {order:93,lc:5,title:'最长回文子串',slug:'longest-palindromic-substring',difficulty:'MEDIUM'},
    {order:94,lc:1143,title:'最长公共子序列',slug:'longest-common-subsequence',difficulty:'MEDIUM'},
    {order:95,lc:72,title:'编辑距离',slug:'edit-distance',difficulty:'MEDIUM'}
  ]},
  {id:'top-100-liked-96-et6z',order:17,name:'技巧',questions:[
    {order:96,lc:136,title:'只出现一次的数字',slug:'single-number',difficulty:'EASY'},
    {order:97,lc:169,title:'多数元素',slug:'majority-element',difficulty:'EASY'},
    {order:98,lc:75,title:'颜色分类',slug:'sort-colors',difficulty:'MEDIUM'},
    {order:99,lc:31,title:'下一个排列',slug:'next-permutation',difficulty:'MEDIUM'},
    {order:100,lc:287,title:'寻找重复数',slug:'find-the-duplicate-number',difficulty:'MEDIUM'}
  ]}
];

/* Only solutions that are not already in ALGO_SOLUTIONS_A or ALGO_SOLUTIONS_B. */
const HOT100_SOLUTIONS={  'intersection-of-two-linked-lists':{
    approach:'两个指针分别走完自己的链表后切换到另一条链表；相交时会同时到达交点，不相交时会同时到达空节点。',
    complexity:'时间 O(m+n)，空间 O(1)。',
    code:`class Solution:
    def getIntersectionNode(self, headA, headB):
        pointer_a = headA
        pointer_b = headB
        while pointer_a is not pointer_b:
            pointer_a = pointer_a.next if pointer_a else headB
            pointer_b = pointer_b.next if pointer_b else headA
        return pointer_a`
  },
  'lowest-common-ancestor-of-a-binary-tree':{
    approach:'后序递归寻找 p 与 q；左右子树各返回一个目标时，当前节点就是最近公共祖先。',
    complexity:'时间 O(n)，空间 O(h)。',
    code:`class Solution:
    def lowestCommonAncestor(self, root, p, q):
        if not root or root is p or root is q:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right:
            return root
        return left or right`
  },
  'palindrome-linked-list':{
    approach:'快慢指针找到后半段起点，原地反转后半段，再与前半段逐个比较。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def isPalindrome(self, head):
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        previous = None
        while slow:
            next_node = slow.next
            slow.next = previous
            previous = slow
            slow = next_node
        left = head
        right = previous
        while right:
            if left.val != right.val:
                return False
            left = left.next
            right = right.next
        return True`
  },
  'invert-binary-tree':{
    approach:'递归交换每个节点的左右孩子，遍历到空节点停止。',
    complexity:'时间 O(n)，空间 O(h)。',
    code:`class Solution:
    def invertTree(self, root):
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`
  },
  'implement-trie-prefix-tree':{
    approach:'每个节点用字典保存下一字符，使用结束标记区分完整单词和普通前缀。',
    complexity:'每次操作时间 O(L)，空间 O(所有字符数)。',
    code:`class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word):
        node = self.root
        for char in word:
            node = node.setdefault(char, {})
        node['$'] = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node:
                return False
            node = node[char]
        return '$' in node

    def startsWith(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node:
                return False
            node = node[char]
        return True`
  },
  'course-schedule':{
    approach:'Kahn 拓扑排序：不断取入度为零的课程，最后被取出的课程数等于总数才没有环。',
    complexity:'时间 O(V+E)，空间 O(V+E)。',
    code:`from collections import deque

class Solution:
    def canFinish(self, numCourses, prerequisites):
        graph = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for course, prerequisite in prerequisites:
            graph[prerequisite].append(course)
            indegree[course] += 1
        queue = deque(index for index, degree in enumerate(indegree) if degree == 0)
        completed = 0
        while queue:
            course = queue.popleft()
            completed += 1
            for next_course in graph[course]:
                indegree[next_course] -= 1
                if indegree[next_course] == 0:
                    queue.append(next_course)
        return completed == numCourses`
  },
  'number-of-islands':{
    approach:'扫描网格，遇到陆地就用 DFS 将同一连通块全部淹没，启动 DFS 的次数就是岛屿数。',
    complexity:'时间 O(mn)，空间 O(mn)。',
    code:`class Solution:
    def numIslands(self, grid):
        if not grid:
            return 0
        rows = len(grid)
        columns = len(grid[0])
        islands = 0
        for row in range(rows):
            for column in range(columns):
                if grid[row][column] != '1':
                    continue
                islands += 1
                stack = [(row, column)]
                grid[row][column] = '0'
                while stack:
                    current_row, current_column = stack.pop()
                    for delta_row, delta_column in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        next_row = current_row + delta_row
                        next_column = current_column + delta_column
                        if 0 <= next_row < rows and 0 <= next_column < columns and grid[next_row][next_column] == '1':
                            grid[next_row][next_column] = '0'
                            stack.append((next_row, next_column))
        return islands`
  },
  'majority-element':{
    approach:'摩尔投票将不同元素两两抵消，出现次数超过一半的元素最终必然留下。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def majorityElement(self, nums):
        candidate = None
        count = 0
        for value in nums:
            if count == 0:
                candidate = value
            count += 1 if value == candidate else -1
        return candidate`
  },
  'product-of-array-except-self':{
    approach:'答案位置先写入左侧前缀积，再从右向左乘上右侧后缀积。',
    complexity:'时间 O(n)，除返回数组外空间 O(1)。',
    code:`class Solution:
    def productExceptSelf(self, nums):
        answer = [1] * len(nums)
        prefix = 1
        for index, value in enumerate(nums):
            answer[index] = prefix
            prefix *= value
        suffix = 1
        for index in range(len(nums) - 1, -1, -1):
            answer[index] *= suffix
            suffix *= nums[index]
        return answer`
  },
  'min-stack':{
    approach:'栈内同时保存当前值与压入该位置后的最小值，查询最小值无需遍历。',
    complexity:'每次操作时间 O(1)，空间 O(n)。',
    code:`class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val):
        current_minimum = val if not self.stack else min(val, self.stack[-1][1])
        self.stack.append((val, current_minimum))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def getMin(self):
        return self.stack[-1][1]`
  },
  'maximum-product-subarray':{
    approach:'负数会交换最大乘积和最小乘积的作用，因此同时维护以当前位置结尾的两种状态。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def maxProduct(self, nums):
        best = maximum = minimum = nums[0]
        for value in nums[1:]:
            if value < 0:
                maximum, minimum = minimum, maximum
            maximum = max(value, maximum * value)
            minimum = min(value, minimum * value)
            best = max(best, maximum)
        return best`
  },
  'sort-list':{
    approach:'对链表做归并排序，用快慢指针二分，再线性合并两个有序链表。',
    complexity:'时间 O(n log n)，空间 O(log n)。',
    code:`class Solution:
    def sortList(self, head):
        if not head or not head.next:
            return head
        slow = head
        fast = head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        right_head = slow.next
        slow.next = None
        left = self.sortList(head)
        right = self.sortList(right_head)
        dummy = ListNode(0)
        tail = dummy
        while left and right:
            if left.val <= right.val:
                tail.next = left
                left = left.next
            else:
                tail.next = right
                right = right.next
            tail = tail.next
        tail.next = left or right
        return dummy.next`
  },
  'lru-cache':{
    approach:'OrderedDict 保持访问顺序；读写时将键移动到末尾，容量超限时弹出最早访问的键。',
    complexity:'get 与 put 平均时间 O(1)，空间 O(capacity)。',
    code:`from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.values = OrderedDict()

    def get(self, key):
        if key not in self.values:
            return -1
        self.values.move_to_end(key)
        return self.values[key]

    def put(self, key, value):
        if key in self.values:
            self.values.move_to_end(key)
        self.values[key] = value
        if len(self.values) > self.capacity:
            self.values.popitem(last=False)`
  },
  'linked-list-cycle-ii':{
    approach:'Floyd 快慢指针先在环内相遇；一指针回到头部后同步走，再次相遇处就是环入口。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def detectCycle(self, head):
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                break
        else:
            return None
        finder = head
        while finder is not slow:
            finder = finder.next
            slow = slow.next
        return finder`
  },
  'single-number':{
    approach:'相同数字异或为零，全部元素异或后只剩下唯一出现的数字。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def singleNumber(self, nums):
        answer = 0
        for value in nums:
            answer ^= value
        return answer`
  },
  'binary-tree-maximum-path-sum':{
    approach:'后序遍历返回向父节点可贡献的单边最大和，同时用左右贡献加当前节点更新全局答案。',
    complexity:'时间 O(n)，空间 O(h)。',
    code:`class Solution:
    def maxPathSum(self, root):
        self.best = float('-inf')

        def gain(node):
            if not node:
                return 0
            left = max(gain(node.left), 0)
            right = max(gain(node.right), 0)
            self.best = max(self.best, node.val + left + right)
            return node.val + max(left, right)

        gain(root)
        return self.best`
  },
  'coin-change':{
    approach:'完全背包动态规划：dp[x] 表示凑出金额 x 的最少硬币数。',
    complexity:'时间 O(amount * n)，空间 O(amount)。',
    code:`class Solution:
    def coinChange(self, coins, amount):
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0
        for value in range(1, amount + 1):
            for coin in coins:
                if coin <= value:
                    dp[value] = min(dp[value], dp[value - coin] + 1)
        return dp[amount] if dp[amount] <= amount else -1`
  },
  'find-all-anagrams-in-a-string':{
    approach:'固定窗口长度为 p 的长度，维护两个 26 位计数数组，窗口计数相同就记录起点。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def findAnagrams(self, s, p):
        if len(p) > len(s):
            return []
        need = [0] * 26
        window = [0] * 26
        for char in p:
            need[ord(char) - ord('a')] += 1
        result = []
        for index, char in enumerate(s):
            window[ord(char) - ord('a')] += 1
            if index >= len(p):
                window[ord(s[index - len(p)]) - ord('a')] -= 1
            if window == need:
                result.append(index - len(p) + 1)
        return result`
  },
  'path-sum-iii':{
    approach:'前缀和哈希表记录祖先路径的和；当前前缀减 target 的历史次数就是以当前节点结尾的路径数。',
    complexity:'时间 O(n)，空间 O(h)。',
    code:`from collections import defaultdict

class Solution:
    def pathSum(self, root, targetSum):
        prefix_count = defaultdict(int)
        prefix_count[0] = 1

        def dfs(node, total):
            if not node:
                return 0
            total += node.val
            paths = prefix_count[total - targetSum]
            prefix_count[total] += 1
            paths += dfs(node.left, total) + dfs(node.right, total)
            prefix_count[total] -= 1
            return paths

        return dfs(root, 0)`
  },
  'partition-equal-subset-sum':{
    approach:'总和为奇数直接失败；否则使用 0/1 背包判断能否恰好凑出总和的一半。',
    complexity:'时间 O(n * sum)，空间 O(sum)。',
    code:`class Solution:
    def canPartition(self, nums):
        total = sum(nums)
        if total % 2:
            return False
        target = total // 2
        possible = [False] * (target + 1)
        possible[0] = True
        for value in nums:
            for subtotal in range(target, value - 1, -1):
                possible[subtotal] = possible[subtotal] or possible[subtotal - value]
        return possible[target]`
  },
  'top-k-frequent-elements':{
    approach:'计数后用大小为 k 的最小堆维护当前频率最高的元素。',
    complexity:'时间 O(n log k)，空间 O(n)。',
    code:`from collections import Counter
import heapq

class Solution:
    def topKFrequent(self, nums, k):
        counts = Counter(nums)
        heap = []
        for value, frequency in counts.items():
            heapq.heappush(heap, (frequency, value))
            if len(heap) > k:
                heapq.heappop(heap)
        return [value for _, value in heap]`
  },
  'best-time-to-buy-and-sell-stock':{
    approach:'扫描时维护历史最低买入价，用当前价格减去最低价更新最大利润。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def maxProfit(self, prices):
        lowest_price = float('inf')
        best_profit = 0
        for price in prices:
            lowest_price = min(lowest_price, price)
            best_profit = max(best_profit, price - lowest_price)
        return best_profit`
  },
  'longest-increasing-subsequence':{
    approach:'tails[i] 记录长度 i+1 的递增子序列最小结尾，用二分替换结尾以保留扩展空间。',
    complexity:'时间 O(n log n)，空间 O(n)。',
    code:`import bisect

class Solution:
    def lengthOfLIS(self, nums):
        tails = []
        for value in nums:
            index = bisect.bisect_left(tails, value)
            if index == len(tails):
                tails.append(value)
            else:
                tails[index] = value
        return len(tails)`
  },
  'find-the-duplicate-number':{
    approach:'将数值看作下一节点下标，重复数会形成环；Floyd 判圈的入口就是重复数。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def findDuplicate(self, nums):
        slow = fast = nums[0]
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break
        finder = 0
        while finder != slow:
            finder = nums[finder]
            slow = nums[slow]
        return finder`
  },
  'move-zeroes':{
    approach:'读写双指针扫描数组，遇到非零元素便交换到写指针位置。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def moveZeroes(self, nums):
        write = 0
        for read in range(len(nums)):
            if nums[read] != 0:
                nums[write], nums[read] = nums[read], nums[write]
                write += 1`
  },
  'perfect-squares':{
    approach:'dp[x] 表示组成 x 的最少完全平方数，对每个 x 枚举最后选用的平方数。',
    complexity:'时间 O(n sqrt(n))，空间 O(n)。',
    code:`class Solution:
    def numSquares(self, n):
        dp = list(range(n + 1))
        for value in range(1, n + 1):
            square = 1
            while square * square <= value:
                dp[value] = min(dp[value], dp[value - square * square] + 1)
                square += 1
        return dp[n]`
  },
  'search-a-2d-matrix-ii':{
    approach:'从右上角开始，值偏大向左走，值偏小向下走，每一步排除一整行或一整列。',
    complexity:'时间 O(m+n)，空间 O(1)。',
    code:`class Solution:
    def searchMatrix(self, matrix, target):
        if not matrix or not matrix[0]:
            return False
        row = 0
        column = len(matrix[0]) - 1
        while row < len(matrix) and column >= 0:
            value = matrix[row][column]
            if value == target:
                return True
            if value > target:
                column -= 1
            else:
                row += 1
        return False`
  },
  'sliding-window-maximum':{
    approach:'单调队列保存候选下标，队头永远是当前窗口最大值所在位置。',
    complexity:'时间 O(n)，空间 O(k)。',
    code:`from collections import deque

class Solution:
    def maxSlidingWindow(self, nums, k):
        queue = deque()
        answer = []
        for index, value in enumerate(nums):
            while queue and queue[0] <= index - k:
                queue.popleft()
            while queue and nums[queue[-1]] <= value:
                queue.pop()
            queue.append(index)
            if index >= k - 1:
                answer.append(nums[queue[0]])
        return answer`
  },
  'generate-parentheses':{
    approach:'回溯维护已用左右括号数，只在左括号未用尽时加左括号、右括号少于左括号时加右括号。',
    complexity:'时间 O(Cn)，空间 O(n)。',
    code:`class Solution:
    def generateParenthesis(self, n):
        answer = []

        def backtrack(path, left, right):
            if len(path) == 2 * n:
                answer.append(path)
                return
            if left < n:
                backtrack(path + '(', left + 1, right)
            if right < left:
                backtrack(path + ')', left, right + 1)

        backtrack('', 0, 0)
        return answer`
  },
  'group-anagrams':{
    approach:'将排序后的字符串作为哈希键，互为字母异位词的字符串必然拥有同一键。',
    complexity:'时间 O(n * k log k)，空间 O(nk)。',
    code:`from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs):
        groups = defaultdict(list)
        for word in strs:
            key = ''.join(sorted(word))
            groups[key].append(word)
        return list(groups.values())`
  },
  'rotate-image':{
    approach:'先沿主对角线转置矩阵，再反转每一行，即可完成顺时针旋转 90 度。',
    complexity:'时间 O(n^2)，空间 O(1)。',
    code:`class Solution:
    def rotate(self, matrix):
        size = len(matrix)
        for row in range(size):
            for column in range(row + 1, size):
                matrix[row][column], matrix[column][row] = matrix[column][row], matrix[row][column]
        for row in matrix:
            row.reverse()`
  },
  'permutations':{
    approach:'回溯按位置选择尚未使用的数字，路径长度达到 n 时收集一组排列。',
    complexity:'时间 O(n * n!)，空间 O(n)。',
    code:`class Solution:
    def permute(self, nums):
        answer = []
        used = [False] * len(nums)
        path = []

        def backtrack():
            if len(path) == len(nums):
                answer.append(path[:])
                return
            for index, value in enumerate(nums):
                if used[index]:
                    continue
                used[index] = True
                path.append(value)
                backtrack()
                path.pop()
                used[index] = False

        backtrack()
        return answer`
  },
  'trapping-rain-water':{
    approach:'双指针分别维护两侧最高柱子，较低侧的积水只由该侧最高值决定。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def trap(self, height):
        left = 0
        right = len(height) - 1
        left_maximum = 0
        right_maximum = 0
        water = 0
        while left <= right:
            if height[left] <= height[right]:
                left_maximum = max(left_maximum, height[left])
                water += left_maximum - height[left]
                left += 1
            else:
                right_maximum = max(right_maximum, height[right])
                water += right_maximum - height[right]
                right -= 1
        return water`
  },
  'combination-sum':{
    approach:'回溯枚举下一次可选起点，同一候选数可以继续使用，超过目标时立即剪枝。',
    complexity:'时间与答案数量相关，空间 O(target)。',
    code:`class Solution:
    def combinationSum(self, candidates, target):
        candidates.sort()
        answer = []
        path = []

        def backtrack(start, remaining):
            if remaining == 0:
                answer.append(path[:])
                return
            for index in range(start, len(candidates)):
                value = candidates[index]
                if value > remaining:
                    break
                path.append(value)
                backtrack(index, remaining - value)
                path.pop()

        backtrack(0, target)
        return answer`
  },
  'diameter-of-binary-tree':{
    approach:'后序遍历计算每个节点左右子树深度之和，该和就是经过当前节点的候选直径。',
    complexity:'时间 O(n)，空间 O(h)。',
    code:`class Solution:
    def diameterOfBinaryTree(self, root):
        self.diameter = 0

        def depth(node):
            if not node:
                return 0
            left_depth = depth(node.left)
            right_depth = depth(node.right)
            self.diameter = max(self.diameter, left_depth + right_depth)
            return 1 + max(left_depth, right_depth)

        depth(root)
        return self.diameter`
  },
  'find-first-and-last-position-of-element-in-sorted-array':{
    approach:'两次二分分别找第一个大于等于 target 和第一个大于 target 的位置。',
    complexity:'时间 O(log n)，空间 O(1)。',
    code:`class Solution:
    def searchRange(self, nums, target):
        def lower_bound(value):
            left = 0
            right = len(nums)
            while left < right:
                middle = (left + right) // 2
                if nums[middle] < value:
                    left = middle + 1
                else:
                    right = middle
            return left

        first = lower_bound(target)
        if first == len(nums) or nums[first] != target:
            return [-1, -1]
        return [first, lower_bound(target + 1) - 1]`
  },
  'longest-valid-parentheses':{
    approach:'栈中存放未匹配左括号下标和最近无效右括号下标，用下标差直接得到有效长度。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`class Solution:
    def longestValidParentheses(self, s):
        stack = [-1]
        best = 0
        for index, char in enumerate(s):
            if char == '(':
                stack.append(index)
            else:
                stack.pop()
                if not stack:
                    stack.append(index)
                else:
                    best = max(best, index - stack[-1])
        return best`
  },
  'next-permutation':{
    approach:'从右找到首个升序位置，交换为刚好更大的数，再将后缀反转成最小排列。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def nextPermutation(self, nums):
        pivot = len(nums) - 2
        while pivot >= 0 and nums[pivot] >= nums[pivot + 1]:
            pivot -= 1
        if pivot >= 0:
            successor = len(nums) - 1
            while nums[successor] <= nums[pivot]:
                successor -= 1
            nums[pivot], nums[successor] = nums[successor], nums[pivot]
        nums[pivot + 1:] = reversed(nums[pivot + 1:])`
  },
  'merge-k-sorted-lists':{
    approach:'最小堆保存每条链表当前头节点，每次弹出最小节点并把其后继压回堆。',
    complexity:'时间 O(N log k)，空间 O(k)。',
    code:`import heapq

class Solution:
    def mergeKLists(self, lists):
        heap = []
        for index, node in enumerate(lists):
            if node:
                heapq.heappush(heap, (node.val, index, node))
        dummy = ListNode(0)
        tail = dummy
        while heap:
            _, index, node = heapq.heappop(heap)
            tail.next = node
            tail = tail.next
            if node.next:
                heapq.heappush(heap, (node.next.val, index, node.next))
        return dummy.next`
  },
  'subarray-sum-equals-k':{
    approach:'记录每个前缀和出现次数；当前前缀和减 k 的历史次数就是新增的合法子数组数。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`class Solution:
    def subarraySum(self, nums, k):
        count = 0
        prefix_sum = 0
        seen = {0: 1}
        for value in nums:
            prefix_sum += value
            count += seen.get(prefix_sum - k, 0)
            seen[prefix_sum] = seen.get(prefix_sum, 0) + 1
        return count`
  },
  'valid-parentheses':{
    approach:'栈保存尚未匹配的左括号，遇到右括号时检查栈顶是否为对应左括号。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`class Solution:
    def isValid(self, s):
        pairs = {')': '(', ']': '[', '}': '{'}
        stack = []
        for char in s:
            if char in pairs:
                if not stack or stack.pop() != pairs[char]:
                    return False
            else:
                stack.append(char)
        return not stack`
  },
  'remove-nth-node-from-end-of-list':{
    approach:'哑节点配合前后双指针，前指针先领先 n+1 步，随后同步移动直到前指针到尾部。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def removeNthFromEnd(self, head, n):
        dummy = ListNode(0)
        dummy.next = head
        first = dummy
        second = dummy
        for _ in range(n + 1):
            first = first.next
        while first:
            first = first.next
            second = second.next
        second.next = second.next.next
        return dummy.next`
  },
  'letter-combinations-of-a-phone-number':{
    approach:'逐位扩展已有组合，每个数字把当前所有前缀分别接上其映射字母。',
    complexity:'时间 O(4^n)，空间 O(4^n)。',
    code:`class Solution:
    def letterCombinations(self, digits):
        if not digits:
            return []
        mapping = {
            '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
            '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
        }
        combinations = ['']
        for digit in digits:
            combinations = [prefix + letter for prefix in combinations for letter in mapping[digit]]
        return combinations`
  },
  '3sum':{
    approach:'排序后固定第一个数，剩余两数使用对撞双指针，并在三个位置跳过重复值。',
    complexity:'时间 O(n^2)，空间 O(1)。',
    code:`class Solution:
    def threeSum(self, nums):
        nums.sort()
        answer = []
        for index, value in enumerate(nums):
            if index and value == nums[index - 1]:
                continue
            left = index + 1
            right = len(nums) - 1
            while left < right:
                total = value + nums[left] + nums[right]
                if total < 0:
                    left += 1
                elif total > 0:
                    right -= 1
                else:
                    answer.append([value, nums[left], nums[right]])
                    left += 1
                    right -= 1
                    while left < right and nums[left] == nums[left - 1]:
                        left += 1
                    while left < right and nums[right] == nums[right + 1]:
                        right -= 1
        return answer`
  },
  'longest-palindromic-substring':{
    approach:'枚举奇数和偶数回文中心，向两侧扩展并保存最长区间。',
    complexity:'时间 O(n^2)，空间 O(1)。',
    code:`class Solution:
    def longestPalindrome(self, s):
        if not s:
            return ''
        start = end = 0

        def expand(left, right):
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return left + 1, right - 1

        for center in range(len(s)):
            for left, right in (expand(center, center), expand(center, center + 1)):
                if right - left > end - start:
                    start, end = left, right
        return s[start:end + 1]`
  },
  'median-of-two-sorted-arrays':{
    approach:'在较短数组上二分分割点，使左半部分所有值不大于右半部分所有值。',
    complexity:'时间 O(log(min(m,n)))，空间 O(1)。',
    code:`class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        size_a = len(nums1)
        size_b = len(nums2)
        left = 0
        right = size_a
        half = (size_a + size_b + 1) // 2
        while left <= right:
            cut_a = (left + right) // 2
            cut_b = half - cut_a
            left_a = nums1[cut_a - 1] if cut_a else float('-inf')
            right_a = nums1[cut_a] if cut_a < size_a else float('inf')
            left_b = nums2[cut_b - 1] if cut_b else float('-inf')
            right_b = nums2[cut_b] if cut_b < size_b else float('inf')
            if left_a <= right_b and left_b <= right_a:
                if (size_a + size_b) % 2:
                    return max(left_a, left_b)
                return (max(left_a, left_b) + min(right_a, right_b)) / 2
            if left_a > right_b:
                right = cut_a - 1
            else:
                left = cut_a + 1`
  },
  'longest-substring-without-repeating-characters':{
    approach:'哈希表记录字符最近下标，左边界越过窗口内的重复字符位置。',
    complexity:'时间 O(n)，空间 O(min(n,字符集大小))。',
    code:`class Solution:
    def lengthOfLongestSubstring(self, s):
        last_seen = {}
        left = 0
        best = 0
        for right, char in enumerate(s):
            if char in last_seen and last_seen[char] >= left:
                left = last_seen[char] + 1
            last_seen[char] = right
            best = max(best, right - left + 1)
        return best`
  },
  'add-two-numbers':{
    approach:'同时遍历两条链表与进位，逐位创建结果链表节点。',
    complexity:'时间 O(max(m,n))，空间 O(max(m,n))。',
    code:`class Solution:
    def addTwoNumbers(self, l1, l2):
        dummy = ListNode(0)
        tail = dummy
        carry = 0
        while l1 or l2 or carry:
            value_1 = l1.val if l1 else 0
            value_2 = l2.val if l2 else 0
            carry, digit = divmod(value_1 + value_2 + carry, 10)
            tail.next = ListNode(digit)
            tail = tail.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        return dummy.next`
  },
  'word-search':{
    approach:'从每个单元格出发做回溯 DFS，临时标记当前格防止同一路径重复使用。',
    complexity:'时间 O(mn * 4^L)，空间 O(L)。',
    code:`class Solution:
    def exist(self, board, word):
        rows = len(board)
        columns = len(board[0])

        def dfs(row, column, index):
            if index == len(word):
                return True
            if row < 0 or row >= rows or column < 0 or column >= columns or board[row][column] != word[index]:
                return False
            saved = board[row][column]
            board[row][column] = '#'
            found = (
                dfs(row + 1, column, index + 1) or
                dfs(row - 1, column, index + 1) or
                dfs(row, column + 1, index + 1) or
                dfs(row, column - 1, index + 1)
            )
            board[row][column] = saved
            return found

        for row in range(rows):
            for column in range(columns):
                if dfs(row, column, 0):
                    return True
        return False`
  },
  'flatten-binary-tree-to-linked-list':{
    approach:'前序遍历时保存上一个访问节点，并把它的 right 指向当前节点、left 置空。',
    complexity:'时间 O(n)，空间 O(h)。',
    code:`class Solution:
    def flatten(self, root):
        previous = None

        def preorder(node):
            nonlocal previous
            if not node:
                return
            left = node.left
            right = node.right
            if previous:
                previous.left = None
                previous.right = node
            previous = node
            preorder(left)
            preorder(right)

        preorder(root)`
  },
  'construct-binary-tree-from-preorder-and-inorder-traversal':{
    approach:'前序的当前元素是子树根，在中序索引表中切开左右子树并递归构造。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`class Solution:
    def buildTree(self, preorder, inorder):
        positions = {value: index for index, value in enumerate(inorder)}
        preorder_index = 0

        def build(left, right):
            nonlocal preorder_index
            if left > right:
                return None
            value = preorder[preorder_index]
            preorder_index += 1
            root = TreeNode(value)
            middle = positions[value]
            root.left = build(left, middle - 1)
            root.right = build(middle + 1, right)
            return root

        return build(0, len(inorder) - 1)`
  },
  'maximum-depth-of-binary-tree':{
    approach:'递归求左右子树深度，当前深度为二者较大值加一。',
    complexity:'时间 O(n)，空间 O(h)。',
    code:`class Solution:
    def maxDepth(self, root):
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`
  },
  'binary-tree-level-order-traversal':{
    approach:'BFS 队列按层处理，每轮先记录当前队列长度即可分隔层级。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`from collections import deque

class Solution:
    def levelOrder(self, root):
        if not root:
            return []
        queue = deque([root])
        answer = []
        while queue:
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            answer.append(level)
        return answer`
  },
  'symmetric-tree':{
    approach:'递归比较两棵镜像子树：值相等且左树的左孩子与右树的右孩子继续镜像。',
    complexity:'时间 O(n)，空间 O(h)。',
    code:`class Solution:
    def isSymmetric(self, root):
        def mirror(left, right):
            if not left and not right:
                return True
            if not left or not right or left.val != right.val:
                return False
            return mirror(left.left, right.right) and mirror(left.right, right.left)

        return not root or mirror(root.left, root.right)`
  },
  'validate-binary-search-tree':{
    approach:'递归传递每个子树允许的开区间边界，节点值必须严格位于该区间内。',
    complexity:'时间 O(n)，空间 O(h)。',
    code:`class Solution:
    def isValidBST(self, root):
        def valid(node, lower, upper):
            if not node:
                return True
            if not lower < node.val < upper:
                return False
            return valid(node.left, lower, node.val) and valid(node.right, node.val, upper)

        return valid(root, float('-inf'), float('inf'))`
  },
  'binary-tree-inorder-traversal':{
    approach:'显式栈模拟递归：持续向左入栈，弹出后访问节点，再转向右子树。',
    complexity:'时间 O(n)，空间 O(h)。',
    code:`class Solution:
    def inorderTraversal(self, root):
        answer = []
        stack = []
        node = root
        while stack or node:
            while node:
                stack.append(node)
                node = node.left
            node = stack.pop()
            answer.append(node.val)
            node = node.right
        return answer`
  },
  'subsets':{
    approach:'每加入一个数字，就把当前所有已有子集各复制一份并加入该数字。',
    complexity:'时间 O(n * 2^n)，空间 O(n * 2^n)。',
    code:`class Solution:
    def subsets(self, nums):
        answer = [[]]
        for value in nums:
            answer += [subset + [value] for subset in answer]
        return answer`
  },
  'minimum-window-substring':{
    approach:'滑动窗口维护所需字符数量；窗口满足条件后收缩左端以寻找更短答案。',
    complexity:'时间 O(|s|+|t|)，空间 O(字符集大小)。',
    code:`from collections import Counter

class Solution:
    def minWindow(self, s, t):
        if not s or not t:
            return ''
        need = Counter(t)
        window = Counter()
        required = len(need)
        formed = 0
        left = 0
        best = (float('inf'), 0, 0)
        for right, char in enumerate(s):
            window[char] += 1
            if char in need and window[char] == need[char]:
                formed += 1
            while formed == required:
                if right - left + 1 < best[0]:
                    best = (right - left + 1, left, right)
                left_char = s[left]
                window[left_char] -= 1
                if left_char in need and window[left_char] < need[left_char]:
                    formed -= 1
                left += 1
        return '' if best[0] == float('inf') else s[best[1]:best[2] + 1]`
  },
  'sort-colors':{
    approach:'荷兰国旗三指针：左侧放 0，中间扫描，右侧放 2。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def sortColors(self, nums):
        left = 0
        current = 0
        right = len(nums) - 1
        while current <= right:
            if nums[current] == 0:
                nums[left], nums[current] = nums[current], nums[left]
                left += 1
                current += 1
            elif nums[current] == 2:
                nums[right], nums[current] = nums[current], nums[right]
                right -= 1
            else:
                current += 1`
  },
  'edit-distance':{
    approach:'一维 DP 按字符比较，当前状态取替换、删除、插入三种操作的最小代价。',
    complexity:'时间 O(mn)，空间 O(n)。',
    code:`class Solution:
    def minDistance(self, word1, word2):
        previous = list(range(len(word2) + 1))
        for index_1, char_1 in enumerate(word1, 1):
            current = [index_1]
            for index_2, char_2 in enumerate(word2, 1):
                if char_1 == char_2:
                    current.append(previous[index_2 - 1])
                else:
                    current.append(1 + min(previous[index_2], current[index_2 - 1], previous[index_2 - 1]))
            previous = current
        return previous[-1]`
  },
  'minimum-path-sum':{
    approach:'一维 DP 保存到达当前列的最小路径和，状态只能从上方或左方转移。',
    complexity:'时间 O(mn)，空间 O(n)。',
    code:`class Solution:
    def minPathSum(self, grid):
        columns = len(grid[0])
        dp = [float('inf')] * columns
        dp[0] = 0
        for row in grid:
            dp[0] += row[0]
            for column in range(1, columns):
                dp[column] = min(dp[column], dp[column - 1]) + row[column]
        return dp[-1]`
  },
  'unique-paths':{
    approach:'到达一个格子的路径数等于上方和左方路径数之和，用一维数组滚动保存。',
    complexity:'时间 O(mn)，空间 O(n)。',
    code:`class Solution:
    def uniquePaths(self, m, n):
        dp = [1] * n
        for _ in range(m - 1):
            for column in range(1, n):
                dp[column] += dp[column - 1]
        return dp[-1]`
  },
  'jump-game':{
    approach:'贪心维护当前能到达的最远位置，遍历到不可达位置时失败。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def canJump(self, nums):
        farthest = 0
        for index, jump in enumerate(nums):
            if index > farthest:
                return False
            farthest = max(farthest, index + jump)
            if farthest >= len(nums) - 1:
                return True
        return True`
  },
  'maximum-subarray':{
    approach:'Kadane 算法维护以当前位置结尾的最大和，负前缀直接舍弃并从当前值重启。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def maxSubArray(self, nums):
        current = best = nums[0]
        for value in nums[1:]:
            current = max(value, current + value)
            best = max(best, current)
        return best`
  },
  'rotate-array':{
    approach:'先整体反转，再分别反转前 k 个与剩余部分，三次反转得到右移结果。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def rotate(self, nums, k):
        k %= len(nums)

        def reverse(left, right):
            while left < right:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
                right -= 1

        reverse(0, len(nums) - 1)
        reverse(0, k - 1)
        reverse(k, len(nums) - 1)`
  },
  'set-matrix-zeroes':{
    approach:'用首行和首列充当原地标记位，最后再根据标记将对应行列置零。',
    complexity:'时间 O(mn)，空间 O(1)。',
    code:`class Solution:
    def setZeroes(self, matrix):
        rows = len(matrix)
        columns = len(matrix[0])
        first_row_zero = any(matrix[0][column] == 0 for column in range(columns))
        first_column_zero = any(matrix[row][0] == 0 for row in range(rows))
        for row in range(1, rows):
            for column in range(1, columns):
                if matrix[row][column] == 0:
                    matrix[row][0] = 0
                    matrix[0][column] = 0
        for row in range(1, rows):
            for column in range(1, columns):
                if matrix[row][0] == 0 or matrix[0][column] == 0:
                    matrix[row][column] = 0
        if first_row_zero:
            for column in range(columns):
                matrix[0][column] = 0
        if first_column_zero:
            for row in range(rows):
                matrix[row][0] = 0`
  },
  'spiral-matrix':{
    approach:'维护上下左右四条边界，每次沿一条边采集后收缩该边界。',
    complexity:'时间 O(mn)，空间 O(1)（不含返回数组）。',
    code:`class Solution:
    def spiralOrder(self, matrix):
        top = 0
        bottom = len(matrix) - 1
        left = 0
        right = len(matrix[0]) - 1
        answer = []
        while top <= bottom and left <= right:
            for column in range(left, right + 1):
                answer.append(matrix[top][column])
            top += 1
            for row in range(top, bottom + 1):
                answer.append(matrix[row][right])
            right -= 1
            if top <= bottom:
                for column in range(right, left - 1, -1):
                    answer.append(matrix[bottom][column])
                bottom -= 1
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    answer.append(matrix[row][left])
                left += 1
        return answer`
  },
  'swap-nodes-in-pairs':{
    approach:'使用哑节点，每轮把相邻两个节点重连成交换后的顺序。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def swapPairs(self, head):
        dummy = ListNode(0)
        dummy.next = head
        previous = dummy
        while previous.next and previous.next.next:
            first = previous.next
            second = first.next
            previous.next = second
            first.next = second.next
            second.next = first
            previous = first
        return dummy.next`
  },
  'reverse-nodes-in-k-group':{
    approach:'每次先确认剩余节点是否满 k 个，再原地反转这一组并连接到下一组。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def reverseKGroup(self, head, k):
        dummy = ListNode(0)
        dummy.next = head
        group_previous = dummy
        while True:
            kth = group_previous
            for _ in range(k):
                kth = kth.next
                if not kth:
                    return dummy.next
            group_next = kth.next
            previous = group_next
            current = group_previous.next
            while current is not group_next:
                next_node = current.next
                current.next = previous
                previous = current
                current = next_node
            group_tail = group_previous.next
            group_previous.next = kth
            group_previous = group_tail`
  },
  'convert-sorted-array-to-binary-search-tree':{
    approach:'递归选择当前有序区间的中点作为根，左右半区分别构造左右子树。',
    complexity:'时间 O(n)，空间 O(log n)。',
    code:`class Solution:
    def sortedArrayToBST(self, nums):
        def build(left, right):
            if left > right:
                return None
            middle = (left + right) // 2
            root = TreeNode(nums[middle])
            root.left = build(left, middle - 1)
            root.right = build(middle + 1, right)
            return root

        return build(0, len(nums) - 1)`
  },
  'kth-smallest-element-in-a-bst':{
    approach:'BST 的中序遍历递增；用显式栈迭代访问，第 k 次弹出的节点即答案。',
    complexity:'时间 O(h+k)，空间 O(h)。',
    code:`class Solution:
    def kthSmallest(self, root, k):
        stack = []
        node = root
        while True:
            while node:
                stack.append(node)
                node = node.left
            node = stack.pop()
            k -= 1
            if k == 0:
                return node.val
            node = node.right`
  },
  'binary-tree-right-side-view':{
    approach:'层序遍历时记录每一层最后访问的节点值，即右视图中的一个值。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`from collections import deque

class Solution:
    def rightSideView(self, root):
        if not root:
            return []
        queue = deque([root])
        answer = []
        while queue:
            level_size = len(queue)
            for index in range(level_size):
                node = queue.popleft()
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
                if index == level_size - 1:
                    last_value = node.val
            answer.append(last_value)
        return answer`
  },
  'rotting-oranges':{
    approach:'多源 BFS 同时从所有腐烂橘子开始扩散，每一层代表一分钟。',
    complexity:'时间 O(mn)，空间 O(mn)。',
    code:`from collections import deque

class Solution:
    def orangesRotting(self, grid):
        queue = deque()
        fresh = 0
        for row in range(len(grid)):
            for column in range(len(grid[0])):
                if grid[row][column] == 2:
                    queue.append((row, column))
                elif grid[row][column] == 1:
                    fresh += 1
        minutes = 0
        while queue and fresh:
            minutes += 1
            for _ in range(len(queue)):
                row, column = queue.popleft()
                for delta_row, delta_column in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    next_row = row + delta_row
                    next_column = column + delta_column
                    if 0 <= next_row < len(grid) and 0 <= next_column < len(grid[0]) and grid[next_row][next_column] == 1:
                        grid[next_row][next_column] = 2
                        fresh -= 1
                        queue.append((next_row, next_column))
        return minutes if fresh == 0 else -1`
  },
  'palindrome-partitioning':{
    approach:'回溯枚举下一个切分终点，仅把回文子串加入当前路径。',
    complexity:'最坏时间 O(n * 2^n)，空间 O(n)。',
    code:`class Solution:
    def partition(self, s):
        answer = []
        path = []

        def backtrack(start):
            if start == len(s):
                answer.append(path[:])
                return
            for end in range(start, len(s)):
                part = s[start:end + 1]
                if part != part[::-1]:
                    continue
                path.append(part)
                backtrack(end + 1)
                path.pop()

        backtrack(0)
        return answer`
  },
  'n-queens':{
    approach:'逐行回溯，集合记录已占用的列、主对角线和副对角线，冲突时剪枝。',
    complexity:'时间 O(n!)，空间 O(n)。',
    code:`class Solution:
    def solveNQueens(self, n):
        board = [['.'] * n for _ in range(n)]
        columns = set()
        diagonals = set()
        anti_diagonals = set()
        answer = []

        def backtrack(row):
            if row == n:
                answer.append([''.join(line) for line in board])
                return
            for column in range(n):
                diagonal = row - column
                anti_diagonal = row + column
                if column in columns or diagonal in diagonals or anti_diagonal in anti_diagonals:
                    continue
                columns.add(column)
                diagonals.add(diagonal)
                anti_diagonals.add(anti_diagonal)
                board[row][column] = 'Q'
                backtrack(row + 1)
                board[row][column] = '.'
                columns.remove(column)
                diagonals.remove(diagonal)
                anti_diagonals.remove(anti_diagonal)

        backtrack(0)
        return answer`
  },
  'search-insert-position':{
    approach:'标准 lower bound 二分，循环结束时 left 即为目标首次可插入的位置。',
    complexity:'时间 O(log n)，空间 O(1)。',
    code:`class Solution:
    def searchInsert(self, nums, target):
        left = 0
        right = len(nums)
        while left < right:
            middle = (left + right) // 2
            if nums[middle] < target:
                left = middle + 1
            else:
                right = middle
        return left`
  },
  'search-a-2d-matrix':{
    approach:'将行列有序矩阵视为一维有序数组，在下标二分后换算行列坐标。',
    complexity:'时间 O(log(mn))，空间 O(1)。',
    code:`class Solution:
    def searchMatrix(self, matrix, target):
        rows = len(matrix)
        columns = len(matrix[0])
        left = 0
        right = rows * columns - 1
        while left <= right:
            middle = (left + right) // 2
            value = matrix[middle // columns][middle % columns]
            if value == target:
                return True
            if value < target:
                left = middle + 1
            else:
                right = middle - 1
        return False`
  },
  'find-minimum-in-rotated-sorted-array':{
    approach:'与右端点比较；中点大于右端点时最小值在右半边，否则在左半边或中点。',
    complexity:'时间 O(log n)，空间 O(1)。',
    code:`class Solution:
    def findMin(self, nums):
        left = 0
        right = len(nums) - 1
        while left < right:
            middle = (left + right) // 2
            if nums[middle] > nums[right]:
                left = middle + 1
            else:
                right = middle
        return nums[left]`
  },
  'find-median-from-data-stream':{
    approach:'用最大堆保存较小的一半、最小堆保存较大的一半，并始终保持两堆大小平衡。',
    complexity:'addNum 时间 O(log n)，findMedian 时间 O(1)，空间 O(n)。',
    code:`import heapq

class MedianFinder:
    def __init__(self):
        self.lower = []
        self.upper = []

    def addNum(self, num):
        heapq.heappush(self.lower, -num)
        heapq.heappush(self.upper, -heapq.heappop(self.lower))
        if len(self.upper) > len(self.lower):
            heapq.heappush(self.lower, -heapq.heappop(self.upper))

    def findMedian(self):
        if len(self.lower) > len(self.upper):
            return -self.lower[0]
        return (-self.lower[0] + self.upper[0]) / 2`
  },
  'jump-game-ii':{
    approach:'贪心扫描当前跳数可覆盖的区间，扫描到区间末端时跳数加一并扩展下一覆盖区间。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def jump(self, nums):
        jumps = 0
        current_end = 0
        farthest = 0
        for index in range(len(nums) - 1):
            farthest = max(farthest, index + nums[index])
            if index == current_end:
                jumps += 1
                current_end = farthest
        return jumps`
  },
  'partition-labels':{
    approach:'记录每个字符最后出现位置，扩展当前分段右边界；扫描到边界时即可切分。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def partitionLabels(self, s):
        last = {char: index for index, char in enumerate(s)}
        answer = []
        start = 0
        end = 0
        for index, char in enumerate(s):
            end = max(end, last[char])
            if index == end:
                answer.append(end - start + 1)
                start = index + 1
        return answer`
  },
  'pascals-triangle':{
    approach:'第 i 行两端恒为 1，中间每个值等于上一行左上和右上的两个值之和。',
    complexity:'时间 O(numRows^2)，空间 O(numRows^2)。',
    code:`class Solution:
    def generate(self, numRows):
        answer = []
        for row in range(numRows):
            values = [1] * (row + 1)
            for column in range(1, row):
                values[column] = answer[-1][column - 1] + answer[-1][column]
            answer.append(values)
        return answer`
  },
  'longest-common-subsequence':{
    approach:'一维动态规划：当前字符相同时取左上状态加一，否则取上方和左方最大值。',
    complexity:'时间 O(mn)，空间 O(n)。',
    code:`class Solution:
    def longestCommonSubsequence(self, text1, text2):
        previous = [0] * (len(text2) + 1)
        for char_1 in text1:
            current = [0]
            for index_2, char_2 in enumerate(text2, 1):
                if char_1 == char_2:
                    current.append(previous[index_2 - 1] + 1)
                else:
                    current.append(max(previous[index_2], current[-1]))
            previous = current
        return previous[-1]`
  }
};
