import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

import { mockBlogPosts } from '../src/mocks/mockBlogPosts';
import { mockProjects } from '../src/mocks/mockProjects';

// Load environment variables from .env.local file
config({ path: '.env.local' });

// Try to get Firebase config from environment variable
let firebaseConfig;
try {
  const configStr = process.env.VITE_FIREBASE_CONFIG;
  if (!configStr) {
    throw new Error('VITE_FIREBASE_CONFIG environment variable is not set');
  }
  firebaseConfig = JSON.parse(configStr);
} catch (error) {
  console.error('Failed to parse Firebase config:', error);
  console.log(
    'Please make sure VITE_FIREBASE_CONFIG is properly set in your .env.local file'
  );
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Add timestamps to an object
 */
function addTimestamps(obj: any) {
  return {
    ...obj,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
}

/**
 * Import mock data to Firestore
 */
async function importData() {
  try {
    console.log('\x1b[36m%s\x1b[0m', '🔥 Starting Firestore data import...');

    // Import blog posts
    console.log('\x1b[33m%s\x1b[0m', '📝 Importing blog posts...');
    const blogPromises = mockBlogPosts.map(async (post) => {
      const postWithTimestamps = addTimestamps(post);
      await setDoc(doc(db, 'blogs', post.id), postWithTimestamps);
      return post.id;
    });

    const blogIds = await Promise.all(blogPromises);
    console.log(`✅ Imported ${blogIds.length} blog posts`);

    // Import projects
    console.log('\x1b[33m%s\x1b[0m', '🚀 Importing projects...');
    const projectPromises = mockProjects.map(async (project) => {
      const projectWithTimestamps = addTimestamps(project);
      await setDoc(doc(db, 'projects', project.id), projectWithTimestamps);
      return project.id;
    });

    const projectIds = await Promise.all(projectPromises);
    console.log(`✅ Imported ${projectIds.length} projects`);

    console.log('\x1b[32m%s\x1b[0m', '✨ Data import completed successfully!');

    // Generate a report
    const report = {
      timestamp: new Date().toISOString(),
      blogPosts: blogIds,
      projects: projectIds,
      totalItemsImported: blogIds.length + projectIds.length,
    };

    const reportDir = path.join(__dirname, 'reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir);
    }

    const reportPath = path.join(reportDir, `import-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Import report saved to ${reportPath}`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error importing data:', error);
    process.exit(1);
  }
}

// Run the import
importData();
