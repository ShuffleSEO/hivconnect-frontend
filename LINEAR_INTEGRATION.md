# Linear MCP Integration Guide - HIV Connect Central NJ

**Last Updated**: December 9, 2025
**Project**: HIV Connect Central NJ
**Team**: Shuffle Studio
**Purpose**: Guide for using Linear MCP server with this project

---

## Table of Contents

1. [Overview](#overview)
2. [Linear MCP Tools](#linear-mcp-tools)
3. [Current Project Structure](#current-project-structure)
4. [Workflow Best Practices](#workflow-best-practices)
5. [MCP Command Quick Reference](#mcp-command-quick-reference)
6. [Issue Creation Templates](#issue-creation-templates)
7. [Git Integration](#git-integration)
8. [Daily & Weekly Routines](#daily--weekly-routines)

---

## Overview

This project now uses Linear for project tracking via the Linear MCP server, which provides 21 tools for managing issues, projects, comments, and more directly from Claude Code.

### Why Linear?

- **Real-time tracking** - Always know what's in progress
- **Context preservation** - Comments and links keep history
- **Git integration** - Automatic commit linking
- **Dependency management** - Parent/child issue relationships
- **Client communication** - Transparent progress tracking

### Project Information

- **Project Name**: HIV Connect Central NJ (2021-Present)
- **Project ID**: `c55a46a8-1aee-45a2-919f-71bf525e8b73`
- **Team**: Shuffle Studio
- **Team ID**: `9fe49653-ca9a-4541-8eee-3b2ecbcaff5f`
- **Current Issue**: SHU-9 - Client Testing Follow-up & Support (Due: Dec 13, 2025)

---

## Linear MCP Tools

The Linear MCP server provides 21 tools organized by category:

### Issue Management
- `mcp__linear-server__get_issue` - Get detailed issue information by ID
- `mcp__linear-server__list_issues` - List issues with filters
- `mcp__linear-server__create_issue` - Create new issues
- `mcp__linear-server__update_issue` - Update existing issues

### Comments
- `mcp__linear-server__list_comments` - List comments on an issue
- `mcp__linear-server__create_comment` - Add comments to issues

### Project Management
- `mcp__linear-server__list_projects` - List all projects
- `mcp__linear-server__get_project` - Get project details
- `mcp__linear-server__create_project` - Create new projects
- `mcp__linear-server__update_project` - Update existing projects

### Organization
- `mcp__linear-server__list_teams` - List teams
- `mcp__linear-server__get_team` - Get team details
- `mcp__linear-server__list_users` - List workspace users
- `mcp__linear-server__get_user` - Get user details
- `mcp__linear-server__list_cycles` - List team cycles
- `mcp__linear-server__list_documents` - List Linear documents
- `mcp__linear-server__get_document` - Get document by ID/slug

### Labels & Status
- `mcp__linear-server__list_issue_labels` - List available labels
- `mcp__linear-server__create_issue_label` - Create new labels
- `mcp__linear-server__list_issue_statuses` - List workflow statuses
- `mcp__linear-server__get_issue_status` - Get status details
- `mcp__linear-server__list_project_labels` - List project-specific labels

---

## Current Project Structure

### Available Issue Statuses

| Status | Type | When to Use |
|--------|------|-------------|
| **Backlog** | Unstarted | Not yet prioritized |
| **Todo** | Unstarted | Ready to start (dependencies met) |
| **In Progress** | Started | Actively working on |
| **In Review** | Started | Awaiting review or client feedback |
| **Done** | Completed | Fully complete and deployed |
| **Canceled** | Canceled | No longer needed |
| **Duplicate** | Canceled | Duplicate of another issue |

### Relevant Labels for HIV Connect

| Label | Purpose |
|-------|---------|
| `Client-Delivery` | Active client builds and fixes |
| `Follow-Up` | Awaiting external response |
| `This-Week` | Must complete by Friday |
| `🔴 Active Client` | Paying retainer or active engagement |
| `💵 MRR` | Monthly recurring revenue |
| `🔄 Migration` | WordPress to modern stack, platform migration work |
| `Cloudflare` | Uses Cloudflare (Workers, D1, R2, Pages) |
| `Documentation` | Playbook, pricing, process documentation |

---

## Workflow Best Practices

### Issue Creation Guidelines

**Required Fields**:
- **Title**: Clear, action-oriented (e.g., "Build blog listing page")
- **Description**: Context, acceptance criteria, dependencies
- **Team**: Shuffle Studio (`9fe49653-ca9a-4541-8eee-3b2ecbcaff5f`)
- **Assignee**: Usually `"me"` (kevin@shuffleseo.com)
- **Labels**: At least 2-3 relevant labels

**Optional but Recommended**:
- **Estimate**: Points (1, 2, 3, 5, 8) or leave blank
- **Due Date**: For time-sensitive tasks
- **Project**: HIV Connect Central NJ (2021-Present)
- **Parent**: Link to epic/parent issue if applicable
- **Links**: Git branch, related URLs, documentation

### Status Transitions

```
Backlog → Todo → In Progress → In Review → Done
                      ↓
                  Canceled (if not needed)
```

**When to Update Status**:
- **Todo**: Task is ready to start (dependencies met)
- **In Progress**: Actively working on task (mark BEFORE starting work)
- **In Review**: Awaiting client feedback or code review
- **Done**: Fully complete and deployed/delivered
- **Canceled**: Task no longer needed or deprioritized

**Important**: Only ONE task should be "In Progress" at a time.

### Comment Strategy

**Use Comments For**:
- Progress updates (daily standups)
- Blockers and issues encountered
- Questions for client or team
- Links to Git commits
- Test results and QA notes
- Client feedback

**Comment Template**:
```markdown
## Progress Update - [Date]

**Completed**:
- [x] Task 1
- [x] Task 2

**In Progress**:
- [ ] Task 3 (50% complete)

**Blockers**:
- Waiting on client response for X

**Next Steps**:
- Start Task 4
- Follow up with client

**Links**:
- Commit: [hash]
- Deployment: [URL]
```

---

## MCP Command Quick Reference

### Get Current Issue Details
```typescript
mcp__linear-server__get_issue({ id: "SHU-9" })
```

### List My Active Issues
```typescript
mcp__linear-server__list_issues({
  assignee: "me",
  state: "In Progress",
  orderBy: "updatedAt"
})
```

### List This Week's Tasks
```typescript
mcp__linear-server__list_issues({
  label: "This-Week",
  team: "9fe49653-ca9a-4541-8eee-3b2ecbcaff5f"
})
```

### Create New Issue
```typescript
mcp__linear-server__create_issue({
  title: "Build blog listing page",
  description: "Create /blog route with pagination, category filters, and search functionality.\n\n**Acceptance Criteria**:\n- Posts load from API successfully\n- Pagination works (10 per page)\n- Category filter updates results\n- Search returns relevant posts\n- Responsive on all devices\n- SEO meta tags included",
  team: "9fe49653-ca9a-4541-8eee-3b2ecbcaff5f",
  project: "HIV Connect Central NJ (2021-Present)",
  assignee: "me",
  labels: ["Client-Delivery", "Cloudflare", "This-Week"],
  estimate: 5
})
```

### Update Issue Status
```typescript
mcp__linear-server__update_issue({
  id: "SHU-9",
  state: "Done"
})
```

### Add Progress Comment
```typescript
mcp__linear-server__create_comment({
  issueId: "SHU-9",
  body: "## Progress Update - Dec 9\n\n**Completed**:\n- Backend UI branding complete\n- Documentation files updated\n- Linear integration planned\n\n**Next Steps**:\n- Create Linear integration docs\n- Begin content population\n- Test webhook system"
})
```

### List Project Issues
```typescript
mcp__linear-server__list_issues({
  project: "HIV Connect Central NJ (2021-Present)",
  orderBy: "updatedAt",
  limit: 50
})
```

### Get Team Statuses
```typescript
mcp__linear-server__list_issue_statuses({
  team: "9fe49653-ca9a-4541-8eee-3b2ecbcaff5f"
})
```

---

## Issue Creation Templates

### Feature Implementation Issue

```typescript
mcp__linear-server__create_issue({
  title: "[Feature Name] - Brief Description",
  description: `## Overview
Brief description of what this feature does.

## Context
Why this feature is needed.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Notes
- File locations: /src/pages/...
- Dependencies: X, Y, Z
- API endpoints: GET /api/...

## Testing Checklist
- [ ] Local testing complete
- [ ] Staging deployment tested
- [ ] Mobile responsive verified
- [ ] Accessibility checked`,
  team: "9fe49653-ca9a-4541-8eee-3b2ecbcaff5f",
  project: "HIV Connect Central NJ (2021-Present)",
  assignee: "me",
  labels: ["Client-Delivery", "Cloudflare"],
  estimate: 5
})
```

### Bug Fix Issue

```typescript
mcp__linear-server__create_issue({
  title: "Fix: [Brief Description of Bug]",
  description: `## Bug Description
What is broken and how it manifests.

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- Browser: Chrome 120
- Device: Desktop
- URL: https://hivconnect-frontend.pages.dev/...

## Proposed Fix
How to fix the issue.`,
  team: "9fe49653-ca9a-4541-8eee-3b2ecbcaff5f",
  assignee: "me",
  labels: ["Client-Delivery", "This-Week"],
  priority: 1  // 1 = Urgent for critical bugs
})
```

### Content Population Issue

```typescript
mcp__linear-server__create_issue({
  title: "Content Population - [Collection Name]",
  description: `## Goal
Add content to [Collection Name] collection in PayloadCMS.

## Content Requirements
- Minimum [X] items
- Each item must have: [fields]
- Categories: [list]
- Languages: English/Spanish/Both

## Checklist
- [ ] Research content sources
- [ ] Draft content in Google Docs (if applicable)
- [ ] Upload to PayloadCMS admin
- [ ] Verify content displays on frontend
- [ ] Test automatic rebuild webhook

## Resources
- PayloadCMS Admin: https://hivconnect-backend.shuffle-seo.workers.dev/admin
- Collection: [Name]`,
  team: "9fe49653-ca9a-4541-8eee-3b2ecbcaff5f",
  project: "HIV Connect Central NJ (2021-Present)",
  assignee: "me",
  labels: ["Client-Delivery", "This-Week"],
  estimate: 3
})
```

---

## Git Integration

### Branch Naming

Linear provides automatic branch names in format:
```
kevin/shu-9-hiv-connect-client-testing-follow-up-support
```

Use these for:
- Feature branches
- Bug fix branches
- Documentation branches

### Commit Message Format

**With Linear Issue Reference**:
```
[SHU-9] Add blog listing page with pagination

- Create /blog route
- Implement pagination (10 posts per page)
- Add category filter
- Style with Tailwind CSS
```

**Auto-Close Issues**:
```
[SHU-123] Fix CORS error on blog API

- Add blog API domain to CORS whitelist
- Update CSP to allow api.hivconnectcnj.org

Closes SHU-123
```

**Linear Auto-Links**:
- Mention issue ID in commit message: `SHU-9`
- Linear automatically links commit to issue
- Use `Closes SHU-123` to auto-close issues on merge

### Git Workflow with Linear

1. **Start Work on Issue**:
   - Update issue status to "In Progress"
   - Add comment: "Starting work on this"
   - Create branch with Linear's suggested name

2. **During Development**:
   - Reference issue ID in commit messages
   - Add progress comments to Linear issue
   - Link to specific commits in comments

3. **Open Pull Request**:
   - Reference Linear issue in PR title: `[SHU-9] Add blog listing page`
   - Add Linear issue URL to PR description
   - Update Linear issue with PR link

4. **After Merge**:
   - Update issue status to "Done"
   - Add final comment with deployment URL
   - Close issue if using "Closes SHU-X" in commit

---

## Daily & Weekly Routines

### Daily Workflow

**Morning** (5 minutes):
1. List issues assigned to me with status "In Progress"
2. Review comments from yesterday
3. Add comment with today's plan

**During Work**:
1. Update issue status as tasks progress
2. Add comments when encountering blockers
3. Reference issue ID in commit messages

**End of Day** (5 minutes):
1. Add progress comment to active issues
2. Move completed tasks to "Done"
3. Update status for partially complete work

### Weekly Workflow

**Monday** (15 minutes):
1. Review "Backlog", move priority items to "Todo"
2. Identify "This-Week" tasks
3. Estimate work for the week

**Wednesday** (10 minutes):
1. Mid-week check-in comment on active issues
2. Identify any blockers
3. Adjust priorities if needed

**Friday** (15 minutes):
1. Close completed issues
2. Update PROJECT_STATUS.md
3. Sync PROJECT_TODO.md with Linear
4. Move unfinished "This-Week" tasks to next week

---

## Client Communication

### SHU-9 Type Issues (Client-facing)

**Best Practices**:
- Keep descriptions client-friendly (avoid technical jargon)
- Use checklists for transparency
- Add comments for progress updates
- Include testing URLs and credentials (securely)
- Tag with `Follow-Up` when awaiting client response
- Set due dates aligned with client deadlines

**Example SHU-9 Comment**:
```markdown
## Update - December 9, 2025

Hi Terri,

Quick update on testing progress:

**Completed This Week**:
- ✅ Backend UI branded and deployed
- ✅ Automatic rebuild system working
- ✅ All documentation updated

**This Week's Focus**:
- Content population (Resources, Blog, PDFs)
- Frontend blog pages development
- Testing checklist completion

**Testing Status**:
- Awaiting confirmation that both users logged in successfully
- Please test adding a Resource and updating a Provider when you have a chance

Let me know if you have any questions!

**Links**:
- Frontend: https://hivconnect-frontend.pages.dev/
- Backend Admin: https://hivconnect-backend.shuffle-seo.workers.dev/admin
```

---

## Integration with Existing Documentation

### File Relationships

| File | Purpose | Sync with Linear |
|------|---------|------------------|
| `PROJECT_TODO.md` | Master task list (150+ tasks) | Weekly sync to Linear issues |
| `PROJECT_STATUS.md` | Current deployment status | Update when closing major issues |
| `SESSION_*.md` | Session summaries | Create Linear issue per session |
| `LINEAR_INTEGRATION.md` | This file | Reference in issue descriptions |
| `LINEAR_QUICK_REF.md` | Quick command reference | Keep updated with new patterns |

### Workflow

1. **PROJECT_TODO.md → Linear Issues**: Create Linear issues for tasks, link to PROJECT_TODO
2. **Linear Progress → PROJECT_TODO.md**: Weekly update PROJECT_TODO with completed tasks
3. **Session Summaries → Linear Issues**: Create issue per session, tag with `Documentation`
4. **Git Commits → Linear**: Reference issue IDs in commits
5. **Deployments → Linear**: Comment with deployment URLs

---

## Troubleshooting

### Common Issues

**Issue**: "Team not found"
- **Solution**: Use team ID: `9fe49653-ca9a-4541-8eee-3b2ecbcaff5f`

**Issue**: "Project not found by name"
- **Solution**: Use project query: `"HIV Connect Central NJ (2021-Present)"` or ID: `c55a46a8-1aee-45a2-919f-71bf525e8b73`

**Issue**: "Label not found"
- **Solution**: List available labels first with `list_issue_labels`

**Issue**: "Cannot update issue status"
- **Solution**: Use status name: `"In Progress"`, not type

**Issue**: "Assignee not found"
- **Solution**: Use `"me"` for kevin@shuffleseo.com

---

## Additional Resources

- **Linear Documentation**: https://linear.app/docs
- **MCP Documentation**: https://github.com/anthropics/mcp
- **PROJECT_TODO.md**: Master task list (150+ tasks)
- **PROJECT_STATUS.md**: Current deployment status
- **Plan File**: `/Users/kevincan/.claude/plans/staged-foraging-scott.md`

---

**Last Updated**: December 9, 2025
**Maintained By**: Kevin / Shuffle SEO
**Project**: HIV Connect Central NJ
