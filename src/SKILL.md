---
name: ayush-aromatic
description: "Modify, extend, or trim the Ayush Aromatic project's source code, which the user supplies as a zip file. Make sure to use this skill whenever the user says 'Ayush Aromatic', even in passing, or asks to change existing code, fix a bug, add a new feature, update a page or component, or delete or remove a feature, file, or function in their main source code zip. Trigger even if the user does not explicitly mention the zip file."
---

# Ayush Aromatic: Code Modification Skill

This skill is for working on the user's main project source code, which they upload as a `.zip` file. Use it for three kinds of work:

1. **Modify** existing code (fix bugs, change behavior, update UI, refactor)
2. **Add** a new feature (new files, new functions, new pages, new endpoints)
3. **Delete** a feature, file, function, or dependency

## Trigger

Activate when the user says **"Ayush Aromatic"** or clearly asks to change, add to, or remove from their project code.

## Step 1: Locate and extract the zip

1. Check `/mnt/user-data/uploads/` for a `.zip` file.
2. If no zip is found, ask the user to upload it. Do not invent code.
3. Extract to the working directory:

```bash
mkdir -p /home/claude/project
unzip -o /mnt/user-data/uploads/<file>.zip -d /home/claude/project
```

4. If extraction creates a single nested top-level folder, treat that folder as the project root.

## Step 2: Understand the project before touching it

1. List the directory structure (ignore `node_modules`, `.git`, `venv`, `__pycache__`, `dist`, `build`).
2. Identify the tech stack from config files (`package.json`, `requirements.txt`, `pom.xml`, `composer.json`, `pubspec.yaml`, etc.).
3. Find the entry point and the files relevant to the user's request.
4. Read those files fully before editing. Follow the existing naming style, indentation, folder layout, and libraries already in use.

## Step 3: Make the change

### Modifying code
- Edit only what the request needs. Keep unrelated code unchanged.
- Preserve existing behavior unless the user asked to change it.

### Adding a feature
- Place new files where similar files already live.
- Reuse existing components, helpers, and styles instead of duplicating them.
- Wire the feature in completely (routes, imports, navigation, config) so it actually works.
- Add new dependencies only if necessary, and update the dependency file (`package.json`, `requirements.txt`, etc.).

### Deleting a feature
- Search the whole project for every reference to the thing being removed (imports, routes, menu links, styles, tests, config, docs).
- Remove the code and all dead references so nothing breaks.
- Remove dependencies that are no longer used by anything else.
- If deletion could affect other parts in a non-obvious way, tell the user before proceeding.

## Step 4: Verify

- Re-check imports and references for broken links or missing files.
- If the stack allows it, run a syntax check, linter, build, or tests (for example `node --check`, `python -m py_compile`, `npm run build`).
- If something cannot be tested here, say so plainly.

## Step 5: Deliver

1. Copy the updated project to `/mnt/user-data/outputs/` and re-zip it, excluding `node_modules`, `.git`, and other generated folders:

```bash
cd /home/claude
zip -r /mnt/user-data/outputs/ayush-aromatic-updated.zip project -x "*/node_modules/*" "*/.git/*" "*/__pycache__/*"
```

2. Present the zip file to the user.
3. Give a short summary:
   - **Files changed**
   - **Files added**
   - **Files deleted**
   - **Anything the user must do** (for example run `npm install`, update an environment variable, or restart the server)

## Rules

- Never overwrite or discard the user's original code without telling them what changed.
- If the request is ambiguous (for example, which page or which feature), ask one short clarifying question before making large changes.
- Do not add unrequested features, restyle unrelated code, or rename things without being asked.
- Keep secrets (API keys, passwords) out of new code. Use the project's existing config or environment variable approach.
- If the zip is very large, focus on the files relevant to the task instead of reading everything.