# Auto Backup Hook

## Description
Automatically backup user's vault data when they add or modify vault cards to prevent data loss.

## Trigger
- **Event**: After vault card creation or modification
- **Frequency**: On every change
- **Conditions**: User has enabled auto-backup in settings

## Actions
1. **Export Data**: Create JSON backup of all user's vault data
2. **Store Locally**: Save backup to browser's local storage with timestamp
3. **Cloud Sync**: Upload to user's connected cloud storage (if configured)
4. **Cleanup**: Remove backups older than 30 days
5. **Notify**: Show subtle notification confirming backup completion

## Implementation

### Hook Configuration
```json
{
  "name": "auto-backup",
  "trigger": "vault_card_changed",
  "enabled": true,
  "settings": {
    "maxBackups": 10,
    "retentionDays": 30,
    "cloudSync": false,
    "notifyUser": true
  }
}
```

### Code Structure
```javascript
// hooks/auto-backup.js
export const autoBackupHook = {
  name: 'auto-backup',
  trigger: 'vault_card_changed',
  
  async execute(context) {
    const { user, vaultCards, stickyNotes } = context
    
    // Create backup data
    const backupData = {
      timestamp: new Date().toISOString(),
      user: user.id,
      vaultCards,
      stickyNotes,
      version: '1.0'
    }
    
    // Store backup
    await storeBackup(backupData)
    
    // Cleanup old backups
    await cleanupOldBackups()
    
    // Notify user
    if (settings.notifyUser) {
      showNotification('Data backed up successfully', 'success')
    }
  }
}
```

## Benefits
- **Data Protection**: Prevents accidental data loss
- **Peace of Mind**: Users know their data is safe
- **Recovery Options**: Easy restoration from backups
- **Automated**: No manual intervention required

## Settings
Users can configure:
- Enable/disable auto-backup
- Backup frequency
- Number of backups to keep
- Cloud storage integration
- Notification preferences

## Error Handling
- Graceful failure if storage is full
- Retry mechanism for failed backups
- User notification of backup failures
- Fallback to local storage if cloud fails