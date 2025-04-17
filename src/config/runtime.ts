// /**
//  * Runtime configuration for the application
//  * Determines whether to use mock data via MSW or real data from Firestore
//  */

// // Declare global window property for TypeScript
// declare global {
//   interface Window {
//     __IS_MSW_ACTIVE__?: boolean;
//   }
// }

// /**
//  * Determines if we're using mock data via MSW
//  * True when in development and MSW is active
//  */
// export const IS_MOCK = import.meta.env.DEV && window?.__IS_MSW_ACTIVE__ === true;

// /**
//  * Determines if we should use Firestore for data
//  * True when the VITE_USE_FIRESTORE env variable is true and we're not using mocks
//  */
// export const USE_FIRESTORE = import.meta.env.VITE_USE_FIRESTORE === 'true' && !IS_MOCK;

// /**
//  * Default page size for paginated API requests
//  */
// export const API_PAGE_LIMIT = 9 as const;
