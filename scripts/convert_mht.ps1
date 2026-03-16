# Convert MHT to self-contained HTML
# Extracts the main sheet (Part 4) and inlines the CSS (Part 2)

$mhtPath = (Get-ChildItem "assets\files\*.mht" | Select-Object -First 1).FullName
$outputPath = "assets\files\tableau-synthese-E4.htm"

# Read file as bytes, decode as latin-1 to preserve binary
$bytes = [System.IO.File]::ReadAllBytes($mhtPath)
$raw = [System.Text.Encoding]::GetEncoding('iso-8859-1').GetString($bytes)

# Split by MIME boundary
$boundary = '------=_NextPart_01DCB55E.CF8AB6C0'
$parts = $raw -split [regex]::Escape($boundary)

# Function to decode quoted-printable
function Decode-QuotedPrintable {
    param([string]$text)
    # Remove soft line breaks (=\r\n)
    $text = $text -replace "=\r\n", ""
    $text = $text -replace "=`r`n", ""
    $text = $text -replace "=`n", ""
    # Decode =XX hex sequences
    $result = [regex]::Replace($text, '=([0-9A-Fa-f]{2})', {
        param($m)
        [char][int]("0x" + $m.Groups[1].Value)
    })
    return $result
}

# Extract body (after double newline) from each part
function Get-PartBody {
    param([string]$part)
    $idx = $part.IndexOf("`r`n`r`n")
    if ($idx -lt 0) { $idx = $part.IndexOf("`n`n") }
    if ($idx -ge 0) { return $part.Substring($idx).TrimStart("`r`n") }
    return $part
}

# Part 2 = CSS, Part 4 = main sheet HTML
$cssBody = Get-PartBody $parts[2]
$cssDecoded = Decode-QuotedPrintable $cssBody

$htmlBody = Get-PartBody $parts[4]
$htmlDecoded = Decode-QuotedPrintable $htmlBody

# Inline the CSS: replace the <link rel=Stylesheet> reference with inline <style>
# The sheet HTML references an external stylesheet, we'll inject CSS into <head>
$styleTag = "<style>`r`n$cssDecoded`r`n</style>"

# Remove external stylesheet link references
$htmlDecoded = $htmlDecoded -replace '<link\s+rel=Stylesheet[^>]*>', ''
# Remove Main-File link reference
$htmlDecoded = $htmlDecoded -replace '<link\s+id=Main-File[^>]*>', ''
# Remove other file references
$htmlDecoded = $htmlDecoded -replace '<link\s+rel=File-List[^>]*>', ''
$htmlDecoded = $htmlDecoded -replace '<link\s+rel=Edit-Time-Data[^>]*>', ''
# Remove <base> tag (points to local file path)
$htmlDecoded = $htmlDecoded -replace '(?s)<!\[if IE\]>.*?<!\[endif\]>', ''
# Remove any remaining base tags
$htmlDecoded = $htmlDecoded -replace '(?s)<base[^>]*>', ''

# Insert style tag after </meta> tags in <head>
if ($htmlDecoded -match '(</head>)') {
    $htmlDecoded = $htmlDecoded -replace '</head>', "$styleTag`r`n</head>"
}

# Fix charset to UTF-8
$htmlDecoded = $htmlDecoded -replace 'charset=windows-1252', 'charset=utf-8'

# Write output
$encoding = New-Object System.Text.UTF8Encoding($false) # UTF-8 no BOM
[System.IO.File]::WriteAllText(
    (Join-Path $PWD $outputPath),
    $htmlDecoded,
    $encoding
)

$size = (Get-Item $outputPath).Length
Write-Host "Converted MHT to $outputPath ($size bytes)"
