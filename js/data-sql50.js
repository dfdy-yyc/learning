'use strict';

/*
 * Source: https://leetcode.cn/studyplan/sql-free-50/
 * Snapshot from the public Chinese-site GraphQL studyPlanV2Detail query.
 * `order` is the global plan position; `sectionOrder` follows the official groups.
 */
const SQL50_SOURCE = {
  name: '高频 SQL 50 题（基础版）',
  planSlug: 'sql-free-50',
  url: 'https://leetcode.cn/studyplan/sql-free-50/',
  sections: 7,
  questions: 50
};

const SQL50_SECTIONS = [
  { id: 'sql-free-50-66-e4w9', order: 1, name: '查询' },
  { id: 'sql-free-50-67-21c8', order: 2, name: '连接' },
  { id: 'sql-free-50-68-mt19', order: 3, name: '聚合函数' },
  { id: 'sql-free-50-69-m2iv', order: 4, name: '排序和分组' },
  { id: 'sql-free-50-70-q9o9', order: 5, name: '高级查询和连接' },
  { id: 'sql-free-50-71-pqgx', order: 6, name: '子查询' },
  { id: 'sql-free-50-72-ox0n', order: 7, name: '高级字符串函数 / 正则表达式 / 子句' }
];

const SQL50_QUESTIONS = [
  {
    order: 1,
    sectionOrder: 1,
    section: '查询',
    category: '条件筛选',
    lc: 1757,
    slug: 'recyclable-and-low-fat-products',
    title: '可回收且低脂的产品',
    difficulty: 'EASY',
    concept: '多条件 WHERE 筛选',
    sql: `SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y';`,
    pandas: `def find_products(products):
    return products.loc[
        products.low_fats.eq('Y') & products.recyclable.eq('Y'),
        ['product_id']
    ]`
  },
  {
    order: 2,
    sectionOrder: 1,
    section: '查询',
    category: '条件筛选',
    lc: 584,
    slug: 'find-customer-referee',
    title: '寻找用户推荐人',
    difficulty: 'EASY',
    concept: 'NULL 与逻辑条件',
    sql: `SELECT name
FROM Customer
WHERE referee_id <> 2 OR referee_id IS NULL;`,
    pandas: `def find_customer_referee(customer):
    mask = customer.referee_id.ne(2) | customer.referee_id.isna()
    return customer.loc[mask, ['name']]`
  },
  {
    order: 3,
    sectionOrder: 1,
    section: '查询',
    category: '条件筛选',
    lc: 595,
    slug: 'big-countries',
    title: '大的国家',
    difficulty: 'EASY',
    concept: 'OR 条件与列投影',
    sql: `SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;`,
    pandas: `def big_countries(world):
    mask = world.area.ge(3000000) | world.population.ge(25000000)
    return world.loc[mask, ['name', 'population', 'area']]`
  },
  {
    order: 4,
    sectionOrder: 1,
    section: '查询',
    category: '去重排序',
    lc: 1148,
    slug: 'article-views-i',
    title: '文章浏览 I',
    difficulty: 'EASY',
    concept: 'DISTINCT 去重和排序',
    sql: `SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id;`,
    pandas: `def article_views(views):
    ids = views.loc[views.author_id.eq(views.viewer_id), 'author_id']
    return ids.drop_duplicates().sort_values().to_frame(name='id')`
  },
  {
    order: 5,
    sectionOrder: 1,
    section: '查询',
    category: '字符串筛选',
    lc: 1683,
    slug: 'invalid-tweets',
    title: '无效的推文',
    difficulty: 'EASY',
    concept: '字符串长度过滤',
    sql: `SELECT tweet_id
FROM Tweets
WHERE CHAR_LENGTH(content) > 15;`,
    pandas: `def invalid_tweets(tweets):
    return tweets.loc[tweets.content.str.len().gt(15), ['tweet_id']]`
  },
  {
    order: 6,
    sectionOrder: 2,
    section: '连接',
    category: '左连接',
    lc: 1378,
    slug: 'replace-employee-id-with-the-unique-identifier',
    title: '使用唯一标识码替换员工ID',
    difficulty: 'EASY',
    concept: 'LEFT JOIN 保留左表全部记录',
    sql: `SELECT eu.unique_id, e.name
FROM Employees AS e
LEFT JOIN EmployeeUNI AS eu ON e.id = eu.id;`,
    pandas: `def replace_employee_id(employees, employee_uni):
    data = employees.merge(employee_uni, on='id', how='left')
    return data[['unique_id', 'name']]`
  },
  {
    order: 7,
    sectionOrder: 2,
    section: '连接',
    category: '内连接',
    lc: 1068,
    slug: 'product-sales-analysis-i',
    title: '产品销售分析 I',
    difficulty: 'EASY',
    concept: '按外键 INNER JOIN',
    sql: `SELECT p.product_name, s.year, s.price
FROM Sales AS s
JOIN Product AS p ON s.product_id = p.product_id;`,
    pandas: `def sales_analysis(sales, product):
    data = sales.merge(product, on='product_id')
    return data[['product_name', 'year', 'price']]`
  },
  {
    order: 8,
    sectionOrder: 2,
    section: '连接',
    category: '左连接聚合',
    lc: 1581,
    slug: 'customer-who-visited-but-did-not-make-any-transactions',
    title: '进店却未进行过交易的顾客',
    difficulty: 'EASY',
    concept: 'LEFT JOIN 后筛选空值再分组',
    sql: `SELECT v.customer_id, COUNT(*) AS count_no_trans
FROM Visits AS v
LEFT JOIN Transactions AS t ON v.visit_id = t.visit_id
WHERE t.transaction_id IS NULL
GROUP BY v.customer_id;`,
    pandas: `def find_customers(visits, transactions):
    data = visits.merge(transactions[['visit_id', 'transaction_id']], on='visit_id', how='left')
    return data.loc[data.transaction_id.isna()].groupby('customer_id').size().reset_index(
        name='count_no_trans'
    )`
  },
  {
    order: 9,
    sectionOrder: 2,
    section: '连接',
    category: '自连接',
    lc: 197,
    slug: 'rising-temperature',
    title: '上升的温度',
    difficulty: 'EASY',
    concept: '同表按相邻日期自连接',
    sql: `SELECT w1.id
FROM Weather AS w1
JOIN Weather AS w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;`,
    pandas: `def rising_temperature(weather):
    current = weather[['id', 'recordDate', 'temperature']].copy()
    previous = weather[['recordDate', 'temperature']].copy()
    previous['recordDate'] = previous.recordDate + pd.Timedelta(days=1)
    previous = previous.rename(columns={'temperature': 'previous_temperature'})
    data = current.merge(previous, on='recordDate')
    return data.loc[data.temperature.gt(data.previous_temperature), ['id']]`
  },
  {
    order: 10,
    sectionOrder: 2,
    section: '连接',
    category: '自连接聚合',
    lc: 1661,
    slug: 'average-time-of-process-per-machine',
    title: '每台机器的进程平均运行时间',
    difficulty: 'EASY',
    concept: '开始结束记录自连接后求平均',
    sql: `SELECT a.machine_id,
       ROUND(AVG(b.timestamp - a.timestamp), 3) AS processing_time
FROM Activity AS a
JOIN Activity AS b
  ON a.machine_id = b.machine_id
 AND a.process_id = b.process_id
 AND a.activity_type = 'start'
 AND b.activity_type = 'end'
GROUP BY a.machine_id;`,
    pandas: `def get_average_time(activity):
    durations = activity.pivot(
        index=['machine_id', 'process_id'], columns='activity_type', values='timestamp'
    )
    durations['duration'] = durations['end'] - durations['start']
    return durations.groupby('machine_id').duration.mean().round(3).reset_index(
        name='processing_time'
    )`
  },
  {
    order: 11,
    sectionOrder: 2,
    section: '连接',
    category: '左连接',
    lc: 577,
    slug: 'employee-bonus',
    title: '员工奖金',
    difficulty: 'EASY',
    concept: 'LEFT JOIN 与空值条件',
    sql: `SELECT e.name, b.bonus
FROM Employee AS e
LEFT JOIN Bonus AS b ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
    pandas: `def employee_bonus(employee, bonus):
    data = employee.merge(bonus, on='empId', how='left')
    mask = data.bonus.lt(1000) | data.bonus.isna()
    return data.loc[mask, ['name', 'bonus']]`
  },
  {
    order: 12,
    sectionOrder: 2,
    section: '连接',
    category: '交叉连接',
    lc: 1280,
    slug: 'students-and-examinations',
    title: '学生们参加各科测试的次数',
    difficulty: 'EASY',
    concept: 'CROSS JOIN 补全集再 LEFT JOIN 计数',
    sql: `SELECT s.student_id, s.student_name, sub.subject_name,
       COUNT(e.subject_name) AS attended_exams
FROM Students AS s
CROSS JOIN Subjects AS sub
LEFT JOIN Examinations AS e
  ON e.student_id = s.student_id
 AND e.subject_name = sub.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name;`,
    pandas: `def students_and_examinations(students, subjects, examinations):
    base = students.merge(subjects, how='cross')
    counts = examinations.groupby(['student_id', 'subject_name']).size().reset_index(
        name='attended_exams'
    )
    data = base.merge(counts, on=['student_id', 'subject_name'], how='left')
    data['attended_exams'] = data.attended_exams.fillna(0).astype(int)
    return data.sort_values(['student_id', 'subject_name'])`
  },
  {
    order: 13,
    sectionOrder: 2,
    section: '连接',
    category: '自连接分组',
    lc: 570,
    slug: 'managers-with-at-least-5-direct-reports',
    title: '至少有5名直接下属的经理',
    difficulty: 'MEDIUM',
    concept: '员工表自连接与 HAVING',
    sql: `SELECT manager.name
FROM Employee AS manager
JOIN Employee AS report ON manager.id = report.managerId
GROUP BY manager.id, manager.name
HAVING COUNT(*) >= 5;`,
    pandas: `def find_managers(employee):
    counts = employee.groupby('managerId').size().reset_index(name='report_count')
    managers = employee[['id', 'name']].rename(columns={'id': 'managerId'})
    data = counts.merge(managers, on='managerId')
    return data.loc[data.report_count.ge(5), ['name']]`
  },
  {
    order: 14,
    sectionOrder: 2,
    section: '连接',
    category: '左连接聚合',
    lc: 1934,
    slug: 'confirmation-rate',
    title: '确认率',
    difficulty: 'MEDIUM',
    concept: 'LEFT JOIN 后的条件聚合',
    sql: `SELECT s.user_id,
       ROUND(AVG(c.action = 'confirmed'), 2) AS confirmation_rate
FROM Signups AS s
LEFT JOIN Confirmations AS c ON s.user_id = c.user_id
GROUP BY s.user_id;`,
    pandas: `def confirmation_rate(signups, confirmations):
    data = signups.merge(confirmations, on='user_id', how='left')
    result = data.groupby('user_id').agg(
        confirmed=('action', lambda values: values.eq('confirmed').sum()),
        total=('action', 'count')
    ).reset_index()
    result['confirmation_rate'] = (result.confirmed / result.total.replace(0, 1)).round(2)
    return result[['user_id', 'confirmation_rate']]`
  },
  {
    order: 15,
    sectionOrder: 3,
    section: '聚合函数',
    category: '筛选排序',
    lc: 620,
    slug: 'not-boring-movies',
    title: '有趣的电影',
    difficulty: 'EASY',
    concept: 'WHERE 过滤与 ORDER BY',
    sql: `SELECT id, movie, description, rating
FROM Cinema
WHERE id % 2 = 1 AND description <> 'boring'
ORDER BY rating DESC;`,
    pandas: `def not_boring_movies(cinema):
    data = cinema.loc[(cinema.id % 2 == 1) & cinema.description.ne('boring')]
    return data.sort_values('rating', ascending=False)`
  },
  {
    order: 16,
    sectionOrder: 3,
    section: '聚合函数',
    category: '连接聚合',
    lc: 1251,
    slug: 'average-selling-price',
    title: '平均售价',
    difficulty: 'EASY',
    concept: '区间连接与加权平均',
    sql: `SELECT p.product_id,
       ROUND(IFNULL(SUM(p.price * u.units) / SUM(u.units), 0), 2) AS average_price
FROM Prices AS p
LEFT JOIN UnitsSold AS u
  ON p.product_id = u.product_id
 AND u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY p.product_id;`,
    pandas: `def average_selling_price(prices, units_sold):
    data = prices.merge(units_sold, on='product_id', how='left')
    valid = data.loc[data.purchase_date.between(data.start_date, data.end_date)].copy()
    valid['revenue'] = valid.price * valid.units
    totals = valid.groupby('product_id').agg(revenue=('revenue', 'sum'), units=('units', 'sum'))
    products = prices[['product_id']].drop_duplicates().merge(totals, on='product_id', how='left')
    products['average_price'] = (products.revenue / products.units).fillna(0).round(2)
    return products[['product_id', 'average_price']]`
  },
  {
    order: 17,
    sectionOrder: 3,
    section: '聚合函数',
    category: '连接聚合',
    lc: 1075,
    slug: 'project-employees-i',
    title: '项目员工 I',
    difficulty: 'EASY',
    concept: '连接后按项目求平均',
    sql: `SELECT p.project_id,
       ROUND(AVG(e.experience_years), 2) AS average_years
FROM Project AS p
JOIN Employee AS e ON p.employee_id = e.employee_id
GROUP BY p.project_id;`,
    pandas: `def project_employees_i(project, employee):
    data = project.merge(employee, on='employee_id')
    return data.groupby('project_id').experience_years.mean().round(2).reset_index(
        name='average_years'
    )`
  },
  {
    order: 18,
    sectionOrder: 3,
    section: '聚合函数',
    category: '分组百分比',
    lc: 1633,
    slug: 'percentage-of-users-attended-a-contest',
    title: '各赛事的用户注册率',
    difficulty: 'EASY',
    concept: '去重计数与全表总数',
    sql: `SELECT contest_id,
       ROUND(COUNT(DISTINCT user_id) * 100 / (SELECT COUNT(*) FROM Users), 2) AS percentage
FROM Register
GROUP BY contest_id
ORDER BY percentage DESC, contest_id;`,
    pandas: `def users_percentage(users, register):
    counts = register.groupby('contest_id').user_id.nunique().reset_index(name='registered')
    counts['percentage'] = (counts.registered * 100 / len(users)).round(2)
    return counts.sort_values(['percentage', 'contest_id'], ascending=[False, True])[
        ['contest_id', 'percentage']
    ]`
  },
  {
    order: 19,
    sectionOrder: 3,
    section: '聚合函数',
    category: '条件聚合',
    lc: 1211,
    slug: 'queries-quality-and-percentage',
    title: '查询结果的质量和占比',
    difficulty: 'EASY',
    concept: '平均值和条件占比',
    sql: `SELECT query_name,
       ROUND(AVG(rating / position), 2) AS quality,
       ROUND(AVG(rating < 3) * 100, 2) AS poor_query_percentage
FROM Queries
WHERE query_name IS NOT NULL
GROUP BY query_name;`,
    pandas: `def queries_stats(queries):
    data = queries.dropna(subset=['query_name']).copy()
    data['quality'] = data.rating / data.position
    data['poor'] = data.rating.lt(3)
    result = data.groupby('query_name').agg(
        quality=('quality', 'mean'),
        poor_query_percentage=('poor', 'mean')
    ).reset_index()
    result['quality'] = result.quality.round(2)
    result['poor_query_percentage'] = (result.poor_query_percentage * 100).round(2)
    return result`
  },
  {
    order: 20,
    sectionOrder: 3,
    section: '聚合函数',
    category: '条件聚合',
    lc: 1193,
    slug: 'monthly-transactions-i',
    title: '每月交易 I',
    difficulty: 'MEDIUM',
    concept: '月份分组与条件聚合',
    sql: `SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month,
       country,
       COUNT(*) AS trans_count,
       SUM(state = 'approved') AS approved_count,
       SUM(amount) AS trans_total_amount,
       SUM(IF(state = 'approved', amount, 0)) AS approved_total_amount
FROM Transactions
GROUP BY month, country;`,
    pandas: `def monthly_transactions(transactions):
    data = transactions.copy()
    data['month'] = data.trans_date.dt.strftime('%Y-%m')
    data['approved'] = data.state.eq('approved')
    data['approved_amount'] = data.amount.where(data.approved, 0)
    return data.groupby(['month', 'country'], dropna=False).agg(
        trans_count=('id', 'size'),
        approved_count=('approved', 'sum'),
        trans_total_amount=('amount', 'sum'),
        approved_total_amount=('approved_amount', 'sum')
    ).reset_index()`
  },
  {
    order: 21,
    sectionOrder: 3,
    section: '聚合函数',
    category: '首行分组',
    lc: 1174,
    slug: 'immediate-food-delivery-ii',
    title: '即时食物配送 II',
    difficulty: 'MEDIUM',
    concept: '每组最早记录与条件比例',
    sql: `WITH first_orders AS (
  SELECT customer_id, MIN(order_date) AS first_order_date
  FROM Delivery
  GROUP BY customer_id
)
SELECT ROUND(AVG(d.order_date = d.customer_pref_delivery_date) * 100, 2) AS immediate_percentage
FROM Delivery AS d
JOIN first_orders AS f
  ON d.customer_id = f.customer_id
 AND d.order_date = f.first_order_date;`,
    pandas: `def immediate_food_delivery(delivery):
    first_date = delivery.groupby('customer_id').order_date.transform('min')
    first_orders = delivery.loc[delivery.order_date.eq(first_date)]
    percentage = first_orders.order_date.eq(first_orders.customer_pref_delivery_date).mean() * 100
    return pd.DataFrame({'immediate_percentage': [round(percentage, 2)]})`
  },
  {
    order: 22,
    sectionOrder: 3,
    section: '聚合函数',
    category: '首行匹配',
    lc: 550,
    slug: 'game-play-analysis-iv',
    title: '游戏玩法分析 IV',
    difficulty: 'MEDIUM',
    concept: '分组最早日期与次日匹配',
    sql: `WITH first_login AS (
  SELECT player_id, MIN(event_date) AS first_date
  FROM Activity
  GROUP BY player_id
)
SELECT ROUND(COUNT(DISTINCT a.player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction
FROM Activity AS a
JOIN first_login AS f
  ON a.player_id = f.player_id
 AND a.event_date = DATE_ADD(f.first_date, INTERVAL 1 DAY);`,
    pandas: `def gameplay_analysis(activity):
    first_login = activity.groupby('player_id').event_date.min().reset_index(name='first_date')
    first_login['next_date'] = first_login.first_date + pd.Timedelta(days=1)
    data = activity.merge(first_login, on='player_id')
    fraction = data.loc[data.event_date.eq(data.next_date), 'player_id'].nunique() / len(first_login)
    return pd.DataFrame({'fraction': [round(fraction, 2)]})`
  },
  {
    order: 23,
    sectionOrder: 4,
    section: '排序和分组',
    category: '去重计数',
    lc: 2356,
    slug: 'number-of-unique-subjects-taught-by-each-teacher',
    title: '每位教师所教授的科目种类的数量',
    difficulty: 'EASY',
    concept: 'COUNT DISTINCT',
    sql: `SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id;`,
    pandas: `def count_unique_subjects(teacher):
    return teacher.groupby('teacher_id').subject_id.nunique().reset_index(name='cnt')`
  },
  {
    order: 24,
    sectionOrder: 4,
    section: '排序和分组',
    category: '日期分组',
    lc: 1141,
    slug: 'user-activity-for-the-past-30-days-i',
    title: '查询近30天活跃用户数',
    difficulty: 'EASY',
    concept: '日期范围与去重计数',
    sql: `SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27'
GROUP BY activity_date;`,
    pandas: `def user_activity(activity):
    mask = activity.activity_date.between('2019-06-28', '2019-07-27')
    return activity.loc[mask].groupby('activity_date').user_id.nunique().reset_index(
        name='active_users'
    ).rename(columns={'activity_date': 'day'})`
  },
  {
    order: 25,
    sectionOrder: 4,
    section: '排序和分组',
    category: '分组筛选',
    lc: 1084,
    slug: 'sales-analysis-iii',
    title: '销售分析 III',
    difficulty: 'EASY',
    concept: '分组后限定完整日期区间',
    sql: `SELECT p.product_id, p.product_name
FROM Product AS p
JOIN Sales AS s ON p.product_id = s.product_id
GROUP BY p.product_id, p.product_name
HAVING MIN(s.sale_date) >= '2019-01-01'
   AND MAX(s.sale_date) <= '2019-03-31';`,
    pandas: `def sales_analysis(product, sales):
    date_range = sales.groupby('product_id').sale_date.agg(['min', 'max'])
    valid_ids = date_range.loc[
        date_range['min'].ge('2019-01-01') & date_range['max'].le('2019-03-31')
    ].index
    return product.loc[product.product_id.isin(valid_ids), ['product_id', 'product_name']]`
  },
  {
    order: 26,
    sectionOrder: 4,
    section: '排序和分组',
    category: '分组筛选',
    lc: 596,
    slug: 'classes-with-at-least-5-students',
    title: '超过 5 名学生的课',
    difficulty: 'EASY',
    concept: 'GROUP BY 与 HAVING',
    sql: `SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(*) >= 5;`,
    pandas: `def find_classes(courses):
    counts = courses.groupby('class').size()
    return counts.loc[counts.ge(5)].index.to_frame(index=False)`
  },
  {
    order: 27,
    sectionOrder: 4,
    section: '排序和分组',
    category: '分组计数',
    lc: 1729,
    slug: 'find-followers-count',
    title: '求关注者的数量',
    difficulty: 'EASY',
    concept: '按用户分组计数',
    sql: `SELECT user_id, COUNT(*) AS followers_count
FROM Followers
GROUP BY user_id
ORDER BY user_id;`,
    pandas: `def count_followers(followers):
    return followers.groupby('user_id').size().reset_index(name='followers_count').sort_values(
        'user_id'
    )`
  },
  {
    order: 28,
    sectionOrder: 4,
    section: '排序和分组',
    category: '分组筛选',
    lc: 619,
    slug: 'biggest-single-number',
    title: '只出现一次的最大数字',
    difficulty: 'EASY',
    concept: 'HAVING 后取最大值',
    sql: `SELECT MAX(num) AS num
FROM MyNumbers
WHERE num IN (
  SELECT num
  FROM MyNumbers
  GROUP BY num
  HAVING COUNT(*) = 1
);`,
    pandas: `def biggest_single_number(my_numbers):
    counts = my_numbers.num.value_counts()
    singles = counts.loc[counts.eq(1)].index
    answer = singles.max() if len(singles) else None
    return pd.DataFrame({'num': [answer]})`
  },
  {
    order: 29,
    sectionOrder: 4,
    section: '排序和分组',
    category: '关系除法',
    lc: 1045,
    slug: 'customers-who-bought-all-products',
    title: '买下所有产品的客户',
    difficulty: 'MEDIUM',
    concept: '去重购买数等于产品全集',
    sql: `SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);`,
    pandas: `def find_customers(customer, product):
    counts = customer.groupby('customer_id').product_key.nunique()
    return counts.loc[counts.eq(product.product_key.nunique())].index.to_frame(index=False)`
  },
  {
    order: 30,
    sectionOrder: 5,
    section: '高级查询和连接',
    category: '自连接聚合',
    lc: 1731,
    slug: 'the-number-of-employees-which-report-to-each-employee',
    title: '每位经理的下属员工数量',
    difficulty: 'EASY',
    concept: '经理-下属自连接与多指标聚合',
    sql: `SELECT manager.employee_id,
       manager.name,
       COUNT(report.employee_id) AS reports_count,
       ROUND(AVG(report.age), 0) AS average_age
FROM Employees AS manager
JOIN Employees AS report ON manager.employee_id = report.reports_to
GROUP BY manager.employee_id, manager.name
ORDER BY manager.employee_id;`,
    pandas: `def count_employees(employees):
    reports = employees.dropna(subset=['reports_to']).groupby('reports_to').agg(
        reports_count=('employee_id', 'size'),
        average_age=('age', 'mean')
    ).reset_index()
    reports['average_age'] = (reports.average_age + 0.5).astype(int)
    data = employees.merge(reports, left_on='employee_id', right_on='reports_to')
    return data[['employee_id', 'name', 'reports_count', 'average_age']].sort_values('employee_id')`
  },
  {
    order: 31,
    sectionOrder: 5,
    section: '高级查询和连接',
    category: '分组过滤',
    lc: 1789,
    slug: 'primary-department-for-each-employee',
    title: '员工的直属部门',
    difficulty: 'EASY',
    concept: '单行分组与主标记合并条件',
    sql: `SELECT employee_id, department_id
FROM Employee
WHERE primary_flag = 'Y'
   OR employee_id IN (
     SELECT employee_id
     FROM Employee
     GROUP BY employee_id
     HAVING COUNT(*) = 1
   );`,
    pandas: `def find_primary_department(employee):
    counts = employee.groupby('employee_id').employee_id.transform('size')
    mask = employee.primary_flag.eq('Y') | counts.eq(1)
    return employee.loc[mask, ['employee_id', 'department_id']]`
  },
  {
    order: 32,
    sectionOrder: 5,
    section: '高级查询和连接',
    category: 'CASE',
    lc: 610,
    slug: 'triangle-judgement',
    title: '判断三角形',
    difficulty: 'EASY',
    concept: 'CASE 表达式',
    sql: `SELECT x, y, z,
       CASE
         WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes'
         ELSE 'No'
       END AS triangle
FROM Triangle;`,
    pandas: `def triangle_judgement(triangle):
    result = triangle.copy()
    valid = (result.x + result.y > result.z) & (result.x + result.z > result.y) & (
        result.y + result.z > result.x
    )
    result['triangle'] = valid.map({True: 'Yes', False: 'No'})
    return result`
  },
  {
    order: 33,
    sectionOrder: 5,
    section: '高级查询和连接',
    category: '窗口函数',
    lc: 180,
    slug: 'consecutive-numbers',
    title: '连续出现的数字',
    difficulty: 'MEDIUM',
    concept: 'LAG 检查连续三行',
    sql: `SELECT DISTINCT num AS ConsecutiveNums
FROM (
  SELECT num,
         LAG(num, 1) OVER (ORDER BY id) AS previous_one,
         LAG(num, 2) OVER (ORDER BY id) AS previous_two
  FROM Logs
) AS numbered_logs
WHERE num = previous_one AND num = previous_two;`,
    pandas: `def consecutive_numbers(logs):
    data = logs.sort_values('id')
    mask = data.num.eq(data.num.shift(1)) & data.num.eq(data.num.shift(2))
    return data.loc[mask, ['num']].drop_duplicates().rename(columns={'num': 'ConsecutiveNums'})`
  },
  {
    order: 34,
    sectionOrder: 5,
    section: '高级查询和连接',
    category: '窗口函数',
    lc: 1164,
    slug: 'product-price-at-a-given-date',
    title: '指定日期的产品价格',
    difficulty: 'MEDIUM',
    concept: '窗口排序取截止日最新值',
    sql: `WITH latest_price AS (
  SELECT product_id,
         new_price,
         ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY change_date DESC) AS row_num
  FROM Products
  WHERE change_date <= '2019-08-16'
)
SELECT p.product_id, IFNULL(l.new_price, 10) AS price
FROM (SELECT DISTINCT product_id FROM Products) AS p
LEFT JOIN latest_price AS l
  ON p.product_id = l.product_id
 AND l.row_num = 1;`,
    pandas: `def price_at_given_date(products):
    all_products = products[['product_id']].drop_duplicates()
    prior = products.loc[products.change_date.le('2019-08-16')].sort_values(
        ['product_id', 'change_date'], ascending=[True, False]
    ).drop_duplicates('product_id')
    data = all_products.merge(prior[['product_id', 'new_price']], on='product_id', how='left')
    data['price'] = data.new_price.fillna(10)
    return data[['product_id', 'price']]`
  },
  {
    order: 35,
    sectionOrder: 5,
    section: '高级查询和连接',
    category: '窗口函数',
    lc: 1204,
    slug: 'last-person-to-fit-in-the-bus',
    title: '最后一个能进入巴士的人',
    difficulty: 'MEDIUM',
    concept: '累计和窗口函数',
    sql: `SELECT person_name
FROM (
  SELECT person_name,
         SUM(weight) OVER (ORDER BY turn) AS total_weight
  FROM Queue
) AS boarding_order
WHERE total_weight <= 1000
ORDER BY total_weight DESC
LIMIT 1;`,
    pandas: `def last_passenger(queue):
    data = queue.sort_values('turn').copy()
    data['total_weight'] = data.weight.cumsum()
    return data.loc[data.total_weight.le(1000), ['person_name']].tail(1)`
  },
  {
    order: 36,
    sectionOrder: 5,
    section: '高级查询和连接',
    category: '条件聚合',
    lc: 1907,
    slug: 'count-salary-categories',
    title: '按分类统计薪水',
    difficulty: 'MEDIUM',
    concept: 'UNION ALL 保留零计数分类',
    sql: `SELECT 'Low Salary' AS category,
       SUM(income < 20000) AS accounts_count
FROM Accounts
UNION ALL
SELECT 'Average Salary' AS category,
       SUM(income BETWEEN 20000 AND 50000) AS accounts_count
FROM Accounts
UNION ALL
SELECT 'High Salary' AS category,
       SUM(income > 50000) AS accounts_count
FROM Accounts;`,
    pandas: `def count_salary_categories(accounts):
    return pd.DataFrame({
        'category': ['Low Salary', 'Average Salary', 'High Salary'],
        'accounts_count': [
            accounts.income.lt(20000).sum(),
            accounts.income.between(20000, 50000).sum(),
            accounts.income.gt(50000).sum()
        ]
    })`
  },
  {
    order: 37,
    sectionOrder: 6,
    section: '子查询',
    category: '子查询筛选',
    lc: 1978,
    slug: 'employees-whose-manager-left-the-company',
    title: '上级经理已离职的公司员工',
    difficulty: 'EASY',
    concept: 'NOT IN 与薪资条件',
    sql: `SELECT employee_id
FROM Employees
WHERE salary < 30000
  AND manager_id NOT IN (SELECT employee_id FROM Employees)
ORDER BY employee_id;`,
    pandas: `def find_employees(employees):
    active_ids = set(employees.employee_id)
    mask = employees.salary.lt(30000) & employees.manager_id.notna() & ~employees.manager_id.isin(active_ids)
    return employees.loc[mask, ['employee_id']].sort_values('employee_id')`
  },
  {
    order: 38,
    sectionOrder: 6,
    section: '子查询',
    category: '窗口函数',
    lc: 626,
    slug: 'exchange-seats',
    title: '换座位',
    difficulty: 'MEDIUM',
    concept: 'LEAD 和 LAG 交换相邻行',
    sql: `SELECT id,
       CASE
         WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN student
         WHEN id % 2 = 1 THEN LEAD(student) OVER (ORDER BY id)
         ELSE LAG(student) OVER (ORDER BY id)
       END AS student
FROM Seat
ORDER BY id;`,
    pandas: `def exchange_seats(seat):
    data = seat.sort_values('id').copy()
    students = data.student.tolist()
    for index in range(0, len(students) - 1, 2):
        students[index], students[index + 1] = students[index + 1], students[index]
    data['student'] = students
    return data[['id', 'student']]`
  },
  {
    order: 39,
    sectionOrder: 6,
    section: '子查询',
    category: '多段聚合',
    lc: 1341,
    slug: 'movie-rating',
    title: '电影评分',
    difficulty: 'MEDIUM',
    concept: '两个聚合子查询 UNION ALL',
    sql: `(SELECT u.name AS results
 FROM MovieRating AS r
 JOIN Users AS u ON r.user_id = u.user_id
 GROUP BY r.user_id, u.name
 ORDER BY COUNT(*) DESC, u.name
 LIMIT 1)
UNION ALL
(SELECT m.title AS results
 FROM MovieRating AS r
 JOIN Movies AS m ON r.movie_id = m.movie_id
 WHERE r.created_at >= '2020-02-01' AND r.created_at < '2020-03-01'
 GROUP BY r.movie_id, m.title
 ORDER BY AVG(r.rating) DESC, m.title
 LIMIT 1);`,
    pandas: `def movie_rating(movies, users, movie_rating):
    user_counts = movie_rating.merge(users, on='user_id').groupby('name').size().reset_index(
        name='count'
    )
    user = user_counts.sort_values(['count', 'name'], ascending=[False, True]).iloc[0]['name']
    february = movie_rating.loc[movie_rating.created_at.between('2020-02-01', '2020-02-29')]
    movie_scores = february.merge(movies, on='movie_id').groupby('title').rating.mean().reset_index()
    movie = movie_scores.sort_values(['rating', 'title'], ascending=[False, True]).iloc[0]['title']
    return pd.DataFrame({'results': [user, movie]})`
  },
  {
    order: 40,
    sectionOrder: 6,
    section: '子查询',
    category: '滑动窗口',
    lc: 1321,
    slug: 'restaurant-growth',
    title: '餐馆营业额变化增长',
    difficulty: 'MEDIUM',
    concept: '每日汇总后的 7 日滚动聚合',
    sql: `WITH daily_amount AS (
  SELECT visited_on, SUM(amount) AS amount
  FROM Customer
  GROUP BY visited_on
)
SELECT current_day.visited_on,
       SUM(previous_day.amount) AS amount,
       ROUND(AVG(previous_day.amount), 2) AS average_amount
FROM daily_amount AS current_day
JOIN daily_amount AS previous_day
  ON previous_day.visited_on BETWEEN DATE_SUB(current_day.visited_on, INTERVAL 6 DAY)
                              AND current_day.visited_on
GROUP BY current_day.visited_on
HAVING COUNT(*) = 7
ORDER BY current_day.visited_on;`,
    pandas: `def restaurant_growth(customer):
    daily = customer.groupby('visited_on', as_index=False).amount.sum().sort_values('visited_on')
    daily['amount_7d'] = daily.amount.rolling(7).sum()
    result = daily.iloc[6:].copy()
    result['amount'] = result.amount_7d.astype(int)
    result['average_amount'] = (result.amount_7d / 7).round(2)
    return result[['visited_on', 'amount', 'average_amount']]`
  },
  {
    order: 41,
    sectionOrder: 6,
    section: '子查询',
    category: '行转列聚合',
    lc: 602,
    slug: 'friend-requests-ii-who-has-the-most-friends',
    title: '好友申请 II ：谁有最多的好友',
    difficulty: 'MEDIUM',
    concept: 'UNION ALL 后计数排名',
    sql: `SELECT id, COUNT(*) AS num
FROM (
  SELECT requester_id AS id
  FROM RequestAccepted
  UNION ALL
  SELECT accepter_id AS id
  FROM RequestAccepted
) AS friendships
GROUP BY id
ORDER BY num DESC
LIMIT 1;`,
    pandas: `def most_friends(request_accepted):
    requester = request_accepted[['requester_id']].rename(columns={'requester_id': 'id'})
    accepter = request_accepted[['accepter_id']].rename(columns={'accepter_id': 'id'})
    friendships = pd.concat([requester, accepter])
    return friendships.groupby('id').size().reset_index(name='num').sort_values(
        ['num', 'id'], ascending=[False, True]
    ).head(1)`
  },
  {
    order: 42,
    sectionOrder: 6,
    section: '子查询',
    category: '窗口函数',
    lc: 585,
    slug: 'investments-in-2016',
    title: '2016年的投资',
    difficulty: 'MEDIUM',
    concept: '窗口计数判断重复值与唯一坐标',
    sql: `SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM (
  SELECT *,
         COUNT(*) OVER (PARTITION BY tiv_2015) AS same_tiv,
         COUNT(*) OVER (PARTITION BY lat, lon) AS same_location
  FROM Insurance
) AS grouped_insurance
WHERE same_tiv > 1 AND same_location = 1;`,
    pandas: `def find_investments(insurance):
    same_tiv = insurance.groupby('tiv_2015').pid.transform('size')
    same_location = insurance.groupby(['lat', 'lon']).pid.transform('size')
    total = insurance.loc[(same_tiv > 1) & same_location.eq(1), 'tiv_2016'].sum()
    return pd.DataFrame({'tiv_2016': [round(total, 2)]})`
  },
  {
    order: 43,
    sectionOrder: 6,
    section: '子查询',
    category: '窗口函数',
    lc: 185,
    slug: 'department-top-three-salaries',
    title: '部门工资前三高的所有员工',
    difficulty: 'HARD',
    concept: 'DENSE_RANK 保留并列前三工资',
    sql: `SELECT Department, Employee, Salary
FROM (
  SELECT d.name AS Department,
         e.name AS Employee,
         e.salary AS Salary,
         DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS salary_rank
  FROM Employee AS e
  JOIN Department AS d ON e.departmentId = d.id
) AS ranked_employees
WHERE salary_rank <= 3;`,
    pandas: `def top_three_salaries(employee, department):
    data = employee.merge(
        department, left_on='departmentId', right_on='id', suffixes=('_employee', '_department')
    )
    data['salary_rank'] = data.groupby('departmentId').salary.rank(method='dense', ascending=False)
    return data.loc[data.salary_rank.le(3), ['name_department', 'name_employee', 'salary']].rename(
        columns={'name_department': 'Department', 'name_employee': 'Employee', 'salary': 'Salary'}
    )`
  },
  {
    order: 44,
    sectionOrder: 7,
    section: '高级字符串函数 / 正则表达式 / 子句',
    category: '字符串函数',
    lc: 1667,
    slug: 'fix-names-in-a-table',
    title: '修复表中的名字',
    difficulty: 'EASY',
    concept: '首字母大写与其余小写',
    sql: `SELECT user_id,
       CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2))) AS name
