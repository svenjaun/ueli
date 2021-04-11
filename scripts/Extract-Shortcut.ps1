function Extract-Shortcut {
    param(
        [string]$ShortcutFilePath
    )

    try {
        $Shell = New-Object -ComObject WScript.Shell
        $TargetPath = $Shell.CreateShortcut($ShortcutFilePath).TargetPath
        $TargetPathAccessible = Test-Path -Path $TargetPath -PathType Leaf
        if ($TargetPathAccessible) {
            return $TargetPath;
        }
        else {
            return $ShortcutFilePath
        }
    }
    catch {
        return $ShortcutFilePath
    }
}