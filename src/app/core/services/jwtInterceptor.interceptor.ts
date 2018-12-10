import { JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment'
export function jwtOptionsFactory() {
  return {
      tokenGetter: ()=> {
        console.log("tokenGetter in core.module.ts")
       return localStorage.getItem("jwt")
    },
    whitelistedDomains: [],
    blacklistedRoutes: [environment.url+"/auth"]
  }
}