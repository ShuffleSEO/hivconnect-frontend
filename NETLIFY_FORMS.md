# Netlify Forms Configuration

This document explains how forms are configured for Netlify form handling in this project.

## Configured Forms

### 1. Contact Form (`/contact`)

- **Form Name**: `contact`
- **Location**: `src/pages/contact/index.astro`
- **Fields**:
  - first-name (required)
  - last-name (required)
  - email (required)
  - phone
  - county
  - inquiry-type (required)
  - message (required)
  - privacy consent checkbox (required)

### 2. Planning Council Application (`/planning-council-application`)

- **Form Name**: `planning-council-application`
- **Location**: `src/components/forms/PlanningCouncilForm.tsx`
- **Type**: Multi-step React form with Netlify integration
- **Fields**: 40+ fields including personal info, demographics, services, experience, and commitment

## How It Works

### For Static HTML Forms (Contact Form)

1. **Form Detection**: Netlify automatically detects forms with `data-netlify="true"` attribute at build time
2. **Form Name**: Each form needs a unique `name` attribute
3. **Hidden Field**: `<input type="hidden" name="form-name" value="contact" />` identifies the form
4. **Success Redirect**: `action="/success"` redirects users after successful submission

### For JavaScript/React Forms (Planning Council)

1. **Hidden HTML Form**: A hidden form with all field names for Netlify detection
2. **JavaScript Submission**: Custom fetch() to submit form data to Netlify
3. **Form Data**: Converts React state to FormData and submits via fetch
4. **Success Handling**: Redirects to `/success` page on successful submission

## Form Submissions in Netlify

### Accessing Form Submissions

1. Go to your Netlify dashboard
2. Navigate to your site
3. Click on "Forms" in the left sidebar
4. Select the form you want to view

### Form Notifications

- Configure email notifications in Netlify dashboard
- Set up webhook integrations if needed
- Configure spam filtering and other settings

### Form Data Export

- Export submissions as CSV from Netlify dashboard
- Use Netlify API for programmatic access

## Testing Forms

### Local Development

- Forms work in production but not in local development
- For local testing, forms will submit but won't be processed
- Test form validation and UX locally, test actual submission on deployed site

### Production Testing

1. Deploy to Netlify
2. Go to each form page
3. Fill out and submit forms
4. Check Netlify dashboard for submissions
5. Verify success page redirection

## Troubleshooting

### Common Issues

1. **Form not detected**: Ensure `data-netlify="true"` attribute is present
2. **Submissions not received**: Check that `name` attribute matches hidden `form-name` field
3. **JavaScript form issues**: Verify all field names match between hidden form and React state

### Form Not Working?

1. Check browser network tab for submission errors
2. Verify all required fields are filled
3. Check Netlify build logs for form detection
4. Ensure hidden form contains all field names used in JavaScript submission

## Security

### Built-in Protection

- Netlify provides built-in spam protection
- reCAPTCHA can be added if needed
- Form data is encrypted in transit

### Privacy

- All form data is confidential
- Submissions are only accessible to site administrators
- Consider adding privacy policy links to forms

## Best Practices

1. **Always include success/error handling**
2. **Use descriptive form and field names**
3. **Include proper validation (client and server-side)**
4. **Test forms after each deployment**
5. **Monitor form submissions regularly**
6. **Keep form fields consistent between hidden HTML and JavaScript versions**

## File Locations

- Contact form: `src/pages/contact/index.astro`
- Planning Council form: `src/components/forms/PlanningCouncilForm.tsx`
- Success page: `src/pages/success.astro`
- Form step components: `src/components/forms/steps/`
