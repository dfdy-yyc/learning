'use strict';
/* ==== 刷题主题卡数据：题目 / 模板 / 易错点都在这 ==== */
const TOPICS=[
{
  "id": "two-pointers",
  "order": 1,
  "name": "指针（双指针）",
  "emoji": "👉",
  "tagline": "两个下标协同移动，把暴力枚举降到线性",
  "estHours": 6,
  "core": "双指针用两个下标在一次遍历中协同移动，代替『固定一个、枚举另一个』的双重循环。它之所以有效，是因为问题具有单调性：某个指针移动后，可以确定性地排除一批不可能的组合，于是每个元素最多被访问常数次，复杂度从 O(n^2) 降到 O(n)，且几乎不占额外空间。本主题聚焦数组上的三种基本用法：对撞指针从两端向中间收缩，适合有序数组找配对与两端求最值；快慢指针一个读一个写，是原地删除、移动元素的标准姿势；原地改写的灵魂是维护『前缀 [0, slow) 已整理完毕』这样的循环不变量。滑动窗口、二分查找、链表快慢指针都是这一思想的近亲，各有单独卡片，这里先把数组基本功打牢。",
  "signals": [
    "数组或字符串有序（或允许先排序），要找满足和、差、配对条件的两个或三个数",
    "要求 O(1) 额外空间原地删除、移动、覆盖元素，或返回处理后的新长度",
    "从两端向中间的最值或判定问题，如盛水容器、判断回文",
    "暴力解是双重循环枚举 (i, j)，且移动一端后另一端的最优选择只朝一个方向变化",
    "题面出现『把某类元素挪到末尾』『去重且保持相对顺序』这类原地整理字眼"
  ],
  "templates": [
    {
      "title": "对撞双指针（有序数组找配对）",
      "code": "def two_sum_sorted(numbers, target):\n    # 对撞双指针：有序数组中找一对满足条件的数，LC167 可直接套用\n    left, right = 0, len(numbers) - 1  # 左右指针分别指向头和尾\n    while left < right:  # 相遇即停，保证取到两个不同位置\n        s = numbers[left] + numbers[right]\n        if s == target:\n            return [left + 1, right + 1]  # 本题要求返回从 1 开始的下标\n        elif s < target:\n            left += 1  # 和偏小：只有左指针右移才可能让和变大\n        else:\n            right -= 1  # 和偏大：只有右指针左移才可能让和变小\n    return []  # 未找到",
      "explain": "核心是 while left < right 加两条移动规则：和偏小时，包含当前 left 的所有组合都不可能达标，可整体排除，故 left 右移；偏大时同理。每轮指针至少收缩一格，最多 n-1 轮结束，时间 O(n)、空间 O(1)。"
    },
    {
      "title": "快慢指针（数组原地操作）",
      "code": "def move_zeroes(nums):\n    # 快慢指针原地整理：slow 指向下一个非零元素应放的位置，LC283 可直接套用\n    slow = 0\n    for fast in range(len(nums)):  # fast 负责逐个检查元素\n        if nums[fast] != 0:  # 遇到需要保留的元素\n            nums[slow], nums[fast] = nums[fast], nums[slow]  # 交换到已整理区末尾\n            slow += 1  # 已整理区间 [0, slow) 扩大一格\n    # 结束后 [0, slow) 是全部非零元素且相对顺序不变，后面全是 0",
      "explain": "理解关键是循环不变量：任何时刻 [0, slow) 都是整理好的非零前缀，[slow, fast) 之间全是 0，因此交换等价于把非零元素追加到前缀末尾、把 0 顺势换到后面。若题目只要求保留合法元素（如 LC27 移除元素），交换还可简化为 nums[slow] = nums[fast]。"
    }
  ],
  "problems": [
    {
      "lc": 283,
      "title": "移动零",
      "slug": "move-zeroes",
      "difficulty": "简单",
      "featured": true,
      "hint": "slow 指向下一个非零元素应放的位置，fast 扫描，遇到非零就与 slow 位置交换。"
    },
    {
      "lc": 26,
      "title": "删除有序数组中的重复项",
      "slug": "remove-duplicates-from-sorted-array",
      "difficulty": "简单",
      "featured": false,
      "hint": "快指针遇到与 nums[slow] 不同的新值时，写入 slow+1 处并推进 slow。"
    },
    {
      "lc": 125,
      "title": "验证回文串",
      "slug": "valid-palindrome",
      "difficulty": "简单",
      "featured": false,
      "hint": "首尾对撞，途中跳过非字母数字字符，统一转小写后再比较。"
    },
    {
      "lc": 167,
      "title": "两数之和 II - 输入有序数组",
      "slug": "two-sum-ii-input-array-is-sorted",
      "difficulty": "中等",
      "featured": false,
      "hint": "有序数组首尾对撞：和偏大则右指针左移，偏小则左指针右移。"
    },
    {
      "lc": 11,
      "title": "盛最多水的容器",
      "slug": "container-with-most-water",
      "difficulty": "中等",
      "featured": true,
      "hint": "对撞指针每次移动较矮的一侧：水量由矮边决定，移动高边不可能更优。"
    },
    {
      "lc": 15,
      "title": "三数之和",
      "slug": "3sum",
      "difficulty": "中等",
      "featured": true,
      "hint": "先排序，固定最小的数后转化为对撞指针找两数之和，i、left、right 三处都要跳过重复值。"
    },
    {
      "lc": 16,
      "title": "最接近的三数之和",
      "slug": "3sum-closest",
      "difficulty": "中等",
      "featured": false,
      "hint": "排序后固定一个数，内层对撞指针；每轮先更新与 target 的最小差，再按和的大小移动一端。"
    },
    {
      "lc": 42,
      "title": "接雨水",
      "slug": "trapping-rain-water",
      "difficulty": "困难",
      "featured": true,
      "hint": "选做：双指针各自维护左右历史最高，每步结算较矮一侧的存水，学有余力再补单调栈解法。"
    }
  ],
  "pitfalls": [
    "对撞指针把 while left < right 误写成 left <= right，相遇时同一元素被使用两次，例如 167 会返回同一个下标两次",
    "三数之和只在命中解时去重，忘了固定位 i 的去重：需要在 i > 0 且 nums[i] == nums[i-1] 时 continue，命中一组解后 left、right 还要各自跳过连续重复值",
    "快慢指针写入与 slow += 1 的先后顺序搞混，导致覆盖了尚未检查的元素或漏写一位；建议固定『先写入（或交换）、后自增』并加注释",
    "边遍历边用 remove、pop 删元素，导致后续下标整体前移而漏检相邻元素；原地题一律改为覆盖或交换",
    "盛水容器移动较高一侧的指针：宽度变小而高度上限不变，结果只会更差，正确做法是永远移动较矮的一侧"
  ],
  "interviewNote": "手写、白板或本地 IDE 模式下没有力扣帮你解析输入：要习惯自己写 nums = list(map(int, input().split())) 这类读入代码，把解法封装成函数，再手动构造两三组用例（空数组、单元素、全零、全重复）打印验证。面试官常追问『为什么这样移动指针不会漏解』，提前用循环不变量或『每步排除一批不可能组合』的说法把正确性讲清楚。",
  "resources": [
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    },
    {
      "name": "灵茶山艾府 B站讲解",
      "url": "https://space.bilibili.com/206214"
    },
    {
      "name": "代码随想录（站内搜双指针）",
      "url": "https://programmercarl.com/"
    }
  ]
},
{
  "id": "array",
  "order": 2,
  "name": "数组（含二分查找）",
  "emoji": "🧱",
  "tagline": "有序想二分，原地靠覆盖，区间先排序",
  "estHours": 10,
  "core": "数组在内存中连续存储，随机访问是 O(1)，但插入删除要整体搬移元素，这个物理特性决定了本主题的两大套路。第一是原地操作：用读写指针或首尾双向遍历，在一次扫描内完成覆盖、交换与反转，把额外空间压到 O(1)。第二是二分查找：只要数组有序、或判断条件具有单调性，每比较一次就能排除一半候选，把 O(n) 的查找降到 O(log n)。二分容易写错的根源是区间开闭与循环条件不匹配，唯一可靠的办法是先约定循环不变量，再让每一行收缩区间的代码都维护它。区间类问题（如合并区间）则先按左端点排序，把无序输入转化为有序数组上的一次线性扫描。",
  "signals": [
    "数组有序或部分有序，且要求 O(log n) 复杂度或高效查找，直接想二分。",
    "要求原地修改、只允许 O(1) 额外空间，想到读写指针覆盖或首尾双向遍历。",
    "求插入位置、第一个或最后一个满足条件的下标，是二分查找的边界变体。",
    "输入是一组区间，问合并、重叠或覆盖，先按左端点排序再线性扫描。",
    "明确禁止用除法或禁止开新数组，考虑前缀、后缀两趟遍历互补出答案。"
  ],
  "templates": [
    {
      "title": "二分查找（左闭右闭）",
      "code": "def binary_search(nums, target):\n    # 循环不变量：若 target 存在，则必定落在闭区间 [left, right] 内\n    # 之后每一次收缩区间的操作，都必须继续维持这条不变量\n    left, right = 0, len(nums) - 1\n    while left <= right:  # 区间 [left, right] 非空时继续查找\n        mid = left + (right - left) // 2  # 取中点，这种写法可避免大数相加\n        if nums[mid] < target:\n            left = mid + 1  # mid 已比较过被排除，目标只会在 [mid + 1, right]\n        elif nums[mid] > target:\n            right = mid - 1  # mid 已比较过被排除，目标只会在 [left, mid - 1]\n        else:\n            return mid  # 命中目标，返回下标\n    return -1  # 循环结束说明区间已空，目标不存在",
      "explain": "right 初始化为 len(nums) - 1，且循环条件带等号，两者配套才构成左闭右闭写法：区间内每个下标都是尚未排除的候选，区间只剩一个元素时仍会进入循环判断。收缩时必须写 mid + 1 和 mid - 1，因为 mid 本轮已经比较过，不移出区间就破坏了不变量，还可能死循环。循环退出即区间为空，可安全返回 -1；若求插入位置，此刻的 left 就是答案。"
    },
    {
      "title": "原地覆盖（读写双指针）",
      "code": "def remove_element(nums, val):\n    # 循环不变量：nums[0 .. write - 1] 都是已确认保留的元素，相对顺序不变\n    write = 0  # 写指针：下一个保留元素应放入的位置\n    for read in range(len(nums)):  # 读指针逐一检查每个元素\n        if nums[read] != val:  # 当前元素需要保留\n            nums[write] = nums[read]  # 原地覆盖写入，write 不会超过 read，不丢数据\n            write += 1  # 保留区向右扩大一格\n    return write  # 保留元素个数，即数组新长度",
      "explain": "关键在读写分离：read 一路向后检查所有元素，write 只在元素被保留时才前进，因此 nums[0 .. write - 1] 始终是合法结果，一趟遍历、O(1) 额外空间完成原地删除。把 if 条件换成与上一个保留元素不同，就是有序数组去重；换成不等于 0 再补零，就是移动零。若答案的大小分布在数组两端（如有序数组的平方），则改用首尾两个指针向中间双向遍历、从结果末尾倒序填入，是同一思想的双向版本。"
    }
  ],
  "problems": [
    {
      "lc": 704,
      "title": "二分查找",
      "slug": "binary-search",
      "difficulty": "简单",
      "featured": false,
      "hint": "标准左闭右闭模板：left 不大于 right 时循环，按 mid 与 target 的比较结果收缩一半区间。"
    },
    {
      "lc": 35,
      "title": "搜索插入位置",
      "slug": "search-insert-position",
      "difficulty": "简单",
      "featured": true,
      "hint": "与 704 完全同一套模板，循环结束时 left 恰好就是目标应插入的下标。"
    },
    {
      "lc": 27,
      "title": "移除元素",
      "slug": "remove-element",
      "difficulty": "简单",
      "featured": false,
      "hint": "读写双指针原地覆盖：read 负责找保留元素，write 记录写入位置，最后返回 write 即新长度。"
    },
    {
      "lc": 977,
      "title": "有序数组的平方",
      "slug": "squares-of-a-sorted-array",
      "difficulty": "简单",
      "featured": false,
      "hint": "平方后的最大值必在原数组两端，首尾指针向中间比较，从结果数组末尾倒着填入。"
    },
    {
      "lc": 189,
      "title": "轮转数组",
      "slug": "rotate-array",
      "difficulty": "中等",
      "featured": true,
      "hint": "k 先对 n 取模，再整体反转一次、分别反转前 k 个与剩余部分，三次反转 O(1) 空间搞定。"
    },
    {
      "lc": 238,
      "title": "除自身以外数组的乘积",
      "slug": "product-of-array-except-self",
      "difficulty": "中等",
      "featured": true,
      "hint": "答案等于前缀积乘后缀积：正序一趟把前缀积写入结果，倒序一趟用一个变量累乘后缀积补上。"
    },
    {
      "lc": 56,
      "title": "合并区间",
      "slug": "merge-intervals",
      "difficulty": "中等",
      "featured": true,
      "hint": "按左端点排序后线性扫描：当前区间与结果末尾区间重叠就更新右端点最大值，否则新开一段。"
    }
  ],
  "pitfalls": [
    "左闭右闭必须用 while left <= right 搭配 right = len(nums) - 1；写成 left < right 会在区间只剩一个元素时漏判，两种写法的条件混用是二分出错的头号原因。",
    "二分收缩时写成 left = mid 或 right = mid（漏掉加一减一），当区间剩两个元素时 mid 会一直等于 left，程序死循环。",
    "原地修改题里写 nums = sorted(nums) 或 nums = 新列表，只是让局部变量指向新对象，原数组并没有变；要原地生效应写 nums.sort() 或切片赋值 nums[:] = 新列表。",
    "轮转数组忘记先执行 k %= n，当 k 不小于 n 时反转的区间划分就是错的；k 为 0、数组长度为 1 这些边界也要能自然通过。",
    "合并区间的重叠判断应为 cur[0] <= last[1]，首尾相接（如 [1,4] 与 [4,5]）也算重叠；合并时右端点要取 max(last[1], cur[1])，不能直接用当前区间的右端点覆盖。"
  ],
  "interviewNote": "面试手写模式下没有 LeetCode 的函数骨架，要能从零写出完整可运行的程序：自己定义函数签名，构造空数组、单元素、目标在首尾、目标不存在等测试数据，打印输出逐一验证。写二分前先向面试官口述你维护的循环不变量，写完用只有两个元素的用例手动走一遍，证明不会死循环。原地修改类题目要主动和面试官确认输入输出约定，比如返回的是新长度而不是新数组。",
  "resources": [
    {
      "name": "hello-algo 搜索章（二分）",
      "url": "https://www.hello-algo.com/chapter_searching/"
    },
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    },
    {
      "name": "代码随想录（数组篇）",
      "url": "https://programmercarl.com/"
    }
  ]
},
{
  "id": "sliding-window",
  "order": 3,
  "name": "滑动窗口",
  "emoji": "🪟",
  "tagline": "同向双指针维护窗口，暴力枚举降为线性",
  "estHours": 8,
  "core": "滑动窗口专门解决「连续子数组 / 连续子串」的最长、最短、计数类问题。暴力解法要枚举 O(n^2) 个区间且每个区间都从头重算，滑窗则把区间两端变成一对同向移动的指针：右端进一个元素、左端出一个元素都只做 O(1) 的增量更新，同一份窗口状态（和、计数器、哈希表）被全程复用。它能成立靠的是单调性：右端扩张只会让约束单调变坏，所以左端只需向右追赶、永不回退，两个指针各自至多走 n 步，总复杂度 O(n)。反过来，一旦单调性不成立（典型如含负数数组的子数组和问题），滑窗直接失效，要改用前缀和等方法（前缀和见技巧类卡片，此处不展开）。",
  "signals": [
    "求的是「连续」子数组或子串的最长 / 最短 / 个数，而不是可以跳着选的子序列。",
    "约束随窗口扩大单调变坏，例如「和不小于 target」「不同字符至多 k 种」「不含重复字符」。",
    "题面出现「长度为 k 的连续」「每个大小为 k 的窗口」等字眼，直接套定长窗口。",
    "n 在 1e5 量级以上，枚举全部区间的 O(n^2) 必然超时，且窗口状态能增量维护。",
    "覆盖式问法：「包含另一个串全部字符的最小子串」，这是变长窗口求最短的标志。"
  ],
  "templates": [
    {
      "title": "变长窗口（外扩内缩）",
      "code": "def longest_valid_window(nums, target):\n    # 变长窗口模板：求「元素和不超过 target」的最长窗口长度\n    # 窗口是闭区间 [left, right]，窗口状态可换成计数器、集合等\n    window_sum = 0\n    left = 0\n    ans = 0\n    for right in range(len(nums)):        # 外扩：右端点每轮固定右移一格\n        window_sum += nums[right]         # 新元素进窗，更新窗口状态\n        while window_sum > target:        # 何时收缩：窗口一不合法就持续内缩\n            window_sum -= nums[left]      # 左端元素出窗，撤销它的贡献\n            left += 1                     # 左指针永不回退，保证 O(n)\n        ans = max(ans, right - left + 1)  # 窗口重新合法，更新最长答案\n    return ans",
      "explain": "外层 for 只负责扩张，内层 while 只负责收缩：窗口一旦非法就一直缩到重新合法，left 永不回退，两指针合计至多走 2n 步。进窗与出窗必须对称维护同一份状态，进窗加过什么，出窗就要减回什么。求最短（如 209 题）时逻辑取反：while 条件改成「窗口已满足要求」，在 while 体内先用 right - left + 1 更新最小值、再收缩左端。"
    },
    {
      "title": "定长窗口（一进一出）",
      "code": "def fixed_window_sums(nums, k):\n    # 定长窗口模板：维护每个长度为 k 的窗口的状态（以窗口和为例）\n    n = len(nums)\n    if n < k:\n        return []\n    window_sum = sum(nums[:k])         # 第一个窗口单独初始化\n    result = [window_sum]\n    for right in range(k, n):          # 窗口整体右移一格\n        window_sum += nums[right]      # 右侧新元素进窗\n        window_sum -= nums[right - k]  # 左侧旧元素出窗，一进一出长度不变\n        result.append(window_sum)      # 以 right 结尾的完整窗口已处理完\n    return result",
      "explain": "定长窗口不需要 while：每右移一步恰好一进一出，窗口长度恒为 k，状态增量更新，省掉每个窗口 O(k) 的重算。被挤出元素的下标是 right - k，这对加减必须成对出现、缺一不可。438 题把 window_sum 换成长度 26 的计数数组，每步比较窗口计数与目标计数是否相等即可。"
    }
  ],
  "problems": [
    {
      "lc": 643,
      "title": "子数组最大平均数 I",
      "slug": "maximum-average-subarray-i",
      "difficulty": "简单",
      "featured": false,
      "hint": "定长窗口热身：维护窗口和，一进一出后取最大值，最后再除以 k。"
    },
    {
      "lc": 209,
      "title": "长度最小的子数组",
      "slug": "minimum-size-subarray-sum",
      "difficulty": "中等",
      "featured": false,
      "hint": "变长求最短：窗口和一旦不小于 target，就在 while 内更新答案并收缩左端。"
    },
    {
      "lc": 3,
      "title": "无重复字符的最长子串",
      "slug": "longest-substring-without-repeating-characters",
      "difficulty": "中等",
      "featured": true,
      "hint": "变长求最长：集合或计数器记录窗口内字符，右端字符重复就收缩到无重复为止。"
    },
    {
      "lc": 567,
      "title": "字符串的排列",
      "slug": "permutation-in-string",
      "difficulty": "中等",
      "featured": false,
      "hint": "定长窗口加字符计数：窗口计数与 s1 的计数完全相等，即找到一个排列。"
    },
    {
      "lc": 438,
      "title": "找到字符串中所有字母异位词",
      "slug": "find-all-anagrams-in-a-string",
      "difficulty": "中等",
      "featured": true,
      "hint": "567 的收集版：定长窗口滑动时逐位置比较计数数组，相等就把左端点记入答案。"
    },
    {
      "lc": 904,
      "title": "水果成篮",
      "slug": "fruit-into-baskets",
      "difficulty": "中等",
      "featured": false,
      "hint": "「至多两种元素的最长窗口」：哈希计数种类超过 2 就收缩，计数减到 0 记得删键。"
    },
    {
      "lc": 219,
      "title": "存在重复元素 II",
      "slug": "contains-duplicate-ii",
      "difficulty": "简单",
      "featured": false,
      "hint": "集合只保留当前位置前面的 k 个元素；命中重复立即返回，加入当前值后移出距离超过 k 的旧值。"
    },
    {
      "lc": 1358,
      "title": "包含所有三种字符的子字符串数目",
      "slug": "number-of-substrings-containing-all-three-characters",
      "difficulty": "中等",
      "featured": false,
      "hint": "窗口含 a、b、c 时持续收缩；结束后 left 表示当前右端点对应的合法起点数量，累加到答案。"
    },
    {
      "lc": 424,
      "title": "替换后的最长重复字符",
      "slug": "longest-repeating-character-replacement",
      "difficulty": "中等",
      "featured": false,
      "hint": "窗口长度减最高字符频率就是替换次数；超过 k 时缩左端，否则更新最长窗口。"
    },
    {
      "lc": 76,
      "title": "最小覆盖子串",
      "slug": "minimum-window-substring",
      "difficulty": "困难",
      "featured": true,
      "hint": "变长求最短的天花板：维护「还缺多少个字符」，覆盖后先缩到不能再缩、再更新答案。"
    },
    {
      "lc": 239,
      "title": "滑动窗口最大值",
      "slug": "sliding-window-maximum",
      "difficulty": "困难",
      "featured": true,
      "hint": "定长窗口但状态是最大值，需配合单调队列维护，可留到栈与队列主题再回头补。"
    }
  ],
  "pitfalls": [
    "窗口长度是 right - left + 1（闭区间），漏掉 +1 是最高频的差一错误；求最短时答案初值设为 n + 1 或 float('inf')，返回前要判断它是否从未被更新。",
    "进窗与出窗必须对称：right 进窗改了哪些状态，left 出窗就原样撤销；用字典计数时减到 0 要 del 掉该键，否则 len(counter) 统计种类数会虚高。",
    "收缩必须用 while 而不是 if：一次进窗可能要连续弹出多个左端元素，写成 if 只缩一格会留下非法窗口。",
    "求最长与求最短的答案更新位置不同：最长在 while 收缩结束后更新，最短在 while 内部（窗口刚满足条件时）更新，两者写反必错。",
    "定长窗口首个窗口要单独初始化，主循环从下标 k 开始，出窗下标是 right - k；忘记初始化首窗或下标偏移一格，结果会整体错位。"
  ],
  "interviewNote": "面试手写常见两种形式：核心代码模式直接写函数即可；ACM 模式要自己用 sys.stdin 读入、print 输出，读入拆分与类型转换建议提前背熟。写完先别急着说完成，主动拿小样例走查边界：空输入、全部元素相同、k 大于数组长度、目标不可达时的返回值。面试官追问复杂度时，点出「left 永不回退，两指针合计至多 2n 步」即可完成 O(n) 的论证。",
  "resources": [
    {
      "name": "灵茶山艾府 B站讲解（滑窗成名作）",
      "url": "https://space.bilibili.com/206214"
    },
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    },
    {
      "name": "代码随想录（站内搜滑动窗口）",
      "url": "https://programmercarl.com/"
    }
  ]
},
{
  "id": "linked-list",
  "order": 4,
  "name": "链表",
  "emoji": "🔗",
  "tagline": "指针腾挪先画图，虚拟头结点保平安",
  "estHours": 10,
  "core": "链表把节点散落在内存各处，靠 next 指针串成序列：插入删除只需改动指针即可 O(1) 完成，代价是失去随机访问，找任何位置都得从头走。所以链表题考的不是复杂算法，而是指针操作的顺序与边界——先存后继再改指向，错一步就会断链或成环。虚拟头结点是第一件武器：给 head 人为造一个前驱，头节点的增删就和中间节点完全统一，省掉所有特判。快慢指针是第二件武器：两个指针以不同速度或不同起点同行，一次遍历就能定位中点、倒数第 k 个节点或环的入口。把反转、合并、找环这几个基本动作练熟，大部分链表题只是它们的组合拼装。",
  "signals": [
    "函数参数是 head 且类型为 ListNode，或题面明确给定单链表、双向链表。",
    "要求原地 O(1) 空间调整节点顺序：反转、两两交换、分隔、重排。",
    "只给头指针却要定位「倒数第 N 个」「中间节点」，暗示快慢指针或前后错位双指针。",
    "问「是否有环」「入环点在哪」「两条链是否相交」，是快慢指针与双指针的招牌题型。",
    "要求 O(1) 时间插入删除并维护访问顺序（如 LRU 缓存），考虑哈希表加双向链表。"
  ],
  "templates": [
    {
      "title": "反转链表（三指针）",
      "code": "def reverse_list(head):\n    # prev 指向已反转部分的新头，初始为 None，也就是反转后的链尾\n    prev = None\n    # curr 指向尚未反转部分的头\n    curr = head\n    while curr:\n        nxt = curr.next   # 第一步：先保存后继，否则改完指针就再也找不到它\n        curr.next = prev  # 第二步：当前节点的指针掉头\n        prev = curr       # 第三步：prev 右移到 curr\n        curr = nxt        # 第四步：curr 右移到原来的后继\n    # 循环结束时 curr 为 None，prev 恰好停在原链表最后一个节点，即新头\n    return prev",
      "explain": "循环体四行的顺序不可交换：必须先用 nxt 保存 curr.next，再执行 curr.next = prev 掉头，否则后半条链直接丢失。结束时 curr 已走到 None，prev 停在原尾节点上，返回 prev 才是新头。拿只有 1、2 个节点的小链表在纸上各走一遍，指针移动就彻底清楚了。"
    },
    {
      "title": "虚拟头结点删除节点",
      "code": "def remove_elements(head, val):\n    # 虚拟头结点挂在真实头之前，让头节点的删除和普通节点完全一致\n    dummy = ListNode(0)\n    dummy.next = head\n    # curr 始终停在「待检查节点」的前驱上：单链表删除必须站在前一个节点操作\n    curr = dummy\n    while curr.next:\n        if curr.next.val == val:\n            # 跳过目标节点即完成删除；curr 原地不动，才能处理连续多个目标值\n            curr.next = curr.next.next\n        else:\n            curr = curr.next\n    # 真实头可能已被删掉，必须返回 dummy.next 而不是 head\n    return dummy.next",
      "explain": "单链表删除只能通过前驱完成，dummy 让 head 也拥有前驱，于是头节点删除不再需要单独分支。命中删除后 curr 不前移，否则遇到 7,7,7 这类连续目标值会漏删。最后必须返回 dummy.next——原 head 可能已被删除，直接返回 head 是高频错误。"
    }
  ],
  "problems": [
    {
      "lc": 203,
      "title": "移除链表元素",
      "slug": "remove-linked-list-elements",
      "difficulty": "简单",
      "featured": false,
      "hint": "虚拟头结点统一删除逻辑，curr 站在待删节点的前驱上，命中后不前移。"
    },
    {
      "lc": 206,
      "title": "反转链表",
      "slug": "reverse-linked-list",
      "difficulty": "简单",
      "featured": true,
      "hint": "prev、curr、nxt 三指针逐个掉头，牢记先存后继再改指向。"
    },
    {
      "lc": 21,
      "title": "合并两个有序链表",
      "slug": "merge-two-sorted-lists",
      "difficulty": "简单",
      "featured": true,
      "hint": "虚拟头结点起链，双指针比大小逐个接节点，收尾把未走完的一段整体挂上。"
    },
    {
      "lc": 141,
      "title": "环形链表",
      "slug": "linked-list-cycle",
      "difficulty": "简单",
      "featured": true,
      "hint": "快慢指针：快走两步慢走一步，有环必相遇，循环条件写 fast and fast.next。"
    },
    {
      "lc": 160,
      "title": "相交链表",
      "slug": "intersection-of-two-linked-lists",
      "difficulty": "简单",
      "featured": true,
      "hint": "双指针走到尾就切换到另一条链的头，两人路程拉平后必在交点或 None 相遇。"
    },
    {
      "lc": 19,
      "title": "删除链表的倒数第 N 个结点",
      "slug": "remove-nth-node-from-end-of-list",
      "difficulty": "中等",
      "featured": true,
      "hint": "双指针同从 dummy 出发，快指针先走 n+1 步再同速前进，快到空时慢正停在待删节点前驱。"
    },
    {
      "lc": 142,
      "title": "环形链表 II",
      "slug": "linked-list-cycle-ii",
      "difficulty": "中等",
      "featured": true,
      "hint": "快慢指针相遇后，一个指针回到链头改为同速前进，再次相遇处即入环点，建议亲手推一遍公式。"
    },
    {
      "lc": 328,
      "title": "奇偶链表",
      "slug": "odd-even-linked-list",
      "difficulty": "中等",
      "featured": false,
      "hint": "按节点位置拆成奇数链和偶数链，保存 even_head，循环结束后把奇数链尾接回偶数链头。"
    },
    {
      "lc": 138,
      "title": "随机链表的复制",
      "slug": "copy-list-with-random-pointer",
      "difficulty": "中等",
      "featured": true,
      "hint": "两遍哈希：旧节点映射到新节点；第一遍建节点，第二遍通过映射连接 next 和 random。"
    },
    {
      "lc": 146,
      "title": "LRU 缓存",
      "slug": "lru-cache",
      "difficulty": "中等",
      "featured": true,
      "hint": "进阶设计题：哈希表 O(1) 定位节点，双向链表 O(1) 维护最近使用顺序，可先用 OrderedDict 写通思路再手写双向链表。"
    }
  ],
  "pitfalls": [
    "反转时先执行 curr.next = prev 再想取后继，后半条链已经丢失：永远先 nxt = curr.next 存好再改指针。",
    "用了虚拟头结点却在最后 return head：头节点一旦被删除或替换，head 已不是新链入口，必须 return dummy.next。",
    "空指针报错 AttributeError：访问 curr.next.val 前要确认 curr.next 不为 None；快指针一次走两步时，循环条件必须同时判 fast and fast.next。",
    "把链表当数组用：没有下标也没有 len()，取长度只能遍历计数，动笔前先想清楚每个指针最终停在哪。",
    "快慢指针起点或步差差一位（如删倒数第 N 个时删错节点）：写完用长度为 1 和 2 的链表手动走一遍边界。"
  ],
  "interviewNote": "LeetCode 核心代码模式替你定义好了 ListNode、也替你把输入数组建成链表，但白板或本地 IDE 手写时这些全得自己来：先写 class ListNode（含 val 和 next 两个属性），再手动创建节点并用 next 一个个连起来搭出测试链表，最后写个循环打印整条链验证结果。很多人只刷核心代码模式、从没亲手搭过链表，面试现场连测试数据都构造不出来，会非常尴尬。建议本主题每道题都完整练一遍「定义类、建链、跑函数、打印输出」的全流程。",
  "resources": [
    {
      "name": "hello-algo 数组与链表章",
      "url": "https://www.hello-algo.com/chapter_array_and_linkedlist/"
    },
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    },
    {
      "name": "代码随想录（链表篇）",
      "url": "https://programmercarl.com/"
    }
  ]
},
{
  "id": "dp",
  "order": 5,
  "name": "动态规划",
  "emoji": "🧮",
  "tagline": "用子问题的答案，拼出原问题的答案",
  "estHours": 20,
  "core": "动态规划针对「多阶段决策 + 子问题重叠」的问题：暴力递归会把同一个子问题重复计算指数多次，DP 把每个子问题的答案记进 dp 数组、每个状态只算一次，从而把复杂度从指数级压到多项式级。它成立有两个前提：最优子结构（原问题的最优解能由子问题的最优解拼出来）和无后效性（状态一旦确定，后续决策不关心它是怎么来的）。做题时强烈建议按代码随想录的「动规五部曲」走：明确 dp 数组及下标含义 → 写出递推公式 → 想清楚初始化 → 确定遍历顺序 → 举例打印 dp 数组调试。五步里最关键的是第一步，多数写不出来的 DP 卡的不是代码，而是「dp[i] 到底表示什么」没有定义清楚；卡壳时打印 dp 数组与手算对照，是最快的排错手段。实习面试的 DP 主战场是线性 DP、打家劫舍系列、0-1 背包与完全背包、子序列问题这四类；树形 DP、状压 DP、数位 DP 属于进阶专题，能认出名字即可，刷探险模式阶段不必投入。",
  "signals": [
    "求「多少种方法 / 最大最小值 / 能不能达成」而不要求列出所有具体方案——要方案本身用回溯，只要数值答案想 DP。",
    "第 i 步的答案能由前面若干步的答案推出来，比如走到第 i 阶只能来自第 i-1 或 i-2 阶——典型的线性递推信号。",
    "在一堆数字或物品里做「选 / 不选」的决策，且带有总和、容量之类的上限约束——这是背包模型的标志。",
    "两个字符串或数组之间求公共部分、编辑代价、匹配关系——基本都落在二维 dp[i][j] 上。",
    "暴力递归写得出来但超时，画递归树发现大量重复节点——加上记忆化缓存，它的迭代版本就是 DP。"
  ],
  "templates": [
    {
      "title": "线性 DP（爬楼梯 / 打家劫舍型）",
      "code": "def rob_linear_dp(nums: list[int]) -> int:\n    # 线性 DP 模板：以 198 打家劫舍为例（爬楼梯把 max 换成两项相加即可）\n    n = len(nums)\n    if n == 1:  # 边界：只有一间房，递推尚未启动就要返回\n        return nums[0]\n    # 五部曲① dp[i] 含义：考虑下标 0..i 的房屋，能偷到的最大金额\n    dp = [0] * n\n    # 五部曲③ 初始化：递推公式够不到的前两项手动赋值\n    dp[0] = nums[0]\n    dp[1] = max(nums[0], nums[1])\n    # 五部曲④ 遍历顺序：i 从小到大\n    for i in range(2, n):\n        # 五部曲② 递推公式：不偷第 i 间取 dp[i-1]，偷第 i 间取 dp[i-2] + nums[i]\n        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])\n    # 五部曲⑤ 打印调试：卡住时 print(dp) 与手算对照\n    return dp[n - 1]",
      "explain": "递推行 max(dp[i-1], dp[i-2] + nums[i]) 对应「不偷 / 偷」两个决策，线性 DP 的本质就是把当前决策归约到前面常数个状态。初始化必须盖住递推公式够不到的 dp[0]、dp[1]，并对 n == 1 特判，否则会越界。由于只依赖前两项，可再用两个变量滚动把空间压到 O(1)，爬楼梯 70 与此完全同构。"
    },
    {
      "title": "0-1 背包（416 分割等和子集型，滚动数组）",
      "code": "def can_partition(nums: list[int]) -> bool:\n    # 0-1 背包模板：416 分割等和子集，一维滚动数组写法\n    total = sum(nums)\n    if total % 2 == 1:  # 总和是奇数，必然无法平分\n        return False\n    target = total // 2  # 背包容量 = 总和的一半\n    # dp[j] 含义：容量为 j 的背包能否被若干个数字恰好装满\n    dp = [False] * (target + 1)\n    dp[0] = True  # 初始化：容量 0 用空集即可装满，是整个递推的种子\n    for num in nums:  # 外层遍历物品：每个数字只考虑一次\n        for j in range(target, num - 1, -1):  # 内层倒序遍历容量：0-1 背包的命门\n            # 不选 num 则 dp[j] 维持原值；选 num 则需要 dp[j - num] 可达\n            dp[j] = dp[j] or dp[j - num]\n        if dp[target]:  # 小剪枝：已能装满就提前返回\n            return True\n    return dp[target]",
      "explain": "一维写法中 dp[j - num] 必须取「还没考虑当前数字」的上一轮值，所以容量 j 必须从大到小倒序遍历；一旦写成正序，同一个数字会被反复使用，直接退化成完全背包。dp[0] = True 是全表的种子，漏掉它整个数组恒为 False。反过来，完全背包（322 零钱兑换）只需把内层改成正序，这一对遍历方向要当结论背下来。"
    },
    {
      "title": "子序列型（300 单序列 / 1143 双序列）",
      "code": "def length_of_lis(nums: list[int]) -> int:\n    # 单序列子序列模板：300 最长递增子序列，O(n^2) 写法\n    n = len(nums)\n    # dp[i] 含义：以 nums[i] 结尾（必须包含 i）的最长递增子序列长度\n    dp = [1] * n  # 初始化：每个元素自身就是长度为 1 的子序列\n    for i in range(1, n):\n        for j in range(i):  # 枚举所有可能接在 i 前面的结尾 j\n            if nums[j] < nums[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)  # 答案取全体 dp[i] 的最大值，不是 dp[n-1]\n\n\ndef longest_common_subsequence(text1: str, text2: str) -> int:\n    # 双序列子序列模板：1143 最长公共子序列\n    m, n = len(text1), len(text2)\n    # dp[i][j] 含义：text1 前 i 个字符与 text2 前 j 个字符的最长公共子序列长度\n    dp = [[0] * (n + 1) for _ in range(m + 1)]  # 多开一行一列表示空串，免去初始化特判\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i - 1] == text2[j - 1]:  # 注意错位：第 i 个字符是 text1[i-1]\n                dp[i][j] = dp[i - 1][j - 1] + 1\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]",
      "explain": "单序列型把 dp[i] 定义成「以 i 结尾」，好处是转移只需枚举前面的结尾 j，代价是最终答案要对整个 dp 取 max，写成返回 dp[n-1] 是 300 最经典的翻车点。双序列型统一用 dp[i][j] 表示两个前缀的答案，多开一行一列充当空串边界，注意 dp[i][j] 对应的字符是 text1[i-1] 和 text2[j-1]。72 编辑距离就是把 1143 的 else 分支换成插入、删除、替换三种操作取 min 再加一。"
    }
  ],
  "problems": [
    {
      "lc": 70,
      "title": "爬楼梯",
      "slug": "climbing-stairs",
      "difficulty": "简单",
      "featured": true,
      "hint": "dp[i] = dp[i-1] + dp[i-2]，本质是斐波那契，用两个变量滚动即可。"
    },
    {
      "lc": 198,
      "title": "打家劫舍",
      "slug": "house-robber",
      "difficulty": "中等",
      "featured": true,
      "hint": "每间房只有偷或不偷：dp[i] = max(dp[i-1], dp[i-2] + nums[i])。"
    },
    {
      "lc": 322,
      "title": "零钱兑换",
      "slug": "coin-change",
      "difficulty": "中等",
      "featured": true,
      "hint": "完全背包求最少硬币数：dp[j] = min(dp[j], dp[j-coin] + 1)，内层正序遍历，初值设无穷大且 dp[0] = 0。"
    },
    {
      "lc": 416,
      "title": "分割等和子集",
      "slug": "partition-equal-subset-sum",
      "difficulty": "中等",
      "featured": true,
      "hint": "转化为容量 sum // 2 的 0-1 背包判可达性，一维数组容量倒序遍历。"
    },
    {
      "lc": 300,
      "title": "最长递增子序列",
      "slug": "longest-increasing-subsequence",
      "difficulty": "中等",
      "featured": true,
      "hint": "dp[i] 表示以 i 结尾的 LIS 长度，答案取全数组最大值；进阶用贪心加二分做到 O(n log n)。"
    },
    {
      "lc": 1143,
      "title": "最长公共子序列",
      "slug": "longest-common-subsequence",
      "difficulty": "中等",
      "featured": true,
      "hint": "dp[i][j] 表示两个前缀的 LCS：末字符相等取左上角加一，否则取上方与左方的较大者。"
    },
    {
      "lc": 5,
      "title": "最长回文子串",
      "slug": "longest-palindromic-substring",
      "difficulty": "中等",
      "featured": true,
      "hint": "区间型：dp[i][j] 表示 i..j 是否回文，按子串长度从短到长遍历；中心扩展法更好写，二选一。"
    },
    {
      "lc": 72,
      "title": "编辑距离",
      "slug": "edit-distance",
      "difficulty": "困难",
      "featured": true,
      "hint": "dp[i][j] 表示两个前缀的编辑距离：末字符相等继承左上角，否则插入、删除、替换三者取 min 加一。"
    },
    {
      "lc": 494,
      "title": "目标和",
      "slug": "target-sum",
      "difficulty": "中等",
      "featured": true,
      "hint": "可用 cache 递归枚举每个数取正或负；也可转成子集和计数背包，注意目标的奇偶与可达范围。"
    }
  ],
  "pitfalls": [
    "0-1 背包一维写法的内层容量必须倒序：for j in range(target, num - 1, -1)；写成正序同一物品会被选多次，直接变成完全背包。",
    "初始化没盖住递推起点：打家劫舍在 len(nums) == 1 时访问 dp[1] 会越界，先特判短数组再进主循环。",
    "「以 i 结尾」定义下返回 dp[-1] 是错的：300 要 return max(dp)，同款定义的 53 最大子数组和也一样，答案要在全体状态里取最值。",
    "双序列 DP 的下标错位：dp[i][j] 对应的字符是 text1[i - 1]、text2[j - 1]，直接写 text1[i] 会整体偏移一位甚至越界。",
    "求最小值的 DP（如 322）初值要设 float('inf') 而不是 0，转移取 min 才不会被 0 污染，最后还要判断 dp[target] 是否仍为 inf 来决定返回 -1。"
  ],
  "interviewNote": "面试手写模式下别依赖力扣的类和函数签名：自己写 solve 函数与 main 入口，用 input().split() 读入并转 int，或直接在代码里硬编码两三组测试数据（记得带上 n == 1、全负数、总和为奇数这类边界）现场跑通。写 DP 时保留一行打印 dp 数组的调试代码，讲解时对着表格说清 dp 含义与每个转移的来源，比只报一个答案有说服力得多。滚动数组版本容易现场写挂，时间紧就先写朴素二维版，再口头说明空间如何优化。",
  "resources": [
    {
      "name": "hello-algo 动态规划章（概念入门）",
      "url": "https://www.hello-algo.com/chapter_dynamic_programming/"
    },
    {
      "name": "代码随想录（动态规划五部曲）",
      "url": "https://programmercarl.com/"
    },
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    }
  ]
},
{
  "id": "greedy",
  "order": 6,
  "name": "贪心",
  "emoji": "🎯",
  "tagline": "每步取当下最优，累积推出全局最优",
  "estHours": 12,
  "core": "贪心算法在每一步都做出当下最优的选择，并且从不回头修改，靠一连串局部最优累积出全局最优。它成立的前提是问题具有贪心选择性质：存在某个全局最优解，恰好包含当前这一步的局部最优选择；经典的说服方式是交换论证——把最优解里的某个选择换成贪心的选择，证明结果不会变差。正因为每步只保留一个决策、不像动态规划那样枚举所有子问题，贪心通常一次排序加一次遍历就能收工，复杂度多为 O(n log n) 或 O(n)。它典型地解决区间调度、分配匹配、跳跃覆盖这类可以按某种顺序逐个处理的问题。贪心的难点从来不在代码而在判断：想出策略后先花一分钟构造反例，攻不破再写，攻破了就老老实实转向动态规划。",
  "signals": [
    "求「最多能选几个」「最少需要几步」，且每一步的选择不影响之后的可选性（无后效性）。",
    "题面给出一堆区间（会议、任务、气球、射箭），按端点排序后逐个处理往往就是答案。",
    "分配与匹配场景：两组数据各自排序后从小到大配对，如饼干喂孩子、救生艇载人。",
    "跳跃、覆盖类描述：只需维护「当前能到达的最远位置」一个状态就能一路推进。",
    "你写出的动态规划里，每步转移其实只有一个明显更优的决策，多半可以退化成贪心。"
  ],
  "templates": [
    {
      "title": "贪心思考框架（排序 → 局部最优选择 → 验证反例）",
      "code": "def greedy_framework(intervals):\n    # 贪心没有万能模板，先排序，再做局部最优选择，最后验证反例\n    # 这里用最多保留多少个互不重叠区间来实例化通用骨架\n    if not intervals:\n        return 0\n\n    # 步骤一：排序预处理——贪心题九成以上从排序开始\n    # 区间问题常按右端点升序：结束越早，给后面留的余地越大\n    intervals.sort(key=lambda x: x[1])\n\n    keep_count = 0            # 贪心累计的结果：保留的区间数\n    last_end = float('-inf')  # 已选区间的右端点，是后续决策依赖的唯一状态\n\n    # 步骤二：一次遍历，每步做局部最优选择，选了就不再撤销\n    for start, end in intervals:\n        if start >= last_end:  # 与已保留的区间不冲突\n            keep_count += 1    # 局部最优：保留结束最早的可行区间\n            last_end = end     # 更新状态，影响之后的所有判断\n\n    # 步骤三：验证反例（列在草稿纸上，不写进代码）\n    # 1. 换排序攻击：按左端点或按长度排，能否构造输入让答案变差？\n    # 2. 极端数据：空数组、全部重叠、全部不重叠、端点恰好相接\n    # 若找到反例说明贪心不成立，这题应转投动态规划\n    return keep_count",
      "explain": "sort(key=lambda x: x[1]) 这一行就是贪心策略本身：按右端点升序等价于「优先保留结束最早的区间」，换成按左端点排整个算法就错了，所以说排序方式即策略。主循环里每个元素只被看一次、选了就不撤销，这是贪心与动态规划的本质区别，也是 O(n log n) 效率的来源。真正值得背的不是这段代码，而是「定排序、单遍历、找反例」三步——换一道题时，排序维度和选择条件都要重新推导。"
    }
  ],
  "problems": [
    {
      "lc": 455,
      "title": "分发饼干",
      "slug": "assign-cookies",
      "difficulty": "简单",
      "featured": false,
      "hint": "胃口和饼干都排序，用双指针让最小的饼干优先满足胃口最小的孩子。"
    },
    {
      "lc": 121,
      "title": "买卖股票的最佳时机",
      "slug": "best-time-to-buy-and-sell-stock",
      "difficulty": "简单",
      "featured": true,
      "hint": "一次遍历维护历史最低价，每天用当前价减最低价更新最大利润。"
    },
    {
      "lc": 122,
      "title": "买卖股票的最佳时机 II",
      "slug": "best-time-to-buy-and-sell-stock-ii",
      "difficulty": "中等",
      "featured": false,
      "hint": "可以多次交易时，把所有为正的相邻日差价全部收入囊中即最优。"
    },
    {
      "lc": 53,
      "title": "最大子数组和",
      "slug": "maximum-subarray",
      "difficulty": "中等",
      "featured": true,
      "hint": "当前缀和为负就果断丢弃重新开始，因为负的前缀只会拖累后面。"
    },
    {
      "lc": 55,
      "title": "跳跃游戏",
      "slug": "jump-game",
      "difficulty": "中等",
      "featured": true,
      "hint": "遍历中维护能到达的最远下标，一旦当前位置超出最远可达即失败。"
    },
    {
      "lc": 763,
      "title": "划分字母区间",
      "slug": "partition-labels",
      "difficulty": "中等",
      "featured": true,
      "hint": "先记录每个字母最后出现的下标，遍历时不断扩张当前片段的右边界。"
    },
    {
      "lc": 45,
      "title": "跳跃游戏 II",
      "slug": "jump-game-ii",
      "difficulty": "中等",
      "featured": true,
      "hint": "在当前一跳覆盖的范围内选能到达最远的点作下一跳边界，走到边界时步数加一。"
    },
    {
      "lc": 435,
      "title": "无重叠区间",
      "slug": "non-overlapping-intervals",
      "difficulty": "中等",
      "featured": false,
      "hint": "按右端点排序，优先保留结束最早的区间，答案等于总数减去可保留数。"
    }
  ],
  "pitfalls": [
    "区间题排序维度写错：435 按左端点排会被超长区间坑掉，必须 intervals.sort(key=lambda x: x[1]) 按右端点排。",
    "重叠判断的等号方向弄反：前一个区间的右端点等于后一个的左端点通常不算重叠，保留条件应写 start >= last_end。",
    "45 跳跃游戏 II 的遍历上界应为 len(nums) - 1：把最后一格也纳入循环，会在恰好到达终点时多算一步。",
    "53 把最大和初始化为 0，在全负数组上会错误地返回 0，应初始化为 nums[0] 或负无穷再逐位更新。",
    "122 手写「低点买、高点卖」的分支容易漏边界，等价写法 profit += max(0, prices[i] - prices[i - 1]) 一行更稳。"
  ],
  "interviewNote": "手写（ACM）模式下要自己完成输入解析：用 input().split() 配 map(int, ...) 转型，区间题常是一行一个区间，需要自己组装成二维列表再排序。贪心题面试官几乎必追问「为什么这样贪是对的」，建议落笔前先用一句交换论证说明理由，并主动构造全负数组、区间完全重叠这类反例数据当场验证。排序统一用 sorted 或 list.sort 配 key=lambda 的一行写法，比手写比较逻辑更快也更不易错。",
  "resources": [
    {
      "name": "hello-algo 贪心章",
      "url": "https://www.hello-algo.com/chapter_greedy/"
    },
    {
      "name": "代码随想录（贪心篇）",
      "url": "https://programmercarl.com/"
    },
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    }
  ]
},
{
  "id": "binary-tree",
  "order": 7,
  "name": "二叉树",
  "emoji": "🌳",
  "tagline": "一切树题皆遍历：递归拆左右，队列走层序",
  "estHours": 10,
  "core": "二叉树是天然的递归结构：每棵树都等于根节点加上左右两棵更小的子树，所以绝大多数树题都能拆成「处理当前节点 + 递归处理左右子树」的同构子问题。写递归遵循三部曲：先明确函数的定义（输入什么、返回什么），再写终止条件（通常是节点为空），最后写单层逻辑（当前节点该做什么、何时递归左右）。前序、中序、后序的区别，仅仅是「处理当前节点」这行代码放在两次递归调用之前、之间还是之后。层序遍历改用队列按层扫描，天然适合一切按层给答案的问题；二叉搜索树额外满足左小右大，中序遍历结果严格递增，这是验证与查找类题目的钥匙。把遍历框架吃透之后，构造树、找最近公共祖先这类难题，都只是往框架里填不同的单层逻辑而已。",
  "signals": [
    "输入类型是 TreeNode 或题面直接画出一棵树，先默认往递归 DFS 或层序 BFS 上靠。",
    "求深度、节点个数、路径和这类整棵树的聚合量，用后序遍历：先拿左右子树答案再合并。",
    "结果按层组织（每层平均值、右视图、锯齿形遍历），直接套 BFS 层序模板。",
    "题目出现二叉搜索树或 BST 字样，立刻想到中序遍历有序、左小右大可剪枝。",
    "问两个节点之间的关系（最近公共祖先、距离），考虑自底向上返回信息的后序递归。"
  ],
  "templates": [
    {
      "title": "递归 DFS：前中后序一套框架",
      "code": "from typing import Optional\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef dfs(node: Optional[TreeNode]) -> None:\n    # 终止条件：空节点直接返回，这是递归的出口\n    if node is None:\n        return\n    # ===== 前序位置：刚进入节点，适合自顶向下传递信息（如记录路径） =====\n    dfs(node.left)   # 递归处理左子树\n    # ===== 中序位置：左子树已完成、右子树未开始，BST 在此得到升序序列 =====\n    dfs(node.right)  # 递归处理右子树\n    # ===== 后序位置：左右子树都已完成，适合自底向上汇总答案 =====\n\n# 后序汇总的典型写法：求最大深度，LC104 可直接套用\ndef max_depth(node: Optional[TreeNode]) -> int:\n    if node is None:                     # 空树深度为 0\n        return 0\n    left_depth = max_depth(node.left)    # 左子树的答案\n    right_depth = max_depth(node.right)  # 右子树的答案\n    return max(left_depth, right_depth) + 1  # 后序位置合并：较深者加上根这一层",
      "explain": "终止条件必须写在最前面，保证后续访问 node.left 时 node 一定非空。三种遍历共用同一副骨架，区别只在「处理当前节点」的代码放在哪个位置：自顶向下传信息用前序，自底向上收答案用后序，BST 要有序序列用中序。max_depth 演示了最常考的后序套路：先接住左右子树的返回值，再在后序位置合并出当前层的答案。"
    },
    {
      "title": "BFS 层序遍历：deque 逐层扫描",
      "code": "from collections import deque\nfrom typing import Optional, List\n\ndef level_order(root: Optional[TreeNode]) -> List[List[int]]:\n    # 空树先判掉，避免把 None 塞进队列\n    if root is None:\n        return []\n    result = []                # 收集每一层的值\n    queue = deque([root])      # 初始队列里只有根节点\n    while queue:\n        level_size = len(queue)      # 关键：先固定当前层的节点个数\n        current_level = []\n        for _ in range(level_size):  # 只弹出属于当前层的节点\n            node = queue.popleft()   # deque 弹队首是 O(1)\n            current_level.append(node.val)\n            if node.left:            # 孩子非空才入队，队列里永远不出现 None\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        result.append(current_level) # 当前层收集完毕\n    return result",
      "explain": "level_size = len(queue) 是整个模板的灵魂：进入 while 时队列里恰好是完整的一层，先固定长度，内层 for 只处理这一层，新入队的孩子留给下一轮。deque 的 popleft 是 O(1)，换成 list.pop(0) 整体会退化到 O(n^2)。右视图、每层最大值、锯齿形遍历都只需微调 current_level 的收集或翻转方式。"
    }
  ],
  "problems": [
    {
      "lc": 104,
      "title": "二叉树的最大深度",
      "slug": "maximum-depth-of-binary-tree",
      "difficulty": "简单",
      "featured": true,
      "hint": "后序递归模板题：深度等于 max(左深, 右深) + 1，三行写完。"
    },
    {
      "lc": 226,
      "title": "翻转二叉树",
      "slug": "invert-binary-tree",
      "difficulty": "简单",
      "featured": true,
      "hint": "每个节点交换左右孩子再分别递归，放在前序或后序位置做都可以。"
    },
    {
      "lc": 101,
      "title": "对称二叉树",
      "slug": "symmetric-tree",
      "difficulty": "简单",
      "featured": true,
      "hint": "写辅助函数同时递归两棵子树：外侧比外侧、内侧比内侧，值相等才对称。"
    },
    {
      "lc": 102,
      "title": "二叉树的层序遍历",
      "slug": "binary-tree-level-order-traversal",
      "difficulty": "中等",
      "featured": true,
      "hint": "deque 建队，先记 level_size 固定当前层再逐个弹出，孩子非空才入队。"
    },
    {
      "lc": 98,
      "title": "验证二叉搜索树",
      "slug": "validate-binary-search-tree",
      "difficulty": "中等",
      "featured": true,
      "hint": "向下传 (low, high) 开区间约束每个节点，或中序遍历检查序列严格递增。"
    },
    {
      "lc": 236,
      "title": "二叉树的最近公共祖先",
      "slug": "lowest-common-ancestor-of-a-binary-tree",
      "difficulty": "中等",
      "featured": true,
      "hint": "后序递归：在左右子树各找一次，两边都有命中时当前节点就是答案。"
    },
    {
      "lc": 105,
      "title": "从前序与中序遍历序列构造二叉树",
      "slug": "construct-binary-tree-from-preorder-and-inorder-traversal",
      "difficulty": "中等",
      "featured": true,
      "hint": "前序第一个元素定根，用哈希表在中序中定位根的下标，切出左右区间递归构造。"
    },
    {
      "lc": 2196,
      "title": "根据描述创建二叉树",
      "slug": "create-binary-tree-from-descriptions",
      "difficulty": "中等",
      "featured": false,
      "hint": "哈希表按值复用节点，集合记录所有孩子；构建完成后，未出现在孩子集合中的节点就是根。"
    },
    {
      "lc": 450,
      "title": "删除二叉搜索树中的节点",
      "slug": "delete-node-in-a-bst",
      "difficulty": "中等",
      "featured": false,
      "hint": "双子树时用右子树最小值替换当前值，再递归删除这个后继节点；其余情况直接返回唯一子树。"
    }
  ],
  "pitfalls": [
    "先访问后判空是最高频报错：必须先写 if node is None: return，再去碰 node.left，否则 NoneType 没有 left 属性直接崩溃。",
    "验证 BST 只比较父子两个节点是经典错解：右子树里的所有节点都必须大于根，要向下传递 (low, high) 区间，或改用中序检查严格递增。",
    "层序遍历不先固定 level_size 就边弹边入队，会把下一层节点混进当前层；另外 list.pop(0) 是 O(n)，务必用 deque.popleft()。",
    "递归的返回值没接住或分支漏写 return：凡是函数定义说要返回，就得保证每条路径都 return；翻转、构造类题目还要记得把返回值挂回 root.left 和 root.right。",
    "Python 默认递归深度约 1000，退化成链状的树会抛 RecursionError；LeetCode 上通常安全，手测极端数据时可用 sys.setrecursionlimit 或改写成显式栈迭代。"
  ],
  "interviewNote": "面试手写往往脱离 LeetCode 评测环境，要先自己写出 class TreeNode 的定义（val、left、right 三个属性），再手动创建 3 到 5 个节点、用赋值连成一棵小树（记得包含只有单侧孩子的不平衡形态）作为测试数据。写完主函数后，拿这棵小树打印一遍输出并口述递归的执行顺序，能当场暴露终止条件和返回值的问题。最后主动测一下 root is None 的空树输入，这几乎是面试官必问的第一个边界用例。",
  "resources": [
    {
      "name": "hello-algo 树章",
      "url": "https://www.hello-algo.com/chapter_tree/"
    },
    {
      "name": "代码随想录（二叉树篇）",
      "url": "https://programmercarl.com/"
    },
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    }
  ]
},
{
  "id": "backtracking",
  "order": 8,
  "name": "回溯",
  "emoji": "🧩",
  "tagline": "带撤销的暴力穷举，走遍整棵决策树",
  "estHours": 12,
  "core": "回溯的本质是带撤销的暴力穷举：把所有候选方案组织成一棵决策树，每一层对应一次选择，从根走到收集点就得到一个完整方案。它解决的是组合、切割、子集、排列、棋盘这五类“要枚举全部解”的问题——这类问题没有多项式级的聪明解法，能做的只是不重不漏地系统搜索。实现上只有三个要素：path 记录当前路径，for 循环遍历本层的选择列表，递归返回后立刻撤销刚才的选择，让现场复原供下一个分支使用。纯穷举是指数级的，因此剪枝（提前判定分支不可能合法就跳过）和去重（相同的值在同一层只展开一次）决定了能否通过。注意它与图论 DFS 关注点不同：回溯搜索的是抽象的决策空间并强调撤销状态，而不是遍历一个给定的图结构。",
  "signals": [
    "题目要求返回所有方案、所有组合、所有排列，而不是只要最优值或方案个数。",
    "数据规模异常小（n 一般不超过 20），这是允许指数级枚举的强烈暗示。",
    "过程可以描述成每一步从若干候选里选一个，且当前选择会缩小后续的选择范围。",
    "题面出现字符串的所有切割方式、棋盘上放置且互不攻击这类描述。",
    "动态规划只能算出方案个数、给不出具体方案时，枚举具体方案就要靠回溯。"
  ],
  "templates": [
    {
      "title": "回溯三部曲通用模板（路径 / 选择列表 / 递归 + 撤销）",
      "code": "def backtrack_template(nums):\n    # 回溯通用模板（示例：求去重后的所有子集，可改造成组合、排列、切割）\n    nums.sort()              # 剪枝和去重都依赖有序，先排序\n    res = []                 # 结果集：收集所有合法方案\n    path = []                # 路径：当前分支上已做过的选择\n\n    def backtrack(start):\n        # 一、收集结果：子集类在每个节点收集；组合、排列类改成\n        #     if len(path) == k: res.append(path[:]); return\n        res.append(path[:])  # 必须拷贝快照，path 之后还会被修改\n        # 二、遍历本层选择列表：start 保证组合类不走回头路\n        for i in range(start, len(nums)):\n            # ===== 剪枝位置：不可能出合法解的分支提前砍掉 =====\n            # 例（组合总和）：if nums[i] > remain: break，排序后后面只会更大\n            # ===== 去重位置：同一层里相同的值只展开第一个分支 =====\n            if i > start and nums[i] == nums[i - 1]:\n                continue\n            path.append(nums[i])   # 三、做选择\n            backtrack(i + 1)       # 四、递归下一层：元素可复用则传 i；\n                                   #     排列类每层从 0 扫并配合 used 数组\n            path.pop()             # 五、撤销选择：与做选择严格对称\n\n    backtrack(0)\n    return res",
      "explain": "path 与 res.append(path[:]) 是灵魂：必须存切片快照，否则 res 里保存的全是同一个正被反复修改的列表。for 循环就是本层的选择列表，path.append 与 path.pop 严格成对出现，保证递归返回后现场复原，这就是“撤销”。剪枝写在进入递归之前，排序后可用 break 整层砍掉；去重的固定句式 i > start and nums[i] == nums[i-1] 表示同一层相同的值只走第一个分支。"
    }
  ],
  "problems": [
    {
      "lc": 77,
      "title": "组合",
      "slug": "combinations",
      "difficulty": "中等",
      "featured": false,
      "hint": "最标准的入门题：用 start 控制起点避免重复组合，剩余元素不够凑满 k 个时直接 break 剪枝。"
    },
    {
      "lc": 78,
      "title": "子集",
      "slug": "subsets",
      "difficulty": "中等",
      "featured": true,
      "hint": "每个递归节点都收集一次 path，不需要显式终止条件，start 越界后循环自然结束。"
    },
    {
      "lc": 46,
      "title": "全排列",
      "slug": "permutations",
      "difficulty": "中等",
      "featured": true,
      "hint": "排列讲顺序，每层都从下标 0 开始扫，用 used 数组标记已在路径中的元素。"
    },
    {
      "lc": 39,
      "title": "组合总和",
      "slug": "combination-sum",
      "difficulty": "中等",
      "featured": true,
      "hint": "元素可无限复用，递归传 i 而不是 i+1；排序后当前值大于剩余目标就 break。"
    },
    {
      "lc": 17,
      "title": "电话号码的字母组合",
      "slug": "letter-combinations-of-a-phone-number",
      "difficulty": "中等",
      "featured": true,
      "hint": "多个集合各取一个：每层对应一个数字，遍历该数字映射的字母表，无需 start。"
    },
    {
      "lc": 131,
      "title": "分割回文串",
      "slug": "palindrome-partitioning",
      "difficulty": "中等",
      "featured": true,
      "hint": "切割就是组合：枚举下一刀切在哪个位置，切出的子串是回文才继续往下递归。"
    },
    {
      "lc": 51,
      "title": "N 皇后（选做）",
      "slug": "n-queens",
      "difficulty": "困难",
      "featured": true,
      "hint": "逐行放皇后天然保证行不冲突，用三个集合分别记录列和两条对角线的占用情况。"
    }
  ],
  "pitfalls": [
    "收集结果写成 res.append(path)：存进去的是同一个引用，回溯结束后全变成空列表；必须写 res.append(path[:]) 拷贝快照。",
    "path.append 与 path.pop 没有严格配对：在中途 return 或 continue 之前漏了撤销，导致后续分支的 path 被污染，建议撤销永远紧跟在递归调用的下一行。",
    "start 与 used 用混：组合、子集、切割用 start 控制起点防止重复；排列每层从 0 扫并用 used 标记；组合总和这种元素可复用的题递归要传 i 而不是 i+1。",
    "同层去重条件写错：正确做法是先排序，再 if i > start and nums[i] == nums[i-1]: continue；写成 i > 0 会把不同层的合法分支也误删掉。",
    "剪枝时 break 与 continue 不分：排序后当前元素已超过剩余目标应 break 砍掉整层剩余分支，只有个别分支不合法才用 continue。"
  ],
  "interviewNote": "不少公司面试用本地 IDE 或共享文档手写，而不是 LeetCode 核心代码模式：要自己写出完整可运行的程序，定义函数签名，在 if __name__ == '__main__' 下构造两三组测试数据（记得覆盖空输入和含重复元素的用例）并打印结果自测。回溯的返回值是嵌套列表，报答案时顺口说出方案总数和复杂度量级（如全排列约 O(n × n!)）会明显加分。Python 细节要提前写熟：嵌套函数里修改不可变外层变量需要 nonlocal，path[:] 的切片拷贝一个都不能省。",
  "resources": [
    {
      "name": "hello-algo 回溯章",
      "url": "https://www.hello-algo.com/chapter_backtracking/"
    },
    {
      "name": "代码随想录（回溯篇）",
      "url": "https://programmercarl.com/"
    },
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    }
  ]
},
{
  "id": "graph",
  "order": 9,
  "name": "图论",
  "emoji": "🕸️",
  "tagline": "把相邻与依赖抽象成图，遍历出答案",
  "estHours": 10,
  "core": "图论处理的是『元素之间存在关系』的问题：网格里相邻的格子、课程之间的先修依赖，本质都是点与边。核心武器就是遍历：DFS 沿一条路走到底再回溯，适合把一整块连通区域一次性找全；BFS 一圈圈向外扩散，天然按距离分层，多源 BFS 因此能模拟多个起点同时蔓延的过程。拓扑排序则把依赖关系转成入度数字：反复摘掉入度为 0 的点，摘不完就说明存在环。这些方法之所以高效，是因为访问标记保证每个点、每条边只被处理常数次，总复杂度是线性的 O(V+E)。连通性问题还有并查集（Union-Find）这一利器，不过在当前探险模式阶段用 DFS/BFS 完全够，了解概念即可。",
  "signals": [
    "输入是二维网格，问连通块的个数、最大面积或能否从起点走到终点——想网格 DFS/BFS。",
    "题面出现『感染、腐烂、扩散、最少分钟/天数』且起点不止一个——想多源 BFS 按层计时。",
    "题面出现『先修、依赖、先后顺序、能否全部完成』——想拓扑排序，本质是判断有向图是否有环。",
    "问『朋友圈、省份、分成几组』这类归类问题——求连通分量个数，DFS/BFS 或并查集皆可。",
    "要求处理『与边界相连』的特殊区域——逆向思维：从边界出发先遍历标记，再处理内部。"
  ],
  "templates": [
    {
      "title": "网格 DFS 模板（岛屿型）",
      "code": "def num_islands(grid):\n    # 统计岛屿数量：遇到未访问的陆地就启动一次 DFS，把整座岛标记掉\n    if not grid or not grid[0]:\n        return 0\n    m, n = len(grid), len(grid[0])\n\n    def dfs(r, c):\n        # 递归出口：越界、是水、已访问，三种情况统一拦截\n        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':\n            return\n        grid[r][c] = '0'  # 先标记再扩散，防止相邻格子互相无限递归\n        dfs(r + 1, c)  # 下\n        dfs(r - 1, c)  # 上\n        dfs(r, c + 1)  # 右\n        dfs(r, c - 1)  # 左\n\n    count = 0\n    for i in range(m):\n        for j in range(n):\n            if grid[i][j] == '1':  # 发现一块新陆地 = 一座新岛屿\n                count += 1\n                dfs(i, j)\n    return count",
      "explain": "dfs 开头一行是统一出口：越界、遇水、已访问三种情况全部直接 return，后面的主体逻辑就不需要再写任何边界判断。grid[r][c] = '0' 必须放在四个方向递归之前，相当于『先占坑再扩散』，否则相邻格子会互相调用直到栈溢出。主循环每成功启动一次 dfs 就是发现一个新连通块，这个计数骨架可以直接迁移到最大面积、省份数量等变体。"
    },
    {
      "title": "拓扑排序 BFS 模板（课程表型）",
      "code": "from collections import deque\n\ndef can_finish(num_courses, prerequisites):\n    # 拓扑排序判环：能修完所有课程 等价于 先修关系图中无环\n    graph = [[] for _ in range(num_courses)]  # 邻接表：先修课 -> 依赖它的后续课\n    indegree = [0] * num_courses              # 入度：每门课还剩几门先修课没解决\n    for cur, pre in prerequisites:            # 题目约定：想学 cur 必须先修 pre\n        graph[pre].append(cur)                # 边的方向：pre 指向 cur\n        indegree[cur] += 1\n\n    # 第一批入队：所有没有先修要求（入度为 0）的课程\n    queue = deque(i for i in range(num_courses) if indegree[i] == 0)\n    finished = 0  # 已成功安排的课程数\n    while queue:\n        node = queue.popleft()\n        finished += 1\n        for nxt in graph[node]:\n            indegree[nxt] -= 1      # node 修完，后续课少了一门先修\n            if indegree[nxt] == 0:  # 先修全部完成，可以开学了\n                queue.append(nxt)\n    # 有环时环上节点入度永远减不到 0，finished 会小于总课程数\n    return finished == num_courses",
      "explain": "建图方向是最大陷阱：题目约定 [cur, pre] 表示先修 pre 才能学 cur，所以边从 pre 指向 cur、入度记在 cur 上。队列中永远只存放入度已经减到 0 的课程，保证每个点出队时其全部前置都已处理完，这正是拓扑序的含义。若图中有环，环上节点的入度永远到不了 0、进不了队列，最终 finished 小于 num_courses，从而检测出环。"
    }
  ],
  "problems": [
    {
      "lc": 200,
      "title": "岛屿数量",
      "slug": "number-of-islands",
      "difficulty": "中等",
      "featured": true,
      "hint": "遍历网格，遇到 '1' 计数加一，并用 DFS 把整座岛淹成 '0'。"
    },
    {
      "lc": 695,
      "title": "岛屿的最大面积",
      "slug": "max-area-of-island",
      "difficulty": "中等",
      "featured": false,
      "hint": "岛屿数量的变体：让 DFS 返回当前连通块面积（1 加四个方向之和），全局取最大值。"
    },
    {
      "lc": 547,
      "title": "省份数量",
      "slug": "number-of-provinces",
      "difficulty": "中等",
      "featured": false,
      "hint": "邻接矩阵版连通分量：对每个未访问的城市启动一次 DFS，启动次数就是省份数。"
    },
    {
      "lc": 130,
      "title": "被围绕的区域",
      "slug": "surrounded-regions",
      "difficulty": "中等",
      "featured": false,
      "hint": "逆向思维：从四条边界上的 O 出发 DFS 标记为安全，最后把未标记的 O 全部翻成 X。"
    },
    {
      "lc": 994,
      "title": "腐烂的橘子",
      "slug": "rotting-oranges",
      "difficulty": "中等",
      "featured": true,
      "hint": "多源 BFS：所有腐烂橘子先同时入队，按层扩散记分钟数，结束后仍有新鲜橘子则返回 -1。"
    },
    {
      "lc": 207,
      "title": "课程表",
      "slug": "course-schedule",
      "difficulty": "中等",
      "featured": true,
      "hint": "拓扑排序模板题：建邻接表和入度数组，能出队的课程数等于总数即无环。"
    },
    {
      "lc": 1129,
      "title": "颜色交替的最短路径",
      "slug": "shortest-path-with-alternating-colors",
      "difficulty": "中等",
      "featured": false,
      "hint": "BFS 状态必须包含（节点，上一条边颜色），同一节点用不同颜色到达是两个不能合并的状态。"
    },
    {
      "lc": 2203,
      "title": "包含要求路径的最小带权子图",
      "slug": "minimum-weighted-subgraph-with-the-required-paths",
      "difficulty": "困难",
      "featured": false,
      "hint": "从两个源点各跑正图 Dijkstra，从终点跑反图 Dijkstra；枚举汇合点相加三段最短距离。"
    }
  ],
  "pitfalls": [
    "忘记访问标记，或把标记写在递归调用之后：相邻两格会互相无限递归直到栈溢出，标记必须在向四周扩散之前完成。",
    "越界判断必须放在访问 grid[r][c] 之前；尤其注意 Python 负索引不报错而是绕到末尾，r 减到 -1 时会悄悄访问最后一行，产生很难排查的错误答案。",
    "拓扑排序建图方向搞反：prerequisites 里的 [a, b] 是先修 b 后学 a，边应从 b 指向 a、入度加在 a 上，方向反了部分用例也可能碰巧通过。",
    "多源 BFS 计时出错：应把所有源点一次性入队后逐层扩散、每层时间加一，而不是对每个源点单独 BFS；另外初始就没有新鲜橘子时应直接返回 0。",
    "网格元素类型看错：岛屿数量里格子是字符 '1' 而不是整数 1，条件写成 grid[i][j] == 1 会永远为假，程序直接输出 0。"
  ],
  "interviewNote": "面试手写（本地 IDE 或共享文档）没有力扣的函数骨架，要自己完整定义函数、用二维列表手动构造一个 3x3 左右的测试网格并 print 验证结果。from collections import deque 是最容易漏写的一行，务必形成肌肉记忆。大网格下递归 DFS 可能触及 Python 默认约 1000 层的递归上限，主动提一句 sys.setrecursionlimit 或改写成栈/BFS 迭代版本，是很好的加分点。",
  "resources": [
    {
      "name": "hello-algo 图章",
      "url": "https://www.hello-algo.com/chapter_graph/"
    },
    {
      "name": "代码随想录（图论篇）",
      "url": "https://programmercarl.com/"
    },
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    }
  ]
},
{
  "id": "stack-queue",
  "order": 10,
  "name": "堆栈（栈·队列·堆）",
  "emoji": "📚",
  "tagline": "栈管顺序，堆管优先级，各司其职",
  "estHours": 12,
  "core": "栈和队列都是“操作受限的线性表”：栈后进先出，队列先进先出，正是这种限制带来了清晰的语义。栈天然匹配“最近产生的任务最先处理”的场景，所以括号匹配、嵌套结构展开（字符串解码）、撤销回退都靠它。单调栈在此基础上强制栈内元素保持单调，每个元素至多入栈出栈各一次，就能以 O(n) 批量回答“下一个更大或更小元素”这类问题。堆（优先队列）则以 O(log n) 的代价动态维护极值，配合“大小为 K 的小顶堆”能在 O(n log K) 内解决 TopK，而无需整体排序。在 Python 里 list 就是栈、collections.deque 就是队列、heapq 就是小顶堆，工具现成，关键是从题面里识别出隐藏的“处理顺序”。",
  "signals": [
    "出现括号或标签的匹配、嵌套结构的展开（如 3[a2[c]] 这种编码），基本就是栈。",
    "求每个元素“左边或右边第一个更大（更小）的元素”，直接上单调栈。",
    "求第 K 大、前 K 个高频、数据流中动态维护极值，想到堆（优先队列）。",
    "需要“撤销上一步”“消除相邻重复项”这类最近优先的操作，用栈模拟。",
    "滑动窗口内求最大或最小值且要求线性复杂度，想到单调（双端）队列。"
  ],
  "templates": [
    {
      "title": "单调栈（每日温度型：下一个更大元素）",
      "code": "def daily_temperatures(temperatures):\n    # 单调栈：求每个位置右边第一个更高温度还要等几天\n    # 栈里存下标（不是温度值），因为答案要用下标差算距离\n    # 从栈底到栈顶温度严格递减：都是还没等到更高温度的日子\n    n = len(temperatures)\n    answer = [0] * n              # 默认 0：右边不存在更高温度\n    stack = []                    # 单调栈，存下标\n    for i in range(n):\n        # 当前温度比栈顶那天高，栈顶的答案就此确定\n        while stack and temperatures[i] > temperatures[stack[-1]]:\n            j = stack.pop()       # 第 j 天等到了更高温度\n            answer[j] = i - j     # 等待天数 = 下标差\n        stack.append(i)           # 当前下标入栈，继续等更高温度\n    return answer",
      "explain": "栈里存下标而不是温度，因为题目要的是距离（下标差），有了下标随时能取回温度。while 循环保证每个下标至多入栈、出栈各一次，整体 O(n)。把比较符号方向反过来就能求“下一个更小元素”，同一骨架通吃左右方向、大小关系共四种变体。"
    },
    {
      "title": "heapq 求 TopK（大小为 K 的小顶堆）",
      "code": "import heapq\n\ndef top_k_largest(nums, k):\n    # 用大小为 K 的小顶堆求前 K 大元素\n    # 堆顶 heap[0] 是 K 个候选里最小的，即当前的第 K 大\n    heap = []                         # Python 的 heapq 只提供小顶堆\n    for x in nums:\n        if len(heap) < k:\n            heapq.heappush(heap, x)   # 不满 K 个，直接入堆\n        elif x > heap[0]:             # 比当前第 K 大还大，才有资格进堆\n            heapq.heapreplace(heap, x)  # 弹出堆顶再压入，只调整一次堆\n    return heap                       # 堆里恰好是前 K 大（内部无序）\n\ndef kth_largest(nums, k):\n    # 求第 K 大：同样先建 K 大小的堆，最后取堆顶即可\n    return top_k_largest(nums, k)[0]",
      "explain": "求前 K 大偏偏用小顶堆：堆顶是 K 个候选中的最小者，恰好就是当前第 K 大，新元素只需与它一比。heapq 没有大顶堆开关，遇到对称场景（前 K 小配大顶堆）的通用技巧是把元素取负入堆、取出时再取负还原。heapreplace 等价于先 heappop 再 heappush，但只做一次堆调整，效率更高。"
    }
  ],
  "problems": [
    {
      "lc": 20,
      "title": "有效的括号",
      "slug": "valid-parentheses",
      "difficulty": "简单",
      "featured": true,
      "hint": "左括号入栈，右括号必须与栈顶配对并弹出，扫描结束时栈须为空。"
    },
    {
      "lc": 232,
      "title": "用栈实现队列",
      "slug": "implement-queue-using-stacks",
      "difficulty": "简单",
      "featured": false,
      "hint": "双栈：入队只进 in 栈，出队时 out 栈为空才把 in 栈整体倒入，均摊 O(1)。"
    },
    {
      "lc": 155,
      "title": "最小栈",
      "slug": "min-stack",
      "difficulty": "中等",
      "featured": true,
      "hint": "辅助栈与主栈同步压入“截至当前的最小值”，弹出时两栈一起弹。"
    },
    {
      "lc": 739,
      "title": "每日温度",
      "slug": "daily-temperatures",
      "difficulty": "中等",
      "featured": true,
      "hint": "单调栈裸题：栈存下标、温度递减，出栈时用下标差得到等待天数。"
    },
    {
      "lc": 394,
      "title": "字符串解码",
      "slug": "decode-string",
      "difficulty": "中等",
      "featured": true,
      "hint": "栈里存（倍数, 已拼好的前缀），遇 ] 弹出一层，把当前段重复后接回前缀。"
    },
    {
      "lc": 215,
      "title": "数组中的第K个最大元素",
      "slug": "kth-largest-element-in-an-array",
      "difficulty": "中等",
      "featured": true,
      "hint": "大小为 K 的小顶堆扫一遍，堆顶即答案；学有余力再练 O(n) 快速选择。"
    },
    {
      "lc": 347,
      "title": "前 K 个高频元素",
      "slug": "top-k-frequent-elements",
      "difficulty": "中等",
      "featured": true,
      "hint": "Counter 统计频次，再按（频次, 元素）元组维护大小为 K 的小顶堆。"
    },
    {
      "lc": 239,
      "title": "滑动窗口最大值",
      "slug": "sliding-window-maximum",
      "difficulty": "困难",
      "featured": true,
      "hint": "进阶：单调递减双端队列存下标，队首即窗口最大值；入窗踢掉更小的，出窗弹队首。"
    }
  ],
  "pitfalls": [
    "访问 stack[-1] 或 heap[0] 前必须判空，空列表取下标会 IndexError；条件要写成 while stack and 比较式，两者顺序不能反。",
    "heapq 只有小顶堆：求前 K 大要维护“大小为 K 的小顶堆”；想模拟大顶堆就把值取负入堆，弹出后记得再取负还原。",
    "堆里放元组时按位置逐项比较，首项相同就比第二项：若第二项不可比较（如 dict、链表节点）会抛 TypeError，需插入自增序号兜底。",
    "单调栈比较写严格大于还是大于等于要按题意定，它决定相等元素算不算“更大”；写反了会在含重复值的用例上出错。",
    "拿 list 当队列会踩 pop(0) 的 O(n) 坑：需要队列一律用 collections.deque，入队 append()、出队 popleft()。"
  ],
  "interviewNote": "手写模式下，155、232 这类设计题要完整写出 class 及全部方法，并当场构造 push、pop 调用序列自测空栈弹出、单元素等边界。用堆前别忘了 import heapq，并主动向面试官说明它是小顶堆，以及你选“取负”还是“维护 K 大小堆”的理由。若是 ACM 模式，还需自己解析输入（如 list(map(int, input().split()))）并按要求打印结果。",
  "resources": [
    {
      "name": "hello-algo 栈与队列章",
      "url": "https://www.hello-algo.com/chapter_stack_and_queue/"
    },
    {
      "name": "hello-algo 堆章",
      "url": "https://www.hello-algo.com/chapter_heap/"
    },
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    }
  ]
},
{
  "id": "matrix",
  "order": 11,
  "name": "矩阵",
  "emoji": "🔲",
  "tagline": "把二维坐标玩明白：遍历、标记、有序查找",
  "estHours": 6,
  "core": "矩阵题的核心是把二维下标 (i, j) 管理清楚，难点几乎全部集中在遍历顺序、边界收缩和坐标变换上。螺旋遍历用上、下、左、右四个边界变量圈住尚未访问的子矩形，每走完一条边就收缩一格，把容易写乱的转向逻辑变成机械模板。旋转与转置的本质是坐标映射：顺时针转 90 度等价于先沿主对角线转置、再左右翻转每一行，记住这条等价关系就不必硬背元素搬运顺序。原地标记的思想是借用矩阵自身的空间（典型是首行和首列）充当标记数组，把 O(m+n) 的额外空间压到 O(1)。行列均有序的矩阵则利用单调性：从右上角出发，每次比较都能排除整行或整列，把二维查找降为 O(m+n)。这一主题套路固定、模板性强，是探险模式中投入产出比最高的部分之一。",
  "signals": [
    "输入是二维数组，要求按特定顺序（螺旋、对角线、之字形）输出全部元素",
    "要求原地（in-place）修改矩阵且额外空间 O(1)，通常暗示用矩阵自身做标记",
    "涉及旋转、翻转、转置等几何变换，本质是找 (i, j) 的坐标映射公式",
    "矩阵每行或每列有序，要查找目标值，应想到右上角排除法或把矩阵摊平做二分",
    "题面强调 m 行 n 列可能不相等，提示要小心行列下标写反和非方阵用例"
  ],
  "templates": [
    {
      "title": "螺旋遍历（四边界收缩）",
      "code": "def spiral_order(matrix):\n    # 按顺时针螺旋顺序返回矩阵所有元素（LeetCode 54 可直接套用）\n    if not matrix or not matrix[0]:\n        return []\n    top, bottom = 0, len(matrix) - 1      # 上下边界\n    left, right = 0, len(matrix[0]) - 1   # 左右边界\n    result = []\n    while top <= bottom and left <= right:\n        # 第一步：沿上边界从左到右\n        for col in range(left, right + 1):\n            result.append(matrix[top][col])\n        top += 1        # 上边界下移一格\n        # 第二步：沿右边界从上到下\n        for row in range(top, bottom + 1):\n            result.append(matrix[row][right])\n        right -= 1      # 右边界左移一格\n        # 第三步：沿下边界从右到左（先确认还有剩余行，防止单行重复收集）\n        if top <= bottom:\n            for col in range(right, left - 1, -1):\n                result.append(matrix[bottom][col])\n            bottom -= 1  # 下边界上移一格\n        # 第四步：沿左边界从下到上（先确认还有剩余列，防止单列重复收集）\n        if left <= right:\n            for row in range(bottom, top - 1, -1):\n                result.append(matrix[row][left])\n            left += 1    # 左边界右移一格\n    return result",
      "explain": "top、bottom、left、right 四个变量始终圈住尚未访问的子矩形，每沿一条边走完立刻收缩一格，收缩本身就是状态更新。关键在第三、四步前的 if 判断：当只剩一行或一列时，前两步已经把元素取完，不判断就会重复收集。while 条件 top <= bottom and left <= right 在边界交错的瞬间退出，保证不多走一步。"
    },
    {
      "title": "原地标记（用首行首列做标记位）",
      "code": "def set_zeroes(matrix):\n    # LeetCode 73：若某元素为 0，则其所在行和列全部置 0，要求 O(1) 额外空间\n    m, n = len(matrix), len(matrix[0])\n    # 首行首列即将被借用为标记位，先单独记下它们自身是否含 0\n    first_row_has_zero = any(matrix[0][col] == 0 for col in range(n))\n    first_col_has_zero = any(matrix[row][0] == 0 for row in range(m))\n    # 打标记：内部出现 0，就把该行的行首、该列的列首写成 0\n    for i in range(1, m):\n        for j in range(1, n):\n            if matrix[i][j] == 0:\n                matrix[i][0] = 0\n                matrix[0][j] = 0\n    # 按标记清零内部区域（下标从 1 开始，避免提前破坏标记位）\n    for i in range(1, m):\n        for j in range(1, n):\n            if matrix[i][0] == 0 or matrix[0][j] == 0:\n                matrix[i][j] = 0\n    # 最后才处理首行首列本身，顺序不能颠倒\n    if first_row_has_zero:\n        for col in range(n):\n            matrix[0][col] = 0\n    if first_col_has_zero:\n        for row in range(m):\n            matrix[row][0] = 0",
      "explain": "把首行首列当成免费的标记数组：matrix[i][0] 或 matrix[0][j] 为 0 就代表第 i 行、第 j 列需要清零，省掉 O(m+n) 的额外集合。两个布尔量必须在打标记之前算好，否则区分不了首行首列里的 0 是原有的还是标记写上的。清零顺序固定为先内部、后首行首列，颠倒会提前抹掉标记，导致漏清或多清。"
    }
  ],
  "problems": [
    {
      "lc": 867,
      "title": "转置矩阵",
      "slug": "transpose-matrix",
      "difficulty": "简单",
      "featured": false,
      "hint": "新建 n 行 m 列矩阵，令 res[j][i] = mat[i][j]，注意非方阵转置后行列数互换"
    },
    {
      "lc": 54,
      "title": "螺旋矩阵",
      "slug": "spiral-matrix",
      "difficulty": "中等",
      "featured": true,
      "hint": "四边界收缩模板原题，走完一条边收缩一格，重点处理只剩单行或单列时的重复问题"
    },
    {
      "lc": 59,
      "title": "螺旋矩阵 II",
      "slug": "spiral-matrix-ii",
      "difficulty": "中等",
      "featured": false,
      "hint": "与 54 同一套四边界模板，把读取元素改成按递增计数器从 1 到 n*n 依次填入"
    },
    {
      "lc": 48,
      "title": "旋转图像",
      "slug": "rotate-image",
      "difficulty": "中等",
      "featured": true,
      "hint": "先沿主对角线转置、再左右翻转每一行，两步组合即为原地顺时针旋转 90 度"
    },
    {
      "lc": 73,
      "title": "矩阵置零",
      "slug": "set-matrix-zeroes",
      "difficulty": "中等",
      "featured": true,
      "hint": "用首行首列当标记位，另拿两个布尔变量记录首行首列自身是否含 0，最后再清它们"
    },
    {
      "lc": 74,
      "title": "搜索二维矩阵",
      "slug": "search-a-2d-matrix",
      "difficulty": "中等",
      "featured": true,
      "hint": "整个矩阵摊平就是有序一维数组，对下标 0 到 m*n-1 做二分，用 divmod(mid, n) 还原行列"
    },
    {
      "lc": 240,
      "title": "搜索二维矩阵 II",
      "slug": "search-a-2d-matrix-ii",
      "difficulty": "中等",
      "featured": true,
      "hint": "从右上角出发，当前值比目标大就左移、比目标小就下移，每一步排除一行或一列"
    }
  ],
  "pitfalls": [
    "螺旋遍历第三、四条边之前必须再判一次 top <= bottom 和 left <= right：走完上边和右边后区域可能已空，漏判会把单行或单列元素收集两遍",
    "旋转图像用转置加翻转时，转置的内层循环必须写 for j in range(i + 1, n)：若 j 从 0 开始，每对元素会被交换两次又换回原样",
    "初始化二维数组要写 [[0] * n for _ in range(m)]，写成 [[0] * n] * m 会让 m 行共享同一个列表对象，改一个格子整列都跟着变",
    "73 题清零顺序是高频 bug：必须先按标记清内部、最后清首行首列；顺序颠倒会提前抹掉标记位，导致结果错乱",
    "240 右上角排除法方向别写反：当前值比 target 大应 col -= 1，比 target 小应 row += 1，循环条件是 row < m and col >= 0"
  ],
  "interviewNote": "面试手写模式没有 LeetCode 的类框架，要自己定义函数并用嵌套列表构造测试矩阵，建议准备一个非方阵用例（如 2 行 3 列）验证行列下标没写反，再补上单行、单列、空矩阵等退化用例。原地修改类题目（48、73）动手前先和面试官确认允许改输入，并主动说明 O(1) 空间的标记方案。调试时逐行打印矩阵（for row in matrix: print(row)）便于当场对拍中间状态。",
  "resources": [
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    },
    {
      "name": "灵茶山艾府 B站讲解",
      "url": "https://space.bilibili.com/206214"
    },
    {
      "name": "代码随想录（站内搜矩阵）",
      "url": "https://programmercarl.com/"
    }
  ]
},
{
  "id": "tricks",
  "order": 12,
  "name": "技巧类（哈希·位运算·前缀和）",
  "emoji": "✨",
  "tagline": "哈希换时间，异或消对，前缀和锁区间",
  "estHours": 8,
  "core": "本主题不是一种独立算法，而是贯穿全部主题的四件通用武器：哈希表、位运算、前缀和、摩尔投票。哈希表以 O(1) 的插入与查找，把『找配对、查存在、按特征分组』这类原本要写嵌套循环的操作压成一次遍历，本质是用空间换时间。前缀和把任意区间和改写成两个前缀之差，再用哈希表记录每个前缀值出现的次数，就能一趟统计出所有满足条件的子数组。位运算利用异或的两条性质（a^a=0、a^0=a）让成对元素相互抵消，用 O(1) 空间揪出落单的数；摩尔投票则利用『多数元素与其余元素一一对拼后必有剩余』的事实，只靠一个候选人加一个计数器完成统计。它们的共同点是抓住数据可抵消、可差分、可映射的代数结构，所以在前面所有主题里反复出现：记忆化要哈希、子数组统计要前缀和、状态压缩要位运算。把这四件武器练熟，再回头串联其他主题，对应主题就完成了一轮系统复习。",
  "signals": [
    "暴力解是 O(n^2) 的两层配对枚举，而题目要求 O(n)：想哈希表，把内层查找降为 O(1)。",
    "题面出现『两数之和』『和为 K 的子数组』『出现次数/频率』等配对与计数字眼：哈希计数或前缀和+哈希。",
    "『只出现一次』『出现奇数次』且要求 O(1) 额外空间：异或抵消的标志性信号。",
    "『出现次数超过一半』『多数/众数』：摩尔投票，一个候选人加一个计数器就够。",
    "要按某种特征把元素归堆（异位词、相同余数、相同斜率）：设计规范键，defaultdict 分组。"
  ],
  "templates": [
    {
      "title": "哈希计数/分组（49 字母异位词分组型）",
      "code": "from collections import defaultdict\n\ndef group_anagrams(strs):\n    # 分组核心：为每个元素构造「规范键」，同组元素的键必须完全相同，LC49 可直接套用\n    groups = defaultdict(list)      # 键 -> 这一组的全部元素\n    for word in strs:\n        # 异位词排序后结果相同，排序字符串即可作分组键\n        key = ''.join(sorted(word))\n        groups[key].append(word)    # defaultdict 自动建空列表，免判断键是否存在\n    return list(groups.values())\n\ndef count_freq(nums):\n    # 计数模板：值 -> 出现次数，哈希表最高频的用法\n    freq = defaultdict(int)\n    for x in nums:\n        freq[x] += 1                # 缺失键默认取 0，可直接加一\n    return freq",
      "explain": "分组题的全部功夫在设计键：排序后的字符串、26 维词频元组 tuple(cnt)、约分后的斜率都是常见键，键必须是不可变的可哈希类型，列表要先转元组。defaultdict(list) 与 defaultdict(int) 免去『键不存在先初始化』的样板代码，是 Python 刷题标配；忘记导入时改写成 groups.setdefault(key, []).append(word) 或 freq.get(x, 0) + 1 完全等价。"
    },
    {
      "title": "前缀和+哈希（560 和为K的子数组型）",
      "code": "def subarray_sum_k(nums, k):\n    # 区间和等于前缀和之差：sum(i..j) = pre[j] - pre[i-1]，LC560 可直接套用\n    # 问题转化：当前前缀和为 s 时，之前出现过多少个前缀和等于 s - k\n    count = 0\n    prefix_sum = 0\n    seen = {0: 1}    # 前缀和 -> 出现次数；空前缀记 1 次，兜住从头开始的子数组\n    for x in nums:\n        prefix_sum += x\n        # 先查：以当前元素结尾、和为 k 的子数组个数\n        count += seen.get(prefix_sum - k, 0)\n        # 后存：把当前前缀和计入表，供后面的位置查询\n        seen[prefix_sum] = seen.get(prefix_sum, 0) + 1\n    return count",
      "explain": "把两层枚举压成一次遍历的关键：边扫边存每个前缀和的出现次数，查 prefix_sum - k 的历史次数就是以当前元素结尾的答案。seen = {0: 1} 是最易漏的初始化，它代表空前缀，保证恰好从下标 0 累加到 k 的子数组也被数到。必须先查询再更新，顺序颠倒时 k = 0 会把当前位置自己多算一次。"
    }
  ],
  "problems": [
    {
      "lc": 1,
      "title": "两数之和",
      "slug": "two-sum",
      "difficulty": "简单",
      "featured": true,
      "hint": "边遍历边把『值 -> 下标』存入哈希表，查 target - x 是否已出现，一次遍历搞定。"
    },
    {
      "lc": 136,
      "title": "只出现一次的数字",
      "slug": "single-number",
      "difficulty": "简单",
      "featured": true,
      "hint": "全员异或：a^a=0 让成对元素相互抵消，最后剩下的就是落单数，O(1) 空间。"
    },
    {
      "lc": 169,
      "title": "多数元素",
      "slug": "majority-element",
      "difficulty": "简单",
      "featured": true,
      "hint": "摩尔投票：计数器归零就换候选人，相同加一不同减一，多数元素拼消不完。"
    },
    {
      "lc": 49,
      "title": "字母异位词分组",
      "slug": "group-anagrams",
      "difficulty": "中等",
      "featured": true,
      "hint": "排序后的字符串（或 26 维词频元组）作哈希键，同键即同组，defaultdict 收集。"
    },
    {
      "lc": 128,
      "title": "最长连续序列",
      "slug": "longest-consecutive-sequence",
      "difficulty": "中等",
      "featured": true,
      "hint": "先整体转 set，只从 x-1 不在集合中的『序列起点』向右延伸计数，保证整体 O(n)。"
    },
    {
      "lc": 560,
      "title": "和为 K 的子数组",
      "slug": "subarray-sum-equals-k",
      "difficulty": "中等",
      "featured": true,
      "hint": "前缀和+哈希计数模板：查 prefix_sum - k 的出现次数，seen 记得初始化为 {0: 1}。"
    },
    {
      "lc": 31,
      "title": "下一个排列",
      "slug": "next-permutation",
      "difficulty": "中等",
      "featured": true,
      "hint": "从右往左找第一个升序位 i，再从右找第一个比 nums[i] 大的数交换，最后反转 i 之后的部分。"
    },
    {
      "lc": 287,
      "title": "寻找重复数",
      "slug": "find-the-duplicate-number",
      "difficulty": "中等",
      "featured": true,
      "hint": "把下标当链表（i 指向 nums[i]），重复数就是环入口，快慢指针找环；也可对值域二分计数。"
    },
    {
      "lc": 1590,
      "title": "使数组和能被 P 整除",
      "slug": "make-sum-divisible-by-p",
      "difficulty": "中等",
      "featured": false,
      "hint": "总和余数为 need；扫描前缀余数，用哈希查找能让删除区间余数等于 need 的最近位置。"
    },
    {
      "lc": 1664,
      "title": "生成平衡数组的方案数",
      "slug": "ways-to-make-a-fair-array",
      "difficulty": "中等",
      "featured": false,
      "hint": "分别维护奇偶位置的前缀和；删除 i 后右侧下标奇偶互换，据此比较新数组两类位置之和。"
    }
  ],
  "pitfalls": [
    "560 型必须『先查后存』：先 count += seen.get(prefix_sum - k, 0) 再更新 seen，顺序颠倒时 k=0 会多算；漏写 seen = {0: 1} 则从下标 0 开始的子数组全部统计不到。",
    "字典键必须可哈希：列表不能作键，词频数组要用 tuple(cnt) 转元组，集合要用 frozenset，否则运行时抛 TypeError: unhashable type。",
    "一边遍历字典一边增删键会抛 RuntimeError: dictionary changed size during iteration，应先用 list(d.items()) 拷贝再遍历，或把改动收集到新字典。",
    "128 题两个性能陷阱：不先把列表转成 set，则 in 判断是 O(n)；不加 if x - 1 not in num_set 的起点判断，每个数都重复延伸，整体退化成 O(n^2)。",
    "Python 整数无 32 位溢出，负数取模也与 C++ 不同（-1 % 2 == 1）：涉及补码的位运算题要手动 & 0xFFFFFFFF 截断，面试时主动说明这一语言差异是加分项。"
  ],
  "interviewNote": "手写模式下 from collections import defaultdict, Counter 这一行最容易忘，忘了就退化成 d.get(key, 0) + 1 或 setdefault 的写法，功能完全等价，别卡壳。写完模板先自己构造边界用例口头跑一遍：空数组、k=0、全负数、多数元素恰好过半，这些最能暴露『先查后存』和初始化问题。若平台要求完整可运行程序，要自己写 class Solution 并处理读入输出，例如 nums = list(map(int, input().split()))，最后 print 结果而不是只 return。",
  "resources": [
    {
      "name": "hello-algo 哈希表章",
      "url": "https://www.hello-algo.com/chapter_hashing/"
    },
    {
      "name": "LeetCode 数据结构与算法探险模式",
      "url": "https://leetcode.cn/quest/data-structures-and-algorithms-quest/"
    },
    {
      "name": "灵茶山艾府 B站讲解",
      "url": "https://space.bilibili.com/206214"
    }
  ]
},
{
  "id": "string-advanced",
  "order": 13,
  "name": "字符串·排序·高级结构",
  "emoji": "🧰",
  "tagline": "字符串先熟 API，排序查找靠单调性，高级结构管动态区间与前缀",
  "estHours": 16,
  "core": "这一卡补充 Python 字符串、KMP、排序与二分、分治、线段树和字典树。字符串题先熟练使用切片、join、ord/chr 与类型转换，再在要求显式模式匹配时写 KMP。排序题大多优先使用稳定且高效的 sort/ sorted；面试仍要能讲清归并、快速、基数排序的复杂度与适用条件。二分建立在有序或单调性之上，分治强调把同类子问题合并。线段树处理动态区间查询，字典树处理前缀，二者都在利用树的层级关系减少无关工作。",
  "signals": [
    "字符串格式化、掩码、大小写与字符编码转换：先组合 Python 内置 API。",
    "要求显式实现模式匹配，或文本很长且不能回退：想到 KMP 的 LPS 数组。",
    "数据需要排序后查找、配对或按规则排列：先用 sort / sorted，再判断是否需要二分。",
    "原问题能拆成相同形式的小问题并合并结果：考虑分治、归并排序。",
    "数组频繁单点更新和区间查询：线段树；大量单词的前缀查询：字典树。",
    "数字按字典序排列但 n 很大：把 1~9 看作十叉前缀树，按子树节点数跳过。"
  ],
  "templates": [
    {
      "title": "Python 字符串与 KMP",
      "code": "def kmp_search(text, pattern):\n    if not pattern:\n        return 0                              # 空模式从 0 开始匹配\n    lps = [0] * len(pattern)                  # 最长相等前后缀\n    length = 0                                # 当前可复用前缀长度\n    for i in range(1, len(pattern)):\n        while length and pattern[i] != pattern[length]:\n            length = lps[length - 1]          # 失配后沿 LPS 回退\n        if pattern[i] == pattern[length]:\n            length += 1                       # 扩展相等前后缀\n        lps[i] = length\n    j = 0                                     # 模式串指针\n    for i, char in enumerate(text):\n        while j and char != pattern[j]:\n            j = lps[j - 1]                    # 文本指针不回退\n        if char == pattern[j]:\n            j += 1\n        if j == len(pattern):\n            return i - j + 1                  # 首次匹配起点\n    return -1",
      "explain": "日常 Python 可直接用 in 或 find；需要讲算法或显式实现时再写 KMP。CPython 不保证 in/find 底层使用 KMP。"
    },
    {
      "title": "排序与 bisect",
      "code": "import bisect\n\nnums.sort(key=abs, reverse=False)            # 原地排序，可设 key 与 reverse\ncopy_nums = sorted(nums)                     # 返回新列表，不修改 nums\n\nleft = bisect.bisect_left(nums, target)      # 第一个大于等于 target 的位置\nright = bisect.bisect_right(nums, target)    # 第一个大于 target 的位置\nbisect.insort_left(nums, target)             # 插入并保持有序；列表搬移仍是 O(n)",
      "explain": "sort 与 sorted 都是稳定排序。bisect 查位置是 O(log n)，但列表中间插入需要 O(n)，不能误报整体复杂度。"
    },
    {
      "title": "分治：归并排序",
      "code": "def merge_sort(nums):\n    if len(nums) <= 1:\n        return nums                           # 最小子问题直接返回\n    middle = len(nums) // 2                   # 分：切成两个同类问题\n    left = merge_sort(nums[:middle])          # 治：递归排左半边\n    right = merge_sort(nums[middle:])         # 治：递归排右半边\n    merged = []                               # 合：线性合并两个有序数组\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            merged.append(left[i]); i += 1    # 取左侧较小值\n        else:\n            merged.append(right[j]); j += 1   # 取右侧较小值\n    return merged + left[i:] + right[j:]      # 接上剩余有序部分",
      "explain": "归并排序时间 O(n log n)、额外空间 O(n)、稳定；快速排序平均 O(n log n)，最坏 O(n²)；基数排序按数位分桶，适用于位数有限的整数或字符串键。"
    },
    {
      "title": "迭代线段树：区间和",
      "code": "class NumArray:\n    def __init__(self, nums):\n        self.n = len(nums)                    # 原数组长度\n        self.tree = [0] * (2 * self.n)        # 2n 数组模拟树\n        self.tree[self.n:] = nums              # 后 n 个位置是叶子\n        for node in range(self.n - 1, 0, -1):\n            self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]\n\n    def update(self, index, value):\n        node = index + self.n                 # 找到叶子\n        self.tree[node] = value\n        while node > 1:\n            node //= 2                        # 上移到父节点\n            self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]\n\n    def sumRange(self, left, right):\n        left += self.n; right += self.n        # 转成叶子下标\n        total = 0\n        while left <= right:\n            if left % 2 == 1:\n                total += self.tree[left]; left += 1\n            if right % 2 == 0:\n                total += self.tree[right]; right -= 1\n            left //= 2; right //= 2            # 同时上移一层\n        return total",
      "explain": "叶子在 tree[n:2n]，父节点是 node//2，左右孩子是 2*node 与 2*node+1。构建 O(n)，更新与查询 O(log n)。"
    },
    {
      "title": "字典树：插入与查前缀",
      "code": "class TrieNode:\n    def __init__(self):\n        self.children = {}                    # 字符到子节点\n        self.is_word = False                  # 是否是完整单词\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()                # 空根节点\n\n    def insert(self, word):\n        node = self.root\n        for char in word:\n            node = node.children.setdefault(char, TrieNode())  # 沿字符建路\n        node.is_word = True                   # 标记单词结尾\n\n    def starts_with(self, prefix):\n        node = self.root\n        for char in prefix:\n            if char not in node.children:\n                return False                 # 路径中断\n            node = node.children[char]\n        return True                          # 前缀路径完整存在",
      "explain": "每条根到节点的路径代表一个前缀。词典中最长单词还需保证路径上的每一级节点都是完整单词。"
    }
  ],
  "problems": [
    {"lc":520,"title":"检测大写字母","slug":"detect-capital","difficulty":"简单","featured":false,"hint":"分别检查全大写、全小写或仅首字母大写；可用 isupper、islower 与切片表达。"},
    {"lc":482,"title":"密钥格式化","slug":"license-key-formatting","difficulty":"简单","featured":false,"hint":"先移除连字符并转大写，再从尾部按 k 分组，最后反转并用 '-' join。"},
    {"lc":831,"title":"隐藏个人信息","slug":"masking-personal-information","difficulty":"中等","featured":false,"hint":"按是否含 @ 分支；邮箱统一小写，电话先过滤数字再按国家码长度格式化。"},
    {"lc":686,"title":"重复叠加字符串匹配","slug":"repeated-string-match","difficulty":"中等","featured":false,"hint":"重复 a 到长度至少覆盖 b，再检查当前串与多重复一次的串；匹配可用 in 或 KMP。"},
    {"lc":932,"title":"漂亮数组","slug":"beautiful-array","difficulty":"中等","featured":false,"hint":"分治构造：漂亮数组映射为奇数组与偶数组后性质不变，最后拼接。"},
    {"lc":493,"title":"翻转对","slug":"reverse-pairs","difficulty":"困难","featured":false,"hint":"日更短版用有序列表+bisect；面试 O(n log n) 版本用归并分治统计跨区间对。"},
    {"lc":307,"title":"区域和检索 - 数组可修改","slug":"range-sum-query-mutable","difficulty":"中等","featured":false,"hint":"迭代线段树 2n 数组：后半存叶子，更新逐级重算父节点，查询同时收缩左右边界。"},
    {"lc":720,"title":"词典中最长的单词","slug":"longest-word-in-dictionary","difficulty":"中等","featured":false,"hint":"字典树中检查每一级前缀都是完整单词；长度相同时取字典序最小。"},
    {"lc":440,"title":"字典序的第 K 小数字","slug":"k-th-smallest-in-lexicographical-order","difficulty":"困难","featured":false,"hint":"在隐式十叉前缀树上计算相邻前缀间的节点数，能跳过整棵子树就横移，否则深入下一层。"}
  ],
  "pitfalls": [
    "把 in/find 说成 KMP：它们是语言内置的高效查找，但具体实现不承诺使用 KMP。",
    "把 sorted(nums) 当成原地修改，或把 nums.sort() 的返回值赋回 nums；前者返回新列表，后者返回 None。",
    "看到 bisect 的 O(log n) 就忽略 list.insert 的 O(n)，导致翻转对短版复杂度分析错误。",
    "线段树查询时端点奇偶判断写反，或统计完端点后忘记 left += 1 / right -= 1，导致重复计数。",
    "字典树只建 children 不标 is_word，会把任意路径前缀误认为词典里真实存在的完整单词。"
  ],
  "interviewNote": "排序先说明为什么内置排序足够，再按追问写归并或快排；二分先声明区间不变量。线段树和字典树若时间有限，先画数组下标关系或节点结构，再写核心方法。翻转对要明确区分日更用于复习 bisect 的 O(n²) 短版与面试要求的 O(n log n) 归并版。",
  "resources": [
    {"name":"hello-algo 排序章","url":"https://www.hello-algo.com/chapter_sorting/"},
    {"name":"hello-algo 搜索章","url":"https://www.hello-algo.com/chapter_searching/"},
    {"name":"LeetCode 中文站","url":"https://leetcode.cn/"}
  ]
}
];

