import { NestMiddleware } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

export class AuthenticationMiddleware implements NestMiddleware {
    use(req, res, next) {
        jwt({
            secret: expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
            }),

            audience: 'http://localhost:3000',
            issuer: `https://${process.env.AUTH0_DOMAIN}/`,
            algorithms: ['RS256'],
        })(req, res, err => {
            if (err) {
                const status = err.status || 500;
                const message =
                    err.message || 'Sorry, we were unable to process your request.';
                return res.status(status).send({
                    message,
                });
            }
            next();
        });
    };
}
http://localhost:4200/login?code=${CODE}&state=${SOME_STATE}
http://localhost:4200/login?code=bzpGYo6RLgdDJY2Y&state=hKFo2SBkakxZRmMxYTBzNnk0TWh3d2tNYmViNmZUZnhDUHFRN6FupWxvZ2luo3RpZNkgSWw0RDNvbUlrdmJRdlZfTmpXWUtYQmdScjRkaGJKTDGjY2lk2SBhT3ZwNU1ITjlhZGhUUXB2QXFERUFTNFdWdTdwcTV2Tg