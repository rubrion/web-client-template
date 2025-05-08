# Multilingual Remote-Content Documentation

This document describes the multilingual support for remote content in the START site, including Firestore structure and how to add or update translations.

## Architecture Overview

The multilingual system is built on:

1. **URL-based language selection** - Language is determined from `?lang=xx` URL parameter
2. **Language fallback** - If content is unavailable in the requested language, English is used
3. **Transparent API** - All endpoints return both content and actual language used
4. **MSW mocking** - Development environment uses MSW to simulate multilingual API responses

## Firestore Structure

Remote multilingual content is stored in Firestore with the following structure:

```
/
├── projects/
│   ├── {projectId}/
│   │   ├── en/                  # English (default) content
│   │   │   ├── title: string
│   │   │   ├── body: string
│   │   │   └── meta: object     # Additional metadata
│   │   │
│   │   ├── es/                  # Spanish content
│   │   │   ├── title: string
│   │   │   ├── body: string
│   │   │   └── meta: object
│   │   │
│   │   └── pt/                  # Portuguese content
│   │       ├── title: string
│   │       ├── body: string
│   │       └── meta: object
│
├── blogPosts/
    ├── {postId}/
        ├── en/                  # English (default) content
        │   ├── title: string
        │   ├── body: string
        │   └── meta: object     # Additional metadata
        │
        ├── es/                  # Spanish content, etc.
```

### Required Fields

Each document must include at minimum:

- **title**: string - The document title
- **body**: string - The main content (usually HTML)
- **meta**: object (optional) - Additional metadata
  - **description**: string (optional) - Short document description

## Adding New Translations

### 1. Adding a New Language to an Existing Document

To add a new translation for an existing document:

1. Navigate to the document in Firestore (`projects/{projectId}` or `blogPosts/{postId}`)
2. Add a new collection with the language code (e.g., `es` for Spanish)
3. Create a document with the same fields as the English version
4. Translate and populate the fields

Example for adding a Spanish translation to project with ID "project-1":

```javascript
// Using Firebase Admin SDK or client library
await firestore
  .collection('projects')
  .doc('project-1')
  .collection('es')
  .doc('content')
  .set({
    title: 'Título del Proyecto',
    body: '<p>Contenido del proyecto en español...</p>',
    meta: {
      description: 'Descripción breve del proyecto',
      // Additional metadata...
    },
  });
```

### 2. Creating a New Document with Multiple Languages

When creating a new document:

1. Create the primary English version first
2. Add additional language versions as separate collections

```javascript
// Create the English version first
await firestore
  .collection('projects')
  .doc('new-project')
  .collection('en')
  .doc('content')
  .set({
    title: 'New Project',
    body: '<p>Project content...</p>',
    meta: { description: 'Project description' },
  });

// Add Spanish version
await firestore
  .collection('projects')
  .doc('new-project')
  .collection('es')
  .doc('content')
  .set({
    title: 'Nuevo Proyecto',
    body: '<p>Contenido del proyecto...</p>',
    meta: { description: 'Descripción del proyecto' },
  });

// Add Portuguese version
await firestore
  .collection('projects')
  .doc('new-project')
  .collection('pt')
  .doc('content')
  .set({
    title: 'Novo Projeto',
    body: '<p>Conteúdo do projeto...</p>',
    meta: { description: 'Descrição do projeto' },
  });
```

## API Response Format

When fetching content from the API, responses have this structure:

```json
{
  "data": {
    "title": "Document Title",
    "body": "<p>Document content...</p>",
    "meta": {
      "description": "Document description",
      "additionalField": "Additional data"
    }
  },
  "langUsed": "en" // The language actually used (may differ from requested language)
}
```

The `langUsed` field indicates which language was actually returned, which might not match the requested language if a fallback occurred.

## Frontend Implementation

The multilingual system is implemented with the following components:

- `useRemoteDoc` hook - Fetches documents with language fallback
- `getLangParam` utility - Extracts language from URL
- `LanguageSwitcher` component - Changes the URL language parameter

### Using the `useRemoteDoc` Hook

```jsx
import { useRemoteDoc } from '../i18n/useRemoteDoc';

function ProjectPage() {
  const { id } = useParams();
  const {
    document: project,
    isLoading,
    isError,
    isUsingFallback,
    langUsed,
  } = useRemoteDoc('projects', id);

  // Show fallback warning if needed
  return (
    <>
      {isUsingFallback && (
        <Alert severity="warning">
          This content is not available in your selected language and is being
          shown in English.
        </Alert>
      )}

      {/* Render document content */}
      <h1>{project?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: project?.body || '' }} />
    </>
  );
}
```