FROM Users
ORDER BY user_id;`,
    pandas: `def fix_names(users):
    result = users[['user_id', 'name']].copy()
    result['name'] = result.name.str.capitalize()
    return result.sort_values('user_id')`
  },
  {
    order: 45,
    sectionOrder: 7,
    section: '高级字符串函数 / 正则表达式 / 子句',
    category: '模式匹配',
    lc: 1527,
    slug: 'patients-with-a-condition',
    title: '患某种疾病的患者',
    difficulty: 'EASY',
    concept: '单词边界的字符串匹配',
    sql: `SELECT patient_id, patient_name, conditions
FROM Patients
WHERE conditions LIKE 'DIAB1%'
   OR conditions LIKE '% DIAB1%';`,
    pandas: `def find_patients(patients):
    mask = patients.conditions.str.contains(r'(^| )DIAB1', regex=True, na=False)
    return patients.loc[mask, ['patient_id', 'patient_name', 'conditions']]`
  },
  {
    order: 46,
    sectionOrder: 7,
    section: '高级字符串函数 / 正则表达式 / 子句',
    category: '去重删除',
    lc: 196,
    slug: 'delete-duplicate-emails',
    title: '删除重复的电子邮箱',
    difficulty: 'EASY',
    concept: '保留每个邮箱最小 ID',
    sql: `DELETE duplicate
