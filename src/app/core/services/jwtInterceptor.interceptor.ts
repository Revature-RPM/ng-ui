import { environment } from 'src/environments/environment';
// angular doesn't allow iffe in module.ts so this factory is needed for the options
// you can export functions in the module.ts. but this will allow future dependency injection
export function jwtOptionsFactory() {
  return {
      tokenGetter: () => {
        console.log('tokenGetter in core.module.ts');
       return localStorage.getItem('jwt');
    },
    whitelistedDomains: [environment.url + '/auth/users'],
    blacklistedRoutes: [environment.url + '/auth']
    // according to libary document. whitelisted domains will have headers ATTACHED
    // but blacklisted will not have the headers REPLACED
    // ? hopefully --
  };
}
