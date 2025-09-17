
param(
  [string]$BaseUrl = "http://localhost:3000",
  [string]$UserJwt = "<YOUR_JWT>",
  [string]$CommanderJwt = "<COMMANDER_JWT>"
)

function Invoke-Json {
  param([string]$Method,[string]$Url,[hashtable]$Headers,[hashtable]$Body)
  $json = if ($Body) { $Body | ConvertTo-Json -Depth 6 } else { $null }
  try {
    $res = Invoke-RestMethod -Method $Method -Uri $Url -Headers $Headers -Body $json
    $res
  } catch {
    Write-Host "Status: " $_.Exception.Response.StatusCode.value__
    $r = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $txt = $r.ReadToEnd()
    Write-Host $txt
    throw
  }
}

Write-Host "== Test 1: POST /status/update =="
$headersUser = @{"Authorization"="Bearer $UserJwt";"Content-Type"="application/json"}
$res1 = Invoke-Json -Method POST -Url "$BaseUrl/status/update" -Headers $headersUser -Body @{ status="on-duty"; location="HQ North Gate" }
$res1 | ConvertTo-Json -Depth 8

Write-Host "== Test 1b (Negative): POST /status/update (missing status) =="
try {
  Invoke-Json -Method POST -Url "$BaseUrl/status/update" -Headers $headersUser -Body @{}
} catch {}

Write-Host "== Test 2: POST /alerts/activate =="
$headersCmd = @{"Authorization"="Bearer $CommanderJwt";"Content-Type"="application/json"}
$res2 = Invoke-Json -Method POST -Url "$BaseUrl/alerts/activate" -Headers $headersCmd -Body @{
  title = "הופעל נכס`"ל"
  body  = "היכנסו מיד למצב כוננות"
  url   = "https://example.com/alert"
}
$res2 | ConvertTo-Json -Depth 8
$alertId = ($res2.alertId, $res2.data.alertId, $res2.id) | Where-Object { $_ } | Select-Object -First 1

if (-not $alertId) {
  Write-Host "Could not extract alertId from response"; exit 1
}

Write-Host "== Test 3: GET /alerts/$alertId/metrics =="
$res3 = Invoke-Json -Method GET -Url "$BaseUrl/alerts/$alertId/metrics" -Headers $headersCmd -Body $null
$res3 | ConvertTo-Json -Depth 8

Write-Host "== Done =="
