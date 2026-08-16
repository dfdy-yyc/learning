param(
    [string]$OutputPath = (Join-Path $PSScriptRoot '..\js\data-quests-official.js')
)

$ErrorActionPreference = 'Stop'
$endpoint = 'https://leetcode.cn/graphql/'
$questQuery = @'
query questDetail($questSlug: String!) {
  questDetail(questSlug: $questSlug) { id name slug }
  questUnits(questSlug: $questSlug) {
    id name
    sections {
      levels { id name isPremium favoriteSlug favoriteQuestionNum entryQuestionSlug }
      main
    }
    quizs { id name favoriteSlug favoriteQuestionNum entryQuestionSlug }
  }
}
'@
$listQuery = @'
query favoriteQuestionList($favoriteSlug: String!) {
  favoriteQuestionList(
    favoriteSlug: $favoriteSlug
    sortBy: {sortField: CUSTOM, sortOrder: ASCENDING}
    version: "v2"
  ) {
    questions { questionFrontendId translatedTitle titleSlug difficulty paidOnly }
  }
}
'@

function Invoke-LeetCodeGraphQL($query, $variables) {
    $body = @{ query = $query; variables = $variables } | ConvertTo-Json -Depth 12 -Compress
    $response = Invoke-WebRequest -Uri $endpoint -Method Post -ContentType 'application/json' -Body $body -UseBasicParsing
    $payload = $response.Content | ConvertFrom-Json
    if ($payload.errors) { throw ($payload.errors | ConvertTo-Json -Depth 8) }
    return $payload.data
}

function Convert-Questions($questions) {
    return @($questions | Where-Object { -not [bool]$_.paidOnly } | ForEach-Object {
        $difficulty = $_.difficulty
        [ordered]@{
            lc = [int]$_.questionFrontendId
            title = $_.translatedTitle
            slug = $_.titleSlug
            difficulty = $difficulty
        }
    })
}

$quests = [ordered]@{}
foreach ($questSlug in @('data-structures-and-algorithms-quest', 'database-quest')) {
    $data = Invoke-LeetCodeGraphQL $questQuery @{ questSlug = $questSlug }
    $units = @()

    foreach ($unit in $data.questUnits) {
        $levels = @()
        foreach ($section in $unit.sections) {
            $orderedLevels = @($section.levels | Sort-Object @{ Expression = { if ($_.id -eq $section.main) { 0 } else { 1 } } })
            foreach ($level in $orderedLevels) {
                if ([bool]$level.isPremium) { continue }
                $list = Invoke-LeetCodeGraphQL $listQuery @{ favoriteSlug = $level.favoriteSlug }
                $questions = Convert-Questions $list.favoriteQuestionList.questions
                if ($questions.Count -eq 0) { continue }
                $levels += [ordered]@{
                    id = $level.id
                    name = $level.name
                    isMain = [bool]($level.id -eq $section.main)
                    favoriteSlug = $level.favoriteSlug
                    questions = $questions
                }
            }
        }

        $quizzes = @()
        foreach ($quiz in $unit.quizs) {
            $list = Invoke-LeetCodeGraphQL $listQuery @{ favoriteSlug = $quiz.favoriteSlug }
            $questions = Convert-Questions $list.favoriteQuestionList.questions
            if ($questions.Count -eq 0) { continue }
            $quizzes += [ordered]@{
                id = $quiz.id
                name = $quiz.name
                favoriteSlug = $quiz.favoriteSlug
                questions = $questions
            }
        }

        $units += [ordered]@{
            id = $unit.id
            name = $unit.name
            levels = $levels
            quizzes = $quizzes
        }
    }

    $quests[$questSlug] = [ordered]@{
        name = $data.questDetail.name
        slug = $questSlug
        units = $units
    }
}

$json = $quests | ConvertTo-Json -Depth 24 -Compress
$content = "'use strict';`r`n/* Auto-generated from public LeetCode quest data. */`r`nconst OFFICIAL_QUESTS=$json;`r`n"
[System.IO.File]::WriteAllText((Resolve-Path (Split-Path $OutputPath -Parent)).Path + '\' + (Split-Path $OutputPath -Leaf), $content, [System.Text.UTF8Encoding]::new($false))
Write-Output "Updated $OutputPath"
