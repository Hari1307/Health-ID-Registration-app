import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authservice: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = this.authservice.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user; // this returns to the request object 
    }
}