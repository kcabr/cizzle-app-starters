Follow the following steps exactly as described. I want you to really ultrathink about your response before answering. Use coding best practices and use a moderate amount of comments to explain what's going on.

1. Review the concepts and features from the following Tanstack Start repomixed starter projects:  
   ./support/tanstack-start-basic-react-query.md
   ./support/tanstack-start-basic-rsc.md
   ./support/tanstack-start-supabase-basic.md
   ./support/tanstack-start-material-ui.md
   ./support/tanstack-start-counter.md

2. Coding rules / Patterns:

   - Material UI Component library; use AppBar component for menu / user profile etc
   - clerk for authentication (already included)
   - supabase for backend db
   - Prisma for ORM
   - redux-toolkit for global state management. useState should be used for local state. redux for global state
   - react-hottoast for notifications
   - react-query for all backend api requests
   - RSC - use tanstack server components / rsc for optimization / security when needed. I really like these so i want them featured moderately
   - use .env pattern to store sensitive keys / information

3. Tasks:

   - Expand upon the tanstack features and merge/consolidate those features into this current project.
   - Make a series of simple demo pages. Be sure to follow the Coding rules / Patterns. Create some extra examples out of concepts in the documentation that may be fun and useful.
   - Make sure prisma creates migration scripts

4. DO NOTs:
   DO NOT use Supabase for authentication.
   DO NOT set up authentication as Clerk is already in place
