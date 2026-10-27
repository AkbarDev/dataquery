# Contributing to DataQuery Web

Thank you for contributing to **DataQuery Web** (`dataquery.in`). To keep the codebase robust and clean, please adhere to our branching, commit, and quality guidelines.

---

## 🌿 Branching Strategy

Our repository uses a dual-branch trunk model:

- **`main` (Production)**:
  - Deployed automatically to production (`https://dataquery.in`).
  - Protected branch. Direct pushes are disabled.
  - Merges into `main` must come from `dev` via Pull Request after review and passing CI tests.
- **`dev` (Staging)**:
  - Deployed to our staging environment.
  - Active integration branch for new features and bug fixes.
- **Feature & Fix Branches**:
  - Branch off `dev`:
    - `feat/feature-name` (e.g., `feat/playground-sql-tab`)
    - `fix/issue-description` (e.g., `fix/dax-calculate-filter`)
    - `docs/update-description` (e.g., `docs/api-contracts`)
    - `chore/tooling-task` (e.g., `chore/upgrade-deps`)

---

## 📝 Commit Conventions

We strictly follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description in imperative mood>

[optional body explaining rationale]

[optional footer(s)]
```

### Approved Types
- **`feat`**: A new user-facing feature or enhancement.
- **`fix`**: A bug fix.
- **`docs`**: Documentation changes only (`README.md`, `/docs/`, inline comments).
- **`refactor`**: Code refactoring without changing functionality or fixing bugs.
- **`test`**: Adding or modifying unit or integration tests.
- **`chore`**: Maintenance, package dependencies, or configuration updates.

### Examples
- `feat(playground): add DuckDB-WASM integration to SQL tab`
- `fix(parser): resolve null date parsing in CSV upload`
- `docs(deployment): document Netlify DNS configuration for custom domain`

---

## 🧪 Quality Standards & PR Checklist

Before opening a Pull Request:
1. Run local tests: `npm test`
2. Run linter: `npm run lint`
3. Verify production build: `npm run build`
4. Update corresponding documentation in `/docs` and log entries in `CHANGELOG.md`.
5. Ensure no API keys, credentials, or personal secrets are included.
