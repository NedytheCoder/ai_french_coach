You are executing an automated development task.

Step 1: Open the file `.automation/tasks.json`

Step 2: Read and extract:
- prompt
- acceptance_tests

Step 3: Fully understand the codebase before making changes.

Step 4: Execute the task described in "prompt".
- Modify necessary files
- Create new files if needed
- Follow best practices

Step 5: Validate against acceptance_tests:
- Ensure each test condition is satisfied
- Run tests if possible

Step 6: Only stop when ALL acceptance tests are satisfied.

Step 7: When complete, run this command:

curl -X POST http://localhost:5678/webhook/windsurf-done \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'