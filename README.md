# tpl-wdio-vpm
Webdriverio Setup and Framework Intro steps
1. Install Node.js in your local system
2. Create a directory or folder in your local system
3. Open the same folder in Terminal and enter **npm init wdio .**(if you already have node setup in the system
4. Answer all the questions that are visible on the terminal while setting up the WDIO and finish up the setup. Make sure to have below mentioned Key features while setting up the project:
 - Typescript
 - Mocha Framework
5. For executing the script use command: **npm run wdio**


To set up the project in your local, please follow the below-mentioned steps:
1. Take a clone of the repo using the git command: **git clone {{HTTPS or SSH of Repo}}**
2. Open the code on VS Code or any editor.
3. Open Terminal and create your branch using the git command: **git checkout -b {{BRANCH_NAME}}**
4. Next, hit the command: **npm install**
5. For executing the scripts based on environment and language preference, use commands:
 i) **Env=PROD_en npm run wdio -- --suite SanityProd**
ii) **Env=PROD_es npm run wdio -- --suite SanityProd**
iii) **Env=STAGE_en npm run wdio -- --suite SanityStage**
iv) **Env=STAGE_es npm run wdio -- --suite SanityStage**
v) **Env=QA_en npm run wdio -- --suite SanityQA**
vi) **Env=QA_es npm run wdio -- --suite SanityQA**
6. If you wanted to run a specific suite beside Sanity, replace Suite and Environment name in the command:
   **Env={{ENV_NAME}}_en npm run wdio -- --suite {{SUITE_NAME}}**
