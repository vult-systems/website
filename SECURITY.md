# Security Features & Compliance

## University-Safe Website Configuration

This website has been configured with enterprise-grade security suitable for educational institutions.

## Security Headers Implemented

### 1. Content Security Policy (CSP)
- **Default Source**: Only allows resources from the same origin
- **Script Source**: Self-hosted with inline scripts for dark mode
- **Style Source**: Self + inline styles + Google Fonts
- **Image Source**: HTTPS only (Unsplash images)
- **Frame Policy**: Prevents clickjacking attacks
- **Base URI**: Prevents base tag injection
- **Form Action**: Restricts form submissions to same origin

### 2. Additional Security Headers
- **X-Frame-Options**: `SAMEORIGIN` - Prevents clickjacking
- **X-Content-Type-Options**: `nosniff` - Prevents MIME type sniffing
- **X-XSS-Protection**: Enabled with blocking mode
- **Referrer-Policy**: `strict-origin-when-cross-origin` - Protects privacy
- **Permissions-Policy**: Disabled camera, microphone, geolocation
- **Strict-Transport-Security**: Forces HTTPS connections

### 3. Privacy & Tracking
- **No Analytics**: No Google Analytics or tracking scripts
- **No Cookies**: Static site with no cookies
- **No User Data Collection**: No forms collecting personal data
- **FLoC Disabled**: Interest-cohort disabled (privacy protection)

### 4. External Resources
All external resources use HTTPS:
- ✅ Google Fonts (fonts.googleapis.com) - Secure CDN
- ✅ Unsplash Images (images.unsplash.com) - Secure image CDN
- ✅ GitHub/LinkedIn links - HTTPS only

### 5. PDF Security
Resume PDF has specific security:
- Can only be embedded on carlosgarcia.works domain
- SAMEORIGIN frame policy
- Proper cache headers

## Compliance Features

### For Educational Institutions:
✅ **HTTPS Only**: All connections encrypted
✅ **No Tracking**: No user behavior tracking
✅ **No Personal Data**: No forms or data collection
✅ **Accessibility**: Semantic HTML, proper contrast
✅ **Content Safety**: Professional portfolio content only
✅ **Privacy Focused**: No third-party analytics
✅ **Open Source**: Code available on GitHub
✅ **Static Site**: No server-side processing or databases

### Standards Compliance:
- WCAG 2.1 Level AA (Accessibility)
- GDPR Compliant (No personal data collection)
- COPPA Compliant (Safe for all ages)
- FERPA Compliant (No student data)

## Network Security

### Allowed Domains:
1. **carlosgarcia.works** - Primary domain
2. **fonts.googleapis.com** - Google Fonts CDN
3. **fonts.gstatic.com** - Google Fonts static resources
4. **images.unsplash.com** - Secure image CDN

### Blocked:
- No advertising networks
- No social media trackers
- No analytics platforms
- No cryptocurrency miners

## File Security

### Protected Files:
- `/api/*` - Blocked in robots.txt
- `/private/*` - Blocked in robots.txt
- `/admin/*` - Blocked in robots.txt
- `/.well-known/*` - Security disclosures only

### Public Files:
- All portfolio pages
- Resume PDF (view-only)
- Static assets (images, fonts, styles)
- Sitemap for search engines

## Deployment Security

### Build Process:
- Static site generation (no runtime vulnerabilities)
- CSS/JS minification
- HTML compression
- Image optimization
- No environment variables exposed

### Hosting Recommendations:
- Use Netlify, Vercel, or GitHub Pages
- Enable HTTPS (forced)
- Configure security headers (via _headers file)
- Use CDN for performance

## Contact for Security Issues

Security concerns can be reported to:
- **Email**: security@carlosgarcia.works
- **Security.txt**: /.well-known/security.txt

## Last Updated
October 13, 2025
