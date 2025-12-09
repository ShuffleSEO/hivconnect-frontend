# Linear MCP Quick Reference - HIV Connect

**Team ID**: `9fe49653-ca9a-4541-8eee-3b2ecbcaff5f` (Shuffle Studio)
**Project**: HIV Connect Central NJ (2021-Present)
**Current Issue**: SHU-9 (Due: Dec 13, 2025)

---

## Most Common Commands

### Get My Active Issues
```typescript
mcp__linear-server__list_issues({
  assignee: "me",
  state: "In Progress"
})
```

### Get Issue Details
```typescript
mcp__linear-server__get_issue({ id: "SHU-9" })
```

### Create New Issue
```typescript
mcp__linear-server__create_issue({
  title: "Task title",
  description: "Task description with acceptance criteria",
  team: "9fe49653-ca9a-4541-8eee-3b2ecbcaff5f",
  project: "HIV Connect Central NJ (2021-Present)",
  assignee: "me",
  labels: ["Client-Delivery", "This-Week"]
})
```

### Update Issue Status
```typescript
mcp__linear-server__update_issue({
  id: "SHU-9",
  state: "Done"  // or "In Progress", "In Review", etc.
})
```

### Add Comment
```typescript
mcp__linear-server__create_comment({
  issueId: "SHU-9",
  body: "Progress update text here"
})
```

### List This Week's Tasks
```typescript
mcp__linear-server__list_issues({
  label: "This-Week",
  team: "9fe49653-ca9a-4541-8eee-3b2ecbcaff5f"
})
```

---

## Issue Status Workflow

```
Backlog → Todo → In Progress → In Review → Done
```

- **Backlog**: Not prioritized yet
- **Todo**: Ready to start (dependencies met)
- **In Progress**: Actively working (only ONE at a time)
- **In Review**: Awaiting feedback
- **Done**: Complete and deployed

---

## Common Labels

| Label | Use When |
|-------|----------|
| `Client-Delivery` | Active client work |
| `This-Week` | Due by Friday |
| `Follow-Up` | Waiting on client |
| `🔴 Active Client` | Retainer work |
| `Cloudflare` | Uses Cloudflare stack |
| `Documentation` | Docs and guides |

---

## Git Integration

### Branch Names
Linear suggests: `kevin/shu-9-task-description`

### Commit Messages
```
[SHU-9] Brief description

- Change 1
- Change 2

Closes SHU-9  # Auto-closes issue
```

---

## Daily Routine

**Morning** (5 min):
```typescript
// Check what's in progress
mcp__linear-server__list_issues({
  assignee: "me",
  state: "In Progress"
})

// Add today's plan as comment
mcp__linear-server__create_comment({
  issueId: "SHU-X",
  body: "Today: Working on X, Y, Z"
})
```

**End of Day** (5 min):
```typescript
// Update completed tasks
mcp__linear-server__update_issue({
  id: "SHU-X",
  state: "Done"
})

// Add progress comment
mcp__linear-server__create_comment({
  issueId: "SHU-Y",
  body: "Progress: Completed A, B. Next: C, D"
})
```

---

## Issue Templates

### Feature Issue
```typescript
{
  title: "Build [Feature Name]",
  description: "## Goal\n...\n\n## Acceptance Criteria\n- [ ] ...",
  labels: ["Client-Delivery", "Cloudflare"],
  estimate: 5
}
```

### Bug Fix
```typescript
{
  title: "Fix: [Brief Bug Description]",
  description: "## Bug\n...\n\n## Steps to Reproduce\n1. ...",
  labels: ["Client-Delivery", "This-Week"],
  priority: 1  // Urgent
}
```

### Content Task
```typescript
{
  title: "Content Population - [Collection]",
  description: "## Goal\nAdd X items to Y collection\n\n## Checklist\n- [ ] ...",
  labels: ["Client-Delivery"],
  estimate: 3
}
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| "Team not found" | Use ID: `9fe49653-ca9a-4541-8eee-3b2ecbcaff5f` |
| "Project not found" | Use full name: `"HIV Connect Central NJ (2021-Present)"` |
| "Status not found" | Use: `"In Progress"` (not `"in_progress"`) |
| "Assignee not found" | Use: `"me"` for kevin@shuffleseo.com |

---

## Quick Links

- **Full Guide**: `LINEAR_INTEGRATION.md`
- **Project Docs**: `PROJECT_STATUS.md`, `PROJECT_TODO.md`
- **Frontend**: https://hivconnect-frontend.pages.dev/
- **Backend Admin**: https://hivconnect-backend.shuffle-seo.workers.dev/admin
- **Linear Web**: https://linear.app/shuffle-studio/issue/SHU-9

---

**Last Updated**: December 9, 2025
