'use strict';

/* Official solutions for units 1-4 of the data-structures-and-algorithms quest. */
const ALGO_SOLUTIONS_A={
  'concatenation-of-array':{
    approach:'直接拼接两份原数组，结果长度正好为 2n。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`from typing import List

class Solution:
    def getConcatenation(self, nums: List[int]) -> List[int]:
        return nums + nums`
  },
  'shuffle-the-array':{
    approach:'数组前后两段分别是 x 和 y，按相同下标交替放入答案。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`from typing import List

class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        answer = []
        for i in range(n):
            answer.append(nums[i])
            answer.append(nums[i + n])
        return answer`
  },
  'max-consecutive-ones':{
    approach:'线性扫描，遇到 1 增加当前连续长度，遇到 0 清零并维护最大值。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`from typing import List

class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        best = current = 0
        for value in nums:
            if value == 1:
                current += 1
                best = max(best, current)
            else:
                current = 0
        return best`
  },
  'set-mismatch':{
    approach:'用下标对应数字，原地取反标记已见数字；第二次遇到负数即为重复值，仍为正的位置对应缺失值。',
    complexity:'时间 O(n)，除返回值外空间 O(1)。',
    code:`from typing import List

class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        duplicate = -1
        for value in nums:
            index = abs(value) - 1
            if nums[index] < 0:
                duplicate = abs(value)
            else:
                nums[index] *= -1

        for index, value in enumerate(nums):
            if value > 0:
                return [duplicate, index + 1]
        return [duplicate, -1]`
  },
  'how-many-numbers-are-smaller-than-the-current-number':{
    approach:'题目数值范围为 0 到 100，计数后做前缀和即可得到每个数前面有多少更小的数。',
    complexity:'时间 O(n + K)，空间 O(K)，其中 K=101。',
    code:`from typing import List

class Solution:
    def smallerNumbersThanCurrent(self, nums: List[int]) -> List[int]:
        count = [0] * 101
        for value in nums:
            count[value] += 1

        smaller = [0] * 101
        for value in range(1, 101):
            smaller[value] = smaller[value - 1] + count[value - 1]
        return [smaller[value] for value in nums]`
  },
  'find-all-numbers-disappeared-in-an-array':{
    approach:'把每个数字对应的下标位置取负，最后仍为正的位置没有被任何数字访问过。',
    complexity:'时间 O(n)，除返回值外空间 O(1)。',
    code:`from typing import List

class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        for value in nums:
            index = abs(value) - 1
            if nums[index] > 0:
                nums[index] *= -1
        return [index + 1 for index, value in enumerate(nums) if value > 0]`
  },
  'build-an-array-with-stack-operations':{
    approach:'target 严格递增，依次补齐当前数字到目标数字之间的 Push、Pop，再保留目标数字的 Push。',
    complexity:'时间 O(target[-1])，空间 O(target[-1])。',
    code:`from typing import List

class Solution:
    def buildArray(self, target: List[int], n: int) -> List[str]:
        operations = []
        current = 1
        for value in target:
            while current < value:
                operations.append('Push')
                operations.append('Pop')
                current += 1
            operations.append('Push')
            current += 1
        return operations`
  },
  'evaluate-reverse-polish-notation':{
    approach:'数字入栈；遇到运算符时弹出右、左操作数，计算后将结果重新压栈。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`from typing import List

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for token in tokens:
            if token not in {'+', '-', '*', '/'}:
                stack.append(int(token))
                continue

            right = stack.pop()
            left = stack.pop()
            if token == '+':
                stack.append(left + right)
            elif token == '-':
                stack.append(left - right)
            elif token == '*':
                stack.append(left * right)
            else:
                quotient = abs(left) // abs(right)
                stack.append(quotient if left * right >= 0 else -quotient)
        return stack[-1]`
  },
  'exclusive-time-of-functions':{
    approach:'栈保存正在执行的函数。每条日志到达时，先把距上一时间点的时长记给栈顶，再处理开始或结束事件。',
    complexity:'时间 O(L)，空间 O(n)，L 为日志数。',
    code:`from typing import List

class Solution:
    def exclusiveTime(self, n: int, logs: List[str]) -> List[int]:
        answer = [0] * n
        stack = []
        previous = 0

        for log in logs:
            function_id, event, timestamp = log.split(':')
            function_id = int(function_id)
            timestamp = int(timestamp)

            if event == 'start':
                if stack:
                    answer[stack[-1]] += timestamp - previous
                stack.append(function_id)
                previous = timestamp
            else:
                answer[stack.pop()] += timestamp - previous + 1
                previous = timestamp + 1
        return answer`
  },
  'final-prices-with-a-special-discount-in-a-shop':{
    approach:'维护价格单调递增的下标栈；当前价格不大于栈顶价格时，当前价格就是栈顶商品的首次折扣。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`from typing import List

class Solution:
    def finalPrices(self, prices: List[int]) -> List[int]:
        answer = prices[:]
        stack = []
        for index, price in enumerate(prices):
            while stack and prices[stack[-1]] >= price:
                answer[stack.pop()] -= price
            stack.append(index)
        return answer`
  },
  'daily-temperatures':{
    approach:'维护温度单调递减的下标栈。出现更高温度时，持续结算所有等待该温度的日期。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`from typing import List

class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        answer = [0] * len(temperatures)
        stack = []
        for index, temperature in enumerate(temperatures):
            while stack and temperatures[stack[-1]] < temperature:
                previous = stack.pop()
                answer[previous] = index - previous
            stack.append(index)
        return answer`
  },
  'largest-rectangle-in-histogram':{
    approach:'在高度数组末尾加哨兵 0，用单调递增栈确定每根柱子作为最低高度时能扩展的左右边界。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        extended = heights + [0]
        stack = []
        best = 0

        for index, height in enumerate(extended):
            while stack and extended[stack[-1]] > height:
                middle = stack.pop()
                left = stack[-1] if stack else -1
                best = max(best, extended[middle] * (index - left - 1))
            stack.append(index)
        return best`
  },
  'number-of-students-unable-to-eat-lunch':{
    approach:'按队列规则轮转学生；连续一整轮都不能取走当前三明治时，剩余学生都无法吃午餐。',
    complexity:'最坏时间 O(n^2)，空间 O(n)。',
    code:`from collections import deque
from typing import List

class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        queue = deque(students)
        sandwich_index = 0
        skipped = 0

        while queue and skipped < len(queue):
            if queue[0] == sandwiches[sandwich_index]:
                queue.popleft()
                sandwich_index += 1
                skipped = 0
            else:
                queue.append(queue.popleft())
                skipped += 1
        return len(queue)`,
    better:{
      title:'统计两类学生数量',
      complexity:'时间 O(n)，空间 O(1)。',
      code:`from typing import List

class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        count = [0, 0]
        for student in students:
            count[student] += 1

        for sandwich in sandwiches:
            if count[sandwich] == 0:
                return count[0] + count[1]
            count[sandwich] -= 1
        return 0`
    }
  },
  'time-needed-to-buy-tickets':{
    approach:'队列存放人的下标。每次队首买一张票，仍有需求时再排回队尾，直到目标人买完。',
    complexity:'时间 O(sum(tickets))，空间 O(n)。',
    code:`from collections import deque
from typing import List

class Solution:
    def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
        queue = deque(range(len(tickets)))
        elapsed = 0

        while tickets[k] > 0:
            person = queue.popleft()
            tickets[person] -= 1
            elapsed += 1
            if tickets[person] > 0:
                queue.append(person)
        return elapsed`,
    better:{
      title:'按每个人最多贡献的购票次数求和',
      complexity:'时间 O(n)，空间 O(1)。',
      code:`from typing import List

class Solution:
    def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
        target = tickets[k]
        return sum(
            min(value, target) if index <= k else min(value, target - 1)
            for index, value in enumerate(tickets)
        )`
    }
  },
  'implement-queue-using-stacks':{
    approach:'输入栈负责 push，输出栈负责 pop 和 peek；输出栈为空时才整体搬运，因此均摊复杂度为常数。',
    complexity:'push O(1)，pop 和 peek 均摊 O(1)，空间 O(n)。',
    code:`class MyQueue:
    def __init__(self):
        self.input_stack = []
        self.output_stack = []

    def push(self, x: int) -> None:
        self.input_stack.append(x)

    def _move_if_needed(self) -> None:
        if not self.output_stack:
            while self.input_stack:
                self.output_stack.append(self.input_stack.pop())

    def pop(self) -> int:
        self._move_if_needed()
        return self.output_stack.pop()

    def peek(self) -> int:
        self._move_if_needed()
        return self.output_stack[-1]

    def empty(self) -> bool:
        return not self.input_stack and not self.output_stack`
  },
  'last-stone-weight':{
    approach:'Python 的 heapq 是小根堆，把重量取负即可模拟每轮取出最大的两块石头。',
    complexity:'时间 O(n log n)，空间 O(n)。',
    code:`import heapq
from typing import List

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        heap = [-weight for weight in stones]
        heapq.heapify(heap)

        while len(heap) > 1:
            first = -heapq.heappop(heap)
            second = -heapq.heappop(heap)
            if first != second:
                heapq.heappush(heap, -(first - second))
        return -heap[0] if heap else 0`
  },
  'find-k-pairs-with-smallest-sums':{
    approach:'每个 nums1 元素和 nums2[0] 形成一条递增链。堆中只保留每条链当前最小的候选对。',
    complexity:'时间 O(k log min(m, k))，空间 O(min(m, k))。',
    code:`import heapq
from typing import List

class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        if not nums1 or not nums2:
            return []

        heap = []
        for i in range(min(k, len(nums1))):
            heapq.heappush(heap, (nums1[i] + nums2[0], i, 0))

        answer = []
        while heap and len(answer) < k:
            _, i, j = heapq.heappop(heap)
            answer.append([nums1[i], nums2[j]])
            if j + 1 < len(nums2):
                heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
        return answer`
  },
  'construct-target-array-with-multiple-sums':{
    approach:'反向思考：目标数组中最大的元素一定是最后一次操作产生的，用总和还原它之前的值。取模可跳过重复加同一位置的多步操作。',
    complexity:'时间 O(n log n + t log n)，t 为反推轮数；空间 O(n)。',
    code:`import heapq
from typing import List

class Solution:
    def isPossible(self, target: List[int]) -> bool:
        total = sum(target)
        heap = [-value for value in target]
        heapq.heapify(heap)

        while -heap[0] != 1:
            largest = -heapq.heappop(heap)
            rest = total - largest
            if rest == 1:
                return True
            if rest == 0 or rest >= largest:
                return False

            previous = largest % rest
            if previous == 0:
                return False
            total = rest + previous
            heapq.heappush(heap, -previous)
        return True`
  },
  'detect-capital':{
    approach:'合法情况只有全大写、全小写，或仅首字母大写三种。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`class Solution:
    def detectCapitalUse(self, word: str) -> bool:
        return word.isupper() or word.islower() or word.istitle()`
  },
  'license-key-formatting':{
    approach:'先去掉横线并统一大写，再从开头保留一个长度为 len % k 的首组，其余每组 k 个字符。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`class Solution:
    def licenseKeyFormatting(self, s: str, k: int) -> str:
        characters = s.replace('-', '').upper()
        if not characters:
            return ''

        first_size = len(characters) % k or k
        groups = [characters[:first_size]]
        for start in range(first_size, len(characters), k):
            groups.append(characters[start:start + k])
        return '-'.join(groups)`
  },
  'masking-personal-information':{
    approach:'邮箱按 @ 拆分并统一小写；电话号码先保留数字，再依据国家码长度拼接掩码。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`class Solution:
    def maskPII(self, s: str) -> str:
        if '@' in s:
            name, domain = s.lower().split('@')
            return name[0] + '*****' + name[-1] + '@' + domain

        digits = ''.join(character for character in s if character.isdigit())
        local = '***-***-' + digits[-4:]
        if len(digits) == 10:
            return local
        return '+' + '*' * (len(digits) - 10) + '-' + local`
  },
  'repeated-substring-pattern':{
    approach:'构建 KMP 的最长相等前后缀数组。末尾前后缀长度能整除原串长度时，原串由该周期重复组成。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        lps = [0] * len(s)
        matched = 0
        for index in range(1, len(s)):
            while matched and s[index] != s[matched]:
                matched = lps[matched - 1]
            if s[index] == s[matched]:
                matched += 1
                lps[index] = matched

        period_prefix = lps[-1]
        return period_prefix > 0 and len(s) % (len(s) - period_prefix) == 0`
  },
  'rotate-string':{
    approach:'旋转后的字符串一定是 s+s 的连续子串；用 KMP 在线性时间内查找 goal。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`class Solution:
    def rotateString(self, s: str, goal: str) -> bool:
        if len(s) != len(goal):
            return False
        if not s:
            return True

        lps = [0] * len(goal)
        matched = 0
        for index in range(1, len(goal)):
            while matched and goal[index] != goal[matched]:
                matched = lps[matched - 1]
            if goal[index] == goal[matched]:
                matched += 1
                lps[index] = matched

        matched = 0
        for character in s + s:
            while matched and character != goal[matched]:
                matched = lps[matched - 1]
            if character == goal[matched]:
                matched += 1
                if matched == len(goal):
                    return True
        return False`
  },
  'repeated-string-match':{
    approach:'重复次数至少为 ceil(len(b) / len(a))，至多再多一份 a。每个候选文本用 KMP 判断是否含 b。',
    complexity:'时间 O(len(a) + len(b))，空间 O(len(b))。',
    code:`class Solution:
    def repeatedStringMatch(self, a: str, b: str) -> int:
        repeats = (len(b) + len(a) - 1) // len(a)
        for copies in (repeats, repeats + 1):
            if self._contains(a * copies, b):
                return copies
        return -1

    def _contains(self, text: str, pattern: str) -> bool:
        lps = [0] * len(pattern)
        matched = 0
        for index in range(1, len(pattern)):
            while matched and pattern[index] != pattern[matched]:
                matched = lps[matched - 1]
            if pattern[index] == pattern[matched]:
                matched += 1
                lps[index] = matched

        matched = 0
        for character in text:
            while matched and character != pattern[matched]:
                matched = lps[matched - 1]
            if character == pattern[matched]:
                matched += 1
                if matched == len(pattern):
                    return True
        return False`
  },
  'remove-duplicates-from-sorted-list':{
    approach:'有序链表中重复值相邻，当前节点与后继相等时跳过后继，否则向后移动。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`from typing import Optional

class Solution:
    def deleteDuplicates(self, head: Optional['ListNode']) -> Optional['ListNode']:
        current = head
        while current and current.next:
            if current.val == current.next.val:
                current.next = current.next.next
            else:
                current = current.next
        return head`
  },
  'odd-even-linked-list':{
    approach:'分别维护奇数位置链和偶数位置链，原地交替摘取节点，最后把奇链尾接到偶链头。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`from typing import Optional

class Solution:
    def oddEvenList(self, head: Optional['ListNode']) -> Optional['ListNode']:
        if not head or not head.next:
            return head

        odd = head
        even = head.next
        even_head = even
        while even and even.next:
            odd.next = even.next
            odd = odd.next
            even.next = odd.next
            even = even.next
        odd.next = even_head
        return head`
  },
  'reverse-linked-list':{
    approach:'每次保存后继，再把当前节点指向已反转的前缀，随后同步推进两个指针。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`from typing import Optional

class Solution:
    def reverseList(self, head: Optional['ListNode']) -> Optional['ListNode']:
        previous = None
        current = head
        while current:
            next_node = current.next
            current.next = previous
            previous = current
            current = next_node
        return previous`
  },
  'two-sum':{
    approach:'哈希表记录已访问数字的下标，扫描到当前数时直接查询补数是否已经出现。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        positions = {}
        for index, value in enumerate(nums):
            complement = target - value
            if complement in positions:
                return [positions[complement], index]
            positions[value] = index
        return []`
  },
  'copy-list-with-random-pointer':{
    approach:'哈希表先为每个原节点创建副本，再在第二轮统一连接 next 和 random 指针。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        copies = {None: None}
        current = head
        while current:
            copies[current] = Node(current.val)
            current = current.next

        current = head
        while current:
            copies[current].next = copies[current.next]
            copies[current].random = copies[current.random]
            current = current.next
        return copies[head]`
  },
  'first-missing-positive':{
    approach:'把值 x 放到下标 x-1 的正确位置。完成原地置换后，第一个 nums[i] != i+1 的位置就是答案。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`from typing import List

class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        index = 0
        size = len(nums)
        while index < size:
            correct = nums[index] - 1
            if 0 <= correct < size and nums[correct] != nums[index]:
                nums[index], nums[correct] = nums[correct], nums[index]
            else:
                index += 1

        for index, value in enumerate(nums):
            if value != index + 1:
                return index + 1
        return size + 1`
  },
  'find-the-highest-altitude':{
    approach:'从海拔 0 出发累加每段增量，扫描中维护出现过的最高前缀和。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`from typing import List

class Solution:
    def largestAltitude(self, gain: List[int]) -> int:
        altitude = 0
        best = 0
        for change in gain:
            altitude += change
            best = max(best, altitude)
        return best`
  },
  'make-sum-divisible-by-p':{
    approach:'若总余数为 need，删除子数组的前缀余数差也必须为 need。哈希表保存每种前缀余数最新下标以缩短长度。',
    complexity:'时间 O(n)，空间 O(min(n, p))。',
    code:`from typing import List

class Solution:
    def minSubarray(self, nums: List[int], p: int) -> int:
        need = sum(nums) % p
        if need == 0:
            return 0

        latest = {0: -1}
        prefix = 0
        answer = len(nums)
        for index, value in enumerate(nums):
            prefix = (prefix + value) % p
            target = (prefix - need) % p
            if target in latest:
                answer = min(answer, index - latest[target])
            latest[prefix] = index
        return answer if answer < len(nums) else -1`
  },
  'ways-to-make-a-fair-array':{
    approach:'预先统计左右两侧的奇偶位置和。删除当前位置后，右侧元素下标奇偶性翻转，比较翻转后的两侧总和。',
    complexity:'时间 O(n)，空间 O(1)。',
    code:`from typing import List

class Solution:
    def waysToMakeFair(self, nums: List[int]) -> int:
        right_even = sum(nums[::2])
        right_odd = sum(nums[1::2])
        left_even = left_odd = 0
        answer = 0

        for index, value in enumerate(nums):
            if index % 2 == 0:
                right_even -= value
            else:
                right_odd -= value

            if left_even + right_odd == left_odd + right_even:
                answer += 1

            if index % 2 == 0:
                left_even += value
            else:
                left_odd += value
        return answer`
  },
  'minimum-absolute-difference':{
    approach:'排序后，最小绝对差一定出现在相邻元素之间；先得到最小差，再收集所有满足它的相邻对。',
    complexity:'时间 O(n log n)，空间 O(1)（不计排序与返回值）。',
    code:`from typing import List

class Solution:
    def minimumAbsDifference(self, arr: List[int]) -> List[List[int]]:
        arr.sort()
        smallest = min(arr[index] - arr[index - 1] for index in range(1, len(arr)))
        return [
            [arr[index - 1], arr[index]]
            for index in range(1, len(arr))
            if arr[index] - arr[index - 1] == smallest
        ]`
  },
  'reduction-operations-to-make-the-array-elements-equal':{
    approach:'排序后从右向左处理。每跨过一个不同值，右侧已有元素都还要再进行一次减少操作。',
    complexity:'时间 O(n log n)，空间 O(1)（不计排序）。',
    code:`from typing import List

class Solution:
    def reductionOperations(self, nums: List[int]) -> int:
        nums.sort()
        answer = 0
        for index in range(len(nums) - 1, 0, -1):
            if nums[index] != nums[index - 1]:
                answer += len(nums) - index
        return answer`
  },
  'merge-intervals':{
    approach:'按左端点排序。新区间若与当前合并区间相交便扩展右端点，否则提交当前区间并开始新区间。',
    complexity:'时间 O(n log n)，空间 O(n)（排序与返回值）。',
    code:`from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda interval: interval[0])
        merged = []
        for start, end in intervals:
            if not merged or merged[-1][1] < start:
                merged.append([start, end])
            else:
                merged[-1][1] = max(merged[-1][1], end)
        return merged`
  },
  'peak-index-in-a-mountain-array':{
    approach:'中点右侧更高时峰顶必在右边，否则峰顶在中点或左边，二分收缩到唯一峰顶。',
    complexity:'时间 O(log n)，空间 O(1)。',
    code:`from typing import List

class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        left, right = 0, len(arr) - 1
        while left < right:
            middle = (left + right) // 2
            if arr[middle] < arr[middle + 1]:
                left = middle + 1
            else:
                right = middle
        return left`
  },
  'binary-search':{
    approach:'维护闭区间 [left, right]，每轮比较中点并排除一半不可能包含目标的区间。',
    complexity:'时间 O(log n)，空间 O(1)。',
    code:`from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            middle = (left + right) // 2
            if nums[middle] == target:
                return middle
            if nums[middle] < target:
                left = middle + 1
            else:
                right = middle - 1
        return -1`
  },
  'sum-of-square-numbers':{
    approach:'枚举第一个平方数，并对剩余值二分查找是否为完全平方数，体现有序搜索的边界收缩。',
    complexity:'时间 O(sqrt(c) log c)，空间 O(1)。',
    code:`import math

class Solution:
    def judgeSquareSum(self, c: int) -> bool:
        limit = math.isqrt(c)
        for first in range(limit + 1):
            remain = c - first * first
            left, right = 0, limit
            while left <= right:
                middle = (left + right) // 2
                square = middle * middle
                if square == remain:
                    return True
                if square < remain:
                    left = middle + 1
                else:
                    right = middle - 1
        return False`,
    better:{
      title:'双指针夹逼两个平方数',
      complexity:'时间 O(sqrt(c))，空间 O(1)。',
      code:`import math

class Solution:
    def judgeSquareSum(self, c: int) -> bool:
        left, right = 0, math.isqrt(c)
        while left <= right:
            total = left * left + right * right
            if total == c:
                return True
            if total < c:
                left += 1
            else:
                right -= 1
        return False`
    }
  },
  'search-in-rotated-sorted-array':{
    approach:'每轮至少有一侧连续有序。先判断哪一侧有序，再判断 target 是否落在该侧的值域内来排除另一半。',
    complexity:'时间 O(log n)，空间 O(1)。',
    code:`from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            middle = (left + right) // 2
            if nums[middle] == target:
                return middle

            if nums[left] <= nums[middle]:
                if nums[left] <= target < nums[middle]:
                    right = middle - 1
                else:
                    left = middle + 1
            else:
                if nums[middle] < target <= nums[right]:
                    left = middle + 1
                else:
                    right = middle - 1
        return -1`
  },
  'kth-largest-element-in-an-array':{
    approach:'快速选择只递归包含第 k 大元素的分区；随机枢轴让平均复杂度保持线性。',
    complexity:'平均时间 O(n)，最坏 O(n^2)，额外空间 O(1)。',
    code:`import random
from typing import List

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        target = len(nums) - k
        left, right = 0, len(nums) - 1

        while left <= right:
            pivot_index = random.randint(left, right)
            nums[pivot_index], nums[right] = nums[right], nums[pivot_index]
            pivot = nums[right]
            store = left
            for index in range(left, right):
                if nums[index] <= pivot:
                    nums[store], nums[index] = nums[index], nums[store]
                    store += 1
            nums[store], nums[right] = nums[right], nums[store]

            if store == target:
                return nums[store]
            if store < target:
                left = store + 1
            else:
                right = store - 1
        return -1`
  },
  'sort-an-array':{
    approach:'归并排序将数组递归分半，合并两个有序段时线性写入辅助数组。',
    complexity:'时间 O(n log n)，空间 O(n)。',
    code:`from typing import List

class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        buffer = [0] * len(nums)

        def merge_sort(left: int, right: int) -> None:
            if left >= right:
                return
            middle = (left + right) // 2
            merge_sort(left, middle)
            merge_sort(middle + 1, right)

            i, j, write = left, middle + 1, left
            while i <= middle and j <= right:
                if nums[i] <= nums[j]:
                    buffer[write] = nums[i]
                    i += 1
                else:
                    buffer[write] = nums[j]
                    j += 1
                write += 1
            while i <= middle:
                buffer[write] = nums[i]
                i += 1
                write += 1
            while j <= right:
                buffer[write] = nums[j]
                j += 1
                write += 1
            nums[left:right + 1] = buffer[left:right + 1]

        merge_sort(0, len(nums) - 1)
        return nums`
  },
  'insertion-sort-list':{
    approach:'维护一个已排序链表。每次从原链表取一个节点，在已排序部分线性找到插入位置。',
    complexity:'时间 O(n^2)，空间 O(1)。',
    code:`from typing import Optional

class Solution:
    def insertionSortList(self, head: Optional['ListNode']) -> Optional['ListNode']:
        dummy = ListNode(0)
        current = head
        while current:
            next_node = current.next
            previous = dummy
            while previous.next and previous.next.val < current.val:
                previous = previous.next
            current.next = previous.next
            previous.next = current
            current = next_node
        return dummy.next`,
    better:{
      title:'归并排序链表',
      complexity:'时间 O(n log n)，递归栈空间 O(log n)。',
      code:`from typing import Optional

class Solution:
    def insertionSortList(self, head: Optional['ListNode']) -> Optional['ListNode']:
        if not head or not head.next:
            return head

        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        right_head = slow.next
        slow.next = None

        left = self.insertionSortList(head)
        right = self.insertionSortList(right_head)
        dummy = ListNode(0)
        tail = dummy
        while left and right:
            if left.val <= right.val:
                tail.next, left = left, left.next
            else:
                tail.next, right = right, right.next
            tail = tail.next
        tail.next = left or right
        return dummy.next`
    }
  },
  'beautiful-array':{
    approach:'分治构造：先由较小漂亮数组映射出所有奇数，再映射出所有偶数，奇偶两部分拼接后仍满足性质。',
    complexity:'时间 O(n log n)，空间 O(n log n)（含递归返回数组）。',
    code:`from typing import List

class Solution:
    def beautifulArray(self, n: int) -> List[int]:
        def build(size: int) -> List[int]:
            if size == 1:
                return [1]
            odds = [2 * value - 1 for value in build((size + 1) // 2)]
            evens = [2 * value for value in build(size // 2)]
            return odds + evens

        return build(n)`,
    better:{
      title:'迭代倍增构造',
      complexity:'时间 O(n)，空间 O(n)。',
      code:`from typing import List

class Solution:
    def beautifulArray(self, n: int) -> List[int]:
        answer = [1]
        while len(answer) < n:
            answer = (
                [2 * value - 1 for value in answer if 2 * value - 1 <= n]
                + [2 * value for value in answer if 2 * value <= n]
            )
        return answer`
    }
  },
  'construct-binary-tree-from-inorder-and-postorder-traversal':{
    approach:'后序最后一个值是当前根；中序中的根位置把问题分成左右子树。先构建右子树以匹配后序从末尾弹出的顺序。',
    complexity:'时间 O(n)，空间 O(n)。',
    code:`from typing import List, Optional

class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional['TreeNode']:
        positions = {value: index for index, value in enumerate(inorder)}

        def build(left: int, right: int) -> Optional['TreeNode']:
            if left > right:
                return None
            root_value = postorder.pop()
            root = TreeNode(root_value)
            middle = positions[root_value]
            root.right = build(middle + 1, right)
            root.left = build(left, middle - 1)
            return root

        return build(0, len(inorder) - 1)`
  },
  'reverse-pairs':{
    approach:'归并排序时两个半区已有序，用右指针单调移动即可统计左半区每个数能组成的翻转对，再线性合并。',
    complexity:'时间 O(n log n)，空间 O(n)。',
    code:`from typing import List

class Solution:
    def reversePairs(self, nums: List[int]) -> int:
        buffer = [0] * len(nums)

        def sort_and_count(left: int, right: int) -> int:
            if left >= right:
                return 0
            middle = (left + right) // 2
            count = sort_and_count(left, middle) + sort_and_count(middle + 1, right)

            scan = middle + 1
            for i in range(left, middle + 1):
                while scan <= right and nums[i] > 2 * nums[scan]:
                    scan += 1
                count += scan - (middle + 1)

            i, j, write = left, middle + 1, left
            while i <= middle and j <= right:
                if nums[i] <= nums[j]:
                    buffer[write] = nums[i]
                    i += 1
                else:
                    buffer[write] = nums[j]
                    j += 1
                write += 1
            while i <= middle:
                buffer[write] = nums[i]
                i += 1
                write += 1
            while j <= right:
                buffer[write] = nums[j]
                j += 1
                write += 1
            nums[left:right + 1] = buffer[left:right + 1]
            return count

        return sort_and_count(0, len(nums) - 1)`
  }
};
