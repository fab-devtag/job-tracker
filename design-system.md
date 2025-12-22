Based on the provided HTML `<head>` and Tailwind configuration, I have reverse-engineered the Design System for **CareerZen**.

The code reveals a highly intentional "Zen Productivity" aesthetic, focusing on psychological safety, calmness, and clarity through soft colors, gentle shadows, and clean typography.

***

# CareerZen Design System

## 1. Core Principles
*   **Aesthetic:** "Mindful Productivity." The interface is designed to lower cognitive load. It avoids stark contrasts (pure black/white) in favor of "Cloud," "Mist," and "Stone" tones.
*   **Vibe:** Airy, soft, and fluid.
*   **Motion:** Uses gentle floating and fading animations to make the interface feel alive but unhurried.
*   **Depth:** Uses soft, diffuse shadows (`shadow-soft`, `shadow-float`) rather than hard borders to define hierarchy.

## 2. Color Palette
The system uses a custom semantic palette named `zen` extending the Tailwind colors. It avoids harsh defaults in favor of desaturated, calming tones.

### Primary Neutrals (The "Zen" Scale)
Used for backgrounds, borders, and text.
*   **Cloud White** (`bg-zen-50` / `#F9FAFB`): Main application background.
*   **Mist** (`bg-zen-100` / `#F3F4F6`): Secondary backgrounds (sidebars, card headers).
*   **Soft Stone** (`border-zen-200` / `#E5E7EB`): Subtle borders and dividers.
*   **Text Secondary** (`text-zen-500` / `#6B7280`): Helper text, metadata.
*   **Text Primary** (`text-zen-600` / `#4B5563`): Main body content (softer than pure black).
*   **Headings** (`text-zen-800` / `#1F2937`): High contrast text for titles.

### Brand & Action
*   **Soft Indigo** (`bg-zen-accent` / `#818CF8`): Primary action color. Chosen for its calming yet confident hue (unlike aggressive standard blues).
*   **Indigo Hover** (`hover:bg-zen-accentHover` / `#6366F1`): Interaction state.
*   **Calming Green** (`text-zen-success` / `#34D399`): Success states, completion markers.

## 3. Typography
*   **Font Family:** **Inter** (`font-sans`).
    *   *Why:* A neo-grotesque sans-serif that offers high legibility and a neutral tone, fitting the "clean" aspect of Zen.
*   **Weights:**
    *   `300` (Light): Likely for large display numbers or quotes.
    *   `400` (Regular): Body text.
    *   `500` (Medium): Buttons and navigation links.
    *   `600/700` (SemiBold/Bold): Headings.

## 4. Spacing & Layout
*   **Elevation (Shadows):** The system relies heavily on custom shadows defined in the config:
    *   `shadow-soft`: `0 4px 20px -2px rgba(0, 0, 0, 0.05)` (Subtle lift for cards).
    *   `shadow-float`: `0 10px 40px -10px rgba(0, 0, 0, 0.08)` (For modals or sticky elements).
    *   `shadow-inner-light`: Used for inputs or "pressed" states to create depth without darkness.
*   **Animation:**
    *   `animate-float`: A 6-second infinite ease-in-out loop. Used for hero images or background elements to create a "breathing" effect.
    *   `animate-fade-in`: 0.5s entrance for smooth page loads.

## 5. Components (Inferred Patterns)
Based on the configuration variables, the components follow these patterns:

### Buttons
*   **Primary:** `bg-zen-accent text-white hover:bg-zen-accentHover shadow-soft transition-all`.
*   **Secondary:** `bg-white text-zen-600 border border-zen-200 hover:bg-zen-50`.
*   **Shape:** Likely `rounded-lg` or `rounded-full` to match the soft aesthetic.

### Cards / Containers
*   **Style:** `bg-white rounded-xl shadow-soft border border-zen-100`.
*   **Interaction:** Likely includes a subtle hover lift (`hover:-translate-y-1`).

### Inputs
*   **Style:** `bg-zen-50 border-zen-200 text-zen-700`.
*   **Focus:** `focus:ring-2 focus:ring-zen-accent focus:border-transparent`.
*   **Shadow:** Uses `shadow-inner-light` to make inputs feel like recessed surfaces.

## 6. Iconography
*   **Style:** Clean, stroked icons.
*   **Recommendation:** **Lucide Icons** or **Heroicons (Outline)**.
*   **Implementation:** Icons should be colored `text-zen-400` (inactive) or `text-zen-accent` (active) with a stroke width of `1.5` or `2` to match the Inter font weight.

***

## Reference HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CareerZen - Mindful Job Tracking</title>
    
    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js"></script>

    <!-- Tailwind Config for "Zen Productivity" Vibe -->
    <script>
        
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        zen: {
                            50: '#F9FAFB',  // Cloud white
                            100: '#F3F4F6', // Mist
                            200: '#E5E7EB', // Soft Stone
                            300: '#D1D5DB',
                            400: '#9CA3AF',
                            500: '#6B7280', // Text Secondary
                            600: '#4B5563', // Text Primary
                            700: '#374151',
                            800: '#1F2937',
                            900: '#111827',
                            accent: '#818CF8', // Soft Indigo
                            accentHover: '#6366F1',
                            success: '#34D399', // Calming Green
                        }
                    },
                    boxShadow: {
                        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                        'float': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
                        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'fade-in': 'fadeIn 0.5s ease-out forwards',
                        'slide-up': 'slideUp 0.6s ease-out forwards',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' },
                        },
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        slideUp: {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        }
                    }
                }
            }
        }
    
</script>