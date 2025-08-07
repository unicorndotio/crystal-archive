# Code Style Guide

> Version: 1.0.0 Last Updated: 2025-08-07

## Context

This file is part of an agentic AI stantdards system. These code style rules are
referenced by the codebase and provide default formatting guidelines.

## General Formatting

### Indentation

- Use 2 spaces for indentation (never tabs)
- Maintain consistent indentation throughout files
- Align nested structures for readability

### Naming Conventions

- **Methods and Variables**: Use camelCase (e.g., `userProfile`,
  `calculateTotal`)
- **Classes and Modules**: Use PascalCase (e.g., `UserProfile`,
  `PaymentProcessor`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

### String Formatting

- Use single quotes for strings: `'Hello World'`
- Use double quotes only when interpolation is needed
- Use template literals for multi-line strings or complex interpolation

## Code Comments

### When to Comment

- Add brief comments above non-obvious business logic
- Document complex algorithms or calculations
- Explain the "why" behind implementation choices

### Comment Maintenance

- Never remove existing comments unless removing the associated code
- Update comments when modifying code to maintain accuracy
- Keep comments concise and relevant

### Comment Format

```typescript
// Calculate compound interest with monthly contributions
// Uses the formula: A = P(1 + r/n)^(nt) + PMT × (((1 + r/n)^(nt) - 1) / (r/n))
function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number,
  monthlyPayment: number,
) {
  // Implementation here
}
```

---

_These formatting rules apply to all code written by humans and AI agents._
