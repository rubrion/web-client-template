import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import PageHelmet from '../components/PageHelmet';

function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-container">
        {/* Direct title and description for the error page */}
        <PageHelmet
          title={`Error ${error.status} | Rubrion Web Client`}
          description="An error occurred while loading this page"
        />
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return (
      <div className="error-container">
        {/* Default error page metadata */}
        <PageHelmet
          title="Error | Rubrion Web Client"
          description="An unexpected error occurred"
        />
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    );
  }
}

export default ErrorPage;
