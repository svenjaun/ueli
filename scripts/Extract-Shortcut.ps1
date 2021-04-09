function Extract-Shortcut {
    param(
        [string]$ShortcutFilePath
    )

    $Shell = New-Object -ComObject WScript.Shell

    return $Shell.CreateShortcut($ShortcutFilePath).TargetPath
}