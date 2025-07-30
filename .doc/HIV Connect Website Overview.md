# HIV Connect Central NJ - Optimal Data Structure & Website Architecture

## Core Data Schema

### Provider Database Structure

```json
{
  "provider": {
    "id": "unique_identifier",
    "name": "Provider Name",
    "type": ["FQHC", "Hospital", "Community Health Center", "Private Practice", "ASO"],
    "ryan_white_parts": ["A", "B", "C", "D"],
    "contact": {
      "phone": "primary_phone",
      "phone_24hr": "emergency_phone",
      "fax": "fax_number",
      "email": "contact_email",
      "website": "provider_website",
      "telehealth_portal": "telehealth_url"
    },
    "locations": [
      {
        "address": "full_address",
        "coordinates": {"lat": 0.0, "lng": 0.0},
        "accessibility": ["wheelchair", "parking", "public_transit"],
        "hours": {
          "monday": {"open": "09:00", "close": "17:00"},
          "tuesday": {"open": "09:00", "close": "17:00"},
          "emergency_hours": "24/7 availability details"
        }
      }
    ],
    "services": {
      "medical_care": {
        "hiv_treatment": true,
        "prep_services": true,
        "std_testing": true,
        "specialty_care": ["infectious_disease", "psychiatry", "dental"]
      },
      "support_services": {
        "case_management": true,
        "mental_health": true,
        "substance_abuse": true,
        "housing_assistance": true,
        "transportation": true,
        "legal_services": true
      },
      "prevention": {
        "hiv_testing": true,
        "counseling": true,
        "prep_counseling": true,
        "risk_reduction": true
      }
    },
    "eligibility": {
      "income_requirements": "up_to_500_fpl",
      "insurance_accepted": ["medicaid", "medicare", "private", "uninsured"],
      "special_populations": ["youth", "women", "lgbtq", "veterans"]
    },
    "languages": ["english", "spanish", "portuguese"],
    "last_updated": "2025-01-15T10:00:00Z"
  }
}
```

### Service Categories Taxonomy

```json
{
  "service_categories": {
    "medical_care": {
      "name": "Medical Care & Treatment",
      "subcategories": {
        "hiv_treatment": "HIV Treatment & Monitoring",
        "prep_services": "PrEP & Prevention",
        "std_testing": "STD Testing & Treatment",
        "specialty_care": "Specialty Medical Services",
        "dental_care": "Dental Services",
        "mental_health_medical": "Psychiatric Services"
      }
    },
    "support_services": {
      "name": "Support Services",
      "subcategories": {
        "case_management": "Case Management",
        "mental_health": "Counseling & Mental Health",
        "substance_abuse": "Substance Abuse Treatment",
        "housing": "Housing Assistance",
        "transportation": "Transportation Services",
        "food_nutrition": "Food & Nutrition Services",
        "legal": "Legal Services",
        "insurance": "Insurance Enrollment"
      }
    },
    "prevention": {
      "name": "Testing & Prevention",
      "subcategories": {
        "hiv_testing": "HIV Testing",
        "counseling": "HIV Counseling",
        "prep_counseling": "PrEP Counseling",
        "education": "HIV Education",
        "risk_reduction": "Risk Reduction"
      }
    }
  }
}
```

## Website Information Architecture

### Primary Navigation Structure

```
1. Find Services
   ├── Service Directory (searchable/filterable)
   ├── Emergency Services
   ├── Telehealth Options
   └── Ryan White Programs

2. Get Tested
   ├── Testing Locations
   ├── At-Home Testing
   ├── What to Expect
   └── Results & Next Steps

3. Treatment & Care
   ├── Starting Treatment
   ├── Managing HIV
   ├── PrEP Information
   └── Medication Assistance

4. Support & Resources
   ├── Case Management
   ├── Mental Health
   ├── Housing & Financial Aid
   └── Support Groups

5. About HIV Connect
   ├── Our Mission
   ├── Coverage Area
   ├── Planning Council
   └── Contact Us
```

### Homepage Layout Priority

```
1. Hero Section
   - Quick service finder
   - Emergency contact information
   - Multiple language options

2. Service Quick Access
   - Find Testing Locations
   - Get Treatment
   - Financial Assistance
   - 24/7 Hotlines

3. Interactive Map
   - Provider locations
   - Service type filtering
   - Real-time availability

4. Latest Updates
   - Service announcements
   - Health alerts
   - Program changes

5. Resource Library
   - Educational materials
   - FAQ section
   - Multilingual resources
```

## Advanced Functionality Structure

### Search & Filter System

