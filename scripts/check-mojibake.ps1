param(
  [string]$Root = "."
)

$patterns = @("Ã", "Â", "ï¿½", "�")
$extensions = @("*.html", "*.js", "*.css", "*.md")
$files = Get-ChildItem -Path $Root -Recurse -File -Include $extensions

$found = @()
foreach ($file in $files) {
  $lineNumber = 0
  Get-Content -Path $file.FullName | ForEach-Object {
    $lineNumber++
    $line = $_
    foreach ($p in $patterns) {
      if ($line.Contains($p)) {
        $found += [PSCustomObject]@{
          File = $file.FullName
          Line = $lineNumber
          Text = $line.Trim()
        }
        break
      }
    }
  }
}

if ($found.Count -gt 0) {
  Write-Host "Se detecto texto potencialmente corrupto (mojibake):" -ForegroundColor Red
  $found | ForEach-Object {
    Write-Host "$($_.File):$($_.Line) -> $($_.Text)"
  }
  exit 1
}

Write-Host "OK: no se detecto mojibake." -ForegroundColor Green
exit 0
