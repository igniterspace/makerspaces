const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

// We are going to implement a JWT middleware that will ensure the validity of our token. We'll require each protected route to have a valid access_token sent in the Authorization header
var jwtCheck = function (req, res, next) {
    jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: "https://igniterglobal.auth0.com/.well-known/jwks.json"
        }),
        audience: 'http://makerspaces.igniter.global/api',
        issuer: "https://igniterglobal.auth0.com/",
        algorithms: ['RS256']
    })(req, res, next);
}

function currentUser(req) {
    let user = req.user;
    user.email = req.user['http://makerspaces.igniter.global/api/email'];
    user.appMetadata = req.user['http://makerspaces.igniter.global/api/app_metadata'];
    user.currentLocation = parseInt(req.headers.ig_location);
    return user;
}


function error(res, message) {
    return res.send(401, message);
}

var permit = function (entity, level) {
    return (req, res, next) => {
        let locationId = req.headers.ig_location;

        if (!locationId) {
            error(res, 'Unauthorized, IG_LOCATION header has not valid locationId - ' + locationId)
        }

        if (!req.user['http://makerspaces.igniter.global/api/app_metadata']) {
            error(res, 'Unauthorized, app_metadata not present in the token');
        }

        let accessMetadata = req.user['http://makerspaces.igniter.global/api/app_metadata']['access'];

        // check the access rights to the location
        let locationAccess = null;
        if (accessMetadata[locationId + '']) {
            locationAccess = accessMetadata[locationId + ''];
        } else if (accessMetadata['*']) {
            locationAccess = accessMetadata['*'];
        } else {
            error(res, 'Unauthorized, user has no rights to access location #' + locationId);
        }

        //check the access rights to the entity
        var entityAccessLevel = null;
        if (locationAccess) {
            if (locationAccess['entity']) {
                entityAccessLevel = locationAccess['entity'];
            } else if (locationAccess['*']) {
                entityAccessLevel = locationAccess['*'];
            } else {
                error(res, 'Unauthorized, user has no rights to access \'' + entity + ' \' at location #' + locationId);
            }
        }

        // check access level
        if (entityAccessLevel === 'write') {
            return next();
        } else if (entityAccessLevel === 'read' && level === 'read') {
            return next();
        } else {
            error(res, 'Unauthorized, user has no rights to \'' + level + '\' to \'' + entity + ' \' at location #' + locationId);
        }
    }
}

module.exports = {
    jwtCheck: jwtCheck,
    permit: permit,
    currentUser: currentUser
};
