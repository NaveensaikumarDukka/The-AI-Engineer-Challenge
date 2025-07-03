# Merging Feature Branch to Main

This guide explains how to merge your current feature branch (e.g., `feature/chat-interface`) back to `main` using two methods:
- GitHub Pull Request (web interface)
- GitHub CLI (command line)

---

## 1. Using GitHub Pull Request (Web Interface)

1. **Push your latest changes** (if not already pushed):
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin feature/chat-interface
   ```

2. **Go to your repository on GitHub** (e.g., https://github.com/your-username/your-repo)

3. **You should see a prompt to create a Pull Request** for `feature/chat-interface` → `main`.
   - If not, click the "Pull requests" tab, then "New pull request".

4. **Select `main` as the base branch** and `feature/chat-interface` as the compare branch.

5. **Review the changes**, add a descriptive title and summary, and click **"Create pull request"**.

6. **Request reviews** if needed, and wait for CI checks to pass (if any).

7. Once approved, click **"Merge pull request"** and confirm.

8. (Optional) **Delete the feature branch** after merging.

---

## 2. Using GitHub CLI (gh)

1. **Push your latest changes** (if not already pushed):
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin feature/chat-interface
   ```

2. **Create a pull request from the CLI:**
   ```bash
   gh pr create --base main --head feature/chat-interface --title "Your PR Title" --body "Description of your changes."
   ```
   - Follow the prompts to edit the title/body if needed.

3. **View the PR in your browser (optional):**
   ```bash
   gh pr view --web
   ```

4. **Merge the PR from the CLI:**
   ```bash
   gh pr merge --merge
   ```
   - You can also use `--squash` or `--rebase` if you prefer.

5. (Optional) **Delete the feature branch locally and remotely:**
   ```bash
   git branch -d feature/chat-interface
   git push origin --delete feature/chat-interface
   ```

---

## Notes
- Replace `feature/chat-interface` with your actual branch name if different.
- Make sure your local `main` is up to date before starting the merge process.
- Resolve any merge conflicts as prompted by GitHub or the CLI. 