import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { introspectionQueryResultData } from '../assets/fragments-type';

////////////
// SCHEMA //
////////////
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

//////////
// AUTH //
//////////
const authLink = new ApolloLink((operation, forward) => {
  // Get the authentication token from local storage if it exists
  const token = '85a99df89d7ceea7e2e5344b02cd63ff5cc6a18d';

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
      headers: { Authorization: `Bearer ${token}` }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

/////////
// URI //
/////////
const uri = 'https://api.github.com/graphql';
export function createApollo(httpLink: HttpLink) {
  return {
    link: authLink.concat(httpLink.create({uri})),
    cache: new InMemoryCache({ fragmentMatcher }),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
