import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import { ApolloLink, concat, fromPromise } from 'apollo-link';
import { introspectionQueryResultData } from '../assets/fragments-type';
import { REMIX, RemixClient } from './remix-client';

////////////
// SCHEMA //
////////////
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

//////////
// AUTH //
//////////
function getAuthLink(remix: RemixClient) {
  return new ApolloLink((operation, forward) => {
    // Get the authentication token from local storage if it exists
    const tokenPromise = remix.call('settings', 'getGithubAccessToken');
    return fromPromise(tokenPromise)
    .flatMap(token => {
      // Use the setContext method to set the HTTP headers.
      const headers = { Authorization: `Bearer ${token}` };
      operation.setContext({ headers });
      return forward(operation); // Call the next link in the middleware chain.
    });
  });
}

/////////
// URI //
/////////
export function createApollo(httpLink: HttpLink, remix: RemixClient) {
  const http = httpLink.create({ uri: 'https://api.github.com/graphql' });
  const authLink = getAuthLink(remix);
  return {
    link: concat(authLink, http),
    cache: new InMemoryCache({ fragmentMatcher })
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, REMIX],
    },
  ],
})
export class GraphQLModule {}