FROM Person AS duplicate
JOIN Person AS original
  ON duplicate.email = original.email
 AND duplicate.id > original.id;`,
    pandas: `def delete_duplicate_emails(person):
    person.sort_values('id', inplace=True)
    person.drop_duplicates(subset=['email'], keep='first', inplace=True)`
  },
  {
    order: 47,
    sectionOrder: 7,
    section: '高级字符串函数 / 正则表达式 / 子句',
    category: '子查询',
    lc: 176,
    slug: 'second-highest-salary',
    title: '第二高的薪水',
    difficulty: 'MEDIUM',
    concept: '去重排序并保留空结果',
    sql: `SELECT (
  SELECT DISTINCT salary
  FROM Employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
    pandas: `def second_highest_salary(employee):
    salaries = employee.salary.drop_duplicates().nlargest(2)
    answer = salaries.iloc[-1] if len(salaries) == 2 else None
    return pd.DataFrame({'SecondHighestSalary': [answer]})`
  },
  {
    order: 48,
    sectionOrder: 7,
    section: '高级字符串函数 / 正则表达式 / 子句',
    category: '字符串聚合',
    lc: 1484,
    slug: 'group-sold-products-by-the-date',
    title: '按日期分组销售产品',
    difficulty: 'EASY',
    concept: 'COUNT DISTINCT 与 GROUP_CONCAT',
    sql: `SELECT sell_date,
       COUNT(DISTINCT product) AS num_sold,
       GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;`,
    pandas: `def categorize_products(activities):
    products = activities.groupby('sell_date').product.agg(
        lambda values: ','.join(sorted(values.unique()))
    ).reset_index(name='products')
    counts = activities.groupby('sell_date').product.nunique().reset_index(name='num_sold')
    return counts.merge(products, on='sell_date').sort_values('sell_date')`
  },
  {
    order: 49,
    sectionOrder: 7,
    section: '高级字符串函数 / 正则表达式 / 子句',
    category: '日期聚合',
    lc: 1327,
    slug: 'list-the-products-ordered-in-a-period',
    title: '列出指定时间段内所有的下单产品',
    difficulty: 'EASY',
    concept: '日期筛选后的连接与 HAVING',
    sql: `SELECT p.product_name, SUM(o.unit) AS unit
FROM Products AS p
JOIN Orders AS o ON p.product_id = o.product_id
WHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29'
GROUP BY p.product_id, p.product_name
HAVING SUM(o.unit) >= 100;`,
    pandas: `def list_products(products, orders):
    february = orders.loc[orders.order_date.between('2020-02-01', '2020-02-29')]
    totals = february.groupby('product_id').unit.sum().reset_index()
    totals = totals.loc[totals.unit.ge(100)]
    return totals.merge(products, on='product_id')[['product_name', 'unit']]`
  },
  {
    order: 50,
    sectionOrder: 7,
    section: '高级字符串函数 / 正则表达式 / 子句',
    category: '正则表达式',
    lc: 1517,
    slug: 'find-users-with-valid-e-mails',
    title: '查找拥有有效邮箱的用户',
    difficulty: 'EASY',
    concept: '邮箱格式正则匹配',
    sql: `SELECT *
FROM Users
WHERE mail REGEXP '^[A-Za-z][A-Za-z0-9_.-]*@leetcode\\.com$';`,
    pandas: `def valid_emails(users):
    mask = users.mail.str.match(r'^[A-Za-z][A-Za-z0-9_.-]*@leetcode\\.com$', na=False)
    return users.loc[mask]`
  }
];
