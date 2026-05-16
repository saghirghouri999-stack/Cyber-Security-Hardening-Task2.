# Cyber-Security-Hardening-Task2.
Advanced Multi-Modal Security Hardening, API Protection (Rate-Limiting, CORS, HSTS, CSP), Injection/CSRF Mitigation, and Automated System Vulnerability Audits (Nikto, OWASP ZAP, Lynis) for DevelopersHub Corporation Internship Task 2.
# DeveloperHub Internship Task 2: Advanced Web Security & Threat Detection

This repository contains the completed tasks for Weeks 4, 5, and 6 of the Cybersecurity Internship, including secure API implementation, ethical hacking reports, and system audits.

## Week 4: Advanced Threat Detection & Web Security Enhancements
- **Intrusion Detection:** Provided a `fail2ban_jail.local` configuration file to monitor and alert on multiple failed SSH login attempts.
- **API Security:** Implemented `express-rate-limit` to prevent brute-force attacks and configured strict CORS policies in `app.js`.
- **Security Headers:** Enforced HTTPS strictly using HSTS headers and implemented Content Security Policy (CSP) via the `helmet` middleware.

## Week 5: Ethical Hacking & Vulnerability Exploitation
### Reconnaissance & Testing
- **Tools Used:** Kali Linux, SQLMap, Burp Suite.
- **SQL Injection (SQLi):** - *Testing Command:* `sqlmap -u "http://localhost:3000/api/users?id=1" --dbs --batch`
  - *Fix:* Replaced direct string concatenations with parameterized queries (Prepared Statements) using `mysql2/promise`.
- **Cross-Site Request Forgery (CSRF):**
  - *Testing:* Intercepted requests using Burp Suite Proxy to test state-changing operations without tokens.
  - *Fix:* Integrated `csurf` middleware in Node.js. All state-changing API endpoints now require a valid X-CSRF-Token.

## Week 6: Advanced Security Audits & Deployment
### Security Audits Performed
1. **Nikto:** Scanned the local server for outdated server software and misconfigurations. (`nikto -h http://localhost:3000`)
2. **OWASP ZAP:** Performed an automated active scan against the API endpoints. No high-severity vulnerabilities found after implementing Helmet and CSRF tokens.
3. **Lynis:** Conducted a local system security audit (`sudo lynis audit system`), ensuring the host operating system aligns with security baselines.

### Secure Deployment
- Created a `Dockerfile` adhering to security best practices (e.g., using `node:18-alpine` and switching to a non-root `USER node`).
- Automated dependency scanning can be achieved using `npm audit` in the CI/CD pipeline.
