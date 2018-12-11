import { environment } from 'src/environments/environment';
// angular doesn't allow iffe in module.ts so this factory is needed for the options
// you can export functions in the module.ts. but this will allow future dependency injection
export function jwtOptionsFactory() {
  return {
<<<<<<< HEAD
      tokenGetter: ()=> {
        console.log("tokenGetter in core.module.ts")
        console.log(localStorage.getItem("jwt"))
       return localStorage.getItem("jwt")
    },
    whitelistedDomains: [environment.url+"/auth/users",environment.url+"/projects"],
    blacklistedRoutes: [environment.url+"/auth/"]
    //according to libary document. whitelisted domains will have headers ATTACHED
    //but blacklisted will not have the headers REPLACED
    // ? hopefully -- 
  }
}
=======
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
>>>>>>> 52fa21909250087baa3b7994453e89b0d6a56015
