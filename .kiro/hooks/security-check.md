# Security Check Hook

## Description
Automatically analyze password security when users add or update password vault cards, providing security recommendations and alerts.

## Trigger
- **Event**: When a vault card with category "password" is created or modified
- **Frequency**: Immediate
- **Conditions**: Always active for password-type vault cards

## Actions
1. **Password Analysis**: Check password strength, complexity, and common patterns
2. **Breach Check**: Verify against known data breaches (using HaveIBeenPwned API)
3. **Duplicate Detection**: Check for duplicate passwords across user's vault
4. **Security Score**: Calculate and display security score
5. **Recommendations**: Provide specific improvement suggestions
6. **Alerts**: Warn about critical security issues

## Implementation

### Hook Configuration
```json
{
  "name": "security-check",
  "trigger": "password_vault_card_changed",
  "enabled": true,
  "settings": {
    "checkBreaches": true,
    "minPasswordLength": 12,
    "requireSpecialChars": true,
    "alertOnDuplicates": true,
    "securityScoreThreshold": 70
  }
}
```

### Security Analysis
```javascript
// hooks/security-check.js
export const securityCheckHook = {
  name: 'security-check',
  trigger: 'password_vault_card_changed',
  
  async execute(context) {
    const { vaultCard, allVaultCards } = context
    
    if (vaultCard.category !== 'password') return
    
    const password = extractPassword(vaultCard.content)
    if (!password) return
    
    // Analyze password strength
    const strengthAnalysis = analyzePasswordStrength(password)
    
    // Check for breaches
    const breachStatus = await checkPasswordBreach(password)
    
    // Check for duplicates
    const duplicates = findDuplicatePasswords(password, allVaultCards)
    
    // Generate security report
    const securityReport = {
      strength: strengthAnalysis,
      breached: breachStatus.isBreached,
      breachCount: breachStatus.count,
      duplicates: duplicates.length,
      score: calculateSecurityScore(strengthAnalysis, breachStatus, duplicates),
      recommendations: generateRecommendations(strengthAnalysis, breachStatus, duplicates)
    }
    
    // Show security alert if needed
    if (securityReport.score < settings.securityScoreThreshold) {
      showSecurityAlert(securityReport)
    }
    
    // Update vault card with security metadata
    await updateVaultCardSecurity(vaultCard.id, securityReport)
  }
}

function analyzePasswordStrength(password) {
  return {
    length: password.length,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    entropy: calculateEntropy(password),
    commonPatterns: detectCommonPatterns(password)
  }
}
```

## Security Checks

### Password Strength
- **Length**: Minimum 12 characters recommended
- **Complexity**: Mix of uppercase, lowercase, numbers, symbols
- **Entropy**: Mathematical measure of randomness
- **Patterns**: Detection of common patterns (123456, qwerty, etc.)

### Breach Detection
- **API Integration**: HaveIBeenPwned API for breach checking
- **Privacy**: Only password hashes are sent, never plain text
- **Caching**: Cache results to avoid repeated API calls
- **Rate Limiting**: Respect API rate limits

### Duplicate Detection
- **Cross-Reference**: Check against all user's password entries
- **Fuzzy Matching**: Detect similar passwords with minor variations
- **Account Grouping**: Group by service/website for better analysis

## User Interface

### Security Dashboard
- Overall security score
- List of weak passwords
- Breach alerts
- Duplicate password warnings
- Improvement recommendations

### Inline Alerts
- Real-time feedback during password entry
- Color-coded strength indicators
- Immediate breach warnings
- Duplicate notifications

## Privacy & Security
- **Local Processing**: Most analysis done client-side
- **Encrypted Storage**: Security metadata encrypted
- **No Plain Text**: Passwords never stored in logs
- **User Control**: Users can disable specific checks

## Benefits
- **Proactive Security**: Catch issues before they become problems
- **Education**: Help users understand password security
- **Compliance**: Meet security best practices
- **Peace of Mind**: Know your passwords are secure