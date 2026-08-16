'use strict';

/*
 * Official Data Structures and Algorithms Quest solutions, units 5-8.
 * Each snippet uses the signature expected by LeetCode's Python 3 runner.
 */
const ALGO_SOLUTIONS_B={
  "linked-list-cycle":{
    approach:"使用龟兔快慢指针。若存在环，快指针最终会与慢指针相遇。",
    complexity:"时间 O(n)，空间 O(1)。",
    code:`from typing import Optional

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False`
  },
  "3sum-closest":{
    approach:"先排序，固定一个数后用双指针向目标值收缩。",
    complexity:"时间 O(n^2)，除排序外空间 O(1)。",
    code:`from typing import List

class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        best = nums[0] + nums[1] + nums[2]

        for i in range(len(nums) - 2):
            left, right = i + 1, len(nums) - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if abs(total - target) < abs(best - target):
                    best = total
                if total < target:
                    left += 1
                elif total > target:
                    right -= 1
                else:
                    return target
        return best`
  },
  "magical-string":{
    approach:"用读指针读取连续段长度，用写指针追加下一个交替数字，生成自描述字符串。",
    complexity:"时间 O(n)，空间 O(n)。",
    code:`class Solution:
    def magicalString(self, n: int) -> int:
        if n <= 0:
            return 0
        if n <= 3:
            return 1

        sequence = [1, 2, 2]
        head = 2
        next_value = 1
        ones = 1

        while len(sequence) < n:
            run_length = sequence[head]
            head += 1
            for _ in range(run_length):
                sequence.append(next_value)
                if len(sequence) <= n and next_value == 1:
                    ones += 1
            next_value = 3 - next_value
        return ones`
  },
  "contains-duplicate-ii":{
    approach:"记录每个数最近一次出现的位置；重复时比较下标距离。",
    complexity:"时间 O(n)，空间 O(n)。",
    code:`from typing import List

class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        last_index = {}
        for index, value in enumerate(nums):
            if value in last_index and index - last_index[value] <= k:
                return True
            last_index[value] = index
        return False`
  },
  "number-of-substrings-containing-all-three-characters":{
    approach:"对每个右端点，a、b、c 最后出现位置的最小值决定可选起点数。",
    complexity:"时间 O(n)，空间 O(1)。",
    code:`class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        last = [-1, -1, -1]
        answer = 0

        for right, char in enumerate(s):
            last[ord(char) - ord('a')] = right
            answer += min(last) + 1
        return answer`
  },
  "longest-repeating-character-replacement":{
    approach:"维护滑动窗口，使除窗口最高频字符外的其余字符数量不超过 k。",
    complexity:"时间 O(n)，空间 O(1)，字母表大小固定。",
    code:`from collections import defaultdict

class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = defaultdict(int)
        left = 0
        most_frequent = 0
        answer = 0

        for right, char in enumerate(s):
            count[char] += 1
            most_frequent = max(most_frequent, count[char])

            while right - left + 1 - most_frequent > k:
                count[s[left]] -= 1
                left += 1
            answer = max(answer, right - left + 1)
        return answer`
  },
  "shortest-palindrome":{
    approach:"用滚动哈希找到最长回文前缀，再把剩余后缀翻转后前置。",
    complexity:"时间 O(n)，除返回字符串外空间 O(1)。",
    code:`class Solution:
    def shortestPalindrome(self, s: str) -> str:
        base = 131
        mod = 1_000_000_007
        forward = backward = 0
        power = 1
        prefix_length = 0

        for index, char in enumerate(s):
            value = ord(char)
            forward = (forward * base + value) % mod
            backward = (backward + value * power) % mod
            if forward == backward:
                prefix_length = index + 1
            power = (power * base) % mod

        return s[prefix_length:][::-1] + s`,
    better:{
      title:"确定性的前缀函数解法",
      approach:"在原串、分隔符和反转串的拼接结果上计算最长公共前后缀，可无哈希碰撞地确定最长回文前缀。",
      complexity:"时间 O(n)，空间 O(n)。",
      code:`class Solution:
    def shortestPalindrome(self, s: str) -> str:
        combined = s + '#' + s[::-1]
        lps = [0] * len(combined)

        for i in range(1, len(combined)):
            length = lps[i - 1]
            while length and combined[i] != combined[length]:
                length = lps[length - 1]
            if combined[i] == combined[length]:
                length += 1
            lps[i] = length

        prefix_length = lps[-1]
        return s[prefix_length:][::-1] + s`
    }
  },
  "longest-happy-prefix":{
    approach:"同步扫描正向和反向滚动哈希；哈希相等时得到一个候选公共前后缀。",
    complexity:"时间 O(n)，空间 O(1)。",
    code:`class Solution:
    def longestPrefix(self, s: str) -> str:
        base = 131
        mod = 1_000_000_007
        forward = backward = 0
        power = 1
        best = 0

        for i in range(len(s) - 1):
            forward = (forward * base + ord(s[i])) % mod
            backward = (backward + ord(s[-1 - i]) * power) % mod
            if forward == backward:
                best = i + 1
            power = (power * base) % mod
        return s[:best]`,
    better:{
      title:"确定性的公共前后缀解法",
      approach:"最终前缀函数值就是最长的非完整公共前后缀长度。",
      complexity:"时间 O(n)，空间 O(n)。",
      code:`class Solution:
    def longestPrefix(self, s: str) -> str:
        lps = [0] * len(s)
        for i in range(1, len(s)):
            length = lps[i - 1]
            while length and s[i] != s[length]:
                length = lps[length - 1]
            if s[i] == s[length]:
                length += 1
            lps[i] = length
        return s[:lps[-1]] if s else ''`
    }
  },
  "sum-of-scores-of-built-strings":{
    approach:"用滚动哈希配合二分，求完整字符串与每个后缀的最长公共前缀。",
    complexity:"时间 O(n log n)，空间 O(n)。",
    code:`class Solution:
    def sumScores(self, s: str) -> int:
        n = len(s)
        base = 911382323
        mod = 1_000_000_007
        prefix = [0] * (n + 1)
        powers = [1] * (n + 1)

        for i, char in enumerate(s):
            prefix[i + 1] = (prefix[i] * base + ord(char)) % mod
            powers[i + 1] = powers[i] * base % mod

        def hash_of(left: int, right: int) -> int:
            return (prefix[right] - prefix[left] * powers[right - left]) % mod

        answer = 0
        for start in range(n):
            low, high = 0, n - start
            while low < high:
                middle = (low + high + 1) // 2
                if hash_of(0, middle) == hash_of(start, start + middle):
                    low = middle
                else:
                    high = middle - 1
            answer += low
        return answer`,
    better:{
      title:"线性前缀匹配算法",
      approach:"每个后缀的 Z 值就是该后缀的得分，一次线性扫描即可求和。",
      complexity:"时间 O(n)，空间 O(n)。",
      code:`class Solution:
    def sumScores(self, s: str) -> int:
        n = len(s)
        z = [0] * n
        left = right = 0

        for i in range(1, n):
            if i <= right:
                z[i] = min(right - i + 1, z[i - left])
            while i + z[i] < n and s[z[i]] == s[i + z[i]]:
                z[i] += 1
            if i + z[i] - 1 > right:
                left, right = i, i + z[i] - 1
        return n + sum(z)`
    }
  },
  "merge-two-sorted-lists":{
    approach:"递归选择较小的链表头，其后继指针指向剩余部分的递归合并结果。",
    complexity:"时间 O(m + n)，递归栈空间 O(m + n)。",
    code:`from typing import Optional

class Solution:
    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        if not list1:
            return list2
        if not list2:
            return list1
        if list1.val <= list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        list2.next = self.mergeTwoLists(list1, list2.next)
        return list2`
  },
  "find-kth-bit-in-nth-binary-string":{
    approach:"利用 S_n 的递归镜像结构。右半段位置可映射到 S_(n-1) 的镜像位置并翻转一次。",
    complexity:"时间 O(n)，递归栈空间 O(n)。",
    code:`class Solution:
    def findKthBit(self, n: int, k: int) -> str:
        if n == 1:
            return '0'
        middle = 1 << (n - 1)
        if k == middle:
            return '1'
        if k < middle:
            return self.findKthBit(n - 1, k)

        mirrored = (1 << n) - k
        bit = self.findKthBit(n - 1, mirrored)
        return '0' if bit == '1' else '1'`
  },
  "decode-string":{
    approach:"递归解析器逐段处理括号表达式，遇到对应右括号时返回。",
    complexity:"时间 O(输出长度)，空间 O(递归深度 + 输出长度)。",
    code:`class Solution:
    def decodeString(self, s: str) -> str:
        index = 0

        def decode() -> str:
            nonlocal index
            pieces = []
            while index < len(s) and s[index] != ']':
                if s[index].isdigit():
                    repeat = 0
                    while s[index].isdigit():
                        repeat = repeat * 10 + int(s[index])
                        index += 1
                    index += 1  # Skip '['.
                    nested = decode()
                    index += 1  # Skip ']'.
                    pieces.append(nested * repeat)
                else:
                    pieces.append(s[index])
                    index += 1
            return ''.join(pieces)

        return decode()`
  },
  "combinations":{
    approach:"按递增候选数回溯，使每个组合只生成一次。",
    complexity:"时间 O(C(n, k) * k)，除输出外空间 O(k)。",
    code:`from typing import List

class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        answer = []
        path = []

        def backtrack(start: int) -> None:
            if len(path) == k:
                answer.append(path[:])
                return
            needed = k - len(path)
            for value in range(start, n - needed + 2):
                path.append(value)
                backtrack(value + 1)
                path.pop()

        backtrack(1)
        return answer`
  },
  "restore-ip-addresses":{
    approach:"回溯选择下一段的 1 至 3 位数字，立即剪枝前导零和大于 255 的段。",
    complexity:"四段数量固定，时间 O(1)，除输出外空间 O(1)。",
    code:`from typing import List

class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        answer = []
        path = []

        def backtrack(index: int) -> None:
            remaining_segments = 4 - len(path)
            remaining_chars = len(s) - index
            if remaining_chars < remaining_segments or remaining_chars > 3 * remaining_segments:
                return
            if len(path) == 4:
                if index == len(s):
                    answer.append('.'.join(path))
                return

            value = 0
            for end in range(index, min(index + 3, len(s))):
                if end > index and s[index] == '0':
                    break
                value = value * 10 + int(s[end])
                if value > 255:
                    break
                path.append(s[index:end + 1])
                backtrack(end + 1)
                path.pop()

        backtrack(0)
        return answer`
  },
  "the-k-th-lexicographical-string-of-all-happy-strings-of-length-n":{
    approach:"按字典序深度优先搜索，并禁止当前字符与前一字符相同。",
    complexity:"时间 O(3 * 2^(n-1))，空间 O(n)。",
    code:`class Solution:
    def getHappyString(self, n: int, k: int) -> str:
        answer = ''
        path = []

        def backtrack() -> bool:
            nonlocal k, answer
            if len(path) == n:
                k -= 1
                if k == 0:
                    answer = ''.join(path)
                    return True
                return False

            for char in 'abc':
                if path and path[-1] == char:
                    continue
                path.append(char)
                if backtrack():
                    return True
                path.pop()
            return False

        backtrack()
        return answer`
  },
  "longest-consecutive-sequence":{
    approach:"使用并查集连接每个数与其存在的前驱，最后取最大连通块大小。",
    complexity:"时间 O(n alpha(n))，空间 O(n)。",
    code:`from typing import List

class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        values = list(set(nums))
        index = {value: i for i, value in enumerate(values)}
        parent = list(range(len(values)))
        size = [1] * len(values)

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int) -> None:
            root_a, root_b = find(a), find(b)
            if root_a == root_b:
                return
            if size[root_a] < size[root_b]:
                root_a, root_b = root_b, root_a
            parent[root_b] = root_a
            size[root_a] += size[root_b]

        for value, i in index.items():
            if value - 1 in index:
                union(i, index[value - 1])
        return max((size[find(i)] for i in range(len(values))), default=0)`
  },
  "largest-component-size-by-common-factor":{
    approach:"分解每个数的质因子，并将其下标与最先拥有该质因子的下标合并。",
    complexity:"时间 O(n sqrt(M) alpha(n))，空间 O(n + 质因子数)。",
    code:`from typing import List

class Solution:
    def largestComponentSize(self, nums: List[int]) -> int:
        n = len(nums)
        parent = list(range(n))
        size = [1] * n

        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(a: int, b: int) -> None:
            root_a, root_b = find(a), find(b)
            if root_a == root_b:
                return
            if size[root_a] < size[root_b]:
                root_a, root_b = root_b, root_a
            parent[root_b] = root_a
            size[root_a] += size[root_b]

        owner = {}
        for i, value in enumerate(nums):
            x = value
            factor = 2
            while factor * factor <= x:
                if x % factor == 0:
                    if factor in owner:
                        union(i, owner[factor])
                    else:
                        owner[factor] = i
                    while x % factor == 0:
                        x //= factor
                factor += 1
            if x > 1:
                if x in owner:
                    union(i, owner[x])
                else:
                    owner[x] = i
        return max(size[find(i)] for i in range(n))`
  },
  "process-restricted-friend-requests":{
    approach:"对每个请求，在并查集合并前检查两个当前连通块之间是否存在限制关系。",
    complexity:"直接检查限制时，时间 O((R + Q) alpha(n) + RQ)，空间 O(n + R)。",
    code:`from typing import List

class Solution:
    def friendRequests(
        self,
        n: int,
        restrictions: List[List[int]],
        requests: List[List[int]],
    ) -> List[bool]:
        parent = list(range(n))
        size = [1] * n

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int) -> None:
            root_a, root_b = find(a), find(b)
            if size[root_a] < size[root_b]:
                root_a, root_b = root_b, root_a
            parent[root_b] = root_a
            size[root_a] += size[root_b]

        answer = []
        for a, b in requests:
            root_a, root_b = find(a), find(b)
            allowed = True
            if root_a != root_b:
                for x, y in restrictions:
                    root_x, root_y = find(x), find(y)
                    if ((root_x == root_a and root_y == root_b)
                            or (root_x == root_b and root_y == root_a)):
                        allowed = False
                        break
            answer.append(allowed)
            if allowed and root_a != root_b:
                union(root_a, root_b)
        return answer`
  },
  "minimum-number-of-vertices-to-reach-all-nodes":{
    approach:"入度为零的点必须选入；有向无环图中其余点都可由某个源点到达。",
    complexity:"时间 O(n + e)，空间 O(n)。",
    code:`from typing import List

class Solution:
    def findSmallestSetOfVertices(
        self, n: int, edges: List[List[int]]
    ) -> List[int]:
        has_incoming = [False] * n
        for _, target in edges:
            has_incoming[target] = True
        return [node for node in range(n) if not has_incoming[node]]`
  },
  "add-edges-to-make-degrees-of-all-nodes-even":{
    approach:"奇度顶点只能有 0、2 或 4 个；枚举至多添加两条不存在的边能否修复这些情况。",
    complexity:"时间 O(n + e)，空间 O(n + e)。",
    code:`from typing import List

class Solution:
    def isPossible(self, n: int, edges: List[List[int]]) -> bool:
        degree = [0] * (n + 1)
        existing = set()
        for a, b in edges:
            degree[a] += 1
            degree[b] += 1
            existing.add((min(a, b), max(a, b)))

        odd = [node for node in range(1, n + 1) if degree[node] % 2]

        def missing(a: int, b: int) -> bool:
            return (min(a, b), max(a, b)) not in existing

        if not odd:
            return True
        if len(odd) == 2:
            a, b = odd
            if missing(a, b):
                return True
            return any(node not in (a, b) and missing(a, node) and missing(b, node)
                       for node in range(1, n + 1))
        if len(odd) == 4:
            a, b, c, d = odd
            return ((missing(a, b) and missing(c, d))
                    or (missing(a, c) and missing(b, d))
                    or (missing(a, d) and missing(b, c)))
        return False`
  },
  "maximum-path-quality-of-a-graph":{
    approach:"深度优先搜索所有时间可行的路径，仅在首次访问节点时计入其价值，并在回到 0 号点时更新答案。",
    complexity:"时间随最大路径长度呈指数增长，空间 O(n + e)。",
    code:`from collections import defaultdict
from typing import List

class Solution:
    def maximalPathQuality(
        self, values: List[int], edges: List[List[int]], maxTime: int
    ) -> int:
        graph = defaultdict(list)
        for a, b, time in edges:
            graph[a].append((b, time))
            graph[b].append((a, time))

        visits = [0] * len(values)
        visits[0] = 1
        answer = values[0]

        def dfs(node: int, elapsed: int, score: int) -> None:
            nonlocal answer
            if node == 0:
                answer = max(answer, score)
            for neighbor, cost in graph[node]:
                if elapsed + cost > maxTime:
                    continue
                gained = values[neighbor] if visits[neighbor] == 0 else 0
                visits[neighbor] += 1
                dfs(neighbor, elapsed + cost, score + gained)
                visits[neighbor] -= 1

        dfs(0, 0, values[0])
        return answer`
  },
  "find-if-path-exists-in-graph":{
    approach:"在无向图中进行深度优先搜索，直到到达终点。",
    complexity:"时间 O(n + e)，空间 O(n + e)。",
    code:`from typing import List

class Solution:
    def validPath(
        self, n: int, edges: List[List[int]], source: int, destination: int
    ) -> bool:
        graph = [[] for _ in range(n)]
        for a, b in edges:
            graph[a].append(b)
            graph[b].append(a)

        stack = [source]
        seen = {source}
        while stack:
            node = stack.pop()
            if node == destination:
                return True
            for neighbor in graph[node]:
                if neighbor not in seen:
                    seen.add(neighbor)
                    stack.append(neighbor)
        return False`
  },
  "all-paths-from-source-to-target":{
    approach:"从起点沿每条有向边回溯，到达终点时记录当前路径。",
    complexity:"时间与所有输出路径总量成正比，除输出外空间 O(n)。",
    code:`from typing import List

class Solution:
    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        target = len(graph) - 1
        answer = []
        path = [0]

        def dfs(node: int) -> None:
            if node == target:
                answer.append(path[:])
                return
            for neighbor in graph[node]:
                path.append(neighbor)
                dfs(neighbor)
                path.pop()

        dfs(0)
        return answer`
  },
  "minimum-score-of-a-path-between-two-cities":{
    approach:"从城市 1 深度优先搜索所在连通块；该连通块中的任意边都可能出现在一条可行路径上，取最小边权即可。",
    complexity:"时间 O(n + e)，空间 O(n + e)。",
    code:`from typing import List

class Solution:
    def minScore(self, n: int, roads: List[List[int]]) -> int:
        graph = [[] for _ in range(n + 1)]
        for a, b, distance in roads:
            graph[a].append((b, distance))
            graph[b].append((a, distance))

        answer = float('inf')
        stack = [1]
        seen = {1}
        while stack:
            city = stack.pop()
            for neighbor, distance in graph[city]:
                answer = min(answer, distance)
                if neighbor not in seen:
                    seen.add(neighbor)
                    stack.append(neighbor)
        return answer`
  },
  "island-perimeter":{
    approach:"迭代深度优先搜索岛屿；每条接触水域或边界的边对周长贡献 1。",
    complexity:"时间 O(m * n)，最坏空间 O(m * n)。",
    code:`from typing import List

class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == 1:
                    perimeter = 0
                    stack = [(row, col)]
                    seen = {(row, col)}
                    while stack:
                        current_row, current_col = stack.pop()
                        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                            nr, nc = current_row + dr, current_col + dc
                            if nr < 0 or nr == rows or nc < 0 or nc == cols or grid[nr][nc] == 0:
                                perimeter += 1
                            elif (nr, nc) not in seen:
                                seen.add((nr, nc))
                                stack.append((nr, nc))
                    return perimeter
        return 0`
  },
  "count-the-number-of-complete-components":{
    approach:"深度优先搜索每个连通块，统计顶点数和度数和；若度数和为 v * (v - 1)，该连通块就是完全图。",
    complexity:"时间 O(n + e)，空间 O(n + e)。",
    code:`from typing import List

class Solution:
    def countCompleteComponents(self, n: int, edges: List[List[int]]) -> int:
        graph = [[] for _ in range(n)]
        for a, b in edges:
            graph[a].append(b)
            graph[b].append(a)

        seen = [False] * n
        answer = 0
        for start in range(n):
            if seen[start]:
                continue
            stack = [start]
            seen[start] = True
            vertices = degree_sum = 0
            while stack:
                node = stack.pop()
                vertices += 1
                degree_sum += len(graph[node])
                for neighbor in graph[node]:
                    if not seen[neighbor]:
                        seen[neighbor] = True
                        stack.append(neighbor)
            if degree_sum == vertices * (vertices - 1):
                answer += 1
        return answer`
  },
  "map-of-highest-peak":{
    approach:"从所有水域格子同时开始多源广度优先搜索，为每个陆地格子赋予到水域的最短距离。",
    complexity:"时间 O(m * n)，空间 O(m * n)。",
    code:`from collections import deque
from typing import List

class Solution:
    def highestPeak(self, isWater: List[List[int]]) -> List[List[int]]:
        rows, cols = len(isWater), len(isWater[0])
        answer = [[-1] * cols for _ in range(rows)]
        queue = deque()

        for row in range(rows):
            for col in range(cols):
                if isWater[row][col]:
                    answer[row][col] = 0
                    queue.append((row, col))

        while queue:
            row, col = queue.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = row + dr, col + dc
                if 0 <= nr < rows and 0 <= nc < cols and answer[nr][nc] == -1:
                    answer[nr][nc] = answer[row][col] + 1
                    queue.append((nr, nc))
        return answer`
  },
  "get-watched-videos-by-your-friends":{
    approach:"广度优先搜索恰好到指定好友层级，再统计该层观看的视频并按频次、字典序排序。",
    complexity:"时间 O(n + e + v log v)，空间 O(n + v)。",
    code:`from collections import Counter, deque
from typing import List

class Solution:
    def watchedVideosByFriends(
        self,
        watchedVideos: List[List[str]],
        friends: List[List[int]],
        id: int,
        level: int,
    ) -> List[str]:
        queue = deque([id])
        seen = {id}

        for _ in range(level):
            for _ in range(len(queue)):
                person = queue.popleft()
                for friend in friends[person]:
                    if friend not in seen:
                        seen.add(friend)
                        queue.append(friend)

        count = Counter()
        for person in queue:
            count.update(watchedVideos[person])
        return sorted(count, key=lambda video: (count[video], video))`
  },
  "shortest-path-with-alternating-colors":{
    approach:"广度优先搜索状态记录上一条边的颜色，下一步只能沿相反颜色的邻接表扩展。",
    complexity:"时间 O(n + 红边数 + 蓝边数)，空间 O(n + e)。",
    code:`from collections import deque
from typing import List

class Solution:
    def shortestAlternatingPaths(
        self, n: int, redEdges: List[List[int]], blueEdges: List[List[int]]
    ) -> List[int]:
        graph = [[[] for _ in range(n)] for _ in range(2)]
        for a, b in redEdges:
            graph[0][a].append(b)
        for a, b in blueEdges:
            graph[1][a].append(b)

        answer = [-1] * n
        answer[0] = 0
        queue = deque([(0, 0), (0, 1)])
        seen = {(0, 0), (0, 1)}
        distance = 0

        while queue:
            for _ in range(len(queue)):
                node, last_color = queue.popleft()
                answer[node] = distance if answer[node] == -1 else min(answer[node], distance)
                next_color = 1 - last_color
                for neighbor in graph[next_color][node]:
                    state = (neighbor, next_color)
                    if state not in seen:
                        seen.add(state)
                        queue.append(state)
            distance += 1
        return answer`
  },
  "bus-routes":{
    approach:"对公交线路而非站点做广度优先搜索：从已到达站点乘上任一未访问线路，换乘数加 1。",
    complexity:"时间 O(所有线路站点数)，空间 O(所有线路站点数)。",
    code:`from collections import defaultdict, deque
from typing import List

class Solution:
    def numBusesToDestination(self, routes: List[List[int]], source: int, target: int) -> int:
        if source == target:
            return 0

        buses_at_stop = defaultdict(list)
        for bus, route in enumerate(routes):
            for stop in route:
                buses_at_stop[stop].append(bus)

        queue = deque([source])
        seen_stops = {source}
        used_buses = set()
        buses_taken = 0

        while queue:
            buses_taken += 1
            for _ in range(len(queue)):
                stop = queue.popleft()
                for bus in buses_at_stop[stop]:
                    if bus in used_buses:
                        continue
                    used_buses.add(bus)
                    for next_stop in routes[bus]:
                        if next_stop == target:
                            return buses_taken
                        if next_stop not in seen_stops:
                            seen_stops.add(next_stop)
                            queue.append(next_stop)
        return -1`
  },
  "network-delay-time":{
    approach:"迪杰斯特拉算法反复确定当前距源点最近的未处理节点。",
    complexity:"时间 O((n + e) log n)，空间 O(n + e)。",
    code:`import heapq
from collections import defaultdict
from typing import List

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        graph = defaultdict(list)
        for source, target, time in times:
            graph[source].append((target, time))

        distance = [float('inf')] * (n + 1)
        distance[k] = 0
        heap = [(0, k)]
        while heap:
            elapsed, node = heapq.heappop(heap)
            if elapsed != distance[node]:
                continue
            for neighbor, cost in graph[node]:
                candidate = elapsed + cost
                if candidate < distance[neighbor]:
                    distance[neighbor] = candidate
                    heapq.heappush(heap, (candidate, neighbor))

        answer = max(distance[1:])
        return -1 if answer == float('inf') else answer`
  },
  "minimum-weighted-subgraph-with-the-required-paths":{
    approach:"在正图中从两个源点分别运行迪杰斯特拉算法，在反图中从终点运行一次，再枚举最佳汇合点。",
    complexity:"时间 O((n + e) log n)，空间 O(n + e)。",
    code:`import heapq
from typing import List

class Solution:
    def minimumWeight(
        self,
        n: int,
        edges: List[List[int]],
        src1: int,
        src2: int,
        dest: int,
    ) -> int:
        graph = [[] for _ in range(n)]
        reverse = [[] for _ in range(n)]
        for a, b, weight in edges:
            graph[a].append((b, weight))
            reverse[b].append((a, weight))

        def dijkstra(start: int, adjacency: List[List[tuple]]) -> List[int]:
            distance = [float('inf')] * n
            distance[start] = 0
            heap = [(0, start)]
            while heap:
                cost, node = heapq.heappop(heap)
                if cost != distance[node]:
                    continue
                for neighbor, weight in adjacency[node]:
                    candidate = cost + weight
                    if candidate < distance[neighbor]:
                        distance[neighbor] = candidate
                        heapq.heappush(heap, (candidate, neighbor))
            return distance

        first = dijkstra(src1, graph)
        second = dijkstra(src2, graph)
        tail = dijkstra(dest, reverse)
        answer = min(first[node] + second[node] + tail[node] for node in range(n))
        return -1 if answer == float('inf') else answer`
  },
  "design-graph-with-shortest-path-calculator":{
    approach:"维护有向带权邻接表；每次最短路查询运行迪杰斯特拉算法，适配在线加边。",
    complexity:"添加边时间 O(1)，最短路查询时间 O((n + e) log n)，空间 O(n + e)。",
    code:`import heapq
from typing import List

class Graph:
    def __init__(self, n: int, edges: List[List[int]]):
        self.graph = [[] for _ in range(n)]
        for source, target, cost in edges:
            self.graph[source].append((target, cost))

    def addEdge(self, edge: List[int]) -> None:
        source, target, cost = edge
        self.graph[source].append((target, cost))

    def shortestPath(self, node1: int, node2: int) -> int:
        distance = [float('inf')] * len(self.graph)
        distance[node1] = 0
        heap = [(0, node1)]
        while heap:
            cost, node = heapq.heappop(heap)
            if node == node2:
                return cost
            if cost != distance[node]:
                continue
            for neighbor, weight in self.graph[node]:
                candidate = cost + weight
                if candidate < distance[neighbor]:
                    distance[neighbor] = candidate
                    heapq.heappush(heap, (candidate, neighbor))
        return -1`
  },
  "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance":{
    approach:"从每座城市运行迪杰斯特拉算法，统计阈值内可达城市数；按城市编号降序处理以满足并列规则。",
    complexity:"时间 O(n (n + e) log n)，空间 O(n + e)。",
    code:`import heapq
from typing import List

class Solution:
    def findTheCity(
        self, n: int, edges: List[List[int]], distanceThreshold: int
    ) -> int:
        graph = [[] for _ in range(n)]
        for a, b, weight in edges:
            graph[a].append((b, weight))
            graph[b].append((a, weight))

        best_city = -1
        fewest = float('inf')
        for source in range(n - 1, -1, -1):
            distance = [float('inf')] * n
            distance[source] = 0
            heap = [(0, source)]
            while heap:
                cost, node = heapq.heappop(heap)
                if cost != distance[node]:
                    continue
                for neighbor, weight in graph[node]:
                    candidate = cost + weight
                    if candidate < distance[neighbor] and candidate <= distanceThreshold:
                        distance[neighbor] = candidate
                        heapq.heappush(heap, (candidate, neighbor))
            reachable = sum(cost <= distanceThreshold for cost in distance) - 1
            if reachable < fewest:
                fewest = reachable
                best_city = source
        return best_city`
  },
  "root-equals-sum-of-children":{
    approach:"直接比较根节点值与两个子节点值之和。",
    complexity:"时间 O(1)，空间 O(1)。",
    code:`from typing import Optional

class Solution:
    def checkTree(self, root: Optional[TreeNode]) -> bool:
        return root.val == root.left.val + root.right.val`
  },
  "create-binary-tree-from-descriptions":{
    approach:"通过值到节点的映射创建或获取节点，按描述连接父子关系，返回唯一未被标记为子节点的节点。",
    complexity:"时间 O(n)，空间 O(n)。",
    code:`from typing import List, Optional

class Solution:
    def createBinaryTree(self, descriptions: List[List[int]]) -> Optional[TreeNode]:
        nodes = {}
        children = set()

        for parent_value, child_value, is_left in descriptions:
            parent = nodes.setdefault(parent_value, TreeNode(parent_value))
            child = nodes.setdefault(child_value, TreeNode(child_value))
            if is_left:
                parent.left = child
            else:
                parent.right = child
            children.add(child_value)

        root_value = next(value for value in nodes if value not in children)
        return nodes[root_value]`
  },
  "longest-univalue-path":{
    approach:"迭代后序遍历计算每个节点向下的最长同值链，并合并左右匹配链更新答案。",
    complexity:"时间 O(n)，空间 O(n)。",
    code:`from typing import Optional

class Solution:
    def longestUnivaluePath(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        answer = 0
        chain = {}
        stack = [(root, False)]
        while stack:
            node, expanded = stack.pop()
            if not node:
                continue
            if not expanded:
                stack.append((node, True))
                stack.append((node.right, False))
                stack.append((node.left, False))
                continue
            left_length = chain.get(node.left, 0)
            right_length = chain.get(node.right, 0)
            left_path = left_length + 1 if node.left and node.left.val == node.val else 0
            right_path = right_length + 1 if node.right and node.right.val == node.val else 0
            answer = max(answer, left_path + right_path)
            chain[node] = max(left_path, right_path)
        return answer`
  },
  "search-in-a-binary-search-tree":{
    approach:"按二叉搜索树的大小关系向下查找，直到找到目标或走到空节点。",
    complexity:"时间 O(h)，空间 O(1)。",
    code:`from typing import Optional

class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        while root and root.val != val:
            root = root.left if val < root.val else root.right
        return root`
  },
  "insert-into-a-binary-search-tree":{
    approach:"按二叉搜索树性质递归向下，在空位置挂接新叶子节点。",
    complexity:"时间 O(h)，递归栈空间 O(h)。",
    code:`from typing import Optional

class Solution:
    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        if not root:
            return TreeNode(val)
        if val < root.val:
            root.left = self.insertIntoBST(root.left, val)
        else:
            root.right = self.insertIntoBST(root.right, val)
        return root`
  },
  "delete-node-in-a-bst":{
    approach:"迭代按二叉搜索树性质定位节点；双子节点时把中序后继移到当前位置，否则连接唯一子节点。",
    complexity:"时间 O(h)，空间 O(1)。",
    code:`from typing import Optional

class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        parent = None
        node = root
        while node and node.val != key:
            parent = node
            node = node.left if key < node.val else node.right
        if not node:
            return root

        def replace(parent: Optional[TreeNode], old: TreeNode, new: Optional[TreeNode]) -> Optional[TreeNode]:
            if not parent:
                return new
            if parent.left is old:
                parent.left = new
            else:
                parent.right = new
            return root

        if not node.left:
            return replace(parent, node, node.right)
        if not node.right:
            return replace(parent, node, node.left)

        successor_parent = node
        successor = node.right
        while successor.left:
            successor_parent = successor
            successor = successor.left
        if successor_parent is not node:
            successor_parent.left = successor.right
            successor.right = node.right
        successor.left = node.left
        if not parent:
            return successor
        if parent.left is node:
            parent.left = successor
        else:
            parent.right = successor
        return root`
  },
  "range-sum-query-mutable":{
    approach:"树状数组维护前缀和增量，支持对数时间的单点更新和区间求和。",
    complexity:"初始化时间 O(n log n)，更新与区间求和时间 O(log n)，空间 O(n)。",
    code:`from typing import List

class NumArray:
    def __init__(self, nums: List[int]):
        self.nums = nums[:]
        self.tree = [0] * (len(nums) + 1)
        for index, value in enumerate(nums, 1):
            self._add(index, value)

    def _add(self, index: int, delta: int) -> None:
        while index < len(self.tree):
            self.tree[index] += delta
            index += index & -index

    def _sum(self, index: int) -> int:
        total = 0
        while index:
            total += self.tree[index]
            index -= index & -index
        return total

    def update(self, index: int, val: int) -> None:
        self._add(index + 1, val - self.nums[index])
        self.nums[index] = val

    def sumRange(self, left: int, right: int) -> int:
        return self._sum(right + 1) - self._sum(left)`
  },
  "find-building-where-alice-and-bob-can-meet":{
    approach:"线段树维护区间最大高度；对未直接确定的查询，向下寻找两人右侧首个高于阈值的位置。",
    complexity:"时间 O((n + q) log n)，空间 O(n)。",
    code:`from typing import List

class Solution:
    def leftmostBuildingQueries(
        self, heights: List[int], queries: List[List[int]]
    ) -> List[int]:
        n = len(heights)
        size = 1
        while size < n:
            size *= 2
        tree = [0] * (2 * size)
        tree[size:size + n] = heights
        for node in range(size - 1, 0, -1):
            tree[node] = max(tree[node * 2], tree[node * 2 + 1])

        def first_above(node: int, left: int, right: int, start: int, threshold: int) -> int:
            if right <= start or tree[node] <= threshold:
                return -1
            if right - left == 1:
                return left
            middle = (left + right) // 2
            result = first_above(node * 2, left, middle, start, threshold)
            if result != -1:
                return result
            return first_above(node * 2 + 1, middle, right, start, threshold)

        answer = []
        for a, b in queries:
            if a > b:
                a, b = b, a
            if a == b or heights[a] < heights[b]:
                answer.append(b)
            else:
                answer.append(first_above(1, 0, size, b + 1, heights[a]))
        return answer`
  },
  "my-calendar-ii":{
    approach:"动态线段树维护全坐标范围的最大重叠数；若更新后出现三重预订则回滚。",
    complexity:"每次预订时间 O(log U)，空间 O(q log U)。",
    code:`class Node:
    __slots__ = ('left', 'right', 'maximum', 'lazy')

    def __init__(self):
        self.left = None
        self.right = None
        self.maximum = 0
        self.lazy = 0

class MyCalendarTwo:
    def __init__(self):
        self.root = Node()

    def _update(self, node: Node, start: int, end: int, left: int, right: int, delta: int) -> None:
        if right <= start or end <= left:
            return
        if left <= start and end <= right:
            node.maximum += delta
            node.lazy += delta
            return
        middle = (start + end) // 2
        if node.left is None:
            node.left = Node()
            node.right = Node()
        self._update(node.left, start, middle, left, right, delta)
        self._update(node.right, middle, end, left, right, delta)
        node.maximum = node.lazy + max(node.left.maximum, node.right.maximum)

    def book(self, start: int, end: int) -> bool:
        self._update(self.root, 0, 1_000_000_000, start, end, 1)
        if self.root.maximum <= 2:
            return True
        self._update(self.root, 0, 1_000_000_000, start, end, -1)
        return False`
  },
  "longest-common-prefix":{
    approach:"使用字典树：当前节点恰有一个子节点且不是完整单词结尾时，公共前缀才能继续。",
    complexity:"时间 O(总字符数)，空间 O(总字符数)。",
    code:`from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        root = TrieNode()
        for word in strs:
            node = root
            for char in word:
                node = node.children.setdefault(char, TrieNode())
            node.end = True

        node = root
        prefix = []
        while len(node.children) == 1 and not node.end:
            char, node = next(iter(node.children.items()))
            prefix.append(char)
        return ''.join(prefix)`
  },
  "longest-word-in-dictionary":{
    approach:"建立字典树后，只沿构成有效前缀的单词节点深度优先搜索；取最长且字典序最小的单词。",
    complexity:"时间 O(总字符数)，空间 O(总字符数)。",
    code:`from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Solution:
    def longestWord(self, words: List[str]) -> str:
        root = TrieNode()
        for word in words:
            node = root
            for char in word:
                node = node.children.setdefault(char, TrieNode())
            node.end = True

        answer = ''

        def dfs(node: TrieNode, path: str) -> None:
            nonlocal answer
            if len(path) > len(answer) or (len(path) == len(answer) and path < answer):
                answer = path
            for char in sorted(node.children):
                child = node.children[char]
                if child.end:
                    dfs(child, path + char)

        dfs(root, '')
        return answer`
  },
  "k-th-smallest-in-lexicographical-order":{
    approach:"把字典序整数视为前缀字典树，统计相邻前缀之间的数字数量以跳过整棵子树。",
    complexity:"时间 O(log n * log n)，空间 O(1)。",
    code:`class Solution:
    def findKthNumber(self, n: int, k: int) -> int:
        def steps_between(first: int, next_prefix: int) -> int:
            steps = 0
            while first <= n:
                steps += min(n + 1, next_prefix) - first
                first *= 10
                next_prefix *= 10
            return steps

        prefix = 1
        k -= 1
        while k:
            steps = steps_between(prefix, prefix + 1)
            if steps <= k:
                prefix += 1
                k -= steps
            else:
                prefix *= 10
                k -= 1
        return prefix`
  },
  "find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree":{
    approach:"先求一次最小生成树权重。排除某边后权重增大则它是关键边；强制加入仍可达该权重则是伪关键边。",
    complexity:"排序后时间 O(e^2 alpha(n))，空间 O(n + e)。",
    code:`from typing import List

class Solution:
    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        ordered = [edge + [index] for index, edge in enumerate(edges)]
        ordered.sort(key=lambda edge: edge[2])

        def mst(exclude: int = -1, include: int = -1) -> int:
            parent = list(range(n))

            def find(x: int) -> int:
                while parent[x] != x:
                    parent[x] = parent[parent[x]]
                    x = parent[x]
                return x

            total = used = 0
            if include != -1:
                a, b, weight, _ = ordered[include]
                parent[find(a)] = find(b)
                total += weight
                used += 1
            for i, (a, b, weight, _) in enumerate(ordered):
                if i == exclude:
                    continue
                root_a, root_b = find(a), find(b)
                if root_a != root_b:
                    parent[root_a] = root_b
                    total += weight
                    used += 1
            return total if used == n - 1 else float('inf')

        baseline = mst()
        critical = []
        pseudo = []
        for i, edge in enumerate(ordered):
            if mst(exclude=i) > baseline:
                critical.append(edge[3])
            elif mst(include=i) == baseline:
                pseudo.append(edge[3])
        return [critical, pseudo]`
  },
  "min-cost-to-connect-all-points":{
    approach:"普里姆算法逐步扩展最小生成树，并用新选点到未访问点的曼哈顿距离更新代价。",
    complexity:"时间 O(n^2)，空间 O(n)。",
    code:`from typing import List

class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        best = [float('inf')] * n
        used = [False] * n
        best[0] = 0
        answer = 0

        for _ in range(n):
            node = min((best[i], i) for i in range(n) if not used[i])[1]
            used[node] = True
            answer += best[node]
            x, y = points[node]
            for neighbor in range(n):
                if not used[neighbor]:
                    nx, ny = points[neighbor]
                    best[neighbor] = min(best[neighbor], abs(x - nx) + abs(y - ny))
        return answer`
  },
  "lemonade-change":{
    approach:"贪心维护 5 元和 10 元钞票数量；找零 15 元时优先使用一张 10 元和一张 5 元，以保留小额钞票。",
    complexity:"时间 O(n)，空间 O(1)。",
    code:`from typing import List

class Solution:
    def lemonadeChange(self, bills: List[int]) -> bool:
        fives = tens = 0
        for bill in bills:
            if bill == 5:
                fives += 1
            elif bill == 10:
                if not fives:
                    return False
                fives -= 1
                tens += 1
            elif tens and fives:
                tens -= 1
                fives -= 1
            elif fives >= 3:
                fives -= 3
            else:
                return False
        return True`
  },
  "container-with-most-water":{
    approach:"双指针从最宽容器开始，只移动较短边，因为移动较高边不会提高限制高度。",
    complexity:"时间 O(n)，空间 O(1)。",
    code:`from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        answer = 0
        while left < right:
            answer = max(answer, (right - left) * min(height[left], height[right]))
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return answer`
  },
  "candy":{
    approach:"分别从左右扫描上升关系；每个孩子取两侧比较所要求糖果数的较大值。",
    complexity:"时间 O(n)，空间 O(n)。",
    code:`from typing import List

class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        candies = [1] * n
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                candies[i] = candies[i - 1] + 1
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                candies[i] = max(candies[i], candies[i + 1] + 1)
        return sum(candies)`
  },
  "climbing-stairs":{
    approach:"到达当前台阶的方法数等于前两级的方法数之和，只保留两个滚动状态。",
    complexity:"时间 O(n)，空间 O(1)。",
    code:`class Solution:
    def climbStairs(self, n: int) -> int:
        previous, current = 1, 1
        for _ in range(n):
            previous, current = current, previous + current
        return previous`
  },
  "target-sum":{
    approach:"动态规划记录每个可达当前和对应的符号分配方案数。",
    complexity:"时间 O(n * sum(nums))，空间 O(sum(nums))。",
    code:`from collections import defaultdict
from typing import List

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        ways = {0: 1}
        for value in nums:
            next_ways = defaultdict(int)
            for total, count in ways.items():
                next_ways[total + value] += count
                next_ways[total - value] += count
            ways = next_ways
        return ways.get(target, 0)`,
    better:{
      title:"子集和转换",
      approach:"若正号数字之和为 P，则 P = (sum(nums) + target) / 2；用一维背包统计和为 P 的子集数。",
      complexity:"时间 O(n * sum(nums))，空间 O(sum(nums))。",
      code:`from typing import List

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        total = sum(nums)
        if abs(target) > total or (total + target) % 2:
            return 0
        goal = (total + target) // 2
        dp = [0] * (goal + 1)
        dp[0] = 1
        for value in nums:
            for subtotal in range(goal, value - 1, -1):
                dp[subtotal] += dp[subtotal - value]
        return dp[goal]`
    }
  },
  "house-robber":{
    approach:"每间房在跳过它与抢它并加上前两间最优值之间取较大者。",
    complexity:"时间 O(n)，空间 O(1)。",
    code:`from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        two_back = one_back = 0
        for money in nums:
            two_back, one_back = one_back, max(one_back, two_back + money)
        return one_back`
  },
  "k-concatenation-maximum-sum":{
    approach:"在一份或两份数组上运行最大子段和算法处理跨边界子数组；总和为正时补上中间完整副本。",
    complexity:"时间 O(n)，空间 O(1)。",
    code:`from typing import List

class Solution:
    def kConcatenationMaxSum(self, arr: List[int], k: int) -> int:
        mod = 1_000_000_007
        best = current = 0
        for value in arr * min(k, 2):
            current = max(0, current + value)
            best = max(best, current)
        if k > 2 and sum(arr) > 0:
            best += (k - 2) * sum(arr)
        return best % mod`
  },
  "interleaving-string":{
    approach:"二维动态规划判断 s3 的每个前缀能否由 s1、s2 的前缀交错组成。",
    complexity:"时间 O(m * n)，空间 O(n)。",
    code:`class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3):
            return False
        dp = [False] * (len(s2) + 1)
        dp[0] = True
        for j in range(1, len(s2) + 1):
            dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]

        for i in range(1, len(s1) + 1):
            dp[0] = dp[0] and s1[i - 1] == s3[i - 1]
            for j in range(1, len(s2) + 1):
                dp[j] = ((dp[j] and s1[i - 1] == s3[i + j - 1])
                         or (dp[j - 1] and s2[j - 1] == s3[i + j - 1]))
        return dp[-1]`
  },
  "word-break":{
    approach:"动态规划记录每个前缀能否拆分；若某个更早的有效切分后子串在字典中，则扩展该状态。",
    complexity:"时间 O(n^2)，空间 O(n + 字典大小)。",
    code:`from typing import List

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        words = set(wordDict)
        dp = [False] * (len(s) + 1)
        dp[0] = True
        for end in range(1, len(s) + 1):
            for start in range(end):
                if dp[start] and s[start:end] in words:
                    dp[end] = True
                    break
        return dp[-1]`
  },
  "find-greatest-common-divisor-of-array":{
    approach:"所有数的最大公约数等于最小值与最大值的最大公约数。",
    complexity:"时间 O(n + log M)，空间 O(1)。",
    code:`from math import gcd
from typing import List

class Solution:
    def findGCD(self, nums: List[int]) -> int:
        return gcd(min(nums), max(nums))`
  },
  "the-kth-factor-of-n":{
    approach:"枚举至 sqrt(n) 的因子，并记录配对的大因子，以便按顺序选出第 k 个因子。",
    complexity:"时间 O(sqrt(n))，空间 O(sqrt(n))。",
    code:`class Solution:
    def kthFactor(self, n: int, k: int) -> int:
        large = []
        divisor = 1
        while divisor * divisor <= n:
            if n % divisor == 0:
                k -= 1
                if k == 0:
                    return divisor
                if divisor * divisor != n:
                    large.append(n // divisor)
            divisor += 1
        return large[-k] if k <= len(large) else -1`
  },
  "maximum-prime-difference":{
    approach:"从两端扫描并判断质数；两端首次出现的质数下标差最大。",
    complexity:"时间 O(n sqrt(M))，空间 O(1)。",
    code:`from typing import List

class Solution:
    def maximumPrimeDifference(self, nums: List[int]) -> int:
        def is_prime(value: int) -> bool:
            if value < 2:
                return False
            divisor = 2
            while divisor * divisor <= value:
                if value % divisor == 0:
                    return False
                divisor += 1
            return True

        left = next(i for i, value in enumerate(nums) if is_prime(value))
        right = next(i for i in range(len(nums) - 1, -1, -1) if is_prime(nums[i]))
        return right - left`
  },
  "nim-game":{
    approach:"普通取石子游戏中，4 的倍数恰为必败态；其余石子数都可一步转移到必败态。",
    complexity:"时间 O(1)，空间 O(1)。",
    code:`class Solution:
    def canWinNim(self, n: int) -> bool:
        return n % 4 != 0`
  },
  "stone-game":{
    approach:"石子堆数量为偶数时，先手可选择总和更大的奇偶下标组，因此必胜。",
    complexity:"时间 O(1)，空间 O(1)。",
    code:`from typing import List

class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        return True`
  },
  "cat-and-mouse":{
    approach:"逆向广度优先搜索从终局状态出发：当前玩家能走到己方必胜态则必胜；所有走法都导致对手必胜时则必败。",
    complexity:"时间 O(n^3)，空间 O(n^2)。",
    code:`from collections import deque
from typing import List

class Solution:
    def catMouseGame(self, graph: List[List[int]]) -> int:
        n = len(graph)
        draw, mouse_win, cat_win = 0, 1, 2
        color = [[[draw] * 2 for _ in range(n)] for _ in range(n)]
        degree = [[[0] * 2 for _ in range(n)] for _ in range(n)]

        for mouse in range(n):
            for cat in range(1, n):
                degree[mouse][cat][0] = len(graph[mouse])
                degree[mouse][cat][1] = sum(neighbor != 0 for neighbor in graph[cat])

        queue = deque()
        for cat in range(1, n):
            for turn in range(2):
                color[0][cat][turn] = mouse_win
                queue.append((0, cat, turn, mouse_win))
        for mouse in range(1, n):
            for turn in range(2):
                color[mouse][mouse][turn] = cat_win
                queue.append((mouse, mouse, turn, cat_win))

        def parents(mouse: int, cat: int, turn: int):
            if turn == 0:
                for previous_cat in graph[cat]:
                    if previous_cat != 0:
                        yield mouse, previous_cat, 1
            else:
                for previous_mouse in graph[mouse]:
                    yield previous_mouse, cat, 0

        while queue:
            mouse, cat, turn, result = queue.popleft()
            for pmouse, pcat, pturn in parents(mouse, cat, turn):
                if color[pmouse][pcat][pturn] != draw:
                    continue
                if (pturn == 0 and result == mouse_win) or (pturn == 1 and result == cat_win):
                    color[pmouse][pcat][pturn] = result
                    queue.append((pmouse, pcat, pturn, result))
                else:
                    degree[pmouse][pcat][pturn] -= 1
                    if degree[pmouse][pcat][pturn] == 0:
                        opposite = cat_win if pturn == 0 else mouse_win
                        color[pmouse][pcat][pturn] = opposite
                        queue.append((pmouse, pcat, pturn, opposite))

        return color[1][2][0]`
  }
};