```json
{
  "search_filters": {
    "location": {
      "county": ["middlesex", "somerset", "hunterdon"],
      "city": "city_list",
      "zip_code": "zip_input",
      "distance": "radius_slider"
    },
    "services": {
      "primary_service": "service_dropdown",
      "specific_needs": "checkbox_array",
      "urgency": ["routine", "urgent", "emergency"]
    },
    "accessibility": {
      "wheelchair_accessible": true,
      "public_transportation": true,
      "parking_available": true,
      "telehealth_available": true
    },
    "demographics": {
      "age_group": ["youth", "adult", "senior"],
      "special_populations": ["lgbtq", "women", "veterans"],
      "language_preference": "language_dropdown"
    },
    "insurance": {
      "accepted_insurance": "insurance_array",
      "sliding_scale": true,
      "no_insurance": true
    }
  }
}
```

### Mobile-First Data Structure

```json
{
  "mobile_optimization": {
    "quick_actions": [
      {
        "action": "find_testing",
        "icon": "test-tube",
        "color": "#007bff"
      },
      {
        "action": "emergency_services",
        "icon": "phone",
        "color": "#dc3545"
      },
      {
        "action": "medication_help",
        "icon": "pill",
        "color": "#28a745"
      }
    ],
    "location_services": {
      "gps_enabled": true,
      "nearest_providers": "auto_populate",
      "directions_integration": "google_maps"
    }
  }
}
```

## Content Management Structure

### Dynamic Content Categories

```json
{
  "content_types": {
    "providers": {
      "status": "dynamic",
      "update_frequency": "weekly",
      "source": "provider_api"
    },
    "services": {
      "status": "semi_dynamic",
      "update_frequency": "monthly",
      "source": "manual_cms"
    },
    "educational_content": {
      "status": "static",
      "update_frequency": "quarterly",
      "multilingual": true
    },
    "news_updates": {
      "status": "dynamic",
      "update_frequency": "daily",
      "source": "admin_panel"
    }
  }
}
```

### SEO-Optimized URL Structure

```
/services/
  ├── /hiv-testing/
  ├── /hiv-treatment/
  ├── /prep-services/
  ├── /case-management/
  └── /mental-health/

/providers/
  ├── /middlesex-county/
  ├── /somerset-county/
  ├── /hunterdon-county/
  └── /telehealth/

/resources/
  ├── /ryan-white-programs/
  ├── /financial-assistance/
  ├── /insurance-help/
  └── /support-groups/

/locations/
  ├── /new-brunswick/
  ├── /somerville/
  ├── /flemington/
  └── /emergency-services/
```

## User Experience Optimization

### Personalization Data Structure

```json
{
  "user_preferences": {
    "location": "preferred_county",
    "language": "preferred_language",
    "service_history": "previous_searches",
    "accessibility_needs": "accessibility_array",
    "demographic_info": "optional_demographics"
  },
  "session_data": {
    "search_history": "session_searches",
    "viewed_providers": "provider_ids",
    "saved_resources": "bookmark_array"
  }
}
```

### Accessibility Features

```json
{
  "accessibility": {
    "screen_reader": {
      "alt_text": "comprehensive_descriptions",
      "aria_labels": "navigation_support",
      "skip_links": "content_navigation"
    },
    "visual": {
      "high_contrast": "theme_option",
      "font_scaling": "text_resize",
      "color_blind": "accessible_palette"
    },
    "motor": {
      "keyboard_navigation": "full_support",
      "click_targets": "minimum_44px",
      "timeout_extensions": "configurable"
    }
  }
}
```

## API Integration Points

### External Data Sources

```json
{
  "data_integrations": {
    "ryan_white_directory": {
      "endpoint": "hrsa_api",
      "update_frequency": "daily",
      "data_points": ["providers", "services", "eligibility"]
    },
    "nj_health_department": {
      "endpoint": "nj_doh_api",
      "update_frequency": "weekly",
      "data_points": ["testing_sites", "surveillance_data"]
    },
    "insurance_verification": {
      "endpoint": "eligibility_api",
      "real_time": true,
      "data_points": ["coverage", "copays", "network_status"]
    }
  }
}
```

### Performance Optimization

```json
{
  "performance": {
    "caching": {
      "provider_data": "24_hours",
      "static_content": "7_days",
      "search_results": "1_hour"
    },
    "cdn": {
      "images": "cloudflare",
      "static_assets": "cloudflare",
      "api_responses": "redis_cache"
    },
    "compression": {
      "images": "webp_format",
      "css_js": "minified",
      "html": "gzip_compressed"
    }
  }
}
```

## Analytics & Reporting Structure

### User Journey Tracking

```json
{
  "analytics": {
    "user_paths": [
      "homepage -> service_search -> provider_detail",
      "emergency_entry -> phone_call",
      "testing_finder -> appointment_booking"
    ],
    "conversion_goals": [
      "service_connection",
      "appointment_scheduled",
      "resource_downloaded"
    ],
    "accessibility_usage": [
      "screen_reader_sessions",
      "keyboard_navigation",
      "mobile_usage_patterns"
    ]
  }
}
```

This data structure provides the foundation for a comprehensive, user-friendly, and technically robust HIV resource website that can scale with growing provider networks and evolving user needs.